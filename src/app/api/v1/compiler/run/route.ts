import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Language = "c" | "cpp" | "java" | "python" | "javascript";
type Verdict = "AC" | "RE" | "CE" | "TLE";

type CommandCandidate = {
  command: string;
  args: string[];
};

type CommandResult = {
  commandLine: string;
  exitCode: number | null;
  stdout: string;
  stderr: string;
  durationMs: number;
  timedOut: boolean;
  missingTool?: boolean;
};

const timeoutMs = 5000;
const maxOutputBytes = 64 * 1024;

const languageConfig: Record<
  Language,
  {
    fileName: string;
    compile?: CommandCandidate[];
    run: CommandCandidate[];
  }
> = {
  c: {
    fileName: "main.c",
    compile: [
      { command: "gcc", args: ["main.c", "-O2", "-std=c17", "-o", executableName()] }
    ],
    run: [{ command: executablePath(), args: [] }]
  },
  cpp: {
    fileName: "main.cpp",
    compile: [
      { command: "g++", args: ["main.cpp", "-O2", "-std=c++20", "-o", executableName()] }
    ],
    run: [{ command: executablePath(), args: [] }]
  },
  java: {
    fileName: "Main.java",
    compile: [{ command: "javac", args: ["Main.java"] }],
    run: [{ command: "java", args: ["Main"] }]
  },
  python: {
    fileName: "main.py",
    run: [
      { command: "python", args: ["main.py"] },
      { command: "py", args: ["-3", "main.py"] },
      { command: "python3", args: ["main.py"] }
    ]
  },
  javascript: {
    fileName: "main.js",
    run: [{ command: process.execPath, args: ["main.js"] }]
  }
};

function executableName() {
  return process.platform === "win32" ? "main.exe" : "main";
}

function executablePath() {
  return process.platform === "win32" ? path.join(".", "main.exe") : path.join(".", "main");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    language?: Language;
    source?: string;
    input?: string;
  };

  if (!body.language || !languageConfig[body.language]) {
    return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
  }

  if (!body.source?.trim()) {
    return NextResponse.json({ error: "Source code is required" }, { status: 400 });
  }

  const config = languageConfig[body.language];
  const workDir = await mkdtemp(path.join(tmpdir(), `nimblejudge-${randomUUID()}-`));

  try {
    await writeFile(path.join(workDir, config.fileName), body.source, "utf8");

    if (config.compile) {
      const compileResult = await runCandidates(config.compile, workDir, "");
      if (compileResult.missingTool) {
        return NextResponse.json({
          verdict: "CE" satisfies Verdict,
          stdout: "",
          stderr: compilerMissingMessage(body.language),
          compileOutput: compileResult.stderr,
          durationMs: compileResult.durationMs,
          command: compileResult.commandLine
        });
      }

      if (compileResult.timedOut || compileResult.exitCode !== 0) {
        return NextResponse.json({
          verdict: compileResult.timedOut ? ("TLE" satisfies Verdict) : ("CE" satisfies Verdict),
          stdout: compileResult.stdout,
          stderr: compileResult.stderr,
          compileOutput: compileResult.stderr || compileResult.stdout,
          durationMs: compileResult.durationMs,
          command: compileResult.commandLine
        });
      }
    }

    const runResult = await runCandidates(config.run, workDir, body.input ?? "");
    const verdict: Verdict = runResult.timedOut ? "TLE" : runResult.exitCode === 0 ? "AC" : "RE";

    return NextResponse.json({
      verdict,
      stdout: runResult.stdout,
      stderr: runResult.missingTool ? compilerMissingMessage(body.language) : runResult.stderr,
      compileOutput: "",
      durationMs: runResult.durationMs,
      command: runResult.commandLine
    });
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

async function runCandidates(candidates: CommandCandidate[], cwd: string, input: string): Promise<CommandResult> {
  let lastMissing: CommandResult | null = null;

  for (const candidate of candidates) {
    const result = await runCommand(candidate, cwd, input);
    if (!result.missingTool) return result;
    lastMissing = result;
  }

  return (
    lastMissing ?? {
      commandLine: "",
      exitCode: null,
      stdout: "",
      stderr: "No command candidates available.",
      durationMs: 0,
      timedOut: false,
      missingTool: true
    }
  );
}

function runCommand(candidate: CommandCandidate, cwd: string, input: string): Promise<CommandResult> {
  const startedAt = Date.now();

  return new Promise((resolve) => {
    const child = spawn(candidate.command, candidate.args, {
      cwd,
      shell: false,
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"]
    });

    let stdout = "";
    let stderr = "";
    let settled = false;
    let timedOut = false;

    const commandLine = [candidate.command, ...candidate.args].join(" ");
    const timer = windowlessTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeoutMs);

    child.on("error", (error: NodeJS.ErrnoException) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({
        commandLine,
        exitCode: null,
        stdout,
        stderr: error.code === "ENOENT" ? `${candidate.command} was not found.` : error.message,
        durationMs: Date.now() - startedAt,
        timedOut: false,
        missingTool: error.code === "ENOENT"
      });
    });

    child.stdout.on("data", (chunk: Buffer) => {
      stdout = appendOutput(stdout, chunk);
      if (Buffer.byteLength(stdout) >= maxOutputBytes) child.kill("SIGKILL");
    });

    child.stderr.on("data", (chunk: Buffer) => {
      stderr = appendOutput(stderr, chunk);
      if (Buffer.byteLength(stderr) >= maxOutputBytes) child.kill("SIGKILL");
    });

    child.on("close", (exitCode) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({
        commandLine,
        exitCode,
        stdout,
        stderr,
        durationMs: Date.now() - startedAt,
        timedOut
      });
    });

    child.stdin.end(input);
  });
}

function appendOutput(current: string, chunk: Buffer) {
  const next = current + chunk.toString("utf8");
  if (Buffer.byteLength(next) <= maxOutputBytes) return next;
  return next.slice(0, maxOutputBytes) + "\n[output truncated]";
}

function compilerMissingMessage(language: Language) {
  const tools: Record<Language, string> = {
    c: "gcc",
    cpp: "g++",
    java: "javac and java",
    python: "python",
    javascript: "node"
  };

  return `The ${tools[language]} toolchain is not installed or not available in PATH on this machine.`;
}

function windowlessTimeout(callback: () => void, ms: number) {
  return setTimeout(callback, ms);
}

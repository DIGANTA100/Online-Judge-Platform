"use client";

import { useMemo, useState } from "react";
import {
  Braces,
  CheckCircle2,
  FileCode2,
  Keyboard,
  Play,
  RotateCcw,
  Send,
  Settings,
  Terminal,
  Timer,
  Zap
} from "lucide-react";
import { MonacoCodeEditor } from "@/components/editor/monaco-code-editor";
import { submissions, verdictConfig, type Verdict } from "@/lib/platform-data";
import { Surface } from "@/components/platform/app-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CompilerLanguage = "cpp" | "c" | "java" | "python" | "javascript";
type RunResult = {
  verdict: Verdict | "RE";
  stdout: string;
  stderr: string;
  compileOutput: string;
  durationMs: number;
  command: string;
};

const languageOptions: Record<
  CompilerLanguage,
  {
    label: string;
    monaco: "cpp" | "java" | "python" | "javascript" | "c";
    fileName: string;
    template: string;
    input: string;
  }
> = {
  cpp: {
    label: "C++20",
    monaco: "cpp",
    fileName: "main.cpp",
    input: "5\n1 2 3 4 5\n",
    template: `#include <bits/stdc++.h>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  long long sum = 0;
  for (int i = 0; i < n; i++) {
    long long x;
    cin >> x;
    sum += x;
  }

  cout << sum << "\\n";
  return 0;
}`
  },
  c: {
    label: "C17",
    monaco: "c",
    fileName: "main.c",
    input: "5\n1 2 3 4 5\n",
    template: `#include <stdio.h>

int main(void) {
  int n;
  scanf("%d", &n);
  long long sum = 0;

  for (int i = 0; i < n; i++) {
    long long x;
    scanf("%lld", &x);
    sum += x;
  }

  printf("%lld\\n", sum);
  return 0;
}`
  },
  java: {
    label: "Java 21",
    monaco: "java",
    fileName: "Main.java",
    input: "5\n1 2 3 4 5\n",
    template: `import java.io.*;
import java.util.*;

public class Main {
  public static void main(String[] args) throws Exception {
    Scanner scanner = new Scanner(System.in);
    int n = scanner.nextInt();
    long sum = 0;

    for (int i = 0; i < n; i++) {
      sum += scanner.nextLong();
    }

    System.out.println(sum);
  }
}`
  },
  python: {
    label: "Python 3",
    monaco: "python",
    fileName: "main.py",
    input: "5\n1 2 3 4 5\n",
    template: `n = int(input())
values = list(map(int, input().split()))
print(sum(values[:n]))`
  },
  javascript: {
    label: "JavaScript",
    monaco: "javascript",
    fileName: "main.js",
    input: "5\n1 2 3 4 5\n",
    template: `const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/).map(Number);
const n = input[0];
const values = input.slice(1, n + 1);

console.log(values.reduce((sum, value) => sum + value, 0));`
  }
};

export function WorkspaceSystem() {
  const [language, setLanguage] = useState<CompilerLanguage>("cpp");
  const [sourceByLanguage, setSourceByLanguage] = useState(
    Object.fromEntries(
      Object.entries(languageOptions).map(([key, config]) => [key, config.template])
    ) as Record<CompilerLanguage, string>
  );
  const [inputByLanguage, setInputByLanguage] = useState(
    Object.fromEntries(
      Object.entries(languageOptions).map(([key, config]) => [key, config.input])
    ) as Record<CompilerLanguage, string>
  );
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);

  const activeLanguage = languageOptions[language];
  const activeVerdict = runResult ? verdictConfig[runResult.verdict as Verdict] ?? verdictConfig.RE : verdictConfig.QUEUED;

  const terminalOutput = useMemo(() => {
    if (!runResult) {
      return "Ready. Choose a language, write code, add custom input, then run.";
    }

    return [
      `$ ${runResult.command || "runner"}`,
      runResult.compileOutput ? `\n[compile]\n${runResult.compileOutput}` : "",
      runResult.stdout ? `\n[stdout]\n${runResult.stdout}` : "",
      runResult.stderr ? `\n[stderr]\n${runResult.stderr}` : "",
      `\n[verdict] ${runResult.verdict} in ${runResult.durationMs} ms`
    ]
      .filter(Boolean)
      .join("\n");
  }, [runResult]);

  async function runCode() {
    setIsRunning(true);
    setRunResult(null);

    try {
      const response = await fetch("/api/v1/compiler/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          source: sourceByLanguage[language],
          input: inputByLanguage[language]
        })
      });

      const data = (await response.json()) as RunResult | { error: string };

      if (!response.ok || "error" in data) {
        setRunResult({
          verdict: "RE",
          stdout: "",
          stderr: "error" in data ? data.error : "Compiler request failed.",
          compileOutput: "",
          durationMs: 0,
          command: "compiler"
        });
        return;
      }

      setRunResult(data);
    } catch {
      setRunResult({
        verdict: "RE",
        stdout: "",
        stderr: "Could not reach the compiler service.",
        compileOutput: "",
        durationMs: 0,
        command: "compiler"
      });
    } finally {
      setIsRunning(false);
    }
  }

  function resetTemplate() {
    setSourceByLanguage((current) => ({
      ...current,
      [language]: activeLanguage.template
    }));
    setInputByLanguage((current) => ({
      ...current,
      [language]: activeLanguage.input
    }));
    setRunResult(null);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <Surface className="overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(languageOptions) as CompilerLanguage[]).map((item) => (
              <button
                className={cn(
                  "focus-ring rounded-md border border-white/10 px-3 py-2 text-sm text-white/58 transition hover:bg-white/[0.06] hover:text-white",
                  language === item && "border-mint-300/30 bg-mint-300/10 text-mint-300"
                )}
                key={item}
                onClick={() => {
                  setLanguage(item);
                  setRunResult(null);
                }}
                type="button"
              >
                {languageOptions[item].label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={resetTemplate} type="button" variant="secondary">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button disabled={isRunning} onClick={runCode} type="button">
              <Play className="h-4 w-4" />
              {isRunning ? "Running..." : "Run"}
            </Button>
          </div>
        </div>

        <MonacoCodeEditor
          fileName={activeLanguage.fileName}
          language={activeLanguage.monaco}
          onChange={(value) =>
            setSourceByLanguage((current) => ({
              ...current,
              [language]: value
            }))
          }
          value={sourceByLanguage[language]}
        />
      </Surface>

      <div className="grid gap-5">
        <Surface>
          <div className="flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Terminal className="h-5 w-5 text-mint-300" />
              Compiler
            </h2>
            <span className={cn("rounded-md border px-2 py-1 text-xs", activeVerdict.className)}>{activeVerdict.label}</span>
          </div>

          <label className="mt-5 grid gap-2 text-sm font-medium text-white/64">
            Custom input
            <textarea
              className="focus-ring min-h-28 w-full resize-y rounded-md border border-white/10 bg-ink-900 p-3 font-mono text-sm text-white"
              onChange={(event) =>
                setInputByLanguage((current) => ({
                  ...current,
                  [language]: event.target.value
                }))
              }
              value={inputByLanguage[language]}
            />
          </label>

          <pre className="mt-4 min-h-72 overflow-auto rounded-md border border-white/10 bg-ink-900 p-4 font-mono text-sm leading-6 text-white/72">
            {terminalOutput}
          </pre>
        </Surface>

        <Surface>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Zap className="h-5 w-5 text-amberline-300" />
            Workspace features
          </h2>
          <div className="mt-4 grid gap-3">
            {[
              ["Multi-language", "C, C++, Java, Python, and JavaScript templates."],
              ["Real local run", "Executes through installed local compilers and runtimes."],
              ["Fast feedback", "Shows stdout, stderr, compile output, command, and timing."],
              ["Editor controls", "Monaco editor with themes, shortcuts, font size, and autosave."]
            ].map(([title, detail]) => (
              <div className="rounded-md border border-white/10 bg-ink-900 p-4" key={title}>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-mint-300" />
                  {title}
                </div>
                <p className="mt-2 text-sm leading-6 text-white/54">{detail}</p>
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <FileCode2 className="h-5 w-5 text-mint-300" />
            Recent submissions
          </h2>
          <div className="mt-4 space-y-2">
            {submissions.map((submission) => (
              <div className="grid grid-cols-[1fr_72px] gap-3 rounded-md bg-ink-900 p-3 text-sm" key={submission.id}>
                <span>{submission.problem}</span>
                <span className="font-mono text-white/58">{submission.verdict}</span>
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Settings className="h-5 w-5 text-mint-300" />
            Shortcuts
          </h2>
          <div className="mt-4 grid gap-2 text-sm text-white/54">
            <span className="flex items-center gap-2"><Keyboard className="h-4 w-4" /> Ctrl/Cmd + S autosaves editor draft.</span>
            <span className="flex items-center gap-2"><Send className="h-4 w-4" /> Submit flow can connect to hidden judge tests later.</span>
            <span className="flex items-center gap-2"><Timer className="h-4 w-4" /> Local compiler runs time out after 5 seconds.</span>
            <span className="flex items-center gap-2"><Braces className="h-4 w-4" /> Java submissions should keep the class name as Main.</span>
          </div>
        </Surface>
      </div>
    </div>
  );
}

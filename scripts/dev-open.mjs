import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const bundlerArgs = args.some((arg) => ["--turbo", "--turbopack", "--webpack"].includes(arg))
  ? args
  : ["--webpack", ...args];
const hostname = readArg("--hostname", "localhost");
const port = readArg("--port", "3000");
const browserHost = hostname === "0.0.0.0" ? "localhost" : hostname;
const url = `http://${browserHost}:${port}`;
let opened = false;

const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", ...bundlerArgs],
  {
    cwd: process.cwd(),
    stdio: ["inherit", "pipe", "pipe"],
    windowsHide: false
  }
);

child.stdout.on("data", handleOutput);
child.stderr.on("data", handleOutput);

child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});

process.on("SIGINT", () => {
  child.kill("SIGINT");
});

process.on("SIGTERM", () => {
  child.kill("SIGTERM");
});

function handleOutput(chunk) {
  const text = chunk.toString();
  process.stdout.write(text);

  if (!opened && (text.includes("Ready") || text.includes("Local:"))) {
    opened = true;
    openBrowser(url);
  }
}

function readArg(name, fallback) {
  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1]) return args[index + 1];

  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);

  return fallback;
}

function openBrowser(targetUrl) {
  if (process.platform === "win32") {
    spawn("cmd", ["/c", "start", "", targetUrl], {
      detached: true,
      stdio: "ignore",
      windowsHide: true
    }).unref();
    return;
  }

  const opener = process.platform === "darwin" ? "open" : "xdg-open";
  spawn(opener, [targetUrl], {
    detached: true,
    stdio: "ignore"
  }).unref();
}

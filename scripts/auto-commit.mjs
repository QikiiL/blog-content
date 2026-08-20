#!/usr/bin/env node
// Auto-commit watcher for TinaCMS content.
// Watches content directories; on save, debounces and runs:
//   git add ... && git commit && git push
import { watch } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import path from "node:path";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const WATCH_DIRS = ["posts", "spec", "images", "data", "overrides", "global"];
const DEBOUNCE_MS = 3000;

let timer = null;
let busy = false;
let rerun = false;

function log(...args) {
  console.log(`[auto-commit] ${new Date().toLocaleString()}`, ...args);
}

async function run(cmd, args) {
  const { stdout, stderr } = await execFileAsync(cmd, args, { cwd: repoRoot });
  if (stdout) log(stdout.trim());
  if (stderr) log(stderr.trim());
}

async function commitAndPush() {
  if (busy) {
    rerun = true;
    return;
  }
  busy = true;
  try {
    await run("git", ["add", "--", ...WATCH_DIRS]);

    const diff = await execFileAsync(
      "git",
      ["diff", "--cached", "--name-only"],
      { cwd: repoRoot }
    );
    const files = diff.stdout.split("\n").filter(Boolean);
    if (files.length === 0) {
      log("No changes to commit");
      return;
    }

    const message =
      files.length === 1
        ? `docs: auto-save ${path.basename(files[0])}`
        : `docs: auto-save content (${files.length} files)`;

    await run("git", ["commit", "-m", message]);
    await run("git", ["push", "origin", "HEAD"]);
    log(`Committed and pushed ${files.length} file(s)`);
  } catch (err) {
    log("ERROR:", err.message);
  } finally {
    busy = false;
    if (rerun) {
      rerun = false;
      timer = setTimeout(commitAndPush, DEBOUNCE_MS);
    }
  }
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(commitAndPush, DEBOUNCE_MS);
}

for (const dir of WATCH_DIRS) {
  const fullPath = path.join(repoRoot, dir);
  try {
    watch(fullPath, { recursive: true }, (_event, filename) => {
      if (!filename) return;
      log(`Change detected: ${dir}/${filename}`);
      schedule();
    });
    log(`Watching ${dir}/`);
  } catch (err) {
    log(`Cannot watch ${dir}/: ${err.message}`);
  }
}

// Flush any pre-existing changes shortly after startup.
setTimeout(commitAndPush, 2000);

import { useEffect, useMemo, useRef, useState } from "react";
import { useWM } from "../os/WindowManager";
import { apps } from "../os/apps";
import type { AppId } from "../os/types";
import { profile, socials } from "../data/profile";
import { projects } from "../data/projects";
import { COMMANDS, COMMAND_NAMES } from "./terminal/commands";
import { getNode, isDir, listDir, pathDisplay, resolvePath } from "./terminal/fs-utils";
import { Neofetch } from "./terminal/Neofetch";
import type { FSDir } from "../data/filesystem";

type LsItem = { name: string; cls: string };
type Entry =
  | { id: number; kind: "prompt"; path: string; cmd: string }
  | { id: number; kind: "text"; text: string; cls?: string }
  | { id: number; kind: "ls"; items: LsItem[]; long: boolean }
  | { id: number; kind: "neofetch"; startTime: number };

// Distributive omit so each union member keeps its own keys.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
type EntryInput = DistributiveOmit<Entry, "id">;

const WELCOME = ` _      _ _            ___  ___
(_)_  _| (_)___ _ _   / _ \\/ __|
| | || | | / -_) ' \\ | (_) \\__ \\
|_|\\_,_|_|_\\___|_||_| \\___/|___/`;

export function Terminal({ windowId }: { windowId: string }) {
  // Computed here (not at module scope) to avoid a circular-import TDZ:
  // apps.tsx imports this component, so `apps` isn't initialized at import time.
  const APP_IDS = apps.map((a) => a.id) as AppId[];
  const wm = useWM();
  const startTime = useRef(Date.now());
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;

  const [lines, setLines] = useState<Entry[]>(() => [
    { id: nextId(), kind: "text", text: WELCOME, cls: "t-accent" },
    { id: nextId(), kind: "text", text: `Hi, I'm ${profile.name}. Welcome to my terminal.`, cls: "" },
    {
      id: nextId(),
      kind: "text",
      text: "Type 'help' for commands · Tab to autocomplete · ↑ ↓ for history · try 'neofetch'",
      cls: "t-dim",
    },
    { id: nextId(), kind: "text", text: "", cls: "" },
  ]);
  const [cwd, setCwd] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);

  const cwdRef = useRef(cwd);
  cwdRef.current = cwd;

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = (entries: EntryInput[]) =>
    setLines((prev) => [...prev, ...entries.map((e) => ({ ...e, id: nextId() } as Entry))]);

  const text = (t: string, cls = ""): EntryInput => ({ kind: "text", text: t, cls });

  // ── Command execution ───────────────────────────────────────────────────────
  function run(raw: string) {
    const cmd = raw.trim();
    const promptEntry: EntryInput = {
      kind: "prompt",
      path: pathDisplay(cwd),
      cmd: raw,
    };

    if (cmd === "") {
      push([promptEntry]);
      return;
    }

    const tokens = cmd.split(/\s+/);
    const name = tokens[0];
    const args = tokens.slice(1);
    const out: EntryInput[] = [promptEntry];

    switch (name) {
      case "help": {
        out.push(text("Available commands:", "t-accent"));
        COMMANDS.forEach((c) =>
          out.push(text(`  ${c.name.padEnd(11)}${c.summary}`))
        );
        out.push(text(""));
        out.push(text("Tip: press Tab to autocomplete. Most files open in apps via `open`.", "t-dim"));
        break;
      }
      case "about": {
        out.push(text(`${profile.name} — ${profile.role}`, "t-accent"));
        out.push(text(""));
        profile.about.forEach((p) => {
          out.push(text(wrap(p)));
          out.push(text(""));
        });
        out.push(text("→ run `open about` for the full card.", "t-dim"));
        break;
      }
      case "projects": {
        out.push(text("Selected projects:", "t-accent"));
        projects.forEach((p) =>
          out.push(text(`  ${p.emoji}  ${p.name.padEnd(22)} ${p.blurb}`))
        );
        out.push(text(""));
        out.push(text("→ run `open projects` to browse them.", "t-dim"));
        break;
      }
      case "resume": {
        out.push(text(`${profile.name} · ${profile.role}`, "t-accent"));
        out.push(text(wrap(profile.tagline)));
        out.push(text(""));
        out.push(text("→ run `open resume` for the formatted résumé.", "t-dim"));
        break;
      }
      case "contact":
      case "social":
      case "socials": {
        out.push(text("Find me here:", "t-accent"));
        socials.forEach((s) =>
          out.push(text(`  ${s.label.padEnd(12)} ${s.url}`))
        );
        if (name === "contact")
          out.push(text("→ run `open contact` to send a message.", "t-dim"));
        break;
      }
      case "open": {
        const target = args[0];
        if (!target) {
          out.push(text("usage: open <app|file>", "t-err"));
          break;
        }
        const asApp = target.replace(/\.app$/, "") as AppId;
        if (APP_IDS.includes(asApp)) {
          wm.openApp(asApp);
          out.push(text(`Opening ${asApp}…`, "t-dim"));
          break;
        }
        const segs = resolvePath(cwdRef.current, target);
        const node = segs && getNode(segs);
        if (node && node.type === "file" && node.app) {
          wm.openApp(node.app as AppId);
          out.push(text(`Opening ${target} in ${node.app}…`, "t-dim"));
        } else if (node) {
          out.push(text(`open: no application knows how to open ${target}`, "t-err"));
        } else {
          out.push(text(`open: ${target}: No such file or directory`, "t-err"));
        }
        break;
      }
      case "ls": {
        const all = args.some((a) => a.startsWith("-") && a.includes("a"));
        const long = args.some((a) => a.startsWith("-") && a.includes("l"));
        const pathArg = args.find((a) => !a.startsWith("-"));
        const segs = resolvePath(cwdRef.current, pathArg ?? ".");
        const node = segs && getNode(segs);
        if (!node) {
          out.push(text(`ls: ${pathArg}: No such file or directory`, "t-err"));
          break;
        }
        if (node.type === "file") {
          out.push({ kind: "ls", items: [{ name: pathArg!, cls: "" }], long });
          break;
        }
        const names = listDir(node, all);
        const items: LsItem[] = names.map((n) => {
          const child = node.children[n];
          let cls = "";
          if (child.type === "dir") cls = "t-dir";
          else if (child.type === "file" && child.app) cls = "t-exec";
          if (n.startsWith(".")) cls = "t-dim";
          return { name: child.type === "dir" ? n + "/" : n, cls };
        });
        out.push({ kind: "ls", items, long });
        break;
      }
      case "cd": {
        const target = args[0] ?? "~";
        const segs = resolvePath(cwdRef.current, target);
        const node = segs && getNode(segs);
        if (!segs || !node) {
          out.push(text(`cd: no such file or directory: ${target}`, "t-err"));
        } else if (!isDir(node)) {
          out.push(text(`cd: not a directory: ${target}`, "t-err"));
        } else {
          setCwd(segs);
        }
        break;
      }
      case "pwd": {
        out.push(text(`/Users/${profile.username}${cwd.length ? "/" + cwd.join("/") : ""}`));
        break;
      }
      case "cat": {
        if (!args.length) {
          out.push(text("usage: cat <file>", "t-err"));
          break;
        }
        for (const a of args) {
          const segs = resolvePath(cwdRef.current, a);
          const node = segs && getNode(segs);
          if (!node) out.push(text(`cat: ${a}: No such file or directory`, "t-err"));
          else if (node.type === "dir") out.push(text(`cat: ${a}: Is a directory`, "t-err"));
          else out.push(text(node.content.replace(/\n$/, "")));
        }
        break;
      }
      case "tree": {
        const segs = resolvePath(cwdRef.current, args[0] ?? ".");
        const node = segs && getNode(segs);
        if (!node || node.type !== "dir") {
          out.push(text(`tree: ${args[0] ?? "."}: Not a directory`, "t-err"));
          break;
        }
        out.push(text(pathDisplay(segs!), "t-dir"));
        out.push(text(treeString(node, "")));
        break;
      }
      case "echo": {
        out.push(text(args.join(" ").replace(/^["']|["']$/g, "")));
        break;
      }
      case "whoami": {
        out.push(text(profile.username));
        break;
      }
      case "date": {
        out.push(text(new Date().toString()));
        break;
      }
      case "neofetch": {
        out.push({ kind: "neofetch", startTime: startTime.current });
        break;
      }
      case "history": {
        cmdHistory.forEach((c, i) => out.push(text(`  ${String(i + 1).padStart(3)}  ${c}`)));
        if (!cmdHistory.length) out.push(text("(no history yet)", "t-dim"));
        break;
      }
      case "man": {
        const m = COMMANDS.find((c) => c.name === args[0]);
        if (!m) {
          out.push(text(`No manual entry for ${args[0] ?? ""}`, "t-err"));
          break;
        }
        out.push(text(`NAME`, "t-accent"));
        out.push(text(`  ${m.name} — ${m.summary}`));
        out.push(text(""));
        out.push(text(`USAGE`, "t-accent"));
        out.push(text(`  ${m.usage}`));
        break;
      }
      case "clear": {
        setLines([]);
        return;
      }
      case "exit": {
        wm.close(windowId);
        return;
      }
      // ── easter eggs ───────────────────────────────────────────────────────────
      case "sudo": {
        out.push(text("🔒 We trust you have received the usual lecture…", "t-dim"));
        out.push(text(`${profile.username} is not in the sudoers file. This incident will be reported.`, "t-err"));
        break;
      }
      case "vim":
      case "nano":
      case "emacs": {
        out.push(text(`Launching ${name}… just kidding. Use \`cat <file>\` instead. 😄`, "t-dim"));
        break;
      }
      case "coffee": {
        out.push(text("      ( (\n       ) )\n    ........\n    |      |]\n    \\      /\n     \\____/\n  ☕ brewing…", "t-accent"));
        break;
      }
      case "make": {
        out.push(text("make: *** No targets specified and no makefile found.  Stop.", "t-err"));
        break;
      }
      default: {
        out.push(text(`zsh: command not found: ${name}`, "t-err"));
        const guess = COMMAND_NAMES.find((c) => c.startsWith(name[0]));
        if (guess) out.push(text(`Did you mean \`${guess}\`? Try \`help\`.`, "t-dim"));
      }
    }

    push(out);
  }

  // ── Tab completion ──────────────────────────────────────────────────────────
  function complete() {
    const value = input;
    const lastSpace = value.lastIndexOf(" ");
    const completingCmd = lastSpace === -1;

    if (completingCmd) {
      const cands = COMMAND_NAMES.filter((c) => c.startsWith(value));
      applyCandidates(value, "", cands, cands.map((c) => ({ name: c, dir: false })), "");
      return;
    }

    const prefix = value.slice(0, lastSpace + 1);
    const token = value.slice(lastSpace + 1);
    const cmdName = value.split(/\s+/)[0];

    const slash = token.lastIndexOf("/");
    const dirPart = slash === -1 ? "" : token.slice(0, slash + 1);
    const basePart = slash === -1 ? token : token.slice(slash + 1);

    const segs = resolvePath(cwdRef.current, dirPart || ".");
    const node = segs && getNode(segs);
    const entries: { name: string; dir: boolean }[] = [];

    if (cmdName === "open" && dirPart === "") {
      APP_IDS.forEach((id) => entries.push({ name: id, dir: false }));
    }
    if (node && node.type === "dir") {
      listDir(node, basePart.startsWith(".")).forEach((n) => {
        const child = (node as FSDir).children[n];
        const isd = child.type === "dir";
        if (cmdName === "cd" && !isd) return;
        entries.push({ name: n, dir: isd });
      });
    }

    const matches = entries.filter((e) => e.name.startsWith(basePart));
    applyCandidates(token, prefix, matches.map((m) => m.name), matches, dirPart);
  }

  function applyCandidates(
    token: string,
    prefix: string,
    rawNames: string[],
    rich: { name: string; dir: boolean }[],
    dirPart: string
  ) {
    if (rawNames.length === 0) return;
    if (rawNames.length === 1) {
      const only = rich[0];
      const suffix = only.dir ? "/" : " ";
      setInput(prefix + dirPart + only.name + suffix);
      return;
    }
    const common = longestCommonPrefix(rawNames);
    const base = token.slice(dirPart.length);
    if (common.length > base.length) {
      setInput(prefix + dirPart + common);
    }
    // list the options, like a double-tab
    push([
      { kind: "prompt", path: pathDisplay(cwd), cmd: input },
      {
        kind: "ls",
        items: rich.map((r) => ({ name: r.dir ? r.name + "/" : r.name, cls: r.dir ? "t-dir" : "" })),
        long: false,
      },
    ]);
  }

  // ── Keyboard ────────────────────────────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setCmdHistory((h) => [...h, input.trim()]);
      setInput("");
      setHistIdx(null);
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const idx = histIdx === null ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(cmdHistory[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= cmdHistory.length) {
        setHistIdx(null);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(cmdHistory[idx]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      push([{ kind: "prompt", path: pathDisplay(cwd), cmd: input + "^C" }]);
      setInput("");
    }
  };

  const focusInput = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  };

  const promptPath = useMemo(() => pathDisplay(cwd), [cwd]);

  return (
    <div className="terminal" onMouseDown={focusInput}>
      <div className="terminal-scroll" ref={scrollRef}>
        {lines.map((l) => (
          <LineView key={l.id} entry={l} />
        ))}
        <div className="terminal-input-line">
          <Prompt path={promptPath} />
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  );
}

function Prompt({ path }: { path: string }) {
  return (
    <span className="term-prompt">
      <span className="t-user">{profile.username}</span>
      <span className="t-at">@</span>
      <span className="t-host">{profile.hostname}</span>{" "}
      <span className="t-path">{path}</span>{" "}
      <span className="t-pct">%</span>{" "}
    </span>
  );
}

function LineView({ entry }: { entry: Entry }) {
  switch (entry.kind) {
    case "prompt":
      return (
        <div className="term-line">
          <Prompt path={entry.path} />
          <span className="t-cmd">{entry.cmd}</span>
        </div>
      );
    case "text":
      return <div className={`term-line ${entry.cls ?? ""}`}>{entry.text}</div>;
    case "ls":
      return (
        <div className={`term-ls ${entry.long ? "long" : ""}`}>
          {entry.items.map((it, i) => (
            <span key={i} className={it.cls}>{it.name}</span>
          ))}
        </div>
      );
    case "neofetch":
      return <Neofetch startTime={entry.startTime} />;
  }
}

// ── helpers ───────────────────────────────────────────────────────────────────
function longestCommonPrefix(arr: string[]): string {
  if (!arr.length) return "";
  let p = arr[0];
  for (const s of arr) {
    while (!s.startsWith(p)) p = p.slice(0, -1);
    if (!p) break;
  }
  return p;
}

function wrap(s: string, width = 76): string {
  const words = s.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > width) {
      lines.push(cur.trim());
      cur = w;
    } else cur += " " + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines.join("\n");
}

function treeString(dir: FSDir, prefix: string): string {
  const names = Object.keys(dir.children).filter((n) => !n.startsWith("."));
  return names
    .map((n, i) => {
      const last = i === names.length - 1;
      const child = dir.children[n];
      const branch = last ? "└── " : "├── ";
      const label = child.type === "dir" ? n + "/" : n;
      let line = prefix + branch + label;
      if (child.type === "dir") {
        const sub = treeString(child, prefix + (last ? "    " : "│   "));
        if (sub) line += "\n" + sub;
      }
      return line;
    })
    .join("\n");
}

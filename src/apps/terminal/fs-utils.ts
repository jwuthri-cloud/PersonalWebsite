import { fileSystem, type FSDir, type FSNode } from "../../data/filesystem";

/** Resolve a path string against a cwd (array of segments below home). */
export function resolvePath(cwd: string[], input: string): string[] | null {
  let segs: string[];
  const trimmed = input.trim();

  if (trimmed.startsWith("~")) {
    segs = [];
    input = trimmed.slice(1);
  } else if (trimmed.startsWith("/")) {
    // Only the home subtree is browsable; map /Users/<user>/... onto it.
    const home = "/Users/";
    if (trimmed.startsWith(home)) {
      const rest = trimmed.slice(home.length).split("/").slice(1).join("/");
      segs = [];
      input = rest;
    } else {
      return null;
    }
  } else {
    segs = [...cwd];
  }

  for (const part of input.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (segs.length === 0) continue; // can't go above home
      segs.pop();
    } else {
      segs.push(part);
    }
  }
  return segs;
}

/** Walk the filesystem to the node at the given segments (from home root). */
export function getNode(segs: string[]): FSNode | null {
  let node: FSNode = fileSystem;
  for (const s of segs) {
    if (node.type !== "dir") return null;
    const next: FSNode | undefined = node.children[s];
    if (!next) return null;
    node = next;
  }
  return node;
}

export function isDir(node: FSNode | null): node is FSDir {
  return !!node && node.type === "dir";
}

export function pathDisplay(cwd: string[]): string {
  return cwd.length ? "~/" + cwd.join("/") : "~";
}

export function listDir(node: FSDir, all: boolean): string[] {
  return Object.keys(node.children)
    .filter((n) => all || !n.startsWith("."))
    .sort((a, b) => a.localeCompare(b));
}

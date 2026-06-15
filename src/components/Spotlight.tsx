import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { apps, useWM } from "../os/WindowManager";
import { AppIcon } from "./AppIcon";
import { socials } from "../data/profile";
import type { AppId } from "../os/types";

type Result =
  | { kind: "app"; id: AppId; title: string; icon: string; sub: string }
  | { kind: "link"; title: string; icon: string; sub: string; url: string };

export function Spotlight({ onClose }: { onClose: () => void }) {
  const wm = useWM();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo<Result[]>(() => {
    const all: Result[] = [
      ...apps.map((a) => ({
        kind: "app" as const,
        id: a.id,
        title: a.title,
        icon: a.icon,
        sub: "Application",
      })),
      ...socials.map((s) => ({
        kind: "link" as const,
        title: s.label,
        icon: s.icon,
        sub: s.url,
        url: s.url,
      })),
    ];
    if (!q.trim()) return all;
    const needle = q.toLowerCase();
    return all.filter((r) => r.title.toLowerCase().includes(needle) || r.sub.toLowerCase().includes(needle));
  }, [q]);

  useEffect(() => setSel(0), [q]);

  const activate = (r?: Result) => {
    const target = r ?? results[sel];
    if (!target) return;
    if (target.kind === "app") wm.openApp(target.id);
    else window.open(target.url, "_blank", "noopener");
    onClose();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      activate();
    }
  };

  return (
    <div className="spotlight-overlay" onMouseDown={onClose}>
      <motion.div
        className="spotlight"
        onMouseDown={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        <div className="spotlight-input-row">
          <svg viewBox="0 0 16 16" width="20" height="20" className="spotlight-glass">
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            placeholder="Spotlight Search"
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
          />
        </div>
        {results.length > 0 && (
          <div className="spotlight-results">
            {results.map((r, i) => (
              <button
                key={`${r.kind}-${r.title}`}
                className={`spotlight-result ${i === sel ? "sel" : ""}`}
                onMouseEnter={() => setSel(i)}
                onClick={() => activate(r)}
              >
                <AppIcon icon={r.icon} size={26} />
                <span className="sr-title">{r.title}</span>
                <span className="sr-sub">{r.sub}</span>
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

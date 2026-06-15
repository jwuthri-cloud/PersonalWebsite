import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWM } from "../os/WindowManager";
import { getApp } from "../os/apps";
import type { WindowState } from "../os/types";

const MENUBAR_H = 28;

type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export function Window({ win }: { win: WindowState }) {
  const wm = useWM();
  const def = getApp(win.appId);
  const Body = def.component;
  const isActive = wm.activeId === win.id;
  const dragState = useRef<{ dx: number; dy: number } | null>(null);

  // ── Dragging via the title bar ──────────────────────────────────────────────
  const onTitlePointerDown = (e: React.PointerEvent) => {
    if (win.maximized) return;
    if ((e.target as HTMLElement).closest(".traffic-lights")) return;
    wm.focus(win.id);
    dragState.current = { dx: e.clientX - win.position.x, dy: e.clientY - win.position.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onTitlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    const x = e.clientX - dragState.current.dx;
    const y = Math.max(MENUBAR_H, e.clientY - dragState.current.dy);
    const clampedX = Math.min(Math.max(x, -win.size.width + 120), window.innerWidth - 120);
    wm.move(win.id, { x: clampedX, y });
  };
  const onTitlePointerUp = (e: React.PointerEvent) => {
    dragState.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // ── Resizing ────────────────────────────────────────────────────────────────
  const resizeRef = useRef<{
    dir: ResizeDir;
    startX: number;
    startY: number;
    sx: number;
    sy: number;
    sw: number;
    sh: number;
  } | null>(null);

  const startResize = (dir: ResizeDir) => (e: React.PointerEvent) => {
    e.stopPropagation();
    if (win.maximized) return;
    wm.focus(win.id);
    resizeRef.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      sx: win.position.x,
      sy: win.position.y,
      sw: win.size.width,
      sh: win.size.height,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onResizeMove = (e: React.PointerEvent) => {
    const r = resizeRef.current;
    if (!r) return;
    const dx = e.clientX - r.startX;
    const dy = e.clientY - r.startY;
    let { sw: w, sh: h, sx: x, sy: y } = r;
    const min = def.minSize;

    if (r.dir.includes("e")) w = r.sw + dx;
    if (r.dir.includes("s")) h = r.sh + dy;
    if (r.dir.includes("w")) {
      w = r.sw - dx;
      x = r.sx + dx;
    }
    if (r.dir.includes("n")) {
      h = r.sh - dy;
      y = r.sy + dy;
    }
    if (w < min.width) {
      if (r.dir.includes("w")) x = r.sx + (r.sw - min.width);
      w = min.width;
    }
    if (h < min.height) {
      if (r.dir.includes("n")) y = r.sy + (r.sh - min.height);
      h = min.height;
    }
    y = Math.max(MENUBAR_H, y);
    wm.resize(win.id, { width: w, height: h }, { x, y });
  };
  const onResizeUp = (e: React.PointerEvent) => {
    resizeRef.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handles: ResizeDir[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

  return (
    <motion.div
      className={`window ${isActive ? "active" : ""} ${def.bare ? "bare" : ""}`}
      style={{
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.z,
      }}
      initial={win.justOpened ? { opacity: 0, scale: 0.92, y: 8 } : false}
      animate={{
        opacity: win.minimized ? 0 : 1,
        scale: win.minimized ? 0.3 : 1,
        y: win.minimized ? window.innerHeight * 0.5 : 0,
        pointerEvents: win.minimized ? "none" : "auto",
      }}
      transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.7 }}
      onMouseDown={() => wm.focus(win.id)}
    >
      {/* Title bar */}
      <div
        className="titlebar"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onDoubleClick={() => wm.toggleMaximize(win.id)}
      >
        <div className="traffic-lights">
          <button
            className="tl tl-close"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              wm.close(win.id);
            }}
          >
            <svg viewBox="0 0 10 10"><path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="#7a0a0a" strokeWidth="1.1" strokeLinecap="round" /></svg>
          </button>
          <button
            className="tl tl-min"
            aria-label="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              wm.minimize(win.id);
            }}
          >
            <svg viewBox="0 0 10 10"><path d="M2 5h6" stroke="#7a5200" strokeWidth="1.1" strokeLinecap="round" /></svg>
          </button>
          <button
            className="tl tl-zoom"
            aria-label="Zoom"
            onClick={(e) => {
              e.stopPropagation();
              wm.toggleMaximize(win.id);
            }}
          >
            <svg viewBox="0 0 10 10"><path d="M3 3h4v4z M7 7H3V3z" fill="#0a5a0a" /></svg>
          </button>
        </div>
        <div className="titlebar-title">{win.title}</div>
        <div className="titlebar-spacer" />
      </div>

      {/* Content */}
      <div className="window-body">
        <Body windowId={win.id} />
      </div>

      {/* Resize handles */}
      {!win.maximized &&
        handles.map((dir) => (
          <div
            key={dir}
            className={`resize-handle rh-${dir}`}
            onPointerDown={startResize(dir)}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
        ))}
    </motion.div>
  );
}

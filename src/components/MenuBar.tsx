import { useEffect, useRef, useState } from "react";
import { useWM } from "../os/WindowManager";
import { getApp } from "../os/apps";
import { profile } from "../data/profile";
import { AppleLogo } from "./AppleLogo";

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 20);
    return () => clearInterval(t);
  }, []);
  return now;
}

const Battery = () => (
  <svg viewBox="0 0 28 13" width="25" height="12" aria-hidden>
    <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.4" />
    <rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor" />
    <rect x="24.5" y="4" width="2" height="5" rx="1" fill="currentColor" fillOpacity="0.5" />
  </svg>
);

const Wifi = () => (
  <svg viewBox="0 0 18 13" width="17" height="12" aria-hidden>
    <path fill="currentColor" d="M9 11.2l2.3-2.9c-1.3-1-3.3-1-4.6 0L9 11.2z" />
    <path fill="currentColor" opacity="0.85" d="M9 5.3c2 0 3.9.7 5.3 2l1.4-1.8C13.9 2.8 11.5 1.9 9 1.9S4.1 2.8 2.3 5.5L3.7 7.3C5.1 6 7 5.3 9 5.3z" />
    <path fill="currentColor" d="M9 8c1.1 0 2.2.4 3 1.2l-3 3.8L6 9.2C6.8 8.4 7.9 8 9 8z" opacity="0.6" />
  </svg>
);

const Control = () => (
  <svg viewBox="0 0 22 14" width="20" height="13" aria-hidden>
    <rect x="0.5" y="0.5" width="9" height="13" rx="4.5" fill="none" stroke="currentColor" strokeOpacity="0.5" />
    <circle cx="5" cy="4" r="2.2" fill="currentColor" />
    <rect x="12.5" y="0.5" width="9" height="13" rx="4.5" fill="none" stroke="currentColor" strokeOpacity="0.5" />
    <circle cx="17" cy="10" r="2.2" fill="currentColor" />
  </svg>
);

export function MenuBar({ onSpotlight }: { onSpotlight: () => void }) {
  const wm = useWM();
  const now = useClock();
  const [appleOpen, setAppleOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const active = wm.windows.find((w) => w.id === wm.activeId);
  const appName = active ? getApp(active.appId).title : "Finder";

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setAppleOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const date = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const time = now
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    .replace(/\s/, " ");

  const menus = appName === "Finder"
    ? ["File", "Edit", "View", "Go", "Window", "Help"]
    : ["File", "Edit", "View", "Window", "Help"];

  return (
    <div className="menubar" ref={menuRef}>
      <div className="menubar-left">
        <button
          className={`menu-item apple ${appleOpen ? "open" : ""}`}
          onClick={() => setAppleOpen((v) => !v)}
        >
          <AppleLogo size={15} />
        </button>
        {appleOpen && (
          <div className="apple-menu">
            <button onClick={() => { wm.openApp("about"); setAppleOpen(false); }}>About This Mac</button>
            <div className="menu-sep" />
            <button onClick={() => setAppleOpen(false)}>System Settings…</button>
            <button onClick={() => setAppleOpen(false)}>App Store…</button>
            <div className="menu-sep" />
            <button onClick={() => setAppleOpen(false)}>Sleep</button>
            <button onClick={() => location.reload()}>Restart…</button>
            <button onClick={() => setAppleOpen(false)}>Shut Down…</button>
          </div>
        )}
        <button className="menu-item app-name">{appName}</button>
        {menus.map((m) => (
          <button key={m} className="menu-item">{m}</button>
        ))}
      </div>

      <div className="menubar-right">
        <button className="status-item" aria-label="Battery"><Battery /></button>
        <button className="status-item" aria-label="Wi-Fi"><Wifi /></button>
        <button className="status-item" aria-label="Search" onClick={onSpotlight}>
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <button className="status-item" aria-label="Control Center"><Control /></button>
        <button className="status-item clock">
          {day} {date}&nbsp;&nbsp;{time}
        </button>
      </div>
    </div>
  );
}

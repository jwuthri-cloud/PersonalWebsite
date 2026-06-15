import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { apps, useWM } from "../os/WindowManager";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { Window } from "./Window";
import { DesktopIcon } from "./DesktopIcon";
import { Spotlight } from "./Spotlight";

export function Desktop() {
  const wm = useWM();
  const [selected, setSelected] = useState<string | null>(null);
  const [spotlight, setSpotlight] = useState(false);

  const desktopApps = apps.filter((a) => a.onDesktop);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Space → Spotlight
      if ((e.metaKey || e.ctrlKey) && e.code === "Space") {
        e.preventDefault();
        setSpotlight((v) => !v);
      }
      if (e.key === "Escape") setSpotlight(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="desktop" onMouseDown={() => setSelected(null)}>
      <MenuBar onSpotlight={() => setSpotlight((v) => !v)} />

      <div className="desktop-icons">
        {desktopApps.map((a) => (
          <DesktopIcon
            key={a.id}
            appId={a.id}
            icon={a.icon}
            label={a.title}
            selected={selected === a.id}
            onSelect={() => setSelected(a.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {wm.windows.map((w) => (
          <Window key={w.id} win={w} />
        ))}
      </AnimatePresence>

      <Dock />

      <AnimatePresence>
        {spotlight && <Spotlight onClose={() => setSpotlight(false)} />}
      </AnimatePresence>
    </div>
  );
}

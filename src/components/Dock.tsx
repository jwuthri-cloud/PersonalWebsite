import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { apps, useWM } from "../os/WindowManager";
import { AppIcon } from "./AppIcon";
import { socials } from "../data/profile";
import type { AppId } from "../os/types";

const BASE = 52;
const MAX = 84;
const INFLUENCE = 150;

type DockEntry =
  | { kind: "app"; id: AppId; title: string; icon: string }
  | { kind: "link"; id: string; title: string; icon: string; url: string }
  | { kind: "divider" };

function DockItem({
  mouseX,
  children,
  label,
  onClick,
  running,
  bounce,
}: {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  running?: boolean;
  bounce?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return INFLUENCE + 1;
    return x - (rect.left + rect.width / 2);
  });

  const sizeT = useTransform(distance, [-INFLUENCE, 0, INFLUENCE], [BASE, MAX, BASE]);
  const size = useSpring(sizeT, { stiffness: 350, damping: 22, mass: 0.5 });

  return (
    <div className="dock-cell">
      <motion.button
        ref={ref}
        className="dock-item"
        style={{ width: size, height: size }}
        onClick={onClick}
        whileTap={{ scale: 0.86 }}
        animate={bounce ? { y: [0, -22, 0, -10, 0] } : { y: 0 }}
        transition={bounce ? { duration: 0.7, ease: "easeOut" } : {}}
      >
        <span className="dock-tooltip">{label}</span>
        {children}
      </motion.button>
      <span className={`dock-dot ${running ? "on" : ""}`} />
    </div>
  );
}

export function Dock() {
  const wm = useWM();
  const mouseX = useMotionValue(Infinity);

  const entries: DockEntry[] = [
    ...apps
      .filter((a) => a.inDock)
      .map((a) => ({ kind: "app" as const, id: a.id, title: a.title, icon: a.icon })),
    { kind: "divider" },
    ...socials.map((s) => ({
      kind: "link" as const,
      id: s.id,
      title: s.label,
      icon: s.icon,
      url: s.url,
    })),
  ];

  return (
    <div className="dock-wrap">
      <motion.div
        className="dock"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {entries.map((entry, i) => {
          if (entry.kind === "divider") {
            return <div className="dock-divider" key={`div-${i}`} />;
          }
          if (entry.kind === "app") {
            return (
              <DockItem
                key={entry.id}
                mouseX={mouseX}
                label={entry.title}
                running={wm.openApps.has(entry.id)}
                onClick={() => wm.toggleAppFromDock(entry.id)}
              >
                <AppIcon icon={entry.icon} size={MAX} />
              </DockItem>
            );
          }
          return (
            <DockItem
              key={entry.id}
              mouseX={mouseX}
              label={entry.title}
              onClick={() => window.open(entry.url, "_blank", "noopener")}
            >
              <AppIcon icon={entry.icon} size={MAX} />
            </DockItem>
          );
        })}
      </motion.div>
    </div>
  );
}

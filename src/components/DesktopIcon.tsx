import { useState } from "react";
import { AppIcon } from "./AppIcon";
import { useWM } from "../os/WindowManager";
import type { AppId } from "../os/types";

export function DesktopIcon({
  appId,
  icon,
  label,
  selected,
  onSelect,
}: {
  appId: AppId;
  icon: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const wm = useWM();
  const [hint, setHint] = useState(false);

  return (
    <button
      className={`desktop-icon ${selected ? "selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={() => wm.openApp(appId)}
      onMouseEnter={() => setHint(true)}
      onMouseLeave={() => setHint(false)}
      title={`Open ${label}`}
    >
      <span className="desktop-icon-img">
        <AppIcon icon={icon} size={52} />
      </span>
      <span className="desktop-icon-label">{label}</span>
      {hint && <span className="desktop-icon-hint">double-click to open</span>}
    </button>
  );
}

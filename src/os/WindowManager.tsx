import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { apps, getApp } from "./apps";
import type { AppId, Position, Size, WindowState } from "./types";

type WindowManager = {
  windows: WindowState[];
  openApps: Set<AppId>;
  activeId: string | null;
  openApp: (appId: AppId) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  toggleAppFromDock: (appId: AppId) => void;
  move: (id: string, position: Position) => void;
  resize: (id: string, size: Size, position?: Position) => void;
};

const Ctx = createContext<WindowManager | null>(null);

const MENUBAR_H = 28;

/** Shrink a window's default size so it always fits the current viewport. */
function fitSize(size: Size): Size {
  const maxW = Math.max(320, window.innerWidth - 32);
  const maxH = Math.max(240, window.innerHeight - MENUBAR_H - 96);
  return { width: Math.min(size.width, maxW), height: Math.min(size.height, maxH) };
}

function centeredCascade(size: Size, index: number): Position {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const baseX = Math.max(24, (vw - size.width) / 2);
  const baseY = Math.max(MENUBAR_H + 24, (vh - size.height) / 2 - 30);
  const off = (index % 6) * 28;
  return { x: baseX + off, y: baseY + off };
}

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zCounter = useRef(10);
  const openCount = useRef(0);

  const focus = useCallback((id: string) => {
    setWindows((ws) => {
      const top = ++zCounter.current;
      return ws.map((w) => (w.id === id ? { ...w, z: top, minimized: false } : w));
    });
  }, []);

  const openApp = useCallback((appId: AppId) => {
    setWindows((ws) => {
      // single-instance: focus existing window if open
      const existing = ws.find((w) => w.appId === appId);
      if (existing) {
        const top = ++zCounter.current;
        return ws.map((w) =>
          w.id === existing.id ? { ...w, z: top, minimized: false } : w
        );
      }
      const def = getApp(appId);
      const size = fitSize(def.defaultSize);
      const id = `${appId}-${Date.now()}`;
      const win: WindowState = {
        id,
        appId,
        title: def.title,
        size,
        position: centeredCascade(size, openCount.current++),
        z: ++zCounter.current,
        minimized: false,
        maximized: false,
        justOpened: true,
      };
      return [...ws, win];
    });
  }, []);

  const close = useCallback((id: string) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const minimize = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.prev) {
          return { ...w, maximized: false, position: w.prev.position, size: w.prev.size, prev: undefined };
        }
        const margin = 0;
        return {
          ...w,
          maximized: true,
          prev: { position: w.position, size: w.size },
          position: { x: margin, y: MENUBAR_H },
          size: { width: window.innerWidth - margin * 2, height: window.innerHeight - MENUBAR_H - 8 },
        };
      })
    );
  }, []);

  const toggleAppFromDock = useCallback(
    (appId: AppId) => {
      setWindows((ws) => {
        const existing = ws.find((w) => w.appId === appId);
        if (!existing) {
          // open fresh
          const def = getApp(appId);
          const size = fitSize(def.defaultSize);
          const id = `${appId}-${Date.now()}`;
          return [
            ...ws,
            {
              id,
              appId,
              title: def.title,
              size,
              position: centeredCascade(size, openCount.current++),
              z: ++zCounter.current,
              minimized: false,
              maximized: false,
              justOpened: true,
            },
          ];
        }
        // toggle minimize / focus
        if (existing.minimized) {
          const top = ++zCounter.current;
          return ws.map((w) => (w.id === existing.id ? { ...w, minimized: false, z: top } : w));
        }
        // if it's the top window, minimize it; otherwise focus it
        const topZ = Math.max(...ws.map((w) => w.z));
        if (existing.z === topZ) {
          return ws.map((w) => (w.id === existing.id ? { ...w, minimized: true } : w));
        }
        const top = ++zCounter.current;
        return ws.map((w) => (w.id === existing.id ? { ...w, z: top } : w));
      });
    },
    []
  );

  const move = useCallback((id: string, position: Position) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, position } : w)));
  }, []);

  const resize = useCallback((id: string, size: Size, position?: Position) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, size, position: position ?? w.position } : w))
    );
  }, []);

  const openAppsSet = useMemo(() => new Set(windows.map((w) => w.appId)), [windows]);
  const activeId = useMemo(() => {
    const visible = windows.filter((w) => !w.minimized);
    if (!visible.length) return null;
    return visible.reduce((a, b) => (a.z > b.z ? a : b)).id;
  }, [windows]);

  const value: WindowManager = {
    windows,
    openApps: openAppsSet,
    activeId,
    openApp,
    close,
    focus,
    minimize,
    toggleMaximize,
    toggleAppFromDock,
    move,
    resize,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWM() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWM must be used within WindowManagerProvider");
  return ctx;
}

export { apps };

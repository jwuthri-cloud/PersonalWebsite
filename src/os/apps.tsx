import type { AppDefinition, AppId } from "./types";
import { About } from "../apps/About";
import { Projects } from "../apps/Projects";
import { Resume } from "../apps/Resume";
import { Contact } from "../apps/Contact";
import { Terminal } from "../apps/Terminal";

export const apps: AppDefinition[] = [
  {
    id: "about",
    title: "About Me",
    icon: "about",
    component: About,
    defaultSize: { width: 720, height: 520 },
    minSize: { width: 420, height: 360 },
    onDesktop: true,
    inDock: true,
  },
  {
    id: "projects",
    title: "Projects",
    icon: "projects",
    component: Projects,
    defaultSize: { width: 880, height: 600 },
    minSize: { width: 520, height: 420 },
    onDesktop: true,
    inDock: true,
  },
  {
    id: "resume",
    title: "Résumé",
    icon: "resume",
    component: Resume,
    defaultSize: { width: 760, height: 640 },
    minSize: { width: 480, height: 420 },
    onDesktop: true,
    inDock: true,
  },
  {
    id: "contact",
    title: "Contact",
    icon: "contact",
    component: Contact,
    defaultSize: { width: 560, height: 560 },
    minSize: { width: 420, height: 460 },
    onDesktop: true,
    inDock: true,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "terminal",
    component: Terminal,
    defaultSize: { width: 720, height: 460 },
    minSize: { width: 440, height: 280 },
    onDesktop: true,
    inDock: true,
    bare: true,
  },
];

const byId = new Map<AppId, AppDefinition>(apps.map((a) => [a.id, a]));

export function getApp(id: AppId): AppDefinition {
  const a = byId.get(id);
  if (!a) throw new Error(`Unknown app: ${id}`);
  return a;
}

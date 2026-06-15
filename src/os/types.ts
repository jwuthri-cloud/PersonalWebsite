import type { ComponentType } from "react";

export type AppId =
  | "about"
  | "projects"
  | "resume"
  | "contact"
  | "terminal";

export type Size = { width: number; height: number };
export type Position = { x: number; y: number };

export type AppDefinition = {
  id: AppId;
  title: string;
  /** Dock + desktop icon. Either an emoji or a key handled by <AppIcon/>. */
  icon: string;
  /** The window body. */
  component: ComponentType<{ windowId: string }>;
  defaultSize: Size;
  minSize: Size;
  /** Show on the desktop as an icon. */
  onDesktop?: boolean;
  /** Show in the dock. */
  inDock?: boolean;
  /** Render the body edge-to-edge (no padding, dark chrome) — used by Terminal. */
  bare?: boolean;
};

export type WindowState = {
  id: string;
  appId: AppId;
  title: string;
  position: Position;
  size: Size;
  z: number;
  minimized: boolean;
  maximized: boolean;
  /** Pre-maximize rect, so we can restore. */
  prev?: { position: Position; size: Size };
  /** mount-time flag to drive the open animation */
  justOpened?: boolean;
};

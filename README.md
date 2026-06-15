# julienOS — a macOS desktop as a personal website

A personal portfolio built as a fully interactive **macOS desktop environment** in the
browser. Inspired by the windowed PostHog homepage, rebuilt with Mac aesthetics:
a translucent menu bar, draggable/resizable windows with traffic-light controls, a
magnifying dock, Spotlight search, and a **real terminal** with a virtual filesystem
and tab-completion.

> Everything is mock data for now and lives in a few easy-to-edit files. Swap in your
> own details and it's yours.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
```

## What's inside

| Feature | Notes |
|---|---|
| **Boot screen** | Apple logo + progress bar on load |
| **Menu bar** | Apple menu (About This Mac, Restart…), active-app name, live clock, status icons |
| **Desktop icons** | Double-click to open each app |
| **Windows** | Drag by the title bar, resize from any edge/corner, minimize / zoom / close, focus z-ordering, double-click title bar to maximize |
| **Dock** | Fluid magnification on hover, running-app indicators, launch bounce, app + social links |
| **Spotlight** | `⌘/Ctrl + Space` (or the menu-bar 🔍) to search and launch |
| **Terminal** | zsh-style prompt, virtual filesystem, ~20 commands, **Tab** completion, `↑/↓` history |

### Terminal commands

`help`, `about`, `projects`, `resume`, `contact`, `social`, `open <app|file>`, `ls [-la]`,
`cd`, `pwd`, `cat`, `tree`, `echo`, `whoami`, `date`, `neofetch`, `history`, `man`, `clear`,
`exit` — plus a few easter eggs (`sudo`, `coffee`, `vim`, …). Press **Tab** to autocomplete
commands and file paths; `open projects` (etc.) launches the GUI apps.

## Make it yours — edit these files

All content is data-driven. You usually never touch a component:

- [`src/data/profile.ts`](src/data/profile.ts) — name, role, bio, location, email, social links
- [`src/data/projects.ts`](src/data/projects.ts) — your projects (title, blurb, tags, accent colors)
- [`src/data/resume.ts`](src/data/resume.ts) — summary, experience, education, skills

The terminal's filesystem ([`src/data/filesystem.ts`](src/data/filesystem.ts)) is generated
from the same data, so the CLI and the GUI apps always stay in sync.

### Add a new app/window

1. Create a component in `src/apps/` taking `{ windowId }`.
2. Register it in [`src/os/apps.tsx`](src/os/apps.tsx) (id, title, icon, default size).
3. Add an icon glyph in [`src/components/AppIcon.tsx`](src/components/AppIcon.tsx).

## Tech

Vite · React 18 · TypeScript · Framer Motion · hand-written CSS (no UI framework — the OS
chrome is all bespoke). No backend; the contact form is a mock (wire it to an endpoint or
`mailto:` when ready).

## Architecture

```
src/
  os/              window manager (context + reducer), app registry, types
  components/      Desktop, MenuBar, Dock, Window, DesktopIcon, Spotlight, BootScreen, AppIcon
  apps/            About, Projects, Resume, Contact, Terminal (+ terminal/ internals)
  data/            profile, projects, resume, filesystem  ← edit these
  index.css        the entire macOS look & feel
```

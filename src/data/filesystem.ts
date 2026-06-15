// ─────────────────────────────────────────────────────────────────────────────
// Virtual filesystem for the Terminal app. Powers `ls`, `cd`, `cat`, `tree`.
// Content is generated from the same data the GUI apps use, so they stay in sync.
// ─────────────────────────────────────────────────────────────────────────────

import { profile, socials } from "./profile";
import { projects } from "./projects";
import { resume } from "./resume";

export type FSFile = {
  type: "file";
  content: string;
  app?: string; // associated GUI app, so `open file` can launch it
};

export type FSDir = {
  type: "dir";
  children: Record<string, FSNode>;
};

export type FSNode = FSFile | FSDir;

const line = (n = 60) => "─".repeat(n);

const aboutMd = `# About ${profile.name}

${profile.role} · ${profile.location}

${profile.about.join("\n\n")}

## Quick facts
${profile.facts.map((f) => `- ${f.label}: ${f.value}`).join("\n")}
`;

const resumeTxt = `${profile.name.toUpperCase()}
${profile.role} — ${profile.email}
${line()}

SUMMARY
${resume.summary}

EXPERIENCE
${resume.experience
  .map(
    (e) =>
      `${e.role} — ${e.company}  (${e.period})\n  ${e.bullets
        .map((b) => "• " + b)
        .join("\n  ")}`
  )
  .join("\n\n")}

EDUCATION
${resume.education.map((e) => `${e.degree} — ${e.school} (${e.period})`).join("\n")}

SKILLS
${Object.entries(resume.skills)
  .map(([k, v]) => `${k}: ${v.join(", ")}`)
  .join("\n")}
`;

const projectFile = (id: string) => {
  const p = projects.find((x) => x.id === id)!;
  return `# ${p.name}  ${p.emoji}
${p.blurb}
${line()}
Status: ${p.status}   Year: ${p.year}
Tech: ${p.tags.join(", ")}
${p.repo ? `Repo: ${p.repo}` : ""}

${p.description}
`;
};

const contactMd = `# Get in touch

Email: ${profile.email}

${socials.map((s) => `${s.label.padEnd(12)} ${s.handle.padEnd(20)} ${s.url}`).join("\n")}

Always happy to chat about engineering, side-projects, or coffee.
`;

const readme = `Welcome to ${profile.name}'s machine 👋

This is a fully interactive macOS-style portfolio. You're in the Terminal right now.

Try these:
  about            — who I am
  projects         — what I've built
  resume           — my work history
  open projects    — launch the Projects app
  neofetch         — system info
  help             — list every command

Tip: press TAB to autocomplete commands and filenames,
and use ↑ / ↓ to walk through your history.
`;

export const fileSystem: FSDir = {
  type: "dir",
  children: {
    "README.md": { type: "file", content: readme },
    "about.md": { type: "file", content: aboutMd, app: "about" },
    "resume.pdf": { type: "file", content: resumeTxt, app: "resume" },
    "contact.md": { type: "file", content: contactMd, app: "contact" },
    projects: {
      type: "dir",
      children: projects.reduce<Record<string, FSNode>>((acc, p) => {
        acc[`${p.id}.md`] = {
          type: "file",
          content: projectFile(p.id),
          app: "projects",
        };
        return acc;
      }, {}),
    },
    ".config": {
      type: "dir",
      children: {
        "theme.conf": {
          type: "file",
          content: "appearance = auto\naccent = multicolor\ndock.magnify = true\n",
        },
      },
    },
  },
};

// The home directory is the root the terminal starts in (~ === /Users/<user>)
export const HOME = `/Users/${profile.username}`;

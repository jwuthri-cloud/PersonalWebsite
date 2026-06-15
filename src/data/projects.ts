// ─────────────────────────────────────────────────────────────────────────────
// Projects. Shown in the Projects app + `projects` terminal command.
// ─────────────────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  name: string;
  blurb: string;
  description: string;
  highlights: string[];
  tags: string[];
  year: string;
  platform: string;
  status: "Live" | "Archived" | "WIP";
  accent: string; // gradient start color
  accent2: string; // gradient end color
  emoji: string;
  url?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "turnwise",
    name: "TurnWise",
    blurb: "A platform for evaluating multi-turn LLM & agent conversations.",
    description:
      "Most eval tools score a single response. TurnWise evaluates an entire agent conversation as a structured trace — so you can see exactly where a multi-step agent goes wrong, turn by turn.",
    highlights: [
      "Evaluates conversations across a 3-level hierarchy — conversation → message → step — for granular, trace-level analysis.",
      "Agent-specific metrics: tool-selection error, parameter hallucination, self-correction, intent drift and trajectory analysis.",
      "Streaming batch eval pipelines with cost/latency tracking, plus a published Python SDK on PyPI and docs.",
    ],
    tags: ["LLM Evals", "Agents", "Python", "PyPI SDK"],
    year: "2025",
    platform: "Web · Python SDK",
    status: "Live",
    accent: "#5EEAD4",
    accent2: "#0EA5E9",
    emoji: "🎯",
    url: "https://www.turnwise.xyz/",
  },
  {
    id: "scribely",
    name: "Scribely",
    blurb: "An invisible AI meeting assistant for macOS & Chrome.",
    description:
      "A real-time meeting copilot that lives as an overlay — invisible to screen sharing — so you get answers and insight without the room ever seeing it. Runs fully local when you want zero data egress.",
    highlights: [
      "Real-time transcription, AI Q&A and live insight detection (questions, decisions, action items) as a screen-share-invisible overlay.",
      "Pluggable inference: cloud (OpenAI, Deepgram, Rev.ai) or fully local (Ollama, LM Studio, Whisper) for a privacy-first, zero-egress mode.",
      "Chrome extension capturing audio from Meet, Zoom & Teams, with a sub-second local response path vs. multi-second cloud round-trips.",
    ],
    tags: ["macOS", "Chrome", "Realtime AI", "Whisper"],
    year: "2025",
    platform: "macOS · Chrome",
    status: "Live",
    accent: "#A78BFA",
    accent2: "#7C3AED",
    emoji: "🎙️",
    url: "https://www.scribely.xyz/",
  },
  {
    id: "kinetic-fitness",
    name: "Kinetic Fitness",
    blurb: "An iOS app for workout planning & progress tracking.",
    description:
      "A clean, native iOS experience for planning structured workout routines and tracking progress over time — built to be fast, focused, and free of the bloat most fitness apps ship with.",
    highlights: [
      "Structured workout routines with planning and day-to-day tracking.",
      "Progress analytics that turn each session into a trend you can actually read.",
      "Native, distraction-free UI focused on getting in, logging, and getting out.",
    ],
    tags: ["iOS", "Swift", "Health", "Analytics"],
    year: "2024",
    platform: "iOS",
    status: "Live",
    accent: "#FB923C",
    accent2: "#F43F5E",
    emoji: "🏋️",
    url: "https://kinetic-fitness-e2pml74iv-wuthrich-juliens-projects.vercel.app/",
  },
  {
    id: "macos-portfolio",
    name: "Portfolio OS",
    blurb: "This site — a personal portfolio that boots like a Mac.",
    description:
      "The very thing you're looking at: a full desktop environment in the browser, complete with a window manager, a magnifying dock, Spotlight, and a real terminal with tab-completion. A weekend excuse to obsess over micro-interactions.",
    highlights: [
      "Draggable, resizable windows with traffic-light controls and focus z-ordering.",
      "A real terminal with a virtual filesystem, ~20 commands and Tab autocompletion.",
      "Built with React, TypeScript and Framer Motion — no UI framework, all bespoke CSS.",
    ],
    tags: ["React", "TypeScript", "Framer Motion"],
    year: "2026",
    platform: "Web",
    status: "Live",
    accent: "#60A5FA",
    accent2: "#6366F1",
    emoji: "🖥️",
    repo: "https://github.com/Jwuthri",
  },
];

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
  links?: { label: string; url: string }[]; // Product Hunt, write-ups, posts…
};

export const projects: Project[] = [
  {
    id: "tracely",
    name: "Tracely",
    blurb: "Trace-native CI/CD for AI agents.",
    description:
      "Production failures become regression tests. Tracely ingests agent traces over OTLP, clusters the failures into issues, freezes them into hermetic cases, and gates every pull request on the replay.",
    highlights: [
      "Every production run streams in over OTLP, with online LLM-as-judge evaluators grading each trace as it lands.",
      "Failing traces cluster into issues, then get promoted into hermetic cases — recorded input with tool and LLM fixtures bundled.",
      "The CI gate replays promoted cases on every pull request, exits non-zero on failure, and posts the verdict as a commit status.",
    ],
    tags: ["Agents", "CI/CD", "OTLP", "LLM Evals"],
    year: "2026",
    platform: "Web · Python SDK",
    status: "Live",
    accent: "#A3E635",
    accent2: "#10B981",
    emoji: "🚦",
    url: "https://tracely-studio.xyz/",
    links: [
      { label: "Docs", url: "https://doc.tracely-studio.xyz/" },
      { label: "PyPI", url: "https://pypi.org/project/tracely-ai/" },
    ],
  },
  {
    id: "football-analysis",
    name: "Football Analysis",
    blurb: "Pick a season, read every number.",
    description:
      "A football analytics dashboard covering six competitions — World Cup 2026, Premier League, LaLiga, Serie A, Bundesliga and Ligue 1 — from season-level aggregates all the way down to per-match breakdowns.",
    highlights: [
      "Six competitions in one place, from the 2026 World Cup to each of Europe's top five leagues.",
      "Season overviews — matches, goals, winners — that drill straight down into granular per-match statistics.",
      "Launched on Product Hunt and shared on LinkedIn.",
    ],
    tags: ["Analytics", "Sports Data", "Dashboards"],
    year: "2026",
    platform: "Web",
    status: "Live",
    accent: "#FBBF24",
    accent2: "#DB2777",
    emoji: "⚽",
    url: "https://football-analysis.xyz/",
    links: [
      { label: "Product Hunt", url: "https://www.producthunt.com/products/mundial-26?launch=mundial-26" },
      {
        label: "LinkedIn post",
        url: "https://www.linkedin.com/posts/julien-wuthrich-a75156119_mcp-ai-football-ugcPost-7484846574657785856-80ao/",
      },
    ],
  },
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
    links: [
      { label: "Docs", url: "https://turnwise.mintlify.app/introduction" },
      { label: "PyPI", url: "https://pypi.org/project/turnwise-sdk/" },
    ],
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
      "A clean Flutter app for planning structured workout routines and tracking progress over time — built to be fast, focused, and free of the bloat most fitness apps ship with.",
    highlights: [
      "Structured workout routines with planning and day-to-day tracking.",
      "Progress analytics that turn each session into a trend you can actually read.",
      "Distraction-free UI focused on getting in, logging, and getting out.",
      "Launched on Product Hunt; holds a 5-star rating on the App Store (3 reviews).",
    ],
    tags: ["iOS", "Flutter", "Health", "Analytics"],
    year: "2024",
    platform: "iOS",
    status: "Live",
    accent: "#FB923C",
    accent2: "#F43F5E",
    emoji: "🏋️",
    url: "https://kinetic-fitness-e2pml74iv-wuthrich-juliens-projects.vercel.app/",
    links: [
      { label: "Product Hunt", url: "https://www.producthunt.com/products/kinetic-ai-coach?launch=kinetic-ai-coach" },
    ],
  },
  {
    id: "riffling",
    name: "Riffling",
    blurb: "A Chrome extension that speeds up reading with artificial fixation points.",
    description:
      "A reading aid built on the Bionic Reading idea: guide the eyes through text with artificial fixation points so you only focus on the highlighted leading letters and let the brain complete each word. Unlike the original, every knob is exposed instead of one fixed preset.",
    highlights: [
      "Bolds the leading characters of each word to create fixation points, so the eye anchors and the brain fills in the rest.",
      "Seven tunable parameters — fixation, saccades, opacity, stopword count and behavior (remove, underline, strikethrough, ignore or bold), plus rare-word frequency and behavior — so the effect matches how you actually read.",
      "On the Chrome Web Store since 2022 — 5-star rated with 160+ users, and reviewed by The Web App Market as \"the most trusted reading assistant\" (4.8/5).",
    ],
    tags: ["Chrome Extension", "Reading", "Typography"],
    year: "2022",
    platform: "Chrome",
    status: "Live",
    accent: "#C084FC",
    accent2: "#F43F5E",
    emoji: "📖",
    url: "https://chromewebstore.google.com/detail/riffling/cdeneedpmhjckodlolnppfaebbgkkklc",
    links: [{ label: "Review — 4.8/5", url: "https://thewebappmarket.com/riffling-review/" }],
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

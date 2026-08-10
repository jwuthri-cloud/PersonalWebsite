// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for personal info. Everything in the OS (terminal,
// About app, dock, contact) reads from here.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Julien Wuthrich",
  username: "julien",
  hostname: "macbook-pro",
  role: "Staff AI Engineer",
  roleLong: "Machine Learning Engineer / Staff AI Engineer",
  tagline: "I build production multi-agent systems that are reliable, observable, and measurably correct — not just demo-ready.",
  location: "San Francisco, CA",
  email: "julien.wut@gmail.com",
  avatar: "JW", // rendered as a monogram in the About app
  now: "Staff AI Engineer at Connectly — building the harness that lets any customer stand up multi-agent systems for their own customer traffic.",
  about: [
    "I'm an ML/AI engineer with 8+ years designing and shipping large-scale AI systems for SaaS and enterprise.",
    "These days I go deep on production multi-agent systems, LLM orchestration, RAG, and rigorous LLM evaluation — the unglamorous work that makes agentic products reliable, observable, and measurably correct instead of just demo-ready.",
    "I like founding-engineer ownership: architecture → inference → infra → evals. I've scaled ML systems serving 10,000+ ecommerce brands and shipped agent stacks running live in front of enterprise clients.",
    "On the side I build products — an LLM eval platform, an invisible meeting assistant, a fitness app.",
  ],
  // Headline numbers shown as stat cards on the About page
  stats: [
    { value: "8+", label: "Years in ML/AI" },
    { value: "10k+", label: "Brands served" },
    { value: "6", label: "Products shipped" },
    { value: "99.9%", label: "Uptime sustained" },
  ],
  // The labelled list shown on the About window
  facts: [
    { label: "Currently", value: "Staff AI Engineer @ Connectly" },
    { label: "Focus", value: "Multi-agent systems · LLM evals · RAG" },
    { label: "Core stack", value: "Python · PyTorch · FastAPI · Next.js" },
    { label: "Experience", value: "8+ years shipping production AI" },
    { label: "Education", value: "M.S. Computer Science" },
    { label: "Open to", value: "Founding & staff AI/ML conversations" },
  ],
} as const;

export type SocialLink = {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: string; // key handled by <AppIcon/>
};

export const socials: SocialLink[] = [
  { id: "github", label: "GitHub", handle: "Jwuthri", url: "https://github.com/Jwuthri", icon: "github" },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "julien-wuthrich",
    url: "https://www.linkedin.com/in/julien-wuthrich-a75156119/",
    icon: "linkedin",
  },
  { id: "email", label: "Email", handle: "julien.wut@gmail.com", url: "mailto:julien.wut@gmail.com", icon: "mail" },
];

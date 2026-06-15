// ─────────────────────────────────────────────────────────────────────────────
// Résumé. Shown in the Resume app + `resume` terminal command.
// ─────────────────────────────────────────────────────────────────────────────

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export const resume = {
  summary:
    "ML/AI engineer with 8+ years designing and shipping large-scale AI systems for SaaS and enterprise. Deep focus on production multi-agent systems, LLM orchestration, RAG, and rigorous LLM evaluation. I combine staff-level systems design with applied ML and statistics to build agentic products that are reliable, observable, and measurably correct — not just demo-ready. Founding-engineer ownership from architecture to inference, infra, and evals.",

  experience: [
    {
      company: "Heysam",
      role: "Founding Engineer & Backend/AI Lead",
      period: "Jul 2023 — Present",
      location: "San Mateo, CA",
      bullets: [
        "Sole backend & AI engineer in a 4-person founding team; own end-to-end architecture, infra, and the full ML/agent stack powering a rapidly scaling SaaS, partnering with the CEO on technical direction.",
        "Architected a production multi-agent system with explicit planner/executor separation and state machines over open-ended reasoning loops — powering live call assistance, Q&A, and post-call analysis for enterprise clients.",
        "Built an LLM evaluation framework with custom metrics (faithfulness, tool-selection accuracy, intent drift, trajectory analysis) and statistical rigor to keep offline/online evals unbiased and decision-grade.",
        "Implemented RAG over call transcripts with reranking, rolling summaries and context-window management; hardened agents against prompt injection from untrusted transcript content.",
        "Operated a distributed job system processing thousands of concurrent daily calls under strict latency SLAs, sustaining 99.9% uptime (AWS, Docker, DataDog, Sentry).",
      ],
    },
    {
      company: "Various Startups",
      role: "AI Strategy Advisor (Freelance)",
      period: "Dec 2023 — Present",
      location: "Oakland, CA",
      bullets: [
        "Led AI transformations for 4+ startups, automating workflows and cutting manual work by up to 20 hours/week.",
        "Directed computer-vision strategy for a retail analytics company, improving inventory accuracy by 25%.",
      ],
    },
    {
      company: "Gorgias",
      role: "Founding Machine Learning Engineer",
      period: "Aug 2019 — Aug 2023",
      location: "San Francisco, CA",
      bullets: [
        "Built and scaled ML systems handling 100M+ daily queries at <100ms latency across 10,000+ ecommerce brands.",
        "Launched multilingual NLP models (classification, intent detection, sentiment) powering automated support — driving $4M+ ARR growth and a 15%+ CSAT increase.",
        "Designed and operated the ML platform end-to-end: data pipelines, training, real-time inference, deployment and 24/7 monitoring (99.99% uptime).",
        "Partnered with product leadership on the AI roadmap; directly responsible for 30%+ of product engagement. Mentored engineers and scaled the ML team from 1 to 6.",
      ],
    },
    {
      company: "Renault Digital",
      role: "Data Scientist",
      period: "Jul 2017 — Aug 2019",
      location: "Boulogne-Billancourt, FR",
      bullets: [
        "Supply-chain optimization with graph-theory + random-forest models, cutting delivery times 12% and saving €1M+ annually.",
        "Built YOLOv3-based AR part recognition with Blender-simulated data, reaching 95%+ accuracy across 500+ technicians.",
        "Designed NLP pipelines (topic modeling, Doc2Vec, HDBSCAN) tripling actionable feedback extraction from customer reviews.",
      ],
    },
  ] as Experience[],

  education: [
    {
      school: "Université Polytechnique Hauts-de-France",
      degree: "M.S. Computer Science",
      period: "2010 — 2015",
    },
  ] as Education[],

  certifications: [
    { name: "Retrieval Augmented Generation (RAG)", issuer: "DeepLearning.AI", year: "2025" },
    { name: "Applied Generative AI Specialization", issuer: "Microsoft Azure", year: "2025" },
    { name: "Custom & Distributed Training with TensorFlow", issuer: "Coursera", year: "2021" },
    { name: "Machine Learning in Production", issuer: "Coursera", year: "2021" },
  ] as Certification[],

  skills: {
    "LLMs & Agents": [
      "Multi-agent orchestration",
      "Planner/executor",
      "Tool calling",
      "MCP",
      "RAG",
      "Structured outputs",
      "Prompt-injection defense",
      "Streaming",
    ],
    "Evaluation & ML": [
      "LLM-as-judge",
      "Custom eval metrics",
      "Offline/online evals",
      "A/B testing",
      "NLP",
      "Computer Vision",
      "Recommenders",
      "Vector DBs",
    ],
    "MLOps & Infra": [
      "CI/CD",
      "Real-time & batch inference",
      "Distributed training (GPU/TPU)",
      "Airflow",
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
    ],
    "Languages & Tools": [
      "Python",
      "PyTorch",
      "TensorFlow",
      "FastAPI",
      "Next.js",
      "SQL/NoSQL",
      "Kafka",
      "Redis",
      "Spark",
    ],
  } as Record<string, string[]>,
};

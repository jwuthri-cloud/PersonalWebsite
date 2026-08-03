import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "../data/projects";

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden>
      <path d="M6 3h7v7M13 3L6.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 9.5V13H3V5h3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Detail({ p, onBack }: { p: Project; onBack: () => void }) {
  const grad = `linear-gradient(135deg, ${p.accent}, ${p.accent2})`;
  return (
    <motion.div
      className="project-detail"
      initial={{ opacity: 0, x: 22 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 22 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
    >
      <button className="back-link" onClick={onBack}>‹ All projects</button>

      <div className="project-hero" style={{ background: grad }}>
        <div className="project-hero-glow" />
        <span className="project-hero-emoji">{p.emoji}</span>
        <div className="project-hero-meta">
          <span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span>
          <span className="project-hero-dot">·</span>
          <span>{p.platform}</span>
          <span className="project-hero-dot">·</span>
          <span>{p.year}</span>
        </div>
      </div>

      <div className="project-detail-pad">
        <h1 className="project-detail-title">{p.name}</h1>
        <p className="project-detail-blurb">{p.blurb}</p>
        <p className="project-detail-desc">{p.description}</p>

        <div className="project-highlights">
          {p.highlights.map((h, i) => (
            <div className="highlight" key={i}>
              <span className="highlight-dot" style={{ background: p.accent2 }} />
              <span>{h}</span>
            </div>
          ))}
        </div>

        <div className="project-tags">
          {p.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>

        <div className="project-detail-actions">
          {p.url && (
            <a className="btn-primary" href={p.url} target="_blank" rel="noopener noreferrer">
              Visit site <ExternalIcon />
            </a>
          )}
          {p.repo && (
            <a className="btn-ghost" href={p.repo} target="_blank" rel="noopener noreferrer">
              Source <ExternalIcon />
            </a>
          )}
          {p.links?.map((l) => (
            <a className="btn-ghost" key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label} <ExternalIcon />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Card({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const grad = `linear-gradient(135deg, ${p.accent}, ${p.accent2})`;
  return (
    <motion.button
      className="project-card"
      onClick={onOpen}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
    >
      <div className="project-card-banner" style={{ background: grad }}>
        <div className="project-card-glow" />
        <span className="project-card-emoji">{p.emoji}</span>
        <span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span>
        {p.url && (
          <span
            className="project-card-visit"
            role="link"
            tabIndex={0}
            title="Open live site"
            onClick={(e) => {
              e.stopPropagation();
              window.open(p.url, "_blank", "noopener");
            }}
          >
            <ExternalIcon />
          </span>
        )}
      </div>
      <div className="project-card-body">
        <div className="project-card-head">
          <h3>{p.name}</h3>
          <span className="project-card-year">{p.year}</span>
        </div>
        <p>{p.blurb}</p>
        <div className="project-card-tags">
          {p.tags.slice(0, 3).map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="app projects">
      <AnimatePresence mode="wait">
        {active ? (
          <Detail key="detail" p={active} onBack={() => setActive(null)} />
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="projects-header">
              <h1>Projects</h1>
              <p>Things I've designed, built, and shipped.</p>
            </div>
            <div className="project-grid">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 26 }}
                >
                  <Card p={p} onOpen={() => setActive(p)} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

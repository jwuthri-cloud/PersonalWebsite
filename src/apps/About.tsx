import { profile, socials } from "../data/profile";
import { AppIcon } from "../components/AppIcon";
import { useWM } from "../os/WindowManager";

export function About() {
  const wm = useWM();
  return (
    <div className="app about">
      {/* Cover banner */}
      <div className="about-cover">
        <div className="about-cover-glow" />
      </div>

      <div className="about-main">
        {/* Identity */}
        <div className="about-id">
          <div className="about-avatar">
            <span>{profile.avatar}</span>
            <i className="about-status" title="Available" />
          </div>
          <div className="about-id-text">
            <h1>{profile.name}</h1>
            <p className="about-role">{profile.roleLong}</p>
            <div className="about-meta">
              <span>📍 {profile.location}</span>
              <a href={`mailto:${profile.email}`}>✉️ {profile.email}</a>
            </div>
          </div>
        </div>

        <p className="about-tagline-lg">{profile.tagline}</p>

        {/* Headline stats */}
        <div className="about-stats">
          {profile.stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Bio */}
        <section className="about-block">
          <h2 className="about-h2">About</h2>
          {profile.about.map((p, i) => (
            <p key={i} className="about-para">{p}</p>
          ))}
        </section>

        {/* Now */}
        <div className="about-now">
          <span className="now-pulse" />
          <div>
            <strong>Now</strong>
            <p>{profile.now}</p>
          </div>
        </div>

        {/* Facts */}
        <section className="about-block">
          <h2 className="about-h2">At a glance</h2>
          <div className="about-facts">
            {profile.facts.map((f) => (
              <div className="fact" key={f.label}>
                <span className="fact-label">{f.label}</span>
                <span className="fact-value">{f.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Connect */}
        <section className="about-block">
          <h2 className="about-h2">Connect</h2>
          <div className="about-socials">
            {socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="about-social">
                <AppIcon icon={s.icon} size={28} />
                <span className="about-social-label">{s.label}</span>
                <span className="about-social-handle">{s.handle}</span>
              </a>
            ))}
          </div>
        </section>

        <div className="about-cta">
          <button className="btn-primary" onClick={() => wm.openApp("projects")}>
            See my work →
          </button>
          <button className="btn-ghost" onClick={() => wm.openApp("resume")}>
            View résumé
          </button>
        </div>
      </div>
    </div>
  );
}

import { profile } from "../data/profile";
import { resume } from "../data/resume";

export function Resume() {
  return (
    <div className="app resume">
      <div className="resume-toolbar">
        <span className="resume-filename">{profile.username}-resume.pdf</span>
        <button
          className="btn-small"
          onClick={() => window.print()}
        >
          ⤓ Download
        </button>
      </div>

      <div className="resume-page">
        <header className="resume-header">
          <h1>{profile.name}</h1>
          <p className="resume-subtitle">{profile.role}</p>
          <p className="resume-contact">
            {profile.location} · {profile.email}
          </p>
        </header>

        <section className="resume-section">
          <h2>Summary</h2>
          <p className="resume-summary">{resume.summary}</p>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          <div className="timeline">
            {resume.experience.map((e) => (
              <div className="timeline-item" key={e.company + e.period}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-head">
                    <h3>{e.role}</h3>
                    <span className="timeline-period">{e.period}</span>
                  </div>
                  <p className="timeline-company">
                    {e.company} · {e.location}
                  </p>
                  <ul>
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>Education</h2>
          {resume.education.map((ed) => (
            <div className="resume-edu" key={ed.school}>
              <div>
                <h3>{ed.school}</h3>
                <p>{ed.degree}</p>
              </div>
              <span className="timeline-period">{ed.period}</span>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h2>Certifications</h2>
          <div className="resume-certs">
            {resume.certifications.map((c) => (
              <div className="resume-cert" key={c.name}>
                <span className="cert-dot" />
                <div className="cert-body">
                  <h3>{c.name}</h3>
                  <p>
                    {c.issuer} · {c.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>Skills</h2>
          <div className="skill-groups">
            {Object.entries(resume.skills).map(([group, items]) => (
              <div className="skill-group" key={group}>
                <h4>{group}</h4>
                <div className="skill-chips">
                  {items.map((s) => (
                    <span className="chip" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

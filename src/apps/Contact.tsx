import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, socials } from "../data/profile";
import { AppIcon } from "../components/AppIcon";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit — wire this to a real endpoint / mailto when you're ready.
    setSent(true);
    setTimeout(() => setSent(false), 3200);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="app contact">
      <div className="contact-head">
        <h1>Let's talk</h1>
        <p>
          Got a project, a question, or just want to say hi? Drop me a line —
          I read everything.
        </p>
      </div>

      <div className="contact-socials">
        {socials.map((s) => (
          <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="contact-social">
            <AppIcon icon={s.icon} size={34} />
            <div>
              <strong>{s.label}</strong>
              <span>{s.handle}</span>
            </div>
          </a>
        ))}
      </div>

      <form className="contact-form" onSubmit={submit}>
        <div className="field-row">
          <label className="field">
            <span>Name</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ada Lovelace"
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ada@example.com"
            />
          </label>
        </div>
        <label className="field">
          <span>Message</span>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Hey Julien, I was thinking…"
          />
        </label>
        <button className="btn-primary" type="submit">Send message</button>
        <p className="contact-fallback">
          Prefer email? <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </form>

      <AnimatePresence>
        {sent && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            ✓ Message sent — I'll get back to you soon!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

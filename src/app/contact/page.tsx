"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar, Copy, Check } from "lucide-react";
import Reveal from "@/components/Reveal";

const EMAIL = "azeem@tazcreative.io";
const PHONE = "+372 5378 5825";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <Reveal>
        <h1 className="text-3xl font-bold md:text-5xl">Contact</h1>
        <p className="mt-4 text-[var(--fg-muted)]">
          Get in touch for design inquiries
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="card flex items-center gap-3 p-5">
          <Mail className="text-[var(--accent)]" size={20} />
          <div>
            <p className="text-sm font-medium">{EMAIL}</p>
            <p className="text-xs text-[var(--fg-muted)]">E-mail</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-5">
          <Phone className="text-[var(--accent)]" size={20} />
          <div>
            <p className="text-sm font-medium">{PHONE}</p>
            <p className="text-xs text-[var(--fg-muted)]">Phone</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.14} className="mt-6 flex flex-wrap gap-3">
        {/* TODO: replace href with your real scheduling link (Calendly, Cal.com, etc.) */}
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)]"
        >
          <Calendar size={15} />
          Schedule a call
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={copyEmail}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied!" : "Copy email"}
        </motion.button>
      </Reveal>

      <Reveal delay={0.2} className="mt-16">
        <h2 className="text-xl font-bold md:text-2xl">Send a message</h2>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          />
          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          />
          <textarea
            required
            rows={5}
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-black"
          >
            {sent ? "Sent!" : "Send message"}
          </motion.button>
        </form>
      </Reveal>

      <footer className="mt-24 border-t border-[var(--border)] py-8 text-center text-sm text-[var(--fg-muted)]">
        © 2026 Azeem
      </footer>
    </main>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Copy, Check } from "lucide-react";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies, testimonials, blogPosts } from "@/lib/data";

const EMAIL = "azeem@tazcreative.io";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const featured = caseStudies.filter((c) => c.featured);
  const projects = caseStudies.filter((c) => !c.featured);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      {/* Hero */}
      <section>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl"
        >
          Researching for Insights, Designing for Impact.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-base text-[var(--fg-muted)] md:text-lg"
        >
          Interaction designer and UX Researcher with a proven track record of
          transforming ideas into compelling digital experiences in
          government, fintech, business, education, entertainment and
          blockchain scenes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
        >
          <MapPin size={16} />
          Estonia, Europe
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link href="/about">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block rounded-full bg-[var(--fg)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)]"
            >
              About
            </motion.span>
          </Link>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--fg)]"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied!" : "Copy e-mail"}
          </motion.button>
        </motion.div>
      </section>

      {/* Featured Case Studies */}
      <section className="mt-24">
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">Featured Case Studies</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {featured.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
        <Reveal delay={0.1} className="mt-8">
          <Link
            href="/User-Experience-Interaction-Design"
            className="text-sm font-semibold text-[var(--fg)] underline underline-offset-4"
          >
            All case studies →
          </Link>
        </Reveal>
      </section>

      {/* Projects */}
      <section className="mt-24">
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">Projects</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-24">
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">What people say</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className="card h-full p-6">
                <p className="text-sm leading-relaxed text-[var(--fg)]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-[var(--fg-muted)]">{t.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="mt-24">
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">Blog</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {blogPosts.slice(0, 2).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <div className="card h-full p-6">
                <p className="text-xs text-[var(--fg-muted)]">
                  {post.date} by {post.author}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm text-[var(--fg-muted)]">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-[var(--accent)]"
                >
                  Read More →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="mt-24 border-t border-[var(--border)] py-8 text-center text-sm text-[var(--fg-muted)]">
        © 2026 Azeem
      </footer>
    </main>
  );
}

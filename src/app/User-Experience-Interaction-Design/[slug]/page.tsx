import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/data";

export async function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/User-Experience-Interaction-Design/[slug]">) {
  const { slug } = await props.params;
  const study = caseStudies.find((s) => s.slug === slug);
  return { title: study ? `${study.title} — Azeem Gbadamosi` : "Case Study" };
}

export default async function CaseStudyPage(
  props: PageProps<"/User-Experience-Interaction-Design/[slug]">
) {
  const { slug } = await props.params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const others = caseStudies.filter((s) => s.slug !== study.slug).slice(0, 2);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Reveal>
        <Link
          href="/User-Experience-Interaction-Design"
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
        >
          <ArrowLeft size={15} />
          Back to list
        </Link>
      </Reveal>

      <Reveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
          {study.title}
        </h1>
        <p className="mt-3 text-sm font-medium text-[var(--accent)]">
          {study.client}
        </p>
        <p className="mt-6 text-[var(--fg-muted)]">{study.intro}</p>
      </Reveal>

      {study.previewLink && (
        <Reveal delay={0.15} className="mt-6">
          <a
            href={study.previewLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-5 py-2.5 text-sm font-semibold text-[var(--bg)]"
          >
            {study.previewLink.label}
            <ExternalLink size={14} />
          </a>
        </Reveal>
      )}

      {(study.duration || study.role) && (
        <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-6 border-y border-[var(--border)] py-6">
          {study.duration && (
            <div>
              <p className="text-lg font-semibold">{study.duration}</p>
              <p className="text-xs text-[var(--fg-muted)]">Duration</p>
            </div>
          )}
          {study.role && (
            <div>
              <p className="text-lg font-semibold">{study.role}</p>
              <p className="text-xs text-[var(--fg-muted)]">Role</p>
            </div>
          )}
        </Reveal>
      )}

      <div className="relative mt-14 aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border)]">
        <Image src={study.heroImage} alt={study.title} fill className="object-cover" />
      </div>

      <div className="mt-16 space-y-14">
        {study.sections.map((section, i) => (
          <Reveal key={i}>
            {section.heading && (
              <h2 className="text-xl font-bold md:text-2xl">{section.heading}</h2>
            )}
            <div className="mt-4 space-y-4">
              {section.body.map((p, j) => (
                <p key={j} className="leading-relaxed text-[var(--fg-muted)]">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      {study.gallery && study.gallery.length > 0 && (
        <Reveal className="mt-16">
          <h2 className="text-xl font-bold md:text-2xl">Gallery</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {study.gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--border)]"
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {study.testimonial && (
        <Reveal className="mt-16 card p-8">
          <p className="text-lg leading-relaxed">
            &ldquo;{study.testimonial.quote}&rdquo;
          </p>
          <p className="mt-4 font-semibold">{study.testimonial.name}</p>
          <p className="text-sm text-[var(--fg-muted)]">{study.testimonial.title}</p>
        </Reveal>
      )}

      <Reveal className="mt-16">
        <h2 className="text-xl font-bold md:text-2xl">Tools</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {study.tools.map((tool) => (
            <span key={tool} className="tag">
              {tool}
            </span>
          ))}
        </div>
      </Reveal>

      {study.credits.length > 0 && (
        <Reveal className="mt-16">
          <h2 className="text-xl font-bold md:text-2xl">Contributors&apos; Credits</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--fg-muted)]">
            {study.credits.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Reveal>
      )}

      <div className="mt-20 border-t border-[var(--border)] pt-14">
        <Reveal>
          <h2 className="text-xl font-bold md:text-2xl">More projects</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {others.map((s, i) => (
            <CaseStudyCard key={s.slug} study={s} index={i} />
          ))}
        </div>
        <Reveal delay={0.1} className="mt-8">
          <Link
            href="/User-Experience-Interaction-Design"
            className="text-sm font-semibold underline underline-offset-4"
          >
            All projects →
          </Link>
        </Reveal>
      </div>
    </main>
  );
}

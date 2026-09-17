"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, MapPin, Copy, Check } from "lucide-react";

export const EMAIL = "azeem@tazcreative.io";

export type Item = {
  t: string;
  html?: string;
  text?: string;
  href?: string;
  multiline?: boolean;
  src?: string;
  w?: number;
  h?: number;
  indent?: number;
  ratio?: number;
  alt?: string;
  svg?: string;
  title?: string;
  fieldType?: string;
  required?: boolean;
  size?: number;
  dw?: number;
  muted?: boolean;
  placeholder?: string;
};

export type Section = {
  heading: string;
  layout?: "split" | "stacked";
  kind?: "cards" | "posts" | "quotes" | "chips" | "entries";
  items?: any[];
  blocks: Item[];
  more?: { text: string; href?: string } | null;
};

export type PageContent = {
  header: { back: { text: string; href?: string } | null; h1: string; blocks: Item[] };
  sections: Section[];
  related?: { image: string; title: string; client: string }[];
  footer?: string;
};

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export const href = (h?: string) => {
  if (!h) return "#";
  if (h.startsWith("http") || h.startsWith("mailto")) return h;
  return "/" + h.replace(/^(\.\.\/|\.\/)+/, "").replace(/^\//, "");
};

const isFooter = (b: Item) => /^©/.test(b.text || "");

export default function Page({
  content,
  promoteFirstSection = false,
  children,
}: {
  content: PageContent;
  promoteFirstSection?: boolean;
  children?: React.ReactNode;
}) {
  const { header } = content;
  let sections = content.sections.filter((s) => !(s.blocks?.length === 1 && isFooter(s.blocks[0])));
  let promoted: Section | null = null;
  if (promoteFirstSection && sections.length) {
    promoted = sections[0];
    sections = sections.slice(1);
  }
  const footer = content.footer || "© 2026 Azeem";

  return (
    <article className="mx-auto w-full max-w-[904px] px-6 pb-16 pt-10 lg:px-0 lg:pt-12">
      {header.back && (
        <motion.div {...reveal} className="border-b border-[var(--border)] pb-5">
          <Link
            href={href(header.back.href)}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--fg)] hover:opacity-70"
          >
            <ArrowLeft size={16} />
            {header.back.text}
          </Link>
        </motion.div>
      )}

      <Header blocks={header.blocks.filter((b) => !isFooter(b))} />

      {promoted && (
        <>
          <motion.h1
            {...reveal}
            className="mt-10 font-[family-name:var(--font-space-grotesk)] text-[30px] font-bold leading-[1.5] text-[var(--fg)] md:text-[40px]"
          >
            {promoted.heading}
          </motion.h1>
          <div className="mt-6">
            <Blocks blocks={promoted.blocks.filter((b) => !isFooter(b))} />
          </div>
        </>
      )}

      {sections.map((s, i) => (
        <SectionView key={i} section={s} />
      ))}

      {children}

      <motion.footer
        {...reveal}
        className="mt-24 border-t border-[var(--border)] pt-8 text-[14px] text-[var(--fg-muted)]"
      >
        {footer}
      </motion.footer>
    </article>
  );
}

function Header({ blocks }: { blocks: Item[] }) {
  const out: React.ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    // "Copy e-mail" / "Copied!" / "Copy email" is one button in the source
    if (/^copy e-?mail$/i.test(b.text || "")) {
      let j = i + 1;
      while (j < blocks.length && /^(copied!|copy e-?mail)$/i.test(blocks[j].text || "")) j++;
      i = j - 1;
      out.push(<CopyEmail key={`copy-${i}`} />);
      continue;
    }

    if (b.t === "tag") {
      const run: Item[] = [];
      while (i < blocks.length && blocks[i].t === "tag") run.push(blocks[i++]);
      i--;
      out.push(
        <motion.div key={`tags-${i}`} {...reveal} className="mt-20 flex flex-wrap gap-2">
          {run.map((t, k) => (
            <span
              key={k}
              className="rounded-lg bg-[var(--tag-bg)] px-3 py-[3px] text-[14px] text-[var(--accent)]"
            >
              {t.text}
            </span>
          ))}
        </motion.div>
      );
      continue;
    }

    if (b.t === "chip") {
      out.push(
        <motion.p
          key={i}
          {...reveal}
          className="mt-6 flex items-center gap-2 text-[14px] font-medium text-[var(--accent)]"
        >
          <MapPin size={15} />
          {b.text}
        </motion.p>
      );
      continue;
    }

    if (b.t === "metaValue" || b.t === "p") {
      const next = blocks[i + 1];
      const paired = next?.t === "metaLabel";

      // value + label pairs render as a labelled row
      if (paired) {
        const pairs: { value: string; label: string; svg?: string }[] = [];
        while (
          i < blocks.length &&
          (blocks[i].t === "metaValue" || blocks[i].t === "p") &&
          blocks[i + 1]?.t === "metaLabel"
        ) {
          pairs.push({ value: blocks[i].text || "", label: blocks[i + 1].text || "", svg: blocks[i].svg });
          i += 2;
        }
        i--;
        out.push(
          <motion.div
            key={`meta-${i}`}
            {...reveal}
            className="mt-10 grid gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-2"
          >
            {pairs.map((p, k) => (
              <div key={k}>
                <p className="text-[18px] font-medium text-[var(--fg)]">{p.value}</p>
                <p className="mt-1 text-[14px] text-[var(--fg-muted)]">{p.label}</p>
              </div>
            ))}
          </motion.div>
        );
        continue;
      }

      out.push(
        <motion.p
          key={i}
          {...reveal}
          className={`prose-p mt-4 ${b.t === "metaValue" ? "text-[18px]" : "text-[16px]"}`}
          dangerouslySetInnerHTML={{ __html: b.html || b.text || "" }}
        />
      );
      continue;
    }

    if (b.t === "h1") {
      const big = (b.size ?? 40) >= 36;
      out.push(
        <motion.h1
          key={i}
          {...reveal}
          className={`font-[family-name:var(--font-space-grotesk)] font-bold leading-[1.5] tracking-[-0.01em] first:mt-20 ${
            big ? "mt-8 text-[30px] md:text-[40px]" : "mt-1 text-[24px] md:text-[32px]"
          } ${b.muted ? "text-[var(--fg-muted)]" : "text-[var(--fg)]"}`}
        >
          {b.text}
        </motion.h1>
      );
      continue;
    }

    if (b.t === "action") {
      out.push(
        <motion.span key={i} {...reveal} className="mt-7 mr-3 inline-block">
          <ActionLink b={b} />
        </motion.span>
      );
      continue;
    }

    if (b.t === "image" || b.t === "video" || b.t === "embed") {
      out.push(
        <motion.div key={i} {...reveal} className="mt-10">
          <Media item={b} />
        </motion.div>
      );
      continue;
    }

    if (b.t === "metaLabel") {
      out.push(
        <motion.p key={i} {...reveal} className="mt-1 text-[14px] text-[var(--fg-muted)]">
          {b.text}
        </motion.p>
      );
    }
  }

  return <>{out}</>;
}

function SectionView({ section }: { section: Section }) {
  const heading = section.heading ? (
    <motion.h2
      {...reveal}
      className="text-[22px] font-medium leading-snug text-[var(--fg)] md:text-[26px]"
    >
      {section.heading}
    </motion.h2>
  ) : null;

  const body = (
    <>
      <SectionBody section={section} />
      {section.more &&
        (/load more/i.test(section.more.text) ? (
          <motion.div {...reveal} className="mt-8 flex justify-center">
            <ActionLink b={section.more as Item} />
          </motion.div>
        ) : (
          <motion.div {...reveal} className="mt-8">
            <ActionLink b={section.more as Item} subtle />
          </motion.div>
        ))}
    </>
  );

  // stacked: heading sits full width above the content (index and home pages)
  if (section.layout !== "split") {
    return (
      <section className="mt-20">
        {heading}
        <div className={heading ? "mt-8" : ""}>{body}</div>
      </section>
    );
  }

  // split: heading occupies the narrow left column beside the content
  return (
    <section className="mt-20 lg:grid lg:grid-cols-[240px_40px_624px]">
      {heading ?? <div />}
      <div />
      <div className="mt-6 lg:mt-0">{body}</div>
    </section>
  );
}

function SectionBody({ section }: { section: Section }) {
  switch (section.kind) {
    case "cards":
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          {section.items!.map((c: any, i: number) => (
            <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.05 }}>
              <Link href={href(c.href)} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-[16px] font-medium text-[var(--fg)]">{c.title}</h3>
                {c.client && <p className="mt-1 text-[14px] text-[var(--fg-muted)]">{c.client}</p>}
              </Link>
            </motion.div>
          ))}
        </div>
      );

    case "posts":
      return (
        <div className="space-y-12">
          {section.items!.map((p: any, i: number) => (
            <motion.div
              key={i}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.05 }}
              className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[14px] text-[var(--fg-muted)]">{p.date}</p>
                <h3 className="mt-2 text-[20px] font-medium leading-snug text-[var(--fg)]">
                  {p.title}
                </h3>
                <p className="prose-p mt-2 text-[16px]">{p.excerpt}</p>
                <Link
                  href={href(p.href)}
                  className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-[var(--accent)]"
                >
                  {p.label || "Read More"}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
              {p.image && (
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:w-[240px]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    quality={95}
                    sizes="(max-width: 640px) 100vw, 240px"
                    className="object-cover"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      );

    case "quotes":
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          {section.items!.map((q: any, i: number) => (
            <motion.div
              key={i}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.05 }}
              className="rounded-xl bg-[var(--surface)] p-6"
            >
              <p className="text-[15px] leading-relaxed text-[var(--fg)]">{q.quote}</p>
              <p className="mt-4 text-[14px] font-medium text-[var(--fg)]">{q.name}</p>
              <p className="text-[13px] text-[var(--fg-muted)]">{q.role}</p>
            </motion.div>
          ))}
        </div>
      );

    case "chips": {
      const items = section.items as { text: string; w?: number; svg?: string }[];
      // tool rows carry an icon; skill tables are wide cells
      if (items.some((i) => i.svg)) {
        return (
          <motion.div {...reveal} className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {items.map((c, i) => (
              <span key={i} className="flex items-center gap-3 text-[16px] text-[var(--fg-muted)]">
                {c.svg && (
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center [&>svg]:h-8 [&>svg]:w-8"
                    dangerouslySetInnerHTML={{ __html: c.svg }}
                  />
                )}
                {c.text}
              </span>
            ))}
          </motion.div>
        );
      }
      return (
        <motion.div {...reveal} className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-[var(--border)] sm:grid-cols-2">
          {items.map((c, i) => (
            <div key={i} className="bg-[var(--surface)] px-5 py-6 text-[16px] text-[var(--fg)]">
              {c.text}
            </div>
          ))}
        </motion.div>
      );
    }

    case "entries":
      return (
        <div className="space-y-10">
          {section.items!.map((e: any, i: number) => (
            <motion.div key={i} {...reveal}>
              <p className="text-[14px] text-[var(--fg-muted)]">{e.period}</p>
              <h3 className="mt-1 text-[18px] font-medium text-[var(--fg)]">{e.org}</h3>
              {e.role && <p className="text-[14px] text-[var(--accent)]">{e.role}</p>}
              {e.points.map((pt: string, k: number) => (
                <p
                  key={k}
                  className="prose-p mt-3 text-[16px]"
                  dangerouslySetInnerHTML={{ __html: pt }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      );

    default:
      return <Blocks blocks={section.blocks} />;
  }
}

export function Blocks({ blocks }: { blocks: Item[] }) {
  const out: React.ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    if (b.t === "field") {
      const run: Item[] = [];
      while (i < blocks.length && blocks[i].t === "field") run.push(blocks[i++]);
      i--;
      out.push(<ContactForm key={`form-${i}`} fields={run} />);
      continue;
    }

    if (b.t === "chip") {
      const run: Item[] = [];
      while (i < blocks.length && blocks[i].t === "chip") run.push(blocks[i++]);
      i--;
      out.push(
        <motion.div key={`chips-${i}`} {...reveal} className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 first:mt-0">
          {run.map((t, k) => (
            <span key={k} className="flex items-center gap-2 text-[16px] text-[var(--fg-muted)]">
              {t.svg && (
                <span
                  className="inline-flex h-8 w-8 items-center justify-center [&>svg]:h-8 [&>svg]:w-8"
                  dangerouslySetInnerHTML={{ __html: t.svg }}
                />
              )}
              {t.text}
            </span>
          ))}
        </motion.div>
      );
      continue;
    }

    if (b.t === "badge") {
      const heading = blocks[i + 1]?.t === "h3" ? blocks[i + 1] : null;
      if (heading) i++;
      out.push(
        <motion.div key={`step-${i}`} {...reveal} className="mt-12 flex items-center gap-6 first:mt-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--tag-bg)] text-[16px] font-medium text-[var(--accent)]">
            {b.text}
          </span>
          {heading && (
            <h3 className="text-[18px] font-medium leading-snug text-[var(--fg)]">{heading.text}</h3>
          )}
        </motion.div>
      );
      continue;
    }

    out.push(<BlockItem key={i} b={b} />);
  }

  return <>{out}</>;
}

function BlockItem({ b }: { b: Item }) {
  const pad = b.indent ? { paddingLeft: b.indent } : undefined;

  switch (b.t) {
    case "p":
      return (
        <motion.p
          {...reveal}
          style={pad}
          className={`prose-p mt-5 text-[16px] first:mt-0 ${b.multiline ? "whitespace-pre-line" : ""}`}
          dangerouslySetInnerHTML={{ __html: b.html || b.text || "" }}
        />
      );

    case "h3":
      return (
        <motion.h3 {...reveal} style={pad} className="mt-10 text-[18px] font-medium text-[var(--fg)] first:mt-0">
          {b.text}
        </motion.h3>
      );

    case "metaValue":
      return (
        <motion.p {...reveal} style={pad} className="mt-6 text-[18px] font-medium text-[var(--fg)] first:mt-0">
          {b.text}
        </motion.p>
      );

    case "metaLabel":
      return (
        <motion.p {...reveal} style={pad} className="mt-1 text-[14px] text-[var(--fg-muted)]">
          {b.text}
        </motion.p>
      );

    case "action":
      return (
        <motion.div {...reveal} style={pad} className="mt-6">
          <ActionLink b={b} />
        </motion.div>
      );

    case "image":
    case "video":
    case "embed":
      return (
        <motion.div {...reveal} style={pad} className="mt-8 first:mt-0">
          <Media item={b} />
        </motion.div>
      );

    default:
      return null;
  }
}

function ActionLink({ b, subtle = false }: { b: Item; subtle?: boolean }) {
  const external = b.href?.startsWith("http");
  const cls = subtle
    ? "inline-flex items-center gap-1 text-[14px] font-medium text-[var(--fg)] underline underline-offset-4"
    : "inline-flex items-center gap-2 rounded-xl bg-[var(--surface)] px-5 py-2.5 text-[14px] font-medium text-[var(--fg)] hover:opacity-80";

  if (external) {
    return (
      <a href={b.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {b.text}
        <ArrowUpRight size={15} />
      </a>
    );
  }
  return (
    <Link href={href(b.href)} className={cls}>
      {b.text}
    </Link>
  );
}

function CopyEmail({ label = "Copy email" }: { label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      {...reveal}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(EMAIL);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {}
      }}
      className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-5 py-2.5 text-[14px] font-medium text-[var(--fg)] hover:opacity-80"
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? "Copied!" : label}
    </motion.button>
  );
}

function ContactForm({ fields }: { fields: Item[] }) {
  const [sent, setSent] = useState(false);
  const inputs = fields.filter((f) => f.fieldType !== "submit");
  const submit = fields.find((f) => f.fieldType === "submit");

  return (
    <motion.form
      {...reveal}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-3"
    >
      {inputs.map((f, i) =>
        f.fieldType === "textarea" ? (
          <textarea
            key={i}
            rows={5}
            placeholder={f.placeholder}
            required={f.required}
            className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--fg)] outline-none focus:border-[var(--accent)]"
          />
        ) : (
          <input
            key={i}
            type={f.fieldType === "email" ? "email" : "text"}
            placeholder={f.placeholder}
            required={f.required}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--fg)] outline-none focus:border-[var(--accent)]"
          />
        )
      )}
      <button
        type="submit"
        className="rounded-full bg-[var(--fg)] px-6 py-2.5 text-[14px] font-medium text-[var(--bg)] hover:opacity-90"
      >
        {sent ? "Sent" : submit?.placeholder || "Submit"}
      </button>
    </motion.form>
  );
}

export function Media({ item }: { item: Item }) {
  if (item.t === "video") {
    return (
      <video
        src={item.src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full rounded-xl"
      />
    );
  }

  if (item.t === "embed") {
    return (
      <div
        className="overflow-hidden rounded-xl bg-[var(--surface)]"
        style={{ aspectRatio: String(item.ratio || 1.33) }}
      >
        <iframe
          src={item.src}
          title={item.title || "Embedded media"}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  // the hint has to match the slot this image actually fills (904 hero,
  // 624 section, 560 inside a numbered step) or the browser picks a file
  // too small for it and upscales
  const slot = item.dw || 624;
  return (
    <Image
      src={item.src!}
      alt={item.alt || ""}
      width={item.w || 1200}
      height={item.h || 900}
      quality={95}
      className="w-full rounded-xl"
      sizes={`(max-width: 1024px) 100vw, ${slot}px`}
    />
  );
}

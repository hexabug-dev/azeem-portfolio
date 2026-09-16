"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { caseStudyTitleToSlug, playgroundTitleToSlug } from "@/lib/slugs";

export default function Related({
  items,
}: {
  items: { image: string; title: string; client: string }[];
}) {
  if (!items.length) return null;

  const hrefFor = (title: string) => {
    const cs = caseStudyTitleToSlug(title);
    if (cs) return `/User-Experience-Interaction-Design/${cs}`;
    const pg = playgroundTitleToSlug(title);
    if (pg) return `/visual-playground/${pg}`;
    return null;
  };

  return (
    <section className="mt-20 lg:grid lg:grid-cols-[240px_40px_624px]">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="text-[22px] font-medium text-[var(--fg)] md:text-[26px]"
      >
        More projects
      </motion.h2>
      <div />
      <div className="mt-6 lg:mt-0">
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((r, i) => {
            const href = hrefFor(r.title);
            const card = (
              <div className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-[16px] font-medium text-[var(--fg)]">{r.title}</h3>
                {r.client && <p className="mt-1 text-[14px] text-[var(--fg-muted)]">{r.client}</p>}
              </div>
            );
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
              >
                {href ? <Link href={href}>{card}</Link> : card}
              </motion.div>
            );
          })}
        </div>
        <Link
          href="/User-Experience-Interaction-Design"
          className="mt-8 inline-block text-[14px] font-medium text-[var(--fg)] underline underline-offset-4"
        >
          All projects
        </Link>
      </div>
    </section>
  );
}

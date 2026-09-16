"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/data";

export default function CaseStudyCard({
  study,
  index = 0,
}: {
  study: CaseStudy;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/User-Experience-Interaction-Design/${study.slug}`}
        className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
      >
        <motion.div
          className="relative aspect-[4/3] w-full overflow-hidden"
          whileHover="hover"
        >
          <motion.div
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={study.cardImage}
              alt={study.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
        <div className="p-5">
          <h3 className="text-base font-semibold leading-snug text-[var(--fg)]">
            {study.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">{study.client}</p>
        </div>
      </Link>
    </motion.div>
  );
}

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { playgroundProjects } from "@/lib/data";

export const metadata = { title: "Playground — Azeem Gbadamosi" };

export default function PlaygroundPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Reveal>
        <h1 className="text-3xl font-bold md:text-5xl">Playground</h1>
        <p className="mt-5 max-w-2xl text-[var(--fg-muted)]">
          Projects across Visual Identities, Motion Graphics, Marketing
          Materials &amp; Presentations
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {playgroundProjects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <div className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold">{p.title}</h3>
                {p.client && (
                  <p className="mt-1 text-sm text-[var(--fg-muted)]">{p.client}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <footer className="mt-24 border-t border-[var(--border)] py-8 text-center text-sm text-[var(--fg-muted)]">
        © 2026 Azeem
      </footer>
    </main>
  );
}

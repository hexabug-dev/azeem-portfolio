import Reveal from "@/components/Reveal";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/data";

export const metadata = {
  title: "User Experience & Interaction Design Projects — Azeem Gbadamosi",
};

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Reveal>
        <h1 className="text-3xl font-bold md:text-5xl">
          User Experience &amp; Interaction Design Projects
        </h1>
        <p className="mt-5 max-w-2xl text-[var(--fg-muted)]">
          Case studies of some of my works across Product Design, User
          Research, Affective Computing &amp; Prototyping.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.slug} study={study} index={i} />
        ))}
      </div>
    </main>
  );
}

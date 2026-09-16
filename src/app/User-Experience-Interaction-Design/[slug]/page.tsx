import { notFound } from "next/navigation";
import Page from "@/components/Page";
import Related from "@/components/Related";
import { caseStudies } from "@/lib/content";

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/User-Experience-Interaction-Design/[slug]">
) {
  const { slug } = await props.params;
  const page = caseStudies[slug];
  return { title: page ? `${page.header.h1} — Azeem Gbadamosi` : "Azeem Gbadamosi" };
}

export default async function CaseStudyRoute(
  props: PageProps<"/User-Experience-Interaction-Design/[slug]">
) {
  const { slug } = await props.params;
  const page = caseStudies[slug];
  if (!page) notFound();

  return (
    <main>
      <Page content={page}>
        <Related items={page.related ?? []} />
      </Page>
    </main>
  );
}

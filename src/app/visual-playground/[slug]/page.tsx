import { notFound } from "next/navigation";
import Page from "@/components/Page";
import Related from "@/components/Related";
import { playgroundProjects } from "@/lib/content";

export async function generateStaticParams() {
  return Object.keys(playgroundProjects).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/visual-playground/[slug]">) {
  const { slug } = await props.params;
  const page = playgroundProjects[slug];
  return { title: page ? `${page.header.h1} — Azeem Gbadamosi` : "Azeem Gbadamosi" };
}

export default async function PlaygroundRoute(props: PageProps<"/visual-playground/[slug]">) {
  const { slug } = await props.params;
  const page = playgroundProjects[slug];
  if (!page) notFound();

  return (
    <main>
      <Page content={page}>
        <Related items={page.related ?? []} />
      </Page>
    </main>
  );
}

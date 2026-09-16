import { notFound } from "next/navigation";
import Page from "@/components/Page";
import { blogPosts } from "@/lib/content";

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const page = blogPosts[slug];
  return {
    title: page ? `${page.sections[0]?.heading ?? "Blog"} — Azeem Gbadamosi` : "Azeem Gbadamosi",
  };
}

export default async function BlogPostRoute(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const page = blogPosts[slug];
  if (!page) notFound();

  // blog posts lead with their title as the first section heading
  return (
    <main>
      <Page content={page} promoteFirstSection />
    </main>
  );
}

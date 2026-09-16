import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/lib/data";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post ? `${post.title} — Azeem Gbadamosi` : "Blog" };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <Reveal>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
        >
          <ArrowLeft size={15} />
          Back to list
        </Link>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-[var(--fg-muted)]">
          {post.date} by {post.author}
        </p>
      </Reveal>

      <div className="mt-10 space-y-5">
        {post.content.map((p, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <p className="leading-relaxed text-[var(--fg-muted)]">{p}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 border-t border-[var(--border)] pt-10">
        <Reveal>
          <h2 className="text-xl font-bold">Related posts</h2>
        </Reveal>
        <div className="mt-6 space-y-6">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.06}>
              <p className="text-xs text-[var(--fg-muted)]">{r.date}</p>
              <h3 className="mt-1 font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm text-[var(--fg-muted)]">{r.excerpt}</p>
              <Link
                href={`/blog/${r.slug}`}
                className="mt-2 inline-block text-sm font-semibold text-[var(--accent)]"
              >
                Read More →
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}

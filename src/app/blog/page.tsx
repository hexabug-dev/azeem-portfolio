import Link from "next/link";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/lib/data";

export const metadata = { title: "Blog — Azeem Gbadamosi" };

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Reveal>
        <h1 className="text-3xl font-bold md:text-5xl">Blog</h1>
      </Reveal>

      <div className="mt-14 space-y-6">
        {blogPosts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06}>
            <div className="card p-6">
              <p className="text-xs text-[var(--fg-muted)]">
                {post.date} by {post.author}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-[var(--accent)]"
              >
                Read More →
              </Link>
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

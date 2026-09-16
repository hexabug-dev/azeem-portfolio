import Page from "@/components/Page";
import { pages } from "@/lib/content";

export const metadata = { title: "Blog — Azeem Gbadamosi" };

export default function BlogIndex() {
  return (
    <main>
      <Page content={pages.blogIndex} />
    </main>
  );
}

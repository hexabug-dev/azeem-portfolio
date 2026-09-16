import Page from "@/components/Page";
import { pages } from "@/lib/content";

export const metadata = { title: "About — Azeem Gbadamosi" };

export default function About() {
  return (
    <main>
      <Page content={pages.about} />
    </main>
  );
}

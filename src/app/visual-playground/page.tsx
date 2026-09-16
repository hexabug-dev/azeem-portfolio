import Page from "@/components/Page";
import { pages } from "@/lib/content";

export const metadata = { title: "Playground — Azeem Gbadamosi" };

export default function Playground() {
  return (
    <main>
      <Page content={pages.playground} />
    </main>
  );
}

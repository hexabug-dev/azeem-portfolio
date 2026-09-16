import Page from "@/components/Page";
import { pages } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <Page content={pages.home} />
    </main>
  );
}

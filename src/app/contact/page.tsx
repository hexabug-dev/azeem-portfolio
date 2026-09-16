import Page from "@/components/Page";
import { pages } from "@/lib/content";

export const metadata = { title: "Contact — Azeem Gbadamosi" };

export default function Contact() {
  return (
    <main>
      <Page content={pages.contact} />
    </main>
  );
}

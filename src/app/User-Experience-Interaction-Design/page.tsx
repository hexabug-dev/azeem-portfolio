import Page from "@/components/Page";
import { pages } from "@/lib/content";

export const metadata = {
  title: "User Experience & Interaction Design Projects — Azeem Gbadamosi",
};

export default function WorkIndex() {
  return (
    <main>
      <Page content={pages.workIndex} />
    </main>
  );
}

import type { PageContent } from "@/components/Page";

import csPrixon from "@/content/cs-prixon.json";
import csEcitibiz from "@/content/cs-ecitibiz.json";
import csDelta from "@/content/cs-delta.json";
import csAnywork from "@/content/cs-anywork.json";
import csWaqtly from "@/content/cs-waqtly.json";
import csTlldt from "@/content/cs-tlldt.json";
import pgRiya from "@/content/pg-riya.json";
import pgAiSaturdays from "@/content/pg-ai-saturdays.json";
import pg3dCrypto from "@/content/pg-3d-crypto.json";
import blogFutureOfUx from "@/content/blog-future-of-ux.json";
import blogAccessibility from "@/content/blog-accessibility.json";
import home from "@/content/home.json";
import about from "@/content/about.json";
import contact from "@/content/contact.json";
import blogIndex from "@/content/blog-index.json";
import playground from "@/content/playground.json";
import workIndex from "@/content/work-index.json";

type Content = PageContent & { title: string; route: string };
const as = (p: unknown) => p as unknown as Content;

/** Case studies, keyed by the slug the source site uses. */
export const caseStudies: Record<string, Content> = {
  "prixon-inteface": as(csPrixon),
  "ecitibiz-case-study": as(csEcitibiz),
  "detla-state-igr": as(csDelta),
  "anywork-verification": as(csAnywork),
  "waqtly-product-suite": as(csWaqtly),
  tlldt: as(csTlldt),
};

export const playgroundProjects: Record<string, Content> = {
  "riya-kids-book-design": as(pgRiya),
  "AI-Saturdays": as(pgAiSaturdays),
  "3d-crypto-animation": as(pg3dCrypto),
};

export const blogPosts: Record<string, Content> = {
  "The-Future-of-UX": as(blogFutureOfUx),
  "designing-for-accessibility-a-ui": as(blogAccessibility),
};

export const pages = {
  home: as(home),
  about: as(about),
  contact: as(contact),
  blogIndex: as(blogIndex),
  playground: as(playground),
  workIndex: as(workIndex),
};

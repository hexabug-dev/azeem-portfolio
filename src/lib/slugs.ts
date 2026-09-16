import { caseStudies, playgroundProjects } from "@/lib/content";

const norm = (s: string) => s.replace(/\s+/g, " ").replace(/\s*-\s*/g, " - ").trim().toLowerCase();

const lookup = (map: Record<string, { header: { h1: string } }>, title: string) =>
  Object.entries(map).find(([, p]) => norm(p.header.h1) === norm(title))?.[0] ?? null;

export const caseStudyTitleToSlug = (title: string) => lookup(caseStudies, title);
export const playgroundTitleToSlug = (title: string) => lookup(playgroundProjects, title);

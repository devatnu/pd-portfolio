import type { Project } from "@/content/projects";
export const projectHref = (p: Project) => p.external ?? `/work/${p.slug}`;
export const isExternal = (p: Project) => Boolean(p.external);

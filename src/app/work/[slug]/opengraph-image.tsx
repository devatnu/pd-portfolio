import { renderOg, ogSize } from "@/lib/og";
import { getProject, projects } from "@/content/projects";

export const alt = "Case study cover";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.filter((p) => !p.external).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return renderOg({
    eyebrow: `№ ${p?.index ?? ""} · Case study`,
    title: p?.title ?? "Case study",
    footer: p ? `${p.sector} · ${p.year}` : "",
  });
}

import { renderOg, ogSize } from "@/lib/og";
import { person } from "@/content/site";

export const alt = `${person.name}, ${person.jobTitle}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: person.status,
    title: "Design built at AI speed. Without losing the craft.",
    footer: `${person.jobTitle} · ${person.location}`,
  });
}

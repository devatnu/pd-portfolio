import { person } from "./site";

export type HeadlineSegment =
  | { text: string; italic?: boolean; muted?: boolean; mark?: boolean }
  | { break: true };

export const hero = {
  eyebrow: person.status,
  // TODO: H1 option A. Swap for B or C by editing these segments.
  //   B: "An AI-first product designer." / "Figma for the thinking, AI for the velocity."
  //   C: "I design products with AI in the loop, end to end."
  headline: [
    { text: "Design built at" },
    { text: "AI speed.", italic: true },
    { break: true },
    { text: "Without losing the", muted: true },
    { text: "craft.", italic: true, mark: true },
  ] satisfies HeadlineSegment[] as HeadlineSegment[],
  // TODO: tighten copy
  intro:
    "Product design manager, 8+ years across fintech, edtech and commerce. AI runs through my whole loop, from research synthesis to working prototypes, but the screens are still designed, not generated.",
  proof: ["Figma", "Design leadership", "Interaction design", "Prototyping", "Claude"],
  portrait: {
    src: "/shubham-soni.png",
    alt: "Shubham Soni, smiling, with a beard and a dark button-up shirt, photographed in black and white against a black background",
  },
  // "AI at work" card on the portrait. Steps alternate tools; edit freely. TODO: tune copy
  workflow: [
    { tool: "figma", label: "Figma", action: "Sketching the flow" },
    { tool: "claude", label: "Claude", action: "Synthesising 42 interviews" },
    { tool: "figma", label: "Figma", action: "Refining 12 variants" },
    { tool: "claude", label: "Claude", action: "Shipping the front-end" },
  ] as { tool: "figma" | "claude"; label: string; action: string }[],
  ctaPrimary: { label: "See selected work", href: "/#work" },
  ctaSecondary: { label: "Let's talk", href: "/#contact" },
};

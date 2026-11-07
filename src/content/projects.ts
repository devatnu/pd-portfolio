/**
 * Selected work. Add a project by adding one object to `projects`.
 * - Projects show in one horizontal carousel. `featured: true` puts it first with a badge
 *   (first match wins; if a filter hides it, the first visible project leads).
 * - Give it a case study in src/content/cases.ts, or set `external` to link out.
 * - Images live in /public/work. Covers ~1600×1000, thumbs ~480×360.
 */
export type Project = {
  slug: string;
  index: string; // "01"
  title: string;
  summary: string; // one line
  tags: string[];
  year: string;
  role: string;
  sector: string;
  cover: string;
  thumb: string;
  featured: boolean;
  external?: string; // link out instead of an internal case page
};

export const filters = ["All", "AI", "Fintech", "Consumer", "Design systems"] as const;
export type Filter = (typeof filters)[number];

// SAMPLE projects: fictional placeholders. TODO: replace with real work.
export const projects: Project[] = [
  {
    slug: "ledgerly",
    index: "01",
    title: "Ledgerly",
    summary: "A credit-builder app that turns rent and bill payments into a credit history.",
    tags: ["Fintech", "AI"],
    year: "2026",
    role: "Lead Product Designer",
    sector: "Fintech",
    cover: "/work/ledgerly-cover.jpg",
    thumb: "/work/ledgerly-thumb.jpg",
    featured: true,
  },
  {
    slug: "pebble-pay",
    index: "02",
    title: "Pebble Pay",
    summary: "Split bills and settle up in two taps, without the awkward reminders.",
    tags: ["Fintech", "Consumer"],
    year: "2025",
    role: "Product Designer",
    sector: "Payments",
    cover: "/work/pebble-pay-cover.jpg",
    thumb: "/work/pebble-pay-thumb.jpg",
    featured: false,
  },
  {
    slug: "atlas-design-system",
    index: "03",
    title: "Atlas Design System",
    summary: "One token-based system shipping a single UI to iOS, Android and web.",
    tags: ["Design systems"],
    year: "2025",
    role: "Design Systems Lead",
    sector: "Platform",
    cover: "/work/atlas-design-system-cover.jpg",
    thumb: "/work/atlas-design-system-thumb.jpg",
    featured: false,
  },
  {
    slug: "muse-notes",
    index: "04",
    title: "Muse Notes",
    summary: "An AI writing companion that turns voice memos into structured notes.",
    tags: ["AI", "Consumer"],
    year: "2024",
    role: "Product Designer",
    sector: "Productivity",
    cover: "/work/muse-notes-cover.jpg",
    thumb: "/work/muse-notes-thumb.jpg",
    featured: false,
  },
  {
    slug: "harvest",
    index: "05",
    title: "Harvest",
    summary: "A grocery app that plans the week's meals around what's on sale.",
    tags: ["Consumer"],
    year: "2023",
    role: "Senior Product Designer",
    sector: "Grocery",
    cover: "/work/harvest-cover.jpg",
    thumb: "/work/harvest-thumb.jpg",
    featured: false,
  },
  {
    slug: "northstar-insights",
    index: "06",
    title: "Northstar Insights",
    summary: "An AI research assistant that clusters interviews into themes and quotes.",
    tags: ["AI", "Design systems"],
    year: "2024",
    role: "Design Lead",
    sector: "Research tools",
    cover: "/work/northstar-insights-cover.jpg",
    thumb: "/work/northstar-insights-thumb.jpg",
    featured: false,
  },
  {
    slug: "kinetic",
    index: "07",
    title: "Kinetic",
    summary: "A habit-first workout app built around ten-minute sessions.",
    tags: ["Consumer"],
    year: "2022",
    role: "Product Designer",
    sector: "Health & fitness",
    cover: "/work/kinetic-cover.jpg",
    thumb: "/work/kinetic-thumb.jpg",
    featured: false,
  },
  {
    slug: "vault-business",
    index: "08",
    title: "Vault Business",
    summary: "Cash-flow dashboard and invoicing for small businesses.",
    tags: ["Fintech", "Design systems"],
    year: "2021",
    role: "Product Designer",
    sector: "SME banking",
    cover: "/work/vault-business-cover.jpg",
    thumb: "/work/vault-business-thumb.jpg",
    featured: false,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

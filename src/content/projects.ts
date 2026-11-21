/**
 * Selected work. Add a project by adding one object to `projects`.
 * - Projects show in one horizontal carousel. `featured: true` puts it first with a badge
 *   (first match wins; if a filter hides it, the first visible project leads).
 * - Give it a case study in src/content/cases.ts, or set `external` to link out.
 * - Images live in /public/work:
 *     cover  ~2000×1000 (2:1)  top of the case page
 *     card   ~1200×1500 (4:5)  carousel card; keep the subject in the top half, text sits over the bottom
 *     thumb  ~960×720  (4:3)   "Next case" link at the bottom of a case page
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
  card: string;
  thumb: string;
  featured: boolean;
  external?: string; // link out instead of an internal case page
};

export const filters = ["All", "Android", "iOS"] as const;
export type Filter = (typeof filters)[number];

export const projects: Project[] = [
  {
    slug: "embedded-insurance",
    index: "01",
    title: "Embedded Insurance",
    summary: "Adding a small insurance plan to a loan offer, without putting the loan itself at risk.",
    tags: ["Fintech", "Android"],
    year: "2026",
    role: "Product Designer, design owner",
    sector: "Lending",
    cover: "/work/embedded-insurance-cover.jpg",
    card: "/work/embedded-insurance-card.jpg",
    thumb: "/work/embedded-insurance-thumb.jpg",
    featured: true,
  },
  {
    slug: "upi-autopay",
    index: "02",
    title: "UPI AutoPay",
    summary: "Rebuilding EMI AutoPay setup around the choice borrowers were already making.",
    tags: ["Fintech", "Android"],
    year: "2026",
    role: "Product Designer, design lead",
    sector: "Payments",
    cover: "/work/upi-autopay-cover.jpg",
    card: "/work/upi-autopay-card.jpg",
    thumb: "/work/upi-autopay-thumb.jpg",
    featured: false,
  },
  {
    slug: "video-kyc-ios",
    index: "03",
    title: "Video KYC on iOS",
    summary: "Making identity verification clearer and more predictable for people taking a loan on their phone.",
    tags: ["Fintech", "iOS"],
    year: "2026",
    role: "Product Designer, design lead",
    sector: "Identity",
    cover: "/work/video-kyc-ios-cover.jpg",
    card: "/work/video-kyc-ios-card.jpg",
    thumb: "/work/video-kyc-ios-thumb.jpg",
    featured: false,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

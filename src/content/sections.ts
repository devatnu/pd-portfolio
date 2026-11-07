/** Copy for sections № 02, 04, 05, 06, 07, 08. Edit freely; components only read from here. */

// ── № 02 What I do ────────────────────────────────────────────────────────
export const whatIDo = {
  kicker: "I turn messy product problems into interfaces people trust with their money and time.",
  // TODO: review copy with Shubham
  paragraphs: [
    "Most of my work sits where the stakes are high and the patience is low: lending, payments, ordering, exam prep. Places where one confusing screen costs a user, and a support ticket costs the business.",
    "I lead product design from problem to shipped experience: framing the question, shaping the flows, setting the bar for interaction and visual craft, and growing the designers who do the work with me.",
    "AI sits in the loop, not on top. I use it to synthesise research faster, explore more variations than a sprint would allow, draft specs, and prototype ideas that feel real. The judgement, the taste, and the final pixels are still ours.",
  ],
};

// ── № 04 About ────────────────────────────────────────────────────────────
export const about = {
  kicker: "I'm a UXer. I design sandwiches.",
  // TODO: review narrative with Shubham; facts below come from his LinkedIn profile
  paragraphs: [
    "I've been designing products since 2018, across agritech, edtech, commerce and fintech. Different industries, same job: make something complicated feel simple enough to trust.",
    "I started as a UI/UX designer at FarmGuide, spent close to three years designing exam-prep learning at Gradeup (later BYJU's Exam Prep), and designed digital ordering and payments for merchants at DotPe.",
    "Since 2022 I've led product design at Balancehero India, the company behind True Balance, first as Product Design Manager and, since January 2025, as Senior Product Design Manager.",
  ],
};

// ── № 05 Experience ───────────────────────────────────────────────────────
export type Role = { years: string; company: string; role: string; location?: string; bullets: string[] };

// Titles, companies, dates and locations are from Shubham's LinkedIn profile.
// TODO: bullets are drafts; replace with real scope and outcomes.
export const experience: Role[] = [
  {
    years: "2025-Now",
    company: "Balancehero India",
    role: "Senior Product Design Manager",
    location: "Gurugram, India",
    bullets: [
      "Leads product design for True Balance, a fintech app for lending and credit in India.",
      "Sets the design direction and quality bar across product teams.",
      "Brings AI into the design workflow, from research synthesis to prototyping.",
    ],
  },
  {
    years: "2022-2025",
    company: "Balancehero India",
    role: "Product Design Manager",
    location: "Gurugram, India",
    bullets: [
      "Managed product design across True Balance's core borrowing journeys.",
      "Grew and mentored the product design team.",
      "Partnered with product and engineering from problem framing to launch.",
    ],
  },
  {
    years: "2021-2022",
    company: "DotPe",
    role: "Senior Product Designer",
    location: "Gurugram, India",
    bullets: [
      "Designed digital ordering and payment experiences for merchants and their customers.",
      "Owned end-to-end flows from research to high-fidelity design.",
      "Worked closely with engineering to ship and iterate quickly.",
    ],
  },
  {
    years: "2018-2021",
    company: "Gradeup (BYJU's Exam Prep)",
    role: "Senior Product UI/UX Designer",
    location: "Noida, India",
    bullets: [
      "Designed learning and exam-prep experiences for students across India.",
      "Shaped interfaces for courses, practice and live learning.",
      "Built consistency across the product's UI as it scaled.",
    ],
  },
  {
    years: "2018",
    company: "FarmGuide India",
    role: "UI/UX Designer",
    location: "Gurgaon, India",
    bullets: [
      "Designed interfaces for agritech products.",
      "Turned complex data into screens people could act on.",
      "Prototyped and tested early product ideas.",
    ],
  },
];

export const education = [
  { years: "2011-2016", degree: "University of Delhi", school: "Undergraduate studies" }, // TODO: add degree name
  { years: "2008-2010", degree: "Sanskriti Sr. Sec. School", school: "Senior secondary education" },
];

// ── № 06 Expertise ────────────────────────────────────────────────────────
// TODO: confirm with Shubham; top skills from LinkedIn are UI design, interaction design and UI prototyping
export const expertise = [
  {
    title: "User interface design",
    skills: ["Visual hierarchy & layout", "Typography & colour", "Mobile-first fintech UI", "Pixel-level craft"],
  },
  {
    title: "AI-assisted design",
    highlight: true,
    skills: [
      "Claude: interview notes → themes and insights in hours",
      "Figma AI + Claude: copy and layout variants per screen",
      "Claude: PRDs, specs and edge-case lists, then edited by hand",
      "AI prototypes to test ideas before a sprint commits",
    ],
  },
  {
    title: "Interaction design",
    skills: ["Flows & information architecture", "Micro-interactions", "States, errors & edge cases", "Accessibility"],
  },
  {
    title: "Prototyping",
    skills: ["Figma prototypes", "Motion & transitions", "Usability testing", "Rapid iteration"],
  },
  {
    title: "Design leadership",
    skills: ["Building & mentoring teams", "Design reviews & quality bar", "Hiring", "Stakeholder alignment"],
  },
  {
    title: "Product thinking",
    skills: ["Problem framing", "Funnels & behavioural data", "Prioritisation", "Fintech, edtech & commerce"],
  },
];

// ── № 07 FAQ ──────────────────────────────────────────────────────────────
// TODO: review answers with Shubham
export const faqs = [
  {
    q: "What does “AI-first” actually mean in your work?",
    teaser: "AI does the volume. Designers do the judgement.",
    a: "I use AI wherever the work is volume rather than judgement: clustering research, generating variations, drafting specs and edge cases, and prototyping. That frees time for the parts that need a designer: framing the problem, choosing between options, and polishing the final screens.",
  },
  {
    q: "Are you open to new roles?",
    teaser: "Yes, design leadership roles.",
    a: "I'm open to senior product design and design leadership roles, especially in fintech and consumer products. I'm based in Gurugram and comfortable working with distributed teams.", // TODO: confirm
  },
  {
    q: "Do you still design, or only manage?",
    teaser: "Both. I stay close to the pixels.",
    a: "Both. I lead the team and the direction, but I still get into Figma, review interactions in detail, and prototype ideas myself. Craft is easier to protect when you still practise it.",
  },
  {
    q: "How do you work with product managers and engineers?",
    teaser: "Early, often, and in their tools.",
    a: "I bring engineers in at the problem stage, not the handoff stage. Designers write specs alongside PMs, annotate edge cases in Figma, and review builds in staging. Fewer surprises, faster sprints.",
  },
  {
    q: "Which industries have you designed for?",
    teaser: "Fintech, edtech, commerce and agritech.",
    a: "Lending and credit at True Balance, ordering and payments at DotPe, exam prep at Gradeup (BYJU's Exam Prep), and agritech at FarmGuide. The domains change; the job of making complex things feel simple doesn't.",
  },
  {
    q: "What's the fastest way to reach you?",
    teaser: "Book a call, or email me.",
    a: "Book a 20-minute intro call using the button below, or email me directly. I usually reply within a day.",
  },
];

// ── № 08 Contact ──────────────────────────────────────────────────────────
export const contact = {
  headlines: [
    "Let's build something people actually use.",
    "Have a messy problem? Good.",
    "Need a designer who ships?",
  ],
  // TODO: tweak
  blurb: "Hiring for a product design role, or building something and need a designer who ships? I'd love to hear about it.",
  cta: "Book a 20-min call",
};

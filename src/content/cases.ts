/**
 * Case study bodies, keyed by project slug. The /work/[slug] template renders these blocks
 * in order. A project without an entry here still gets a page (header + cover + "write-up
 * in progress" note) unless it has `external` set.
 */
export type CaseBlock =
  | { type: "text"; label: string; heading: string; body: string[] }
  | { type: "image"; src: string; alt: string; caption?: string; wide?: boolean }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; label: string; heading: string; items: { title: string; body: string }[] };

export type CaseStudy = {
  timeline: string;
  team: string;
  intro: string;
  outcomes: { value: string; label: string }[];
  blocks: CaseBlock[];
};

// SAMPLE case study: fictional project and numbers, here to show the template. TODO: replace.
export const cases: Record<string, CaseStudy> = {
  ledgerly: {
    timeline: "6 months",
    team: "2 designers, 1 PM, 6 engineers",
    intro:
      "Ledgerly helps people with thin credit files build a history from payments they already make: rent, phone and utility bills. The product existed as a web beta; the brief was to turn it into a mobile app people would trust with their bank details.",
    outcomes: [
      { value: "41%", label: "More users completing bank connection" },
      { value: "2.3x", label: "Increase in monthly active users" },
      { value: "-28%", label: "Fewer support tickets about payments" },
      { value: "4.7", label: "App store rating after launch" },
    ],
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "Credit is a trust problem before it is a finance problem.",
        body: [
          "Most of Ledgerly's users had been turned down for credit before. They were wary of any app asking for bank access, and many had been burned by hidden fees.",
          "The business needed two things: more people completing the bank connection step, and fewer people dropping off once they saw how long building a score takes.",
        ],
      },
      { type: "image", src: "/work/ledgerly-cover.jpg", alt: "Ledgerly app overview (placeholder image)", caption: "Placeholder image: replace with real screens", wide: true },
      {
        type: "text",
        label: "Problem",
        heading: "Two drop-offs: connecting a bank, and waiting for results.",
        body: [
          "Funnel data showed a steep drop at the bank connection screen. Session recordings showed why: people hesitated when asked for access before they understood what Ledgerly would do with it.",
          "After connecting, progress felt invisible. A credit score moves slowly, so users assumed nothing was happening and left.",
        ],
      },
      {
        type: "list",
        label: "Approach",
        heading: "What changed, and why.",
        items: [
          {
            title: "Value first, permissions second",
            body: "The onboarding now shows a personalised preview of how rent payments could count toward a score before asking for bank access.",
          },
          {
            title: "Progress you can see",
            body: "A monthly timeline shows every payment reported, so users can see the history building long before the score moves.",
          },
          {
            title: "One system, three platforms",
            body: "A shared token and component library kept iOS, Android and web consistent and cut design QA time.",
          },
        ],
      },
      {
        type: "quote",
        text: "The fastest way to reduce support tickets is to answer the question before the user has to ask it.",
        cite: "Team design principle",
      },
      {
        type: "text",
        label: "AI in the loop",
        heading: "Faster, without making it generic.",
        body: [
          "AI clustered hundreds of support tickets and interview notes into themes in an afternoon, a job that used to take a week. It also generated copy and layout variants, which the team cut down to the few worth testing.",
          "Every screen that shipped was still designed and reviewed by hand.",
        ],
      },
      { type: "image", src: "/work/atlas-design-system-cover.jpg", alt: "Design system components (placeholder image)", caption: "Placeholder image: replace with design system screens" },
      {
        type: "text",
        label: "Reflection",
        heading: "What I'd do next.",
        body: [
          "Set up a shared metrics dashboard earlier, so design decisions are tied to outcomes from the first sprint. And test the payment timeline pattern in onboarding too: the same visibility that reduced tickets might also lift conversion.",
        ],
      },
    ],
  },
};

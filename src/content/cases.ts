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

// SAMPLE case studies: fictional projects and numbers, here to show the template. TODO: replace.
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
  "pebble-pay": {
    timeline: "4 months",
    team: "1 designer, 1 PM, 4 engineers",
    intro:
      "Pebble Pay is a group payments app for friends who share rent, trips and dinners. People loved splitting bills in it, but far fewer ever settled up, which is where the business made its money.",
    outcomes: [
      { value: "63%", label: "Of splits now settled within a week" },
      { value: "2 taps", label: "From reminder to payment" },
      { value: "-35%", label: "Fewer 'who owes what' disputes reported" },
      { value: "1.8x", label: "Growth in weekly settled volume" },
    ],
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "Splitting is easy. Asking a friend for money is not.",
        body: [
          "Interviews kept surfacing the same feeling: people didn't mind owing money, they minded being the one who had to ask for it back. So debts sat open for weeks, and the app quietly became a ledger of awkwardness.",
          "The goal was to make settling up feel as light as splitting, without turning the app into a debt collector.",
        ],
      },
      { type: "image", src: "/work/pebble-pay-cover.jpg", alt: "Pebble Pay group balance screen (placeholder image)", caption: "Placeholder image: replace with real screens", wide: true },
      {
        type: "list",
        label: "Approach",
        heading: "Taking the person out of the reminder.",
        items: [
          { title: "Nudges from the app, not from friends", body: "Reminders come from Pebble on a gentle schedule, so nobody has to send the awkward message themselves." },
          { title: "Settle up from the notification", body: "The reminder carries the amount and a pay button. Two taps from lock screen to settled." },
          { title: "A shared, readable history", body: "Every expense shows who added it, when, and how it was split, which ended most disputes before they started." },
        ],
      },
      { type: "quote", text: "Nobody wants to be the friend who asks for money. So we made sure nobody has to.", cite: "Design principle" },
      {
        type: "text",
        label: "AI in the loop",
        heading: "Getting the tone right, at scale.",
        body: [
          "Reminder tone mattered more than timing. AI generated dozens of reminder copy variants across levels of friendliness; we tested five with users and shipped two. It also summarised hundreds of app store reviews into the top friction themes in an hour.",
        ],
      },
      {
        type: "text",
        label: "Reflection",
        heading: "What I'd do next.",
        body: ["Explore recurring splits for rent and subscriptions, where the same awkwardness repeats every month and automation would help most."],
      },
    ],
  },
  "atlas-design-system": {
    timeline: "9 months",
    team: "3 designers, 4 engineers across platforms",
    intro:
      "Atlas is the design system behind a multi-product company with separate iOS, Android and web teams. Before it, each team kept its own components, and the same button existed in eleven slightly different versions.",
    outcomes: [
      { value: "11 → 1", label: "Button variants consolidated" },
      { value: "-40%", label: "Design QA time per release" },
      { value: "3", label: "Platforms shipping from one set of tokens" },
      { value: "90%", label: "Of new screens built from Atlas components" },
    ],
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "Three platforms, three dialects of the same product.",
        body: [
          "Every platform team was moving fast, and every one had quietly drifted. Colours were close but not equal, spacing was negotiated per screen, and design reviews spent more time on inconsistencies than on ideas.",
        ],
      },
      { type: "image", src: "/work/atlas-design-system-cover.jpg", alt: "Atlas token and component overview (placeholder image)", caption: "Placeholder image: replace with system screens", wide: true },
      {
        type: "list",
        label: "Approach",
        heading: "Treating the system as a product.",
        items: [
          { title: "Tokens first", body: "Colour, type, spacing and motion became named tokens that compile to iOS, Android and web, so a change ships everywhere at once." },
          { title: "Fewer, stronger components", body: "We audited every screen, merged near-duplicates, and documented when to use each component and when not to." },
          { title: "Adoption as a metric", body: "We tracked how many new screens used Atlas components and paired with teams that lagged, instead of mandating it." },
        ],
      },
      { type: "quote", text: "A design system is only as good as the screens people actually build with it.", cite: "Atlas team" },
      {
        type: "text",
        label: "AI in the loop",
        heading: "Audits in days, not weeks.",
        body: [
          "AI helped audit hundreds of screens for colour and spacing values that didn't match any token, and drafted first versions of component documentation that designers then edited.",
        ],
      },
      {
        type: "text",
        label: "Reflection",
        heading: "What I'd do next.",
        body: ["Add accessibility checks to the token pipeline, so contrast issues are caught before a component ever reaches a screen."],
      },
    ],
  },
  "muse-notes": {
    timeline: "5 months",
    team: "1 designer, 1 PM, 3 engineers, 1 ML engineer",
    intro:
      "Muse Notes turns rambling voice memos into clean, structured notes. The AI was already good at transcription; the design challenge was making people trust what it wrote on their behalf.",
    outcomes: [
      { value: "3.1x", label: "More memos recorded per active user" },
      { value: "72%", label: "Of AI notes kept without edits" },
      { value: "-50%", label: "Time from recording to a usable note" },
      { value: "48%", label: "Day-30 retention, up from 29%" },
    ],
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "People don't trust a summary they can't check.",
        body: [
          "Early users liked the idea but rarely relied on it. When the AI summarised a memo, they couldn't tell what had been left out, so they replayed the audio anyway.",
        ],
      },
      { type: "image", src: "/work/muse-notes-cover.jpg", alt: "Muse Notes memo-to-note screen (placeholder image)", caption: "Placeholder image: replace with real screens", wide: true },
      {
        type: "list",
        label: "Approach",
        heading: "Designing for trust in AI output.",
        items: [
          { title: "Every line links to the moment", body: "Tap any sentence in a note to hear the exact part of the recording it came from." },
          { title: "Show confidence, quietly", body: "Phrases the model was unsure about are lightly underlined, inviting a check without shouting." },
          { title: "Structure you can choose", body: "The same memo can become a to-do list, a summary or meeting notes, with one tap to switch." },
        ],
      },
      { type: "quote", text: "The best AI feature is the one people stop double-checking.", cite: "Design principle" },
      {
        type: "text",
        label: "Reflection",
        heading: "What I'd do next.",
        body: ["Let people correct the AI in place and have it learn their names, jargon and preferred formats over time."],
      },
    ],
  },
  harvest: {
    timeline: "6 months",
    team: "2 designers, 1 PM, 5 engineers",
    intro:
      "Harvest is a grocery app for busy families. Basket sizes were healthy, but most people shopped item by item and churned after a few weeks. The bet: plan the week, and the shopping follows.",
    outcomes: [
      { value: "+24%", label: "Average basket size" },
      { value: "38%", label: "Of orders now start from a meal plan" },
      { value: "-18%", label: "Monthly churn" },
      { value: "12 min", label: "Saved per weekly shop (self-reported)" },
    ],
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "Nobody wants to go grocery shopping. They want dinner sorted.",
        body: [
          "Diary studies showed the real job wasn't buying groceries; it was answering 'what are we eating this week?' The shopping list was a side effect of that decision.",
        ],
      },
      { type: "image", src: "/work/harvest-cover.jpg", alt: "Harvest weekly meal plan (placeholder image)", caption: "Placeholder image: replace with real screens", wide: true },
      {
        type: "list",
        label: "Approach",
        heading: "From meals to basket in one flow.",
        items: [
          { title: "Plans built around deals", body: "Weekly meal ideas are generated from what's on offer, so planning also saves money." },
          { title: "One tap to basket", body: "Choose meals, adjust servings, and every ingredient lands in the basket, merged and de-duplicated." },
          { title: "Swaps, not dead ends", body: "Out-of-stock items suggest a sensible swap instead of breaking the recipe." },
        ],
      },
      { type: "quote", text: "Design for the decision, not the transaction.", cite: "Harvest team" },
      {
        type: "text",
        label: "Reflection",
        heading: "What I'd do next.",
        body: ["Learn household preferences over time, so the plan gets better each week without people having to set anything up."],
      },
    ],
  },
  "northstar-insights": {
    timeline: "4 months",
    team: "1 designer, 1 PM, 3 engineers",
    intro:
      "Northstar is an internal research tool that helps product teams turn interview transcripts into themes, quotes and decisions. Research existed; it just never left the researcher's laptop.",
    outcomes: [
      { value: "5 days → 1", label: "From interviews to a shareable synthesis" },
      { value: "4x", label: "More teams reading research each month" },
      { value: "300+", label: "Interviews indexed and searchable" },
      { value: "86%", label: "Of AI themes kept after researcher review" },
    ],
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "Research was valuable and invisible.",
        body: [
          "Researchers spent most of their time tagging transcripts by hand. By the time a synthesis was ready, the team had often already decided. And older insights were impossible to find.",
        ],
      },
      { type: "image", src: "/work/northstar-insights-cover.jpg", alt: "Northstar theme board (placeholder image)", caption: "Placeholder image: replace with real screens", wide: true },
      {
        type: "list",
        label: "Approach",
        heading: "AI drafts, researchers decide.",
        items: [
          { title: "Draft themes in minutes", body: "AI clusters transcripts into candidate themes with supporting quotes; researchers merge, split and rename." },
          { title: "Every claim has a quote", body: "A theme can't be published without linked evidence, which kept the AI honest and the insights credible." },
          { title: "Search across everything", body: "Teams can ask 'what do users say about onboarding?' and get quotes from every study, old and new." },
        ],
      },
      { type: "quote", text: "If a theme can't point to a quote, it isn't an insight yet.", cite: "Research principle" },
      {
        type: "text",
        label: "Reflection",
        heading: "What I'd do next.",
        body: ["Connect insights to the roadmap, so every feature can show the research behind it."],
      },
    ],
  },
  kinetic: {
    timeline: "5 months",
    team: "2 designers, 1 PM, 4 engineers",
    intro:
      "Kinetic is a fitness app for people who don't think of themselves as fitness people. Sign-ups were strong; by week three, most had stopped. The redesign focused on the habit, not the workout.",
    outcomes: [
      { value: "2.4x", label: "Week-4 retention" },
      { value: "10 min", label: "Default session length, down from 35" },
      { value: "61%", label: "Of users completing 3+ sessions a week" },
      { value: "4.8", label: "App store rating" },
    ],
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "The workout wasn't the problem. Starting was.",
        body: [
          "Users told us the hardest part was opening the app at all. Thirty-minute workouts felt like a commitment, so missing one felt like failing, and failing made people quit.",
        ],
      },
      { type: "image", src: "/work/kinetic-cover.jpg", alt: "Kinetic daily session screen (placeholder image)", caption: "Placeholder image: replace with real screens", wide: true },
      {
        type: "list",
        label: "Approach",
        heading: "Making the smallest step feel like a win.",
        items: [
          { title: "Ten minutes by default", body: "Every session starts at ten minutes, with an option to keep going once you're warmed up." },
          { title: "Streaks that forgive", body: "One missed day doesn't break a streak, so a bad day doesn't end the habit." },
          { title: "Progress in plain language", body: "'You've moved 4 days this week' instead of charts most people never read." },
        ],
      },
      { type: "quote", text: "Design for the person on their worst day, not their best one.", cite: "Kinetic team" },
      {
        type: "text",
        label: "Reflection",
        heading: "What I'd do next.",
        body: ["Add social accountability for small groups, without turning exercise into a leaderboard."],
      },
    ],
  },
  "vault-business": {
    timeline: "7 months",
    team: "2 designers, 2 PMs, 7 engineers",
    intro:
      "Vault Business gives small business owners a clear view of their cash flow and a fast way to get paid. Most of them aren't accountants, and the old dashboard assumed they were.",
    outcomes: [
      { value: "-9 days", label: "Average time to get an invoice paid" },
      { value: "52%", label: "Of users checking cash flow weekly" },
      { value: "+31%", label: "Invoices sent through the app" },
      { value: "-22%", label: "Support calls about balances" },
    ],
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "Owners don't want reports. They want to know if they're okay.",
        body: [
          "The old dashboard was full of charts, but owners kept calling support with one question: will I have enough money at the end of the month?",
        ],
      },
      { type: "image", src: "/work/vault-business-cover.jpg", alt: "Vault Business cash-flow dashboard (placeholder image)", caption: "Placeholder image: replace with real screens", wide: true },
      {
        type: "list",
        label: "Approach",
        heading: "Answer the question first, show the detail second.",
        items: [
          { title: "A forecast up top", body: "The home screen leads with a simple projection of the month-end balance, with the reasons underneath." },
          { title: "Invoices that chase themselves", body: "Polite automatic reminders and one-tap payment links cut the time to get paid." },
          { title: "A system for dense data", body: "Tables, charts and states built as reusable components, so new reports took days instead of weeks." },
        ],
      },
      { type: "quote", text: "The best dashboard answers one question before it shows a single chart.", cite: "Design principle" },
      {
        type: "text",
        label: "Reflection",
        heading: "What I'd do next.",
        body: ["Turn the forecast into suggestions, such as when to chase an invoice or delay a payment, written in plain language."],
      },
    ],
  },
};

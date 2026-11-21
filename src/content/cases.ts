/**
 * Case study bodies, keyed by project slug. The /work/[slug] template renders these blocks
 * in order. A project without an entry here still gets a page (header + cover + "write-up
 * in progress" note) unless it has `external` set.
 *
 * Copy and numbers come from the designer's case study PDFs (with a "numbers" PDF behind each
 * one that explains how every figure was counted). Change a number here only if it changes there.
 *
 * Blocks:
 * - text   label + heading + paragraphs. Leave label/heading out to continue the section above.
 * - list   numbered points (or a custom `marker` per item, like "On open").
 * - stats  a row of number cards.
 * - bars   a horizontal bar chart; one value per row, or several with a `legend`.
 * - image  a figure; `quote` a pull quote.
 * Set `tight: true` on a block to keep it close to the one before (same section).
 */
type Base = { tight?: boolean };
export type CaseBlock = Base &
  (
    | { type: "text"; label?: string; heading?: string; body: string[]; note?: string }
    | { type: "image"; src: string; alt: string; caption?: string; wide?: boolean }
    | { type: "quote"; text: string; cite?: string }
    | { type: "list"; label: string; heading: string; intro?: string; items: { title: string; body: string; marker?: string }[] }
    | { type: "stats"; items: { value: string; label: string; kicker?: string }[]; note?: string }
    | {
        type: "bars";
        title: string;
        sub?: string;
        legend?: string[]; // one name per series; the last series is highlighted
        max?: number; // scale; defaults to the largest value
        rows: { label: string; values: number[]; display: string[] }[];
      }
  );

export type CaseStudy = {
  details: { k: string; v: string }[]; // shown after Year and Role at the top of the page
  coverCaption?: string;
  intro: string;
  outcomes: { value: string; label: string }[];
  outcomesNote?: string;
  blocks: CaseBlock[];
};

export const cases: Record<string, CaseStudy> = {
  "embedded-insurance": {
    details: [
      { k: "Platform", v: "Android" },
      { k: "Launched", v: "September 2026" },
      { k: "Worked with", v: "Product and Engineering" },
    ],
    coverCaption:
      "Ticking the box on the offer card rolls the EMI up in place. People who skip it get one more sheet, and ticking there brings up the EMI popup. Simplified; loan amounts are illustrative, the plan price and cover are real.",
    intro:
      "Anyone taking a loan with True Balance can now add a small insurance plan with health benefits and accident cover, paid through their EMIs. The business wanted to find out whether insurance could grow into a real line of revenue. My job was to make it something people could choose with full knowledge, without getting in the way of the loan they came for.",
    outcomes: [
      { value: "38.6%", label: "Of loans that could show insurance ended up with it" },
      { value: "−0.38%", label: "In loans disbursed after adding insurance, compared with users who never saw it" },
      { value: "33%", label: "Of people who skipped it added it at the second prompt" },
      { value: "₹1.07 Cr", label: "Premium collected from launch to 18 November, including GST" },
    ],
    outcomesNote: "Android only. Adoption, second prompt and premium: 30 Sep to 18 Nov 2026.",
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "A lending business testing a second line of revenue.",
        body: [
          "True Balance lends small amounts to people in Tier 2 and 3 cities. Many of them are borrowing formally for the first time and aren’t yet at ease with financial apps. Insurance, issued by a partner and sold alongside the loan, was the company’s way of testing whether add on products could become a business of their own.",
          "Two things were settled before design began. The customer’s decision had to come through a consent checkbox, not a button, to meet regulation. And the loan journey couldn’t take a hit. Product set those guardrails with me; I owned the design and took it through to development.",
        ],
      },
      {
        type: "text",
        label: "Problem",
        heading: "The worst place to add a choice is right before the money.",
        body: [
          "People first see a list of loan offers, each with a range, say ₹1,000 to ₹17,000. Choosing one opens the final approved amount sheet, where they pick exactly how much to borrow, up to the top of that range but never above it. This is the moment they commit, and it’s the same sheet where insurance appears. Any extra decision here can make someone hesitate, and hesitation on this screen means loans that never go out.",
          "The product itself raised the stakes. Nothing is paid upfront. The premium is added to the loan, the amount that reaches the account stays the same, and the cost is collected bit by bit through a higher monthly EMI. Because the amount they’ll receive doesn’t change at all, the price is easy to miss unless the screen points straight at it.",
          "On top of that, the plan can’t be cancelled once bought, and the consent rule took away the usual shortcut of a big Add button. People needed to see clearly that their EMI was going up and by how much, and saying no had to cost them nothing.",
        ],
      },
      {
        type: "list",
        label: "Approach",
        heading: "Make yes an informed choice, and no just as easy.",
        intro:
          "I didn’t treat this as a sales moment. I treated it as a decision the borrower makes, and held every screen to two rules: the loan comes first, and nothing is added unless the person chooses it.",
        items: [
          {
            title: "Add to the screen, don’t redesign it",
            body: "The card sits at the bottom of the final approved amount sheet. Everything above it was off limits: other experiments were running on that part of the screen, and I was told clearly not to touch it. Placing the card below the amount also means people decide how much to borrow first and only then see insurance, so the two decisions never get mixed up.",
          },
          {
            title: "Let the checkbox be the decision",
            body: "Regulation asked for consent through a checkbox. I kept it unticked by default, because adding a paid product without asking is a dark pattern, however small the price. Removing it is exactly as easy as adding it.",
          },
          {
            title: "Make the EMI the number to watch",
            body: "The premium is added to the principal, so the transfer amount doesn’t change and the cost is collected through the EMI. That makes the EMI, not the plan price, the number people need in front of them when they decide.",
          },
          {
            title: "Ask once more, and only once",
            body: "People who tap to take the loan without insurance see one more sheet, built for anyone who missed the card. Its only button is “Continue without”, and the checkbox is still the only way to add the plan.",
          },
          {
            title: "Put the hard parts on the card",
            body: "That the plan can’t be cancelled, and that True Balance distributes the cover but doesn’t provide the services, are the lines people most need. So they sit on the card, not behind a link.",
          },
        ],
      },
      {
        type: "list",
        label: "Interaction",
        heading: "Point people to it, then get out of the way.",
        intro:
          "With the top of the sheet off limits, insurance had to live below the fold. That made attention the real design problem: people had to find the card without it ever competing with the loan. Each interaction answers one question, which is where the eye should be right now, and motion is only used at those moments.",
        items: [
          {
            marker: "On open",
            title: "A quick look, then back to the loan",
            body: "The sheet scrolls down to the insurance card, then glides back to the loan amount. The first half is meant to catch the eye: people see that something new is waiting below. The second half hands focus straight back to the loan, so insurance gets noticed without ever being placed above it.",
          },
          {
            marker: "Out of view",
            title: "A quiet pointer at the moment of decision",
            body: "While the card is off screen, a slim pill sits just above “Take this loan”, alternating between the plan’s price and its headline cover. One tap scrolls to the card, and the pill disappears as soon as the card is visible.",
          },
          {
            marker: "In view",
            title: "One control to look at",
            body: "When the card arrives, a soft pulse on the checkbox points to the only thing that needs a decision. Meanwhile the EMI pins itself to the top of the sheet, so the cost stays in sight the whole time someone is reading about the cover. The card lists only three benefits, and “See 3 more benefits” opens a bottom sheet with the full list, so the card stays short and anyone who wants the detail is one tap away.",
          },
          {
            marker: "On tick",
            title: "Motion lands on the number that changed",
            body: "The EMI’s digits roll up to the new amount in front of the person who just made the choice. A burst of confetti celebrates the choice, turning a consent tick into a small moment of reward. The card turns green, the label changes to “Added. Tap to remove”, and the main button names the plan. Tapping the EMI opens the full breakdown.",
          },
          {
            marker: "On skip",
            title: "Same rules on the second sheet",
            body: "The pinned EMI isn’t visible on the second sheet, so ticking the box there brings up a short “Monthly EMI updated” popup instead: the new EMI, the plan price and the new principal, in one glance. The button then changes from “Continue without” to “Continue with”.",
          },
        ],
      },
      {
        type: "quote",
        text: "Insurance should be something people choose, never something they discover in their EMI.",
        cite: "Design principle for this project",
      },
      {
        type: "text",
        label: "Results",
        heading: "Four in ten said yes, on their own.",
        body: [
          "Of the loans where insurance could be shown, 38.6% ended up with a plan. Every one of those came from someone ticking an unticked box.",
          "Early reporting put adoption at 73%. That figure only counted people who had ticked the box at least once, and left out everyone who declined without touching it. 38.6% is the honest number.",
        ],
      },
      {
        type: "stats",
        tight: true,
        items: [
          { kicker: "First screen", value: "19,934", label: "of the 1,27,195 people who saw the card ticked the box (16%)" },
          { kicker: "Second prompt", value: "26,795", label: "of the 80,810 people who saw it added insurance (33%)" },
        ],
        note: "Each screen is counted on its own. Someone who saw both screens is counted in both.",
      },
      {
        type: "text",
        tight: true,
        body: [
          "People were about twice as likely to add insurance at the second prompt as on the first screen. These are counts of what people did, not a controlled test of the prompt, but they suggest a lot of people simply hadn’t noticed the card the first time. Price didn’t seem to be what decided it either. Across all four plans, between 72% and 76% of people who ticked the box kept it, even though the price doubles from the smallest plan to the largest.",
          "The two screens also behaved differently once people ticked. On the first screen, about half of the people who ticked the box later unticked it. On the second prompt, only about one in five did. That fits the way the first screen was built: people can tick, watch the EMI roll up, and change their mind with one tap. By the second prompt they already know the cost, so the choice tends to stick.",
          "Behind the screens, 99.9% of opted in loans that were disbursed got their policy, and the product brought in ₹1.07 Cr in premium between launch and 18 November.",
        ],
        note: "These are launch numbers. There was no earlier version to compare against, and most of the growth from October to November came from the rollout reaching every Android user, not from people behaving differently.",
      },
      {
        type: "text",
        label: "Disbursal impact",
        heading: "Insurance didn’t cost the business its loans.",
        body: [
          "The biggest worry going in was simple: would adding insurance mean fewer loans going out? To answer it properly, nearly 28 lakh loan applications in October were split at random. Some people saw insurance and some didn’t, and everything else stayed the same.",
          "Loans kept going out at much the same rate either way. The amount is decided before insurance shows up, the money received never changes, and saying no takes one tap, so people got their loan whether they added insurance or not.",
        ],
      },
      {
        type: "text",
        label: "Reflection",
        heading: "What I’d do next.",
        body: [
          "Talk to the people who said no. We shipped without user testing to move fast, so I’d follow up the way I always do when testing is skipped: call users who reached the screen and didn’t opt in, ask each of them the same set of questions, and fix what their answers point to.",
          "Understand the quiet numbers. About 30% of people saw the card and did nothing, and many who ticked the box later unticked it. I want to know whether they missed it, didn’t trust it, or changed their mind when the EMI went up.",
          "Then widen the reach. About 29% of eligible loans never showed insurance because the loan plus the premium went over the credit limit. A smaller plan that fits would reach more people than any change to the screen.",
        ],
      },
    ],
  },

  "upi-autopay": {
    details: [
      { k: "Platform", v: "Android" },
      { k: "Tested", v: "A/B test, Sep to Nov 2026" },
      { k: "Worked with", v: "Product and Engineering" },
    ],
    coverCaption:
      "The journey up to the UPI handoff, old and new, simplified from the shipped designs. App names stand in for each app’s own icon.",
    intro:
      "AutoPay lets a borrower’s monthly EMI go out automatically through a UPI or bank mandate, and for many of our lending partners it has to be in place before the loan amount is released. When we first launched AutoPay, I led the design of the journey. Once we saw how people actually used it, we went back to work out what to improve, and this redesign is what came out of that.",
    outcomes: [
      { value: "1,300+", label: "More borrowers set up UPI AutoPay in 47 days, 70.9% against 68.5% on the old design" },
      { value: "49s", label: "Median time to a working mandate, down from 64 seconds" },
      { value: "2", label: "Steps before the UPI app opens, down from four" },
      { value: "2.9%", label: "Lost before reaching the UPI app, down from 5.1%" },
    ],
    outcomesNote: "Android A/B test, about 55,000 users in each group, 30 September to 15 November 2026.",
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "The journey is ours. The rules belong to each partner.",
        body: [
          "Our loans are funded by lending partners, but the borrower only ever sees our app. When AutoPay setup goes wrong, nobody blames the partner. They blame us, and sometimes they walk away from a loan they were already approved for.",
          "Partners also set their own rules. Most need AutoPay before they disburse, and a few don’t. Some accept only UPI, some only a debit card or net banking mandate, some either. That made six combinations, and one journey had to hold all of them for people in Tier 2 and 3 cities, many of them setting up a bank mandate for the first time.",
        ],
      },
      {
        type: "text",
        label: "Problem",
        heading: "People had already decided. The flow kept asking.",
        body: [
          "The old journey opened on a benefits screen selling AutoPay, then offered UPI, debit card and net banking as three equal radio buttons in a bottom sheet. Next came a confirmation screen written in mandate language, with a reference ID and an IFSC code, and only then the list of UPI apps, with a reminder about which bank account to use.",
          "Behaviour pointed the other way. Most of our partners make AutoPay mandatory, so for nearly everyone this step stands between an approved loan and the money. People reaching it had already been approved and were going to set it up anyway. A screen selling the benefits of AutoPay didn’t change anyone’s mind. It only added a tap to a decision that was already made. And almost all of them were picking UPI, so giving card and net banking equal weight suggested a choice that mostly wasn’t there.",
          "When setup failed, every failure looked the same: registration failed, it’s mandatory, please try again. Someone whose mandate was rejected for coming from the wrong bank account had no way of knowing that, so they had nothing to fix before trying again.",
        ],
      },
      {
        type: "list",
        label: "Approach",
        heading: "Design for the choice people were already making.",
        intro:
          "The PM and I worked from two bets. Starting on the action instead of an explanation would lift completion, and giving UPI clear priority would bring more people across without taking the other options away. The changes follow the journey in the order people meet it.",
        items: [
          {
            title: "Start at the decision, not the explanation",
            body: "The intro screen is gone. The journey opens straight on the UPI apps, and only the ones already installed and registered on the phone appear, up to nine. People see apps they already use and can connect in one tap. The explanation of AutoPay sits behind an info icon for anyone who wants it.",
          },
          {
            title: "Make UPI the default and keep the rest one tap away",
            body: "Debit card and net banking fold into one link below the apps. Opening it shows what each one needs, like card details or a net banking login, so people can see why UPI is easier. The screen also names the bank account the mandate must come from.",
          },
          {
            title: "Show people exactly what they’re agreeing to",
            body: "The old screen showed a maximum mandate amount and a reference ID, but never the actual EMI or when it would be debited. Now the first EMI and its date lead the screen, with a note that repaying early skips that month’s debit, so nobody pays twice. The button names the app it’s about to open.",
          },
          {
            title: "One journey for six partner rules",
            body: "Mandatory and optional AutoPay share the same screens. Optional journeys add Skip for now on failure, single method journeys drop the other option, and a phone with no UPI app goes straight to card and net banking when AutoPay is required.",
          },
          {
            title: "Make every failure say why and what to do next",
            body: "Each failure names the reason, the bank account involved and one pro tip, like adding ₹1 to the account or using the account the loan is on. An attempt counter sets expectations across five tries, the fourth failure offers other loan options, and card and net banking pause for 15 minutes after repeated failures so people don’t burn their attempts.",
          },
        ],
      },
      {
        type: "quote",
        text: "When most people have already chosen, the screen should agree with them, not ask them again.",
        cite: "Design principle behind this work",
      },
      {
        type: "text",
        label: "Where it still breaks",
        heading: "The biggest loss now happens inside the UPI app.",
        body: [
          "Cutting screens fixed what happened before the handoff. It can’t fix what happens after it. About four in five people who still drop off cancel or back out at the approval step inside their UPI app.",
        ],
      },
      {
        type: "bars",
        tight: true,
        title: "Why UPI attempts failed in the new design",
        sub: "Share of failed attempts",
        max: 100,
        rows: [
          { label: "Cancelled or backed out in the UPI app", values: [39.9], display: ["39.9%"] },
          { label: "Didn’t approve in time", values: [33.2], display: ["33.2%"] },
          { label: "Bank account didn’t match the loan", values: [14.7], display: ["14.7%"] },
          { label: "Insufficient funds", values: [5.8], display: ["5.8%"] },
          { label: "Declined by the bank", values: [4.3], display: ["4.3%"] },
        ],
      },
      {
        type: "text",
        tight: true,
        body: [
          "This is why the failure screens got as much attention as the happy path. For the reasons we can name, like a mismatched account or a low balance, the screen tells people exactly what to change. Of everyone who retried after a failure, about two in three got through.",
        ],
      },
      {
        type: "image",
        tight: true,
        src: "/work/upi-autopay-failure.jpg",
        alt: "AutoPay setup unsuccessful screen: it names the wrong bank account, gives a pro tip to use the loan’s bank account, and offers Retry AutoPay or Explore other loan options",
        caption: "A failure that names the reason, the account to use and the attempts left.",
      },
      {
        type: "text",
        label: "Results",
        heading: "What the A/B test showed.",
        body: [
          "Both designs ran side by side on Android with loans split evenly between them. The new design turned 70.9% of people into a UPI mandate against 68.5% on the old one. With around 55,000 people in each group, a gap that size is very unlikely to be chance.",
        ],
      },
      {
        type: "bars",
        tight: true,
        title: "Every second saved came before the UPI app",
        sub: "Median seconds per part of the journey",
        legend: ["Old design", "New design"],
        rows: [
          { label: "Journey start to first attempt", values: [24, 15], display: ["24s", "15s"] },
          { label: "Inside the UPI app, attempt to success", values: [25, 26], display: ["25s", "26s"] },
        ],
      },
      {
        type: "stats",
        tight: true,
        items: [
          { value: "98.3%", label: "Chose UPI in the new design, up from 96.5%" },
          { value: "53.8%", label: "Got through on their first attempt, up from 51.4%" },
          { value: "93.1%", label: "Finished within an hour, up from 91.3%" },
        ],
      },
      {
        type: "text",
        tight: true,
        body: [
          "Two numbers keep this honest. Registrations by any method rose by a smaller 0.9 points, because some people who moved to UPI would have finished with a card anyway. And slightly fewer people retried after a failure, 59.2% against 62.1%. We don’t know why yet.",
        ],
        note: "Test and internal accounts couldn’t be filtered out of the data, and about a third of successful UPI setups don’t record which app was used.",
      },
      {
        type: "text",
        label: "Reflection",
        heading: "What I’d do next.",
        body: [
          "Look inside the handoff. Today we can see that a UPI request was created, not whether the app actually opened, and across both designs about 10,900 people never got any response back from a UPI app. Logging that moment would tell us whether we’re losing people to broken redirects or to hesitation at the PIN screen, and those need very different fixes.",
          "Then go after the approval moment itself. A third of failed attempts time out, and my guess is that people land in their UPI app without knowing what they’re about to approve. A short preview of that screen before the handoff is the first thing I’d test. Alongside it, I’d find out why fewer people retry now, starting with whether clearer failure reasons are telling some of them, correctly, that another try won’t help.",
        ],
      },
    ],
  },

  "video-kyc-ios": {
    details: [
      { k: "Platform", v: "iOS" },
      { k: "Launched", v: "October 2026" },
      { k: "Worked with", v: "Product and Engineering" },
    ],
    coverCaption: "Landing, PAN capture and outcome screens, simplified. Skip only appears for partners where Video KYC is optional.",
    intro:
      "Video KYC lets a borrower verify their identity on a short live call with an agent. It already ran on Android. The brief was to bring it to iOS, and to fix what the Android journey had already shown along the way.",
    outcomes: [
      { value: "12.6k", label: "People started Video KYC on iOS in the first six weeks" },
      { value: "75.6%", label: "Of them completed verification" },
      { value: "68.1%", label: "Completed on their very first attempt" },
      { value: "55s", label: "Median time from starting to a connected session" },
    ],
    outcomesNote: "iOS only, 1 October to 15 November 2026.",
    blocks: [
      {
        type: "text",
        label: "Context",
        heading: "Verification starts once the loan amount is final.",
        body: [
          "Most of our users are first-time or early borrowers in Tier 2 and 3 cities, many of them new to doing anything this formal on a phone. Video KYC appears after the final loan amount is set, as one of the steps a borrower completes on the way to disbursal. For most partners it’s mandatory, so a failed call doesn’t just cost a few minutes. It can stop the loan from moving forward.",
          "The live call runs through HyperVerge, our verification partner, which also does the PAN OCR check. We pay HyperVerge for every call, even the ones that fail. So when a call fails because the user didn’t have their PAN card ready, we lose money and the user has to start again. Some never do, because the process is long, and we lose the user too. I couldn’t change the call itself, but I could redesign what happens before and after it.",
        ],
      },
      {
        type: "text",
        label: "Problem",
        heading: "The call was where things broke. The causes came earlier.",
        body: [
          "Before designing anything, I asked the team that runs Video KYC to show me recordings of calls that had failed on Android. They told me more than any dashboard could. People took the call lying in bed, in dark rooms, on weak networks. Some reached the agent without their original PAN card, even though the agent has to see it. Others struggled to follow an agent speaking Hindi when their own language was Malayalam or Kannada.",
          "Around these, the journey had softer gaps. The instructions before the call were thin. The jump from our app into HyperVerge felt like landing somewhere else entirely. And when a call failed, people weren’t told clearly what happened or what to do next, so many simply left.",
        ],
      },
      {
        type: "list",
        label: "Approach",
        heading: "Fix the whole journey, not just the call.",
        intro:
          "The PM set the direction: check the PAN before the call, let people choose their language, and show which agents are free. My job was to turn that into a journey that works for our users. The call lasts a couple of minutes, but whether it works is decided before and after it. So I walked the journey end to end and designed a fix for every point where people were getting stuck, in the order they meet them.",
        items: [
          {
            title: "Prepare users for the verification process",
            body: "Many people expect a video call to be long and complicated. The landing page shows it’s a secure, two-minute process in three simple steps. The illustration and the line under the title make one thing impossible to miss: you need your own original PAN card on the call.",
          },
          {
            title: "Check PAN readiness before verification",
            body: "The most common failure in the recordings was simple: the agent asked for the PAN card and the user didn’t have it. So before the call, people show their original PAN card and OCR scans it. Photocopies, screenshots and PDFs aren’t accepted, and a card that doesn’t pass can’t move ahead. Stopping someone here is kinder than letting them reach an agent who will reject them, after we’ve already paid for the call.",
          },
          {
            title: "Connect users in their preferred language",
            body: "Before the call, people choose the language they speak, each one written in its own script and showing an estimated wait. Knowing the wait upfront makes it feel finite, not endless. The button only unlocks once a language is chosen and then reads “I speak हिन्दी”, so the choice stays about comfort, not the shortest queue.",
          },
          {
            title: "Create a seamless transition to video verification",
            body: "HyperVerge’s screens used their own blue, while everything in our app is orange. The jump felt like being sent somewhere unfamiliar right before a sensitive call. I asked the PM to check with HyperVerge whether they could at least match our button colours. They could, so the handoff now feels like the next step of the same journey rather than a different app.",
          },
          {
            title: "Clarify verification outcomes and next steps",
            body: "Success, failure and retry each get a clear screen with one next action, including a state for reviews that take longer than usual.",
          },
        ],
      },
      {
        type: "quote",
        text: "If something is going to fail, it should fail on our screen, where we can still help.",
        cite: "The principle behind every decision",
      },
      {
        type: "text",
        label: "AI in the loop",
        heading: "AI did the drafting. The decisions stayed with me.",
        body: [
          "I used AI to build working prototypes early, including the PAN capture step, so the scan, retake and error moments could be tried on a phone instead of imagined from static screens.",
          "It helped with the words too. I’d generate several versions of a line, then cut them down to the plainest one a first-time borrower would understand. The landing page illustration, a person holding up their PAN card on a call, was also made with AI.",
          "Each time, AI gave me options faster. Choosing between them, and deciding what the journey actually needed, was still my call.",
        ],
      },
      {
        type: "text",
        label: "Results",
        heading: "What the first six weeks told me.",
        body: [
          "Three in four people who started Video KYC on iOS got verified, and most did it on the first try. The more telling number is what happened to everyone else.",
        ],
      },
      {
        type: "stats",
        tight: true,
        items: [
          { value: "4,032", label: "People whose first attempt didn’t finish" },
          { value: "2,203", label: "Of them came back and tried again" },
          { value: "950", label: "Completed on a later attempt" },
        ],
      },
      {
        type: "text",
        tight: true,
        body: [
          "A failed first call didn’t have to be the end of the journey, which is why the failure and retry states got as much care as the happy path.",
          "It also showed up where it matters most. Over the same six weeks, 9,032 people on iOS completed Video KYC and then had their loan disbursed.",
        ],
        note: "These are launch numbers, not a before and after. There was no earlier iOS version to compare against, so they set the baseline the next iteration will be measured on.",
      },
      {
        type: "text",
        label: "Reflection",
        heading: "What I’d do next.",
        body: [
          "Measure the things the design was built to change. The OCR result isn’t logged yet, and neither is the language the agent actually spoke, so there’s no way yet to tell how often PAN or language problems still reach the call. Getting those signals, along with HyperVerge’s failure reasons, would turn this from a well-reasoned design into a proven one.",
          "After that, ship the next version of the language screen, which shows busy languages as unavailable instead of hiding them, so nobody is left wondering where their language went.",
        ],
      },
    ],
  },
};

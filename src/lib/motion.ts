import type { Transition, Variants } from "motion/react";

/* ──────────────────────────────────────────────────────────────────────────
   House motion tokens + shared variants. Every animation on the site reads from
   here. Each variant factory takes `reduced` (from the single useReducedMotion
   guard) and returns an opacity-only, instant version when it is true.
   The hero entrance mirrors these values in CSS (see globals.css).
   ────────────────────────────────────────────────────────────────────────── */

export const ease = [0.22, 1, 0.36, 1] as const; // expo-out, the house curve
export const duration = { fast: 0.25, base: 0.5, slow: 0.8 } as const;
export const stagger = 0.04;

export const t = (d: keyof typeof duration = "base", delay = 0): Transition => ({
  duration: duration[d],
  ease,
  delay,
});

const instant: Transition = { duration: 0 };

/** Spring for pointer-follow effects (magnetic buttons). Soft, slightly underdamped. */
export const magnetSpring = { stiffness: 180, damping: 18, mass: 0.6 } as const;

/** Layout transitions (filter grid). */
export const layoutTransition = (reduced: boolean): Transition => (reduced ? instant : t("slow"));

/** Section reveal: rise 16px + fade. Use with whileInView + viewport once. */
export const rise = (reduced: boolean): Variants =>
  reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: instant } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: t("base") } };

/** Parent that staggers its children's `rise`. */
export const group = (reduced: boolean, delay = 0): Variants => ({
  hidden: {},
  show: { transition: reduced ? instant : { staggerChildren: stagger, delayChildren: delay } },
});

/** Mask-wipe for images: uncovers bottom-up. */
export const wipe = (reduced: boolean): Variants =>
  reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: instant } }
    : {
        hidden: { clipPath: "inset(100% 0% 0% 0%)" },
        show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease } },
      };

/** Page transitions: enter from the right; exit left with a fade (driven by TransitionLink). */
export const page = (reduced: boolean) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, x: 48 },
  animate: { opacity: 1, x: 0, transition: reduced ? instant : t("slow") },
  exit: reduced ? { opacity: 0 } : { opacity: 0, x: -48 },
  exitTransition: reduced ? instant : t("fast"),
});

/** Accordion body: height first, content fades in a beat behind it. */
export const accordion = (reduced: boolean) => ({
  panel: {
    collapsed: { height: 0, transition: reduced ? instant : t("base") },
    open: { height: "auto", transition: reduced ? instant : t("base") },
  } satisfies Variants,
  content: {
    collapsed: { opacity: 0, y: reduced ? 0 : -6, transition: reduced ? instant : t("fast") },
    open: { opacity: 1, y: 0, transition: reduced ? instant : t("base", 0.12) },
  } satisfies Variants,
});

/** Contact headline carousel: cross-fade + vertical slide. */
export const ticker = (reduced: boolean): Variants =>
  reduced
    ? { enter: { opacity: 0 }, center: { opacity: 1, transition: instant }, exit: { opacity: 0, transition: instant } }
    : {
        enter: { opacity: 0, y: "60%" },
        center: { opacity: 1, y: "0%", transition: t("slow") },
        exit: { opacity: 0, y: "-60%", transition: t("base") },
      };

/** Mobile menu sheet + its numbered items. */
export const sheet = (reduced: boolean) => ({
  panel: reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: instant }
    : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" }, transition: t("slow") },
  item: (i: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: instant }
      : { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, transition: t("slow", 0.15 + i * stagger * 2) },
});

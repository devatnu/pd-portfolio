"use client";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { hero } from "@/content/hero";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const STEP_MS = 3200;
const TYPE_MS = 34;
const logos = {
  figma: { src: "/logos/figma.png", bg: "#000" },
  claude: { src: "/logos/claude.png", bg: "#DA7757" },
} as const;

/**
 * One-line "AI at work" status under the hero headline: the tool tile coin-flips between Figma
 * and Claude, a progress rail fills, and the current step types itself out. Decorative; announced once via aria-label.
 */
export function AiAtWork() {
  const steps = hero.workflow;
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % steps.length), reduced ? STEP_MS * 1.4 : STEP_MS);
    return () => clearInterval(id);
  }, [reduced, steps.length]);

  const step = steps[i];

  return (
    <p
      role="img"
      aria-label="Workflow: designing in Figma and working with Claude, in one loop"
      className="ai-line hero-in"
      style={{ "--d": "650ms" } as React.CSSProperties}
    >
      {/* Logo tile: coin flip on each tool change */}
      <span aria-hidden className="relative inline-block h-6 w-6 shrink-0 [perspective:300px]">
        <AnimatePresence initial={false} mode="popLayout">
          <m.span
            key={`${step.tool}-${i}`}
            className="absolute inset-0 block overflow-hidden rounded-[6px] ring-1 ring-white/10"
            style={{ background: logos[step.tool].bg }}
            initial={reduced ? { opacity: 0 } : { rotateY: -90, opacity: 0.4 }}
            animate={reduced ? { opacity: 1 } : { rotateY: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { rotateY: 90, opacity: 0.4 }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, ease }}
          >
            <span className={`absolute inset-0 block ${step.tool === "claude" && !reduced ? "ai-spin" : ""}`}>
              <Image
                src={logos[step.tool].src}
                alt=""
                fill
                sizes="24px"
                className={step.tool === "claude" ? "scale-[1.5] object-cover" : "scale-[1.15] object-cover"}
              />
            </span>
          </m.span>
        </AnimatePresence>
      </span>

      <span aria-hidden className="t-label w-[3.25rem] shrink-0 !text-text">{step.label}</span>

      {/* Progress rail: one segment per step, current one fills over the step */}
      <span aria-hidden className="hidden w-14 shrink-0 gap-[3px] sm:flex">
        {steps.map((_, k) => (
          <span key={k} className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
            <span
              key={k === i ? `on-${i}` : `off-${k}`}
              className={`absolute inset-0 origin-left rounded-full bg-accent ${k === i && !reduced ? "ai-fill" : ""}`}
              style={{
                transform: k < i || (k === i && reduced) ? "scaleX(1)" : k === i ? undefined : "scaleX(0)",
                animationDuration: `${STEP_MS}ms`,
              }}
            />
          </span>
        ))}
      </span>

      <Typed key={i} text={step.action} reduced={reduced} />
    </p>
  );
}

/** Types its text once, then holds with a blinking caret. Remounted per step via `key`. */
function Typed({ text, reduced }: { text: string; reduced: boolean }) {
  const [n, setN] = useState(reduced ? text.length : 0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setN((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, TYPE_MS);
    return () => clearInterval(id);
  }, [text, reduced]);
  return (
    <span aria-hidden className="min-w-0 truncate text-muted">
      {text.slice(0, n)}
      <span className="ai-caret" />
    </span>
  );
}

"use client";
import { m } from "motion/react";
import type { ComponentProps, ElementType } from "react";
import { group, rise } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

type Props = { as?: "div" | "ul" | "ol" | "li" | "p" | "h2" | "h3" | "section" | "header" | "dl" | "span"; className?: string; children?: React.ReactNode; delay?: number } & Omit<ComponentProps<"div">, "ref">;

/** Staggered group: children wrapped in <RevealItem> rise in sequence when the group enters view. Fires once. */
export function Reveal({ as = "div", className, children, delay = 0, ...rest }: Props) {
  const reduced = useReducedMotion();
  const Comp = m[as as "div"] as ElementType;
  return (
    <Comp className={className} initial="hidden" whileInView="show" viewport={viewport} variants={group(reduced, delay)} {...rest}>
      {children}
    </Comp>
  );
}

export function RevealItem({ as = "div", className, children, ...rest }: Props) {
  const reduced = useReducedMotion();
  const Comp = m[as as "div"] as ElementType;
  return (
    <Comp className={className} variants={rise(reduced)} {...rest}>
      {children}
    </Comp>
  );
}

"use client";
import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Timeline rail that fills with the accent as the reader moves through it. Tracks scroll; never drives it. */
export function ScrollLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line" />
      {!reduced && (
        <m.span aria-hidden className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent" style={{ scaleY }} />
      )}
      {children}
    </div>
  );
}

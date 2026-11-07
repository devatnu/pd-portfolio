"use client";
import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Counts the numeric part of a stat ("128.3%", "₹25 Cr+") up from zero once it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);

  useEffect(() => {
    if (!inView || reduced || !match || !ref.current) return;
    const [, pre, num, post] = match;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const el = ref.current;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = `${pre}${v.toFixed(decimals)}${post}`),
    });
    return () => controls.stop();
  }, [inView, reduced, match]);

  // Server + no-JS render the final value; the count only replaces it once visible.
  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

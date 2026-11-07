"use client";
import { useReducedMotion as useMotionReduced } from "motion/react";

/** The single reduced-motion guard. Every variant on the site routes through this. */
export function useReducedMotion(): boolean {
  return useMotionReduced() ?? false;
}

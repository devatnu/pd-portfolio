"use client";
import { useEffect, useState } from "react";
import { m } from "motion/react";
import { page } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// The very first paint must never wait on JS (the hero animates in CSS), so only
// client-side navigations get the enter transition.
let hasNavigated = false;

/** Remounts on every navigation: the incoming page enters from the right. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  // Read-only in the initializer (StrictMode may call it twice); flip the flag after mount.
  const [animateIn] = useState(() => typeof window !== "undefined" && hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);
  const p = page(reduced);
  return (
    <m.div id="page" initial={animateIn ? p.initial : false} animate={p.animate}>
      {children}
    </m.div>
  );
}

"use client";
import { LazyMotion, MotionConfig } from "motion/react";
import { ease, duration } from "@/lib/motion";

const loadFeatures = () => import("@/lib/motion-features").then((m) => m.default);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: duration.base, ease }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

"use client";
import Image from "next/image";
import { m } from "motion/react";
import { wipe } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Image that uncovers bottom-up as it enters the viewport, with a slow settle from a slight zoom. */
export function WipeImage({ src, alt, className = "", sizes, preload }: { src: string; alt: string; className?: string; sizes: string; preload?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={`relative overflow-hidden rounded-[4px] bg-surface ${className}`}
      initial={preload ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={wipe(reduced)}
    >
      <m.div
        className="absolute inset-0"
        initial={preload || reduced ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </m.div>
    </m.div>
  );
}

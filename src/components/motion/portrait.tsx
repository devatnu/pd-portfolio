"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Hero background portrait. Uncovers bottom-up in CSS (no JS wait), sits under a shade so
 * the type reads first, and a soft light follows the pointer anywhere in the hero.
 */
export function Portrait({ src, alt, children }: { src: string; alt: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const hero = el?.closest<HTMLElement>(".hero");
    if (!el || !hero || reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--px", `${e.clientX - r.left}px`);
      el.style.setProperty("--py", `${e.clientY - r.top}px`);
      hero.dataset.lit = "true";
    };
    const onLeave = () => (hero.dataset.lit = "false");
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={ref} className="portrait pointer-events-none" >
      <div className="portrait-inner">
        <Image src={src} alt={alt} fill preload sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        <div className="portrait-light" aria-hidden />
      </div>
      <div className="portrait-shade" aria-hidden />
      {children}
    </div>
  );
}

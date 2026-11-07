"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Dot-grid field behind the hero. A soft lens follows the pointer and brings the dots
 * (and a faint accent bloom) up under it. No parallax: the grid itself never moves.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host || reduced) return;
    let raf = 0;
    let tx = 0.7, ty = 0.35, cx = tx, cy = ty;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--sx", `${(cx * 100).toFixed(2)}%`);
      el.style.setProperty("--sy", `${(cy * 100).toFixed(2)}%`);
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.0005) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      el.dataset.active = "true";
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => (el.dataset.active = "false");
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return <div ref={ref} aria-hidden className="spotlight pointer-events-none absolute inset-0" />;
}

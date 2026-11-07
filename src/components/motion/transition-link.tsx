"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { animate } from "motion/react";
import type { ComponentProps } from "react";
import { page } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * next/link that plays the page exit (slide left + fade) before a route change.
 * Same-page hash links and modified clicks fall through to normal behaviour.
 * The enter half lives in app/template.tsx.
 */
export function TransitionLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <Link
      href={href}
      {...props}
      onClick={async (e) => {
        onClick?.(e);
        const url = typeof href === "string" ? href : href.pathname ?? "";
        const target = url.split("#")[0] || pathname;
        if (
          e.defaultPrevented ||
          e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
          props.target === "_blank" ||
          !url.startsWith("/") ||
          /\.[a-z0-9]+$/i.test(target) || // files (resume.pdf) load normally
          target === pathname
        )
          return;
        e.preventDefault();
        const el = document.getElementById("page");
        const p = page(reduced);
        if (el) await animate(el, p.exit, p.exitTransition).finished;
        router.push(url);
        // Hash targets: wait for the new page to mount, then jump to the anchor.
        const hash = url.split("#")[1];
        if (hash) {
          const start = performance.now();
          const seek = () => {
            const target = document.getElementById(hash);
            if (target) target.scrollIntoView({ behavior: "instant" as ScrollBehavior });
            else if (performance.now() - start < 2000) requestAnimationFrame(seek);
          };
          requestAnimationFrame(seek);
        }
      }}
    />
  );
}

import { TransitionLink } from "@/components/motion/transition-link";
import type { ComponentProps } from "react";

/** Link whose label rolls up to a duplicate on hover/focus. Pure CSS, reduced-motion safe. */
export function RollText({ children }: { children: string }) {
  return (
    <span className="roll relative inline-flex overflow-hidden align-bottom">
      <span className="roll-a block">{children}</span>
      <span aria-hidden className="roll-b absolute inset-x-0 top-full block text-accent">
        {children}
      </span>
    </span>
  );
}

export function RollLink({ children, className = "", ...props }: ComponentProps<typeof TransitionLink> & { children: string }) {
  return (
    <TransitionLink {...props} className={`group ${className}`}>
      <RollText>{children}</RollText>
    </TransitionLink>
  );
}

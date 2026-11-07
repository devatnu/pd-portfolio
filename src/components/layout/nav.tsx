"use client";
import { TransitionLink as Link } from "@/components/motion/transition-link";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks, person } from "@/content/site";
import { RollLink, RollText } from "@/components/ui/roll-link";
import { t, sheet } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function Nav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  // Condense once the reader has scrolled past most of the hero.
  useMotionValueEvent(scrollY, "change", (y) => {
    const threshold = typeof window !== "undefined" ? window.innerHeight * 0.6 : 400;
    setCondensed(y > threshold);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <m.div
          initial={false}
          animate={{
            paddingTop: condensed ? 10 : 22,
            paddingBottom: condensed ? 10 : 22,
            backgroundColor: condensed ? "rgba(10,10,11,0.72)" : "rgba(10,10,11,0)",
            borderBottomColor: condensed ? "var(--line)" : "rgba(0,0,0,0)",
          }}
          transition={reduced ? { duration: 0 } : t("base")}
          className={`border-b backdrop-blur-0 ${condensed ? "backdrop-blur-md" : ""}`}
        >
          <nav aria-label="Primary" className="shell flex items-center justify-between gap-6">
            <Link href="/" className="group flex items-baseline gap-2" aria-label={`${person.name}, home`}>
              <span className="font-display text-[1.6rem] leading-none tracking-tight">
                {person.shortName}
                <span className="text-accent">.</span>
              </span>
              <m.span
                initial={false}
                animate={{ opacity: condensed ? 0 : 1, x: condensed ? -6 : 0 }}
                transition={t("fast")}
                className="t-label hidden sm:inline"
              >
                {person.jobTitle}
              </m.span>
            </Link>

            <ul className="hidden items-center gap-8 text-sm md:flex">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <RollLink href={l.href} className="text-muted transition-colors hover:text-text">
                    {l.label}
                  </RollLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href={person.resume}
                target="_blank"
                rel="noopener"
                className="group hidden rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-muted active:scale-[0.97] md:inline-flex"
              >
                <RollText>Resume ↗</RollText>
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm active:scale-[0.97] md:hidden"
              >
                Menu
                <span aria-hidden className="flex flex-col gap-[3px]">
                  <span className="block h-px w-3.5 bg-text" />
                  <span className="block h-px w-3.5 bg-text" />
                </span>
              </button>
            </div>
          </nav>
        </m.div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-surface md:hidden"
            {...sheet(reduced).panel}
          >
            <div className="shell flex items-center justify-between py-[22px]">
              <span className="t-label">Index</span>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                className="flex h-10 items-center rounded-full border border-line px-4 text-sm active:scale-[0.97]"
              >
                Close
              </button>
            </div>
            <ul className="shell mt-8 flex flex-col">
              {[...navLinks, { label: "Resume", href: person.resume }].map((l, i) => (
                <m.li
                  key={l.href}
                  {...sheet(reduced).item(i)}
                  className="border-b border-line"
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5 active:text-accent"
                  >
                    <span className="t-label w-8">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t-h2">{l.label}</span>
                  </Link>
                </m.li>
              ))}
            </ul>
            <div className="shell mt-auto flex items-center justify-between py-8 t-caption">
              <span>{person.location}</span>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { contact } from "@/content/sections";
import { person, socials } from "@/content/site";
import { ticker } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { RollText } from "@/components/ui/roll-link";

const INTERVAL = 3800;

export function Contact() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % contact.headlines.length), reduced ? INTERVAL * 1.5 : INTERVAL);
    return () => clearInterval(id);
  }, [paused, reduced]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  return (
    <Section id="contact" number="08" title="Contact">
      <div
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Rotating headline. A fixed-height stage stops the layout from jumping between variants. */}
        <div className="relative mb-14 grid md:mb-20" aria-live="off">
          {contact.headlines.map((h) => (
            <span key={h} aria-hidden className="t-display invisible col-start-1 row-start-1 max-w-[16ch]">
              {h}
            </span>
          ))}
          <p className="sr-only">{contact.headlines[0]}</p>
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                key={i}
                variants={ticker(reduced)}
                initial="enter"
                animate="center"
                exit="exit"
                className="t-display absolute left-0 top-0 block max-w-[16ch]"
              >
                {contact.headlines[i]}
              </m.span>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex gap-1.5" aria-hidden>
            {contact.headlines.map((_, k) => (
              <span key={k} className="relative h-px w-10 overflow-hidden bg-line">
                {k === i && (
                  <m.span
                    key={`${i}-${paused}`}
                    className="absolute inset-0 origin-left bg-text"
                    initial={{ scaleX: paused ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: paused || reduced ? 0 : INTERVAL / 1000, ease: "linear" }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        <Reveal className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <RevealItem>
            <p className="t-body max-w-[46ch] text-muted">{contact.blurb}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={person.bookingUrl} target="_blank" rel="noopener" className="btn-primary group">
                  <span className="live-dot !bg-bg after:!bg-bg" aria-hidden />
                  {contact.cta}
                  <span className="btn-arrow" aria-hidden>→</span>
                </a>
              </Magnetic>
              <div className="flex items-center rounded-full border border-line">
                <a href={`mailto:${person.email}`} className="py-3 pl-5 pr-3 text-sm transition-colors hover:text-accent">
                  {person.email}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="relative mr-1 h-10 overflow-hidden rounded-full px-3 text-xs text-muted transition-colors hover:bg-surface hover:text-text active:scale-[0.96]"
                  aria-label={copied ? "Email copied" : "Copy email address"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <m.span
                      key={copied ? "y" : "n"}
                      className={`block ${copied ? "text-accent" : ""}`}
                      initial={{ y: reduced ? 0 : 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: reduced ? 0 : -12, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.2 }}
                    >
                      {copied ? "Copied ✓" : "Copy"}
                    </m.span>
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </RevealItem>
          <RevealItem>
            <p className="t-label mb-4">Elsewhere</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener" className="group text-sm">
                    <RollText>{`${s.label} ↗`}</RollText>
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}

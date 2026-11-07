"use client";
import { AnimatePresence, m } from "motion/react";
import { useId, useState } from "react";
import { Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { faqs } from "@/content/sections";
import { accordion, t } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" number="07" title="FAQ" kicker={<>Questions I get <em>a lot.</em></>}>
      <Reveal as="ul" className="border-t border-line">
        {faqs.map((f, i) => (
          <RevealItem as="li" key={f.q} className="border-b border-line">
            <Item {...f} index={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}

function Item({ q, teaser, a, index, open, onToggle }: { q: string; teaser: string; a: string; index: number; open: boolean; onToggle: () => void }) {
  const id = useId();
  const reduced = useReducedMotion();
  const v = accordion(reduced);
  return (
    <>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-start gap-2 py-7 text-left md:grid-cols-[4rem_minmax(0,1fr)_3rem]"
        >
          <span className={`t-label pt-2 transition-colors ${open ? "text-accent" : ""}`}>{String(index + 1).padStart(2, "0")}</span>
          <span>
            <span className="t-h3 block transition-colors group-hover:text-text">{q}</span>
            <m.span
              className="t-caption mt-2 block"
              initial={false}
              animate={{ opacity: open ? 0 : 1, height: open ? 0 : "auto" }}
              transition={reduced ? { duration: 0 } : t("fast")}
            >
              {teaser}
            </m.span>
          </span>
          <m.span
            aria-hidden
            className="ml-auto mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-muted group-hover:text-text"
            initial={false}
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduced ? { duration: 0 } : t("base")}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </m.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={id}
            role="region"
            key="panel"
            variants={v.panel}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            className="overflow-hidden"
          >
            <m.p variants={v.content} className="t-body max-w-[62ch] pb-8 pl-[2.75rem] text-muted md:pl-[4.5rem]">
              {a}
            </m.p>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

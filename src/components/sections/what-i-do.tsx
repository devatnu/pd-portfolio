import { Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { whatIDo } from "@/content/sections";

export function WhatIDo() {
  return (
    <Section id="what-i-do" number="02" title="What I do" kicker={whatIDo.kicker}>
      <Reveal className="grid gap-10 md:grid-cols-3 md:gap-12">
        {whatIDo.paragraphs.map((p, i) => (
          <RevealItem key={i} className="border-t border-line pt-6">
            <span className="t-label mb-5 block">0{i + 1}</span>
            <p className="t-body text-muted [&::first-line]:text-text">{p}</p>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}

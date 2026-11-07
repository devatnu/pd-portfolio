import { Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { expertise } from "@/content/sections";

export function Expertise() {
  return (
    <Section id="expertise" number="06" title="Expertise" kicker={<>Six things I&rsquo;m <em>reliably good</em> at.</>}>
      <Reveal as="ol" className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((area, i) => (
          <RevealItem
            as="li"
            key={area.title}
            className="expertise-cell group relative border-b border-r border-line p-6 md:p-8"
          >
            <div className="mb-10 flex items-start justify-between">
              <span className={`font-display text-5xl italic leading-none transition-colors duration-500 ${area.highlight ? "text-accent" : "text-muted group-hover:text-text"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {area.highlight && (
                <span className="rounded-full border border-accent/40 px-2.5 py-1 text-[0.6875rem] text-accent">How I work</span>
              )}
            </div>
            <h3 className="t-h3 mb-5">{area.title}</h3>
            <ul className="space-y-2">
              {area.skills.map((s) => (
                <li key={s} className="t-caption flex gap-2.5">
                  <span aria-hidden className="text-line">—</span>
                  {s}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}

import { Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { ScrollLine } from "@/components/motion/scroll-line";
import { education, experience } from "@/content/sections";

export function Experience() {
  return (
    <Section id="experience" number="05" title="Experience" kicker={<>Eight years, <em>four industries,</em> one through-line.</>}>
      <ScrollLine>
        <ol className="space-y-14 md:space-y-20">
          {experience.map((r) => (
            <li key={`${r.company}-${r.years}`} className="relative grid gap-4 pl-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 md:pl-10">
              <span aria-hidden className="timeline-dot absolute left-[-4px] top-[0.45rem] h-[9px] w-[9px] rounded-full border border-muted bg-bg" />
              <Reveal>
                <RevealItem as="p" className="t-label pt-1 tabular-nums">{r.years}</RevealItem>
              </Reveal>
              <Reveal>
                <RevealItem as="h3" className="t-h3">
                  {r.role} <span className="text-muted">· {r.company}</span>
                </RevealItem>
                {r.location && <RevealItem as="p" className="t-caption mt-1">{r.location}</RevealItem>}
                <ul className="mt-5 space-y-2.5">
                  {r.bullets.map((b) => (
                    <RevealItem as="li" key={b} className="t-body flex gap-3 text-muted">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-line" />
                      {b}
                    </RevealItem>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </ScrollLine>

      <div className="mt-24 border-t border-line pt-10">
        <h3 className="t-label mb-8">Education</h3>
        <Reveal as="ul" className="grid gap-8 md:grid-cols-2">
          {education.map((e) => (
            <RevealItem as="li" key={e.degree}>
              <p className="t-label mb-3 tabular-nums">{e.years}</p>
              <p className="t-h3">{e.degree}</p>
              <p className="t-caption mt-1">{e.school}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

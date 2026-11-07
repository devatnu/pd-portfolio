import { Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { LiveTime } from "@/components/ui/live-time";
import { about } from "@/content/sections";
import { person } from "@/content/site";

export function About() {
  const stats = [
    { label: "Based in", value: <>{person.flag} {person.location}</> },
    { label: "Local time", value: <LiveTime seconds /> },
    {
      label: "Status",
      value: (
        <span className="inline-flex items-center gap-2.5">
          <span className="live-dot" aria-hidden /> Open to roles
        </span>
      ),
    },
  ];
  return (
    <Section id="about" number="04" title="About" kicker={about.kicker}>
      <Reveal as="dl" className="mb-16 grid border-y border-line sm:grid-cols-3 md:mb-24">
        {stats.map((s, i) => (
          <RevealItem key={s.label} className={`py-6 sm:px-6 ${i ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
            <dt className="t-label mb-3">{s.label}</dt>
            <dd className="t-h3">{s.value}</dd>
          </RevealItem>
        ))}
      </Reveal>
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_14rem]">
        <Reveal className="max-w-[62ch] space-y-6">
          {about.paragraphs.map((p, i) => (
            <RevealItem as="p" key={i} className={`t-body ${i === 0 ? "text-text" : "text-muted"}`}>
              {p}
            </RevealItem>
          ))}
        </Reveal>
        <Reveal>
          <RevealItem>
            <a href={person.resume} target="_blank" rel="noopener" className="btn-ghost group">
              Download resume <span className="btn-arrow" aria-hidden>↗</span>
            </a>
            <p className="t-caption mt-3">PDF · 2 pages</p>
          </RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}

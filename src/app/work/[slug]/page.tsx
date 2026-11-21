import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { cases, type CaseBlock } from "@/content/cases";
import { siteUrl } from "@/config/site";
import { person } from "@/content/site";
import { TransitionLink } from "@/components/motion/transition-link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { WipeImage } from "@/components/motion/wipe-image";
import { Magnetic } from "@/components/motion/magnetic";

// Every internal case page is pre-rendered at build time; unknown slugs 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.filter((p) => !p.external).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const url = `${siteUrl}/work/${p.slug}`;
  return {
    title: `${p.title} case study`,
    description: p.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${p.title} — ${person.name}`, description: p.summary },
    twitter: { card: "summary_large_image", title: `${p.title} — ${person.name}`, description: p.summary },
  };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || p.external) notFound();
  const study = cases[p.slug];

  const internal = projects.filter((x) => !x.external);
  const next = internal[(internal.indexOf(p) + 1) % internal.length];

  const meta = [
    { k: "Year", v: p.year },
    { k: "Role", v: p.role },
    ...(study ? study.details : [{ k: "Sector", v: p.sector }]),
  ];

  return (
    <article>
      <header className="shell pb-16 pt-36 md:pt-44">
        <Reveal>
          <RevealItem>
            <TransitionLink href="/#work" className="group t-label inline-flex items-center gap-2 hover:text-text">
              <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span> All work
            </TransitionLink>
          </RevealItem>
          <RevealItem as="p" className="t-label mt-14">
            <span className="text-accent">№ {p.index}</span> · Case study · {p.tags.join(" / ")}
          </RevealItem>
          <RevealItem>
            <h1 className="t-display mt-6">{p.title}</h1>
          </RevealItem>
          <RevealItem as="p" className="t-h3 mt-6 max-w-[40ch] font-normal text-muted">
            {p.summary}
          </RevealItem>
        </Reveal>
        <Reveal as="dl" className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-5">
          {meta.map((m) => (
            <RevealItem key={m.k}>
              <dt className="t-label mb-2">{m.k}</dt>
              <dd className="text-sm">{m.v}</dd>
            </RevealItem>
          ))}
        </Reveal>
      </header>

      <div className="shell">
        <WipeImage src={p.cover} alt={`${p.title}: key screens`} preload className="aspect-[16/10] md:aspect-[16/8]" sizes="100vw" />
        {study?.coverCaption && <p className="t-caption mt-4 max-w-[80ch]">{study.coverCaption}</p>}
      </div>

      {study ? (
        <>
          <section aria-label="Outcomes" className="shell py-20 md:py-28">
            <p className="t-body mx-auto max-w-[56ch] text-center text-text md:text-xl">{study.intro}</p>
            <Reveal as="dl" className="mt-16 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
              {study.outcomes.map((o) => (
                <RevealItem key={o.label} className="border-b border-r border-line p-5 md:p-8">
                  <dd className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none">
                    <CountUp value={o.value} />
                  </dd>
                  <dt className="t-caption mt-4">{o.label}</dt>
                </RevealItem>
              ))}
            </Reveal>
            {study.outcomesNote && <p className="t-caption mt-4">{study.outcomesNote}</p>}
          </section>
          <div className="shell pb-[var(--section-y)]">
            {study.blocks.map((b, i) => (
              // `tight` blocks continue the section above, so they sit closer to it.
              <div key={i} className={i === 0 ? "" : b.tight ? "mt-12 md:mt-16" : "mt-[var(--section-y)]"}>
                <Block block={b} />
              </div>
            ))}
          </div>
        </>
      ) : null}

      <CaseCta label={study ? "Want the details?" : "Write-up in progress"} />

      <nav aria-label="Next case study" className="border-t border-line">
        <TransitionLink href={`/work/${next.slug}`} className="next-case group shell flex flex-col gap-6 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <span>
            <span className="t-label mb-5 block">Next case · {next.index}</span>
            <span className="t-display block transition-colors duration-500 group-hover:text-accent">{next.title}</span>
          </span>
          <span className="relative hidden aspect-[4/3] w-64 overflow-hidden rounded-[4px] md:block">
            <Image src={next.thumb} alt={`${next.title} thumbnail`} fill sizes="256px" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
          </span>
        </TransitionLink>
      </nav>
    </article>
  );
}

/** Closing call-to-action on every case page: the rest of the story is a conversation. */
function CaseCta({ label }: { label: string }) {
  return (
    <section aria-labelledby="case-cta-title" className="border-t border-line">
      <Reveal className="shell mx-auto flex max-w-[52rem] flex-col items-center py-[var(--section-y)] text-center">
        <RevealItem as="p" className="t-label mb-6">
          <span className="live-dot mr-2.5 inline-block align-middle" aria-hidden />
          {label}
        </RevealItem>
        <RevealItem>
          <h2 id="case-cta-title" className="t-h1 [text-wrap:balance]">
            The full story is <em>better told on a call.</em>
          </h2>
        </RevealItem>
        <RevealItem as="p" className="t-body mt-6 max-w-[44ch] text-muted">
          The trade-offs, the dead ends, and what I&rsquo;d do differently. Twenty minutes, no slides.
        </RevealItem>
        <RevealItem className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a href={person.bookingUrl} target="_blank" rel="noopener" className="btn-primary group">
              Book a 20-min call <span className="btn-arrow" aria-hidden>→</span>
            </a>
          </Magnetic>
          <a href={`mailto:${person.email}`} className="btn-ghost group">
            Email me <span className="btn-arrow" aria-hidden>→</span>
          </a>
        </RevealItem>
      </Reveal>
    </section>
  );
}

/** Body column of a case section: a label column on the left (empty for continuation blocks). */
function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-8 md:grid-cols-[12rem_minmax(0,1fr)]">
      {label ? <p className="t-label md:sticky md:top-28 md:self-start">{label}</p> : <span aria-hidden className="hidden md:block" />}
      {children}
    </section>
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "text":
      return (
        <Row label={block.label}>
          <Reveal className="max-w-[64ch]">
            {block.heading && (
              <RevealItem as="h2" className="t-h2 mb-8">
                {block.heading}
              </RevealItem>
            )}
            {block.body.map((para, i) => (
              <RevealItem as="p" key={i} className="t-body mb-5 text-muted">
                {para}
              </RevealItem>
            ))}
            {block.note && (
              <RevealItem as="p" className="t-caption mt-2">
                {block.note}
              </RevealItem>
            )}
          </Reveal>
        </Row>
      );
    case "list":
      return (
        <Row label={block.label}>
          <Reveal className="max-w-[64ch]">
            <RevealItem as="h2" className="t-h2 mb-8">
              {block.heading}
            </RevealItem>
            {block.intro && (
              <RevealItem as="p" className="t-body mb-10 text-muted">
                {block.intro}
              </RevealItem>
            )}
            <ol className="border-t border-line">
              {block.items.map((it, i) => (
                <RevealItem
                  as="li"
                  key={it.title}
                  className={`grid gap-2 border-b border-line py-7 ${it.marker ? "md:grid-cols-[7rem_minmax(0,1fr)]" : "grid-cols-[2.5rem_minmax(0,1fr)]"}`}
                >
                  <span className="t-label pt-1.5 text-accent">{it.marker ?? String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="t-h3 block">{it.title}</span>
                    <span className="t-body mt-2 block text-muted">{it.body}</span>
                  </span>
                </RevealItem>
              ))}
            </ol>
          </Reveal>
        </Row>
      );
    case "stats":
      return (
        <Row>
          <div>
            <Reveal className={`grid gap-4 ${block.items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
              {block.items.map((it) => (
                <RevealItem key={it.value + it.label} className="rounded-[4px] border border-line p-6 md:p-7">
                  {it.kicker && <p className="t-label mb-3 text-accent">{it.kicker}</p>}
                  <p className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-none">
                    <CountUp value={it.value} />
                  </p>
                  <p className="t-caption mt-3">{it.label}</p>
                </RevealItem>
              ))}
            </Reveal>
            {block.note && <p className="t-caption mt-4">{block.note}</p>}
          </div>
        </Row>
      );
    case "bars": {
      const max = block.max ?? Math.max(...block.rows.flatMap((r) => r.values));
      const series = block.rows[0]?.values.length ?? 1;
      // Earlier series muted, the last (the new/current one) in the accent colour.
      const tone = (k: number) => (series > 1 && k === series - 1 ? "bg-accent" : "bg-muted/50");
      return (
        <Row>
          <figure className="max-w-[44rem]">
            <figcaption className="mb-6">
              <span className="t-h3 block">{block.title}</span>
              {block.sub && <span className="t-caption mt-1 block">{block.sub}</span>}
              {block.legend && (
                <span className="mt-4 flex flex-wrap gap-5">
                  {block.legend.map((l, k) => (
                    <span key={l} className="t-caption inline-flex items-center gap-2">
                      <span aria-hidden className={`inline-block h-2.5 w-2.5 rounded-[2px] ${tone(k)}`} />
                      {l}
                    </span>
                  ))}
                </span>
              )}
            </figcaption>
            <Reveal as="dl" className="border-t border-line">
              {block.rows.map((r) => (
                <RevealItem key={r.label} className="border-b border-line py-5">
                  <dt className="t-body mb-3 text-sm text-muted">{r.label}</dt>
                  {r.values.map((v, k) => (
                    <dd key={k} className="mt-2 flex items-center gap-4 first:mt-0">
                      <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-line">
                        <span className={`absolute inset-y-0 left-0 rounded-full ${tone(k)}`} style={{ width: `${(v / max) * 100}%` }} />
                      </span>
                      <span className="w-14 text-right text-sm tabular-nums">
                        {block.legend && <span className="sr-only">{block.legend[k]}: </span>}
                        {r.display[k]}
                      </span>
                    </dd>
                  ))}
                </RevealItem>
              ))}
            </Reveal>
          </figure>
        </Row>
      );
    }
    case "image":
      return (
        <figure className={block.wide ? "" : "md:ml-[12rem]"}>
          <WipeImage src={block.src} alt={block.alt} className="aspect-[16/10]" sizes={block.wide ? "100vw" : "75vw"} />
          {block.caption && <figcaption className="t-caption mt-4">{block.caption}</figcaption>}
        </figure>
      );
    case "quote":
      return (
        <Reveal as="section" className="mx-auto w-full max-w-[64rem] text-center">
          <RevealItem as="p" className="t-h1 italic [text-wrap:balance]">
            &ldquo;{block.text}&rdquo;
          </RevealItem>
          {block.cite && <RevealItem as="p" className="t-label mt-8">— {block.cite}</RevealItem>}
        </Reveal>
      );
  }
}

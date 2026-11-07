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
    { k: "Sector", v: p.sector },
    ...(study ? [{ k: "Timeline", v: study.timeline }, { k: "Team", v: study.team }] : []),
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
        <WipeImage src={p.cover} alt={`${p.title} cover image`} preload className="aspect-[16/10] md:aspect-[16/8]" sizes="100vw" />
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
          </section>
          <div className="shell space-y-[var(--section-y)] pb-[var(--section-y)]">
            {study.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
        </>
      ) : (
        <section className="shell py-[var(--section-y)]">
          {/* TODO: write this case study in src/content/cases.ts */}
          <div className="mx-auto max-w-[44ch] text-center">
            <p className="t-label mb-6">Write-up in progress</p>
            <p className="t-h2">The full story is better told on a call.</p>
            <a href={person.bookingUrl} className="btn-primary mt-10">
              Book 20 minutes <span aria-hidden>→</span>
            </a>
          </div>
        </section>
      )}

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

function Block({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "text":
    case "list":
      return (
        <section className="grid gap-8 md:grid-cols-[12rem_minmax(0,1fr)]">
          <p className="t-label md:sticky md:top-28 md:self-start">{block.label}</p>
          <Reveal className="max-w-[64ch]">
            <RevealItem as="h2" className="t-h2 mb-8">
              {block.heading}
            </RevealItem>
            {block.type === "text" ? (
              block.body.map((para, i) => (
                <RevealItem as="p" key={i} className="t-body mb-5 text-muted">
                  {para}
                </RevealItem>
              ))
            ) : (
              <ol className="border-t border-line">
                {block.items.map((it, i) => (
                  <RevealItem as="li" key={it.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2 border-b border-line py-7">
                    <span className="t-label pt-1.5 text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="t-h3 block">{it.title}</span>
                      <span className="t-body mt-2 block text-muted">{it.body}</span>
                    </span>
                  </RevealItem>
                ))}
              </ol>
            )}
          </Reveal>
        </section>
      );
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

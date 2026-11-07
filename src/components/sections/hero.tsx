import Link from "next/link";
import { hero } from "@/content/hero";
import { Magnetic } from "@/components/motion/magnetic";
import { Spotlight } from "@/components/motion/spotlight";
import { Portrait } from "@/components/motion/portrait";
import { AiAtWork } from "@/components/motion/ai-at-work";

/**
 * The hero entrance is CSS-driven (see "Hero entrance" in globals.css) so it paints and
 * plays before any JavaScript loads: no LCP penalty, no flash. Timings mirror lib/motion.ts.
 */
export function Hero() {
  let i = 0; // running word index for the stagger
  return (
    <section
      aria-labelledby="hero-title"
      className="hero relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-32 md:pb-20"
    >
      <Portrait src={hero.portrait.src} alt={hero.portrait.alt} />
      <Spotlight />

      <div className="shell relative z-10">
        <div className="relative">
        <p className="hero-in inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-3 pr-4 text-[0.8125rem] text-text backdrop-blur" style={{ "--d": "0ms" } as React.CSSProperties}>
          <span className="live-dot" aria-hidden />
          {hero.eyebrow}
        </p>

        <h1 id="hero-title" className="t-hero mt-8 md:mt-10">
          {hero.headline.map((seg, s) => {
            if ("break" in seg) return <br key={s} className="hidden md:block" />;
            return seg.text.split(" ").map((w, k) => {
              const idx = i++;
              return (
                <span key={`${s}-${k}`}>
                  <span className="word-mask">
                    <span
                      className={[
                        "word",
                        seg.italic ? "italic" : "",
                        seg.muted ? "text-muted" : "",
                        seg.italic && !seg.mark ? "sheen" : "",
                      ].join(" ")}
                      style={{ "--i": idx } as React.CSSProperties}
                    >
                      {w}
                      {seg.mark && k === seg.text.split(" ").length - 1 && <Scribble />}
                    </span>
                  </span>{" "}
                </span>
              );
            });
          })}
        </h1>

        <AiAtWork />

        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <div>
            <p className="hero-in t-body text-muted" style={{ "--d": "700ms" } as React.CSSProperties}>
              {hero.intro}
            </p>
            <ul aria-label="Toolkit" className="mt-6 flex flex-wrap gap-2">
              {hero.proof.map((p, k) => (
                <li
                  key={p}
                  className="hero-in rounded-full border border-line px-3 py-1 text-xs text-muted"
                  style={{ "--d": `${820 + k * 40}ms` } as React.CSSProperties}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-in flex flex-wrap items-center gap-3 md:justify-end" style={{ "--d": "950ms" } as React.CSSProperties}>
            <Magnetic>
              <Link href={hero.ctaPrimary.href} className="btn-primary group">
                {hero.ctaPrimary.label}
                <span className="btn-arrow" aria-hidden>↓</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href={hero.ctaSecondary.href} className="btn-ghost group">
                {hero.ctaSecondary.label}
                <span className="btn-arrow" aria-hidden>→</span>
              </Link>
            </Magnetic>
          </div>
        </div>

        </div>

        <a
          href="#what-i-do"
          className="hero-in group mx-auto mt-14 flex w-fit flex-col items-center gap-3 md:mt-16"
          style={{ "--d": "1100ms" } as React.CSSProperties}
          aria-label="Scroll to the next section"
        >
          <span className="t-label transition-colors group-hover:text-text">Scroll</span>
          <span className="scroll-line" aria-hidden />
        </a>
      </div>
    </section>
  );
}

/** Hand-drawn underline under "craft." Draws itself in once the headline has landed. */
function Scribble() {
  return (
    <svg className="scribble" viewBox="0 0 220 24" fill="none" preserveAspectRatio="none" aria-hidden>
      <path
        d="M3 15C40 8 92 5 140 7c26 1 50 3 74 6M18 20c46-5 104-7 168-3"
        stroke="var(--accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}

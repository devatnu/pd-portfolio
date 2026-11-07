import { Reveal, RevealItem } from "@/components/motion/reveal";

/**
 * Numbered section shell. Desktop: the № label lives in a left gutter column and is sticky,
 * so it stays pinned while its section scrolls and hands off when the next one arrives.
 * Mobile: the label sits above the heading.
 */
export function Section({
  id,
  number,
  title,
  kicker,
  children,
  className = "",
}: {
  id: string;
  number: string;
  title: string;
  kicker?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-20 border-t border-line py-[var(--section-y)] ${className}`}>
      <div className="shell grid gap-y-8 md:grid-cols-[9rem_minmax(0,1fr)] lg:grid-cols-[12rem_minmax(0,1fr)]">
        <div className="md:relative">
          <p className="t-label section-numeral md:sticky md:top-28">
            <span className="text-accent">№ {number}</span>
            <span className="ml-2 md:mt-3 md:ml-0 md:block">{title}</span>
          </p>
        </div>
        <div className="min-w-0">
          {kicker && (
            <Reveal className="mb-16 md:mb-24">
              <RevealItem>
                <h2 id={`${id}-title`} className="t-h1 max-w-[18ch]">
                  {kicker}
                </h2>
              </RevealItem>
            </Reveal>
          )}
          {!kicker && <h2 id={`${id}-title`} className="sr-only">{title}</h2>}
          {children}
        </div>
      </div>
    </section>
  );
}

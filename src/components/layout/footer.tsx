import { TransitionLink as Link } from "@/components/motion/transition-link";
import { navLinks, person, socials } from "@/content/site";
import { LiveTime } from "@/components/ui/live-time";
import { RollLink } from "@/components/ui/roll-link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="shell grid grid-cols-2 gap-10 md:grid-cols-4">
        <div className="col-span-2">
          <p className="t-label mb-5">Status</p>
          <p className="flex items-center gap-3 t-body">
            <span className="live-dot" aria-hidden />
            {person.status}
          </p>
          <a
            href={`mailto:${person.email}`}
            className="mt-3 inline-block t-body text-muted underline decoration-line underline-offset-4 transition-colors hover:text-text hover:decoration-accent"
          >
            {person.email}
          </a>
        </div>
        <div>
          <p className="t-label mb-5">Index</p>
          <ul className="space-y-2 t-body">
            {navLinks.map((l) => (
              <li key={l.href}>
                <RollLink href={l.href}>{l.label}</RollLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="t-label mb-5">Connect</p>
          <ul className="space-y-2 t-body">
            {socials.map((s) => (
              <li key={s.label}>
                <RollLink href={s.href} target="_blank" rel="noopener">
                  {`${s.label} ↗`}
                </RollLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 t-label">
        <span>
          {person.flag} {person.location} · <LiveTime />
        </span>
        <span>
          {person.edition} · {person.version}
        </span>
        <span>© 2026 {person.name}</span>
      </div>

      {/* Oversized wordmark that bleeds past both edges */}
      <Link
        href="/"
        aria-label="Back to top"
        className="wordmark block select-none whitespace-nowrap text-center font-display leading-[0.78] tracking-[-0.04em] text-text"
      >
        <span aria-hidden>{person.name}</span>
      </Link>
    </footer>
  );
}

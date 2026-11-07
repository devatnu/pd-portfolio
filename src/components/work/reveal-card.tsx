import Image from "next/image";
import type { Project } from "@/content/projects";
import { TransitionLink } from "@/components/motion/transition-link";
import { isExternal, projectHref } from "@/lib/project-href";

/**
 * Project card for the work carousel. On hover or keyboard focus the cover eases in and a
 * panel rises from the bottom with Year / Role / Sector and the case link. On touch screens
 * the panel is simply open and a tap goes straight to the case. Pure CSS (see "Reveal card").
 */
export function RevealCard({ project, featured, onClickCapture }: { project: Project; featured?: boolean; onClickCapture?: React.MouseEventHandler }) {
  const external = isExternal(project);
  return (
    <TransitionLink
      href={projectHref(project)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      draggable={false}
      onClickCapture={onClickCapture}
      aria-label={`${project.title}: ${project.summary} ${external ? "Opens in a new tab." : "Read case study."}`}
      className="reveal-card group relative block aspect-[4/5] overflow-hidden rounded-[4px] bg-surface"
    >
      <Image
        src={project.cover}
        alt={`${project.title} cover`}
        fill
        draggable={false}
        sizes="(min-width: 1024px) 26rem, 82vw"
        className="reveal-cover object-cover"
      />
      <div className="reveal-shade absolute inset-0" />

      <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
        <span className="t-label">
          <span className="text-accent">{project.index}</span> / {project.sector}
        </span>
        {featured && (
          <span className="rounded-full border border-text/15 bg-bg/40 px-2.5 py-1 text-[0.6875rem] text-accent backdrop-blur">
            Featured
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <h3 className="t-h2">{project.title}</h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-text/70">{project.summary}</p>

        {/* The panel: collapses to zero height, rises on hover/focus */}
        <div className="reveal-panel">
          <div className="min-h-0 overflow-hidden">
            <div className="reveal-panel-inner mt-5 border-t border-text/15 pt-4">
              <dl className="grid grid-cols-3 gap-3">
                {(["year", "role", "sector"] as const).map((k) => (
                  <div key={k} className="min-w-0">
                    <dt className="t-label mb-1.5 !text-[0.625rem]">{k}</dt>
                    <dd className="text-[0.8125rem] leading-snug">{project[k]}</dd>
                  </div>
                ))}
              </dl>
              <span className="reveal-cta mt-4 inline-flex items-center gap-2 text-sm text-accent">
                {external ? "Visit project" : "Read case study"}
                <span className="reveal-arrow" aria-hidden>
                  {external ? "↗" : "→"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
}

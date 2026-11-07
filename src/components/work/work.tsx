"use client";
import { AnimatePresence, LayoutGroup, m, useMotionValue, useScroll, useSpring } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { filters, projects, type Filter } from "@/content/projects";
import { RevealCard } from "./reveal-card";
import { layoutTransition, magnetSpring, t } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Selected work: filter chips + one horizontal carousel of every project, featured first.
 * Native horizontal scroll with snap (no scroll hijacking), mouse drag, prev/next buttons,
 * a live counter and a progress rail. Filtering animates cards in and out via layout.
 */
export function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduced = useReducedMotion();
  const layout = layoutTransition(reduced);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const visible = useMemo(() => {
    const list = projects.filter((p) => filter === "All" || p.tags.includes(filter));
    const featured = list.find((p) => p.featured) ?? list[0];
    return featured ? [featured, ...list.filter((p) => p !== featured)] : list;
  }, [filter]);

  // Progress rail + counter follow the native scroll position.
  const { scrollXProgress } = useScroll({ container: track });
  const progress = useSpring(scrollXProgress, { stiffness: 200, damping: 30 });

  const step = () => {
    const first = track.current?.querySelector("li");
    return first ? first.getBoundingClientRect().width + 16 : 320;
  };
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setActive(atEnd ? visible.length - 1 : Math.round(el.scrollLeft / step()));
  };
  const go = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * step(), behavior: reduced ? "auto" : "smooth" });

  const selectFilter = (f: Filter) => {
    setFilter(f);
    setActive(0);
    track.current?.scrollTo({ left: 0, behavior: reduced ? "auto" : "smooth" });
  };

  // Mouse drag-to-scroll. Touch and trackpads already scroll natively.
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !track.current) return;
    drag.current = { down: true, x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down || !track.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    setDragging(false);
  };
  // A drag must not count as a click on the card underneath.
  const swallowClickAfterDrag = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <LayoutGroup>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = f === filter;
            const count = f === "All" ? projects.length : projects.filter((p) => p.tags.includes(f)).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => selectFilter(f)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 active:scale-[0.97] ${on ? "text-bg" : "text-muted hover:text-text"}`}
              >
                {on && (
                  <m.span
                    layoutId="chip-pill"
                    className="absolute inset-0 rounded-full bg-text"
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {!on && <span className="absolute inset-0 rounded-full border border-line" />}
                <span className="relative">
                  {f} <sup className="ml-0.5 font-mono text-[0.6rem] opacity-60">{count}</sup>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <span className="t-label tabular-nums" aria-live="polite">
            <span className="text-text">{String(Math.min(active + 1, visible.length)).padStart(2, "0")}</span> / {String(visible.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir)}
                aria-label={dir < 0 ? "Previous project" : "Next project"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-muted hover:text-text active:scale-95"
              >
                <span aria-hidden>{dir < 0 ? "←" : "→"}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative -mr-[var(--gutter)]">
        <m.ul
          ref={track}
          layoutScroll
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          aria-label="Projects"
          className={`work-track flex gap-4 overflow-x-auto pb-2 pr-[var(--gutter)] ${dragging ? "is-dragging" : ""}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, k) => (
              <m.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 0.94, transition: reduced ? { duration: 0 } : t("fast") }}
                transition={layout}
                className="w-[min(78vw,22rem)] shrink-0 snap-start lg:w-[24rem]"
              >
                <RevealCard project={p} featured={k === 0 && p.featured} onClickCapture={swallowClickAfterDrag} />
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
        {!reduced && <DragCursor target={track} dragging={dragging} />}
      </div>

      <div aria-hidden className="relative mt-6 h-px bg-line">
        <m.span className="absolute inset-0 origin-left bg-text" style={{ scaleX: progress }} />
      </div>
    </LayoutGroup>
  );
}

/** A small "Drag" label that trails the mouse over the carousel. Mouse only. */
function DragCursor({ target, dragging }: { target: React.RefObject<HTMLUListElement | null>; dragging: boolean }) {
  const x = useSpring(useMotionValue(0), magnetSpring);
  const y = useSpring(useMotionValue(0), magnetSpring);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setShow(true);
    };
    const leave = () => setShow(false);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", leave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", leave);
    };
  }, [target, x, y]);

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)]:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <m.span
        className="flex h-16 w-16 items-center justify-center rounded-full bg-text text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-bg"
        initial={false}
        animate={{ scale: show ? (dragging ? 0.8 : 1) : 0, opacity: show ? 1 : 0 }}
        transition={t("fast")}
      >
        Drag
      </m.span>
    </m.div>
  );
}

import { TransitionLink } from "@/components/motion/transition-link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-end pb-24 pt-40">
      <p className="t-label mb-6"><span className="text-accent">№ 404</span> · Not found</p>
      <h1 className="t-display max-w-[14ch]">This page was <em>never designed.</em></h1>
      <TransitionLink href="/" className="btn-ghost group mt-12 self-start">
        Back to the index <span className="btn-arrow" aria-hidden>→</span>
      </TransitionLink>
    </section>
  );
}

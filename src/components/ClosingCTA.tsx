import Link from "next/link";

export function ClosingCTA() {
  return (
    <section className="border-t border-border bg-bg-raised">
      <div className="mx-auto max-w-[1200px] px-6 py-24 text-center md:py-32">
        <h2 className="text-32 font-semibold tracking-tight md:text-48">
          Ready to make parking a controlled revenue line?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
          We work with institutional owners, management companies, and
          self-operated portfolios evaluating whether their current controls
          match the scale of their assets.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="cta-primary rounded-full bg-accent px-8 py-3.5 text-16 font-semibold text-white transition-colors hover:bg-accent-dim"
          >
            Request an engagement
          </Link>
          <Link
            href="/contact#schedule"
            className="text-14 font-medium text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary"
          >
            Book an intro call
          </Link>
        </div>
      </div>
    </section>
  );
}

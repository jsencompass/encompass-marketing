import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[800px] px-6 py-24 text-center md:py-32">
      <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
        404 &middot; Not Found
      </p>
      <h1 className="mt-4 text-48 font-semibold tracking-tight">
        This page went to a different garage.
      </h1>
      <p className="mx-auto mt-6 max-w-lg text-18 leading-relaxed text-text-secondary">
        The URL you followed doesn&rsquo;t match anything we&rsquo;re hosting.
        It may have been moved, or the link might be broken.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="cta-primary rounded-full bg-accent px-6 py-3 text-14 font-semibold text-white transition-colors hover:bg-accent-dim"
        >
          Return home
        </Link>
        <Link
          href="/contact"
          className="group flex items-center gap-1 text-14 font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          Contact us <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </Link>
      </div>
      <div className="mx-auto mt-16 max-w-sm">
        <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">Popular destinations</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {[
            { label: "How It Works", href: "/how-it-works" },
            { label: "Services", href: "/services" },
            { label: "Who We Are", href: "/who-we-are" },
            { label: "Insights", href: "/insights" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-14 text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

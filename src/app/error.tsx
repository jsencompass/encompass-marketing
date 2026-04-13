"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto max-w-[800px] px-6 py-24 text-center md:py-32">
      <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
        Something Went Wrong
      </p>
      <h1 className="mt-4 text-48 font-semibold tracking-tight">
        We hit an exception on our side.
      </h1>
      <p className="mx-auto mt-6 max-w-lg text-18 leading-relaxed text-text-secondary">
        This isn&rsquo;t supposed to happen. We&rsquo;ve been notified. You can
        try again, or reach out if the issue persists.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="cta-primary rounded-full bg-accent px-6 py-3 text-14 font-semibold text-white transition-colors hover:bg-accent-dim"
        >
          Try again
        </button>
        <a
          href="mailto:contact@encompassparking.com"
          className="text-14 font-medium text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary"
        >
          Email us at contact@encompassparking.com
        </a>
      </div>
      {process.env.NODE_ENV === "development" && (
        <details className="mx-auto mt-12 max-w-lg text-left">
          <summary className="cursor-pointer text-14 text-text-tertiary">Error details (dev only)</summary>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-bg-elevated p-4 text-12 text-status-loss">
            {error.message}
            {"\n"}
            {error.stack}
          </pre>
        </details>
      )}
    </section>
  );
}

import Link from "next/link";

const pactLanes = [
  {
    name: "Controls-Onboarding + PPB",
    description:
      "We document every revenue control, build the Parking Performance Baseline, and establish a single source of truth before oversight begins.",
    tag: "Base",
  },
  {
    name: "PACT Oversight",
    description:
      "Continuous transaction-level auditing that verifies controls are functioning, flags exceptions, and delivers monthly closure reports.",
    tag: "Base",
  },
  {
    name: "Remote Command Center",
    description:
      "24/7 monitoring of PARCS, LPR, and payment systems — catching device failures, configuration drift, and revenue leakage in real time.",
    tag: "Optional",
  },
  {
    name: "Remote Call Center",
    description:
      "White-labeled guest support that resolves intercom calls, validation issues, and payment disputes without burdening on-site staff.",
    tag: "Optional",
  },
];

const stats = [
  { value: "70+", label: "years combined experience" },
  { value: "3,000+", label: "mystery shops completed" },
  { value: "800+", label: "projects delivered" },
  { value: "$150M+", label: "installation value managed" },
];

const team = [
  {
    name: "Joe Dudek",
    role: "Operations & Governance",
    detail: "LAX, $85M revenue",
    anchor: "#joe",
  },
  {
    name: "Jason Scott",
    role: "Delivery & Assurance",
    detail: "800+ projects, Parking PI",
    anchor: "#jason",
  },
  {
    name: "Steven Grant",
    role: "Technology & Architecture",
    detail: "Oracle, Booz Allen",
    anchor: "#steven",
  },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-24 md:pt-32 md:pb-32">
        <p className="text-12 font-semibold uppercase tracking-widest text-accent">
          Controllership for Parking Revenue
        </p>
        <h1 className="mt-4 max-w-3xl text-48 font-semibold leading-tight tracking-tight md:text-64 md:leading-[1.1]">
          Operators run the garage.{" "}
          <span className="text-accent">We own the proof.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
          Encompass is the control layer that sits above any operator and any
          parking technology stack. We don&rsquo;t replace systems — we govern
          them. Proof, closure, and continuous improvement, delivered per
          site-month.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-accent px-6 py-3 text-14 font-semibold text-white transition-colors hover:bg-accent-dim"
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
      </section>

      {/* ─── The Control Gap ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <h2 className="text-32 font-semibold tracking-tight md:text-48">
            The structural gap in parking revenue
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              "Operators manage throughput",
              "Vendors manage devices",
              "Nobody owns proof",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-border bg-bg-raised p-8"
              >
                <p className="text-18 font-medium text-text-primary">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-3xl text-18 leading-relaxed text-text-secondary">
            That gap is where NOI erodes quietly — through drift, exceptions,
            and controls that go unverified.
          </p>
        </div>
      </section>

      {/* ─── What PACT Does ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            Solution
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            PACT — Parking Asset Control Tower
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {pactLanes.map((lane) => (
              <div
                key={lane.name}
                className="rounded-lg border border-border bg-bg-raised p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-18 font-semibold text-text-primary">
                    {lane.name}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-0.5 text-12 font-medium ${
                      lane.tag === "Base"
                        ? "bg-accent/10 text-accent"
                        : "bg-bg-elevated text-text-tertiary"
                    }`}
                  >
                    {lane.tag}
                  </span>
                </div>
                <p className="mt-3 text-14 leading-relaxed text-text-secondary">
                  {lane.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Proof Strip ─── */}
      <section className="border-t border-border bg-bg-raised">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8 px-6 py-12">
          {stats.map((s, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="font-mono text-32 font-medium text-text-primary md:text-48">
                {s.value}
              </span>
              <span className="text-14 text-text-tertiary">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Team Teaser ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <h2 className="text-32 font-semibold tracking-tight md:text-48">
            Built by operators who&rsquo;ve owned the problem
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((t) => (
              <Link
                key={t.name}
                href={`/who-we-are${t.anchor}`}
                className="group rounded-lg border border-border bg-bg-raised p-8 transition-colors hover:border-accent/40"
              >
                <h3 className="text-18 font-semibold text-text-primary group-hover:text-accent">
                  {t.name}
                </h3>
                <p className="mt-1 text-14 text-text-secondary">{t.role}</p>
                <p className="mt-3 font-mono text-12 text-text-tertiary">
                  {t.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <section className="border-t border-border bg-bg-raised">
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center md:py-32">
          <h2 className="text-32 font-semibold tracking-tight md:text-48">
            Ready to make parking a controlled revenue line?
          </h2>
          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-3.5 text-16 font-semibold text-white transition-colors hover:bg-accent-dim"
            >
              Request an engagement
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

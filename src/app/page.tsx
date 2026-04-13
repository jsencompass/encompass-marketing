import Link from "next/link";
import { ClosingCTA } from "@/components/ClosingCTA";

const capabilities = [
  {
    name: "Implementation + PPB",
    description:
      "Paid onboarding that establishes the starting truth set. Maps sessions, transactions, validations, and credentials into one reconcilable view.",
    tag: "Base",
  },
  {
    name: "PACT Oversight",
    description:
      "Monthly close-pack audit, session-to-deposit tie-out, and exception governance. Rate, product, and validation integrity managed as operating levers.",
    tag: "Base",
  },
  {
    name: "Remote Command Center",
    description:
      "24/7 monitoring, alert triage, and dispatch for revenue-at-risk incidents. Permissioned actions with time-stamped evidence.",
    tag: "Optional",
  },
  {
    name: "Remote Call Center",
    description:
      "Customer support via Umojo\u2019s NexPark platform, operated under Encompass scripts and authority limits.",
    tag: "Optional",
  },
];

const tiers = [
  {
    name: "Foundation",
    price: "$2,250",
    description:
      "For portfolios establishing controllership for the first time. Automated data feeds required.",
    highlight: false,
  },
  {
    name: "Performance",
    price: "$3,500",
    description:
      "For portfolios with mixed data posture and deeper variance closure needs.",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$6,750",
    description:
      "For institutional portfolios requiring cross-operator normalization and executive-level rollups.",
    highlight: false,
  },
];

const stats = [
  { value: "70+", label: "years combined in parking operations" },
  { value: "LAX", label: "$85M revenue, 800+ employees managed" },
  { value: "$10B", label: "One Beverly Hills — active engagement" },
  { value: "800+", label: "PARCS and technology projects delivered" },
  { value: "3,000+", label: "Parking PI mystery shops completed" },
];

const team = [
  {
    name: "Joe Dudek",
    initials: "JD",
    role: "Operations & Governance",
    detail:
      "Ran LAX parking — $85M revenue, 800+ employees, 40% net revenue increase.",
    anchor: "#joe",
  },
  {
    name: "Jason Scott",
    initials: "JS",
    role: "Delivery & Assurance",
    detail:
      "800+ projects, $150M+ installation value, built the Parking PI platform from concept to 3,000+ shops.",
    anchor: "#jason",
  },
  {
    name: "Steven Grant",
    initials: "SG",
    role: "Technology & Architecture",
    detail:
      "Oracle, Booz Allen, LTK Engineering. Five major airport deployments.",
    anchor: "#steven",
  },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="min-h-[520px] md:min-h-[640px]">
        <div className="mx-auto max-w-[1200px] px-6 pt-24 pb-24 md:pt-32 md:pb-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-accent">
            Controllership for Parking Revenue
          </p>
          <h1 className="mt-4 max-w-3xl text-48 font-semibold leading-tight tracking-tight md:text-64 md:leading-[1.1]">
            Operators run the garage.{" "}
            <span className="text-accent">We own the proof.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
            Encompass is the controllership layer for parking assets. We sit
            above any operator and any technology stack — reconciling revenue,
            governing exceptions, and continuously improving NOI across every
            site in the portfolio.
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
              className="group flex items-center gap-1 text-14 font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Book an intro call
              <span className="transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── The Control Gap ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            The Structural Problem
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            Nobody owns proof.
          </h2>
          <p className="mt-8 max-w-3xl text-18 leading-relaxed text-text-secondary">
            Parking is a $30B industry managed by capable parties across
            fractured seams. Operators run throughput. PARCS vendors run
            devices. Finance teams receive month-end packets. Everyone is doing
            a real job — and the full chain of proof, closure, and policy
            discipline belongs to no one. That gap is where NOI erodes quietly,
            through drift, exceptions, and controls that go unverified.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                eyebrow: "Operators",
                text: "Manage throughput and staffing",
              },
              { eyebrow: "Vendors", text: "Manage devices and settlement" },
              {
                eyebrow: "Your Asset",
                text: "Has no standing controllership",
              },
            ].map((card) => (
              <div
                key={card.eyebrow}
                className="rounded-lg border border-border bg-bg-raised p-8"
              >
                <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
                  {card.eyebrow}
                </p>
                <p className="mt-3 text-18 font-medium text-text-primary">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What We Do — PACT ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            Parking Asset Control Tower
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            A recurring controllership layer, delivered per site-month.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {capabilities.map((cap) => (
              <div
                key={cap.name}
                className="rounded-lg border border-border bg-bg-raised p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-18 font-semibold text-text-primary">
                    {cap.name}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-0.5 text-12 font-medium ${
                      cap.tag === "Base"
                        ? "bg-accent/10 text-accent"
                        : "bg-bg-elevated text-text-tertiary"
                    }`}
                  >
                    {cap.tag}
                  </span>
                </div>
                <p className="mt-3 text-14 leading-relaxed text-text-secondary">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services & Pricing ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            Services &amp; Pricing
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            Three tiers. One standard of rigor.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-lg border p-8 ${
                  tier.highlight
                    ? "border-accent bg-bg-raised"
                    : "border-border bg-bg-raised"
                }`}
              >
                <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
                  {tier.name}
                </p>
                <p className="mt-3 font-mono text-32 font-medium text-text-primary">
                  {tier.price}
                </p>
                <p className="mt-1 text-14 text-text-tertiary">
                  per site-month
                </p>
                <p className="mt-4 text-14 leading-relaxed text-text-secondary">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-14 text-text-tertiary">
            Implementation + PPB: $4,500 per site. Optional modules priced
            separately.{" "}
            <Link
              href="/services"
              className="text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary"
            >
              See Services for the full matrix.
            </Link>
          </p>
        </div>
      </section>

      {/* ─── Team Credibility Band ─── */}
      <section className="border-t border-border bg-bg-raised">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <p className="mb-10 text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            Built by operators who&rsquo;ve owned the problem
          </p>
          <div className="flex flex-wrap items-baseline justify-between gap-8">
            {stats.map((s, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="font-mono text-32 font-medium text-text-primary md:text-48">
                  {s.value}
                </span>
                <span className="max-w-[160px] text-14 leading-snug text-text-tertiary">
                  {s.label}
                </span>
                {i < stats.length - 1 && (
                  <span className="ml-4 hidden h-10 w-px bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Proof Visual ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            What Governance Looks Like
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            PACT makes revenue proof continuous.
          </h2>
          <div className="mt-12 aspect-[5/3] w-full rounded-lg border border-border bg-bg-raised flex items-center justify-center">
            <p className="text-14 text-text-tertiary">
              PACT dashboard screenshot — baseline dossier view (placeholder)
            </p>
          </div>
          <p className="mt-6 max-w-3xl text-14 leading-relaxed text-text-secondary">
            Session-to-deposit tie-out. Exception governance with reason codes
            and closure standards. Rate, product, and validation integrity
            tracked as operating levers. Every site, every month.
          </p>
        </div>
      </section>

      {/* ─── Who We Are Teaser ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            The Team
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            Three principals. Seventy years of parking.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((t) => (
              <Link
                key={t.name}
                href={`/who-we-are${t.anchor}`}
                className="group rounded-lg border border-border bg-bg-raised p-8 transition-colors hover:border-accent/40"
              >
                <div className="mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-full bg-bg-elevated">
                  <span className="text-36 font-semibold text-text-secondary">
                    {t.initials}
                  </span>
                </div>
                <h3 className="mt-6 text-center text-18 font-semibold text-text-primary group-hover:text-accent">
                  {t.name}
                </h3>
                <p className="mt-1 text-center text-14 text-text-secondary">
                  {t.role}
                </p>
                <p className="mt-3 text-center text-14 leading-relaxed text-text-secondary">
                  {t.detail}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/who-we-are"
              className="group inline-flex items-center gap-1 text-14 font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Meet the team
              <span className="transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <ClosingCTA />
    </>
  );
}

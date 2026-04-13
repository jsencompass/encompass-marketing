import Link from "next/link";
import { ClosingCTA } from "@/components/ClosingCTA";
import { PactIcon } from "@/components/icons/PactIcon";
import { ParkingPiIcon } from "@/components/icons/ParkingPiIcon";
import { ProTrackIcon } from "@/components/icons/ProTrackIcon";
import { CommandCenterIcon } from "@/components/icons/CommandCenterIcon";
import { BreakerGrid } from "@/components/breakers/BreakerGrid";
import { BreakerDiagonal } from "@/components/breakers/BreakerDiagonal";
import { BreakerDots } from "@/components/breakers/BreakerDots";

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

const platformIcons: Record<string, React.ReactNode> = {
  pact: <PactIcon className="text-accent" />,
  pi: <ParkingPiIcon className="text-accent" />,
  protrack: <ProTrackIcon className="text-accent" />,
  command: <CommandCenterIcon className="text-accent" />,
};

const platforms = [
  {
    key: "pact",
    name: "PACT\u2122",
    title: "Parking Asset Control Tower",
    description:
      "The vendor-agnostic controllership layer. Reconciles revenue, governs exceptions, enforces policy across any operator and any stack.",
  },
  {
    key: "pi",
    name: "Parking PI\u2122",
    title: "Mystery Shop Platform",
    description:
      "The industry\u2019s only mystery shop platform purpose-built for parking. 3,000+ shops completed. Shopper portal, weighted scoring, client dashboard.",
  },
  {
    key: "protrack",
    name: "ProTrack\u2122",
    title: "Project Management",
    description:
      "Project management platform for PARCS installations and technology upgrades. 800+ projects. Backbone of institutional-grade delivery.",
  },
  {
    key: "command",
    name: "Command Center",
    title: "Remote Operations",
    description:
      "Remote monitoring, alert triage, and dispatch for revenue-at-risk incidents. 24/7 coverage with permissioned operational response.",
  },
];

const stats = [
  { value: "70+", label: "years combined in parking operations" },
  { value: "LAX", label: "$85M revenue, 800+ employees managed" },
  { value: "$10B", label: "One Beverly Hills \u2014 active engagement" },
  { value: "800+", label: "PARCS and technology projects delivered" },
  { value: "3,000+", label: "Parking PI mystery shops completed" },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ───
        Hero bg: full-bleed, min-height 720px desktop / 600px mobile.
        Overlay: --bg-base at 0.75 opacity.
        Source: institutional parking structure at dusk, wide aspect, downtown LA preferred.
        Path: /public/hero/hero-bg.jpg (2400x1400 source, srcset 1x/2x).
        Motion: parallax 0.3x scroll speed desktop, static mobile.
        Placeholder: gradient until real asset is supplied.
      */}
      <section
        className="relative min-h-[600px] md:min-h-[720px]"
        style={{
          background:
            "linear-gradient(135deg, #0A0A0B 0%, #18181B 50%, #0A0A0B 100%)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-6 pt-24 pb-24 md:pt-32 md:pb-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
            Controllership for Parking Revenue
          </p>
          <h1 className="mt-4 max-w-3xl text-48 font-semibold leading-tight tracking-tight md:text-64 md:leading-[1.1]">
            Operators run the garage.{" "}
            <span className="text-accent-text">We own the proof.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
            Encompass is the controllership layer for parking assets. We sit
            above any operator and any technology stack &mdash; reconciling
            revenue, governing exceptions, and continuously improving NOI
            across every site in the portfolio.
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

      {/* ─── Why Encompass Exists (The Control Gap) ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            Why Encompass Exists
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            Until Encompass, nobody did.
          </h2>
          <p className="mt-8 max-w-3xl text-18 leading-relaxed text-text-secondary">
            Parking is a $30B industry managed by capable parties across
            fractured seams. Operators run throughput. PARCS vendors run
            devices. Finance teams receive month-end packets. Everyone is doing
            a real job &mdash; and until Encompass, the full chain of proof,
            closure, and policy discipline belonged to no one. That gap is
            where NOI erodes quietly, through drift, exceptions, and controls
            that go unverified. We built the controllership layer to close it.
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

      <BreakerGrid />

      {/* ─── What We Do — PACT ─── */}
      <section className="border-b border-border">
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
                        ? "bg-accent/10 text-accent-text"
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
      <section className="border-b border-border">
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

      {/* ─── Capabilities Band ─── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            What We Bring to the Asset
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            Four proprietary platforms. One recurring operating system.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p) => (
              <div key={p.key} className="card-hover rounded-lg border border-border bg-bg-raised p-8">
                <div className="flex h-8 w-8 items-center justify-center">
                  {platformIcons[p.key]}
                </div>
                <h3 className="mt-4 text-16 font-semibold text-text-primary">
                  {p.name}
                </h3>
                <p className="mt-1 text-12 text-text-tertiary">{p.title}</p>
                <p className="mt-3 text-14 leading-relaxed text-text-secondary">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BreakerDiagonal />

      {/* ─── Team Credibility Band ─── */}
      <section className="border-b border-border bg-bg-raised">
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
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            What Governance Looks Like
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            PACT makes revenue proof continuous.
          </h2>
          {/* PACT screenshot placeholder: /public/proof/pact-baseline.png
            Dimensions: 1200x720 desktop, full-width mobile.
            Ken Burns: scale 1.0 → 1.03 over 8s, ease-in-out, reverses on desktop. Static mobile. */}
          <div className="mt-12 aspect-[5/3] w-full overflow-hidden rounded-lg border border-border bg-bg-raised flex items-center justify-center">
            <p className="text-14 text-text-tertiary">
              PACT dashboard screenshot &mdash; baseline dossier view
              (placeholder)
            </p>
          </div>
          <p className="mt-6 max-w-3xl text-14 leading-relaxed text-text-secondary">
            Session-to-deposit tie-out. Exception governance with reason codes
            and closure standards. Rate, product, and validation integrity
            tracked as operating levers. Every site, every month.
          </p>
        </div>
      </section>

      <BreakerDots />

      {/* ─── Closing CTA ─── */}
      <ClosingCTA />
    </>
  );
}

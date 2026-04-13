import type { Metadata } from "next";
import { ClosingCTA } from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Services & Pricing — Encompass Parking",
  description:
    "Three tiers, modular add-ons, no hidden scope. Encompass controllership services priced per site-month.",
};

const tiers = [
  {
    name: "Foundation",
    price: "$2,250",
    positioning: "For portfolios establishing controllership for the first time.",
    dataPosture: "Automated data feeds required",
    highlight: false,
    included: [
      "Automated transaction ingestion and normalization",
      "Session-to-deposit reconciliation",
      "Monthly close-pack audit",
      "Standard exception governance (included allowance)",
      "Rate integrity monitoring",
      "Validation policy compliance checks",
      "Owner-facing monthly summary",
      "Dedicated Encompass analyst",
    ],
  },
  {
    name: "Performance",
    price: "$3,500",
    positioning: "For portfolios with mixed data posture and deeper variance closure needs.",
    dataPosture: "Mixed data posture (automated + manual artifacts)",
    highlight: true,
    included: [
      "Everything in Foundation",
      "Manual artifact processing and digitization",
      "Expanded exception register with tiered approvals",
      "Variance workup and root-cause analysis",
      "Credential and permissions posture audit",
      "Product mix optimization recommendations",
      "Bi-weekly calibration calls",
      "Priority escalation path",
    ],
  },
  {
    name: "Enterprise",
    price: "$6,750",
    positioning: "For institutional portfolios requiring cross-operator normalization.",
    dataPosture: "Any data posture (manual-heavy supported)",
    highlight: false,
    included: [
      "Everything in Performance",
      "Cross-operator normalization and benchmarking",
      "Portfolio-level rollup reporting",
      "Executive dashboard access",
      "Custom exception taxonomy per asset class",
      "Operator scorecard and SLA tracking",
      "Quarterly business review with principals",
      "Custom integration support",
    ],
  },
];

export default function Services() {
  return (
    <>
      {/* ─── Page Header ─── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <p className="text-12 font-semibold uppercase tracking-widest text-accent">
          Services &amp; Pricing
        </p>
        <h1 className="mt-4 max-w-3xl text-48 font-semibold leading-tight tracking-tight md:text-64 md:leading-[1.1]">
          Three tiers. Modular add-ons. No hidden scope.
        </h1>
        <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
          Every engagement is priced per site-month against a published tier.
          Scope expansion happens through paid module attach, not absorption.
          Implementation plus Parking Performance Baseline is required for
          every new site.
        </p>
      </section>

      {/* ─── Tier Cards ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-lg border p-8 ${
                  tier.highlight
                    ? "border-accent bg-bg-raised"
                    : "border-border bg-bg-raised"
                }`}
              >
                <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
                  {tier.name}
                </p>
                <p className="mt-4 font-mono text-48 font-medium text-text-primary">
                  {tier.price}
                </p>
                <p className="mt-1 text-14 text-text-tertiary">
                  per site-month
                </p>
                <p className="mt-4 text-14 leading-relaxed text-text-secondary">
                  {tier.positioning}
                </p>

                <div className="my-6 h-px bg-border" />

                <ul className="flex-1 space-y-3">
                  {tier.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-14 text-text-secondary"
                    >
                      <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="my-6 h-px bg-border" />

                <p className="text-12 text-text-tertiary">
                  Data posture: {tier.dataPosture}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Implementation + PPB ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <div className="rounded-lg border border-border bg-bg-raised p-8 md:p-12">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
                  Required for All New Engagements
                </p>
                <h2 className="mt-4 text-32 font-semibold tracking-tight">
                  Implementation + Parking Performance Baseline
                </h2>
              </div>
              <p className="font-mono text-32 font-medium text-text-primary">
                $4,500
                <span className="text-14 text-text-tertiary"> per site</span>
              </p>
            </div>
            <p className="mt-6 max-w-2xl text-16 leading-relaxed text-text-secondary">
              Paid onboarding that establishes the starting truth set. Maps
              sessions, transactions, validations, and credentials into one
              reconcilable view. Deliverable: the Parking Performance Baseline
              that makes a site controls-ready for recurring PACT Oversight.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Optional Modules ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            Optional Modules
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            Attach where coverage economics justify it.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-bg-raised p-8">
              <h3 className="text-18 font-semibold text-text-primary">
                Remote Command Center
              </h3>
              <p className="mt-2 font-mono text-24 font-medium text-text-primary">
                $500&ndash;$15,000+
                <span className="text-14 text-text-tertiary">
                  {" "}per site-month
                </span>
              </p>
              <p className="mt-4 text-14 leading-relaxed text-text-secondary">
                24/7 remote monitoring, alert triage, and dispatch for
                revenue-at-risk incidents. Permissioned operational actions with
                time-stamped evidence. Pricing varies by coverage mode, site
                complexity, and hours of operation.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-bg-raised p-8">
              <h3 className="text-18 font-semibold text-text-primary">
                Remote Call Center
              </h3>
              <div className="mt-2 space-y-1">
                <p className="font-mono text-16 font-medium text-text-primary">
                  After-hours: $450
                  <span className="text-14 text-text-tertiary"> /site-month</span>
                </p>
                <p className="font-mono text-16 font-medium text-text-primary">
                  24/7: $900
                  <span className="text-14 text-text-tertiary"> /site-month</span>
                </p>
                <p className="font-mono text-16 font-medium text-text-primary">
                  Setup: $1,500
                  <span className="text-14 text-text-tertiary"> one-time</span>
                </p>
              </div>
              <p className="mt-4 text-14 leading-relaxed text-text-secondary">
                Branded customer support via Umojo&rsquo;s NexPark platform,
                operated under Encompass scripts and authority limits. Reduces
                refund-first habits and keeps customer-support issues feeding
                back into governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Parking PI ─── */}
      <section className="border-t border-border bg-bg-raised">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            Independent Verification
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            Parking PI&trade; Mystery Shop Program
          </h2>
          <div className="mt-8 flex flex-wrap items-baseline gap-4">
            <p className="font-mono text-32 font-medium text-text-primary">
              $80&ndash;$250
            </p>
            <p className="text-14 text-text-tertiary">per shop</p>
          </div>
          <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
            Purpose-built for parking. 3,000+ shops completed across the
            western United States. Shopper portal, weighted scoring, client
            dashboard. Often used to reveal the operational gaps that justify
            PACT Oversight.
          </p>
        </div>
      </section>

      {/* ─── Margin Protection Note ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <p className="text-14 text-text-tertiary">
            If manual artifacts or exception register items exceed the included
            allowance by &gt;25% for two consecutive months, pricing adjusts via
            overage or tier change at the next invoice cycle. This protects
            engagement quality for every client.
          </p>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <ClosingCTA />
    </>
  );
}

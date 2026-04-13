import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ComparisonMatrix } from "./ComparisonMatrix";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Services & Pricing — Encompass Parking",
  description:
    "Three tiers, modular add-ons, no hidden scope. Encompass controllership services priced per site-month.",
};

export default function Services() {
  return (
    <>
      {/* ─── Page Header ─── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
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

      {/* ─── Comparison Matrix ─── */}
      <Reveal>
        <ComparisonMatrix />
      </Reveal>

      {/* ─── Implementation + PPB ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <Reveal>
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
          </Reveal>
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
            <Reveal delay={0}>
              <div className="card-lift rounded-lg border border-border bg-bg-raised p-8">
                <h3 className="text-18 font-semibold text-text-primary">
                  Remote Command Center
                </h3>
                <p className="mt-2 font-mono text-24 font-medium text-text-primary">
                  $500&ndash;$15,000+
                  <span className="text-14 text-text-tertiary"> per site-month</span>
                </p>
                <p className="mt-4 text-14 leading-relaxed text-text-secondary">
                  24/7 remote monitoring, alert triage, and dispatch for
                  revenue-at-risk incidents. Permissioned operational actions with
                  time-stamped evidence.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="card-lift rounded-lg border border-border bg-bg-raised p-8">
                <h3 className="text-18 font-semibold text-text-primary">
                  Remote Call Center
                </h3>
                <div className="mt-2 space-y-1">
                  <p className="font-mono text-16 font-medium text-text-primary">
                    After-hours: $450<span className="text-14 text-text-tertiary"> /site-month</span>
                  </p>
                  <p className="font-mono text-16 font-medium text-text-primary">
                    24/7: $900<span className="text-14 text-text-tertiary"> /site-month</span>
                  </p>
                  <p className="font-mono text-16 font-medium text-text-primary">
                    Setup: $1,500<span className="text-14 text-text-tertiary"> one-time</span>
                  </p>
                </div>
                <p className="mt-4 text-14 leading-relaxed text-text-secondary">
                  Branded customer support via Umojo&rsquo;s NexPark platform,
                  operated under Encompass scripts and authority limits.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Parking PI ─── */}
      <section className="border-t border-border bg-bg-raised">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <Reveal>
            <>
              <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
                Independent Verification
              </p>
              <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
                Parking PI&trade; Mystery Shop Program
              </h2>
              <div className="mt-8 flex flex-wrap items-baseline gap-4">
                <p className="font-mono text-32 font-medium text-text-primary">$80&ndash;$250</p>
                <p className="text-14 text-text-tertiary">per shop</p>
              </div>
              <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
                Purpose-built for parking. 3,000+ shops completed across the
                western United States. Shopper portal, weighted scoring, client
                dashboard.
              </p>
            </>
          </Reveal>
        </div>
      </section>

      {/* ─── Margin Protection ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <p className="text-14 text-text-tertiary">
            <strong className="text-text-secondary">Every engagement includes defined scope allowances.</strong>{" "}
            If operational workload materially exceeds included capacity, we
            discuss an adjusted tier or overage openly &mdash; no surprise
            invoices, no quietly absorbed scope creep. This keeps quality and
            economics aligned for both sides.
          </p>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}

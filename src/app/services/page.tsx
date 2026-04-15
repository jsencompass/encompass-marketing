import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCTA } from "@/components/ClosingCTA";
import { ComparisonMatrix } from "./ComparisonMatrix";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Services & Pricing | Encompass Parking",
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
            Implementation plus Parking Performance Baseline (PPB) is required for
            every new site.
          </p>
        </section>

      {/* ─── Comparison Matrix ─── */}
      <Reveal>
        <div className="mx-auto max-w-[1200px] bg-bg-raised border border-border/40 rounded-2xl shadow-xl shadow-black/20 overflow-hidden mt-8 md:mt-12">
          <ComparisonMatrix />
        </div>
      </Reveal>

      {/* ─── Scope Allowances ─── */}
      <div className="mt-6 mb-12 mx-auto max-w-[1200px] border-l-2 border-accent/30 pl-6">
        <p className="text-[15px] leading-relaxed text-text-secondary">
          Every engagement includes defined scope allowances. If operational workload materially exceeds included capacity, we discuss an adjusted tier or overage openly. No surprise invoices, no quietly absorbed scope creep. This keeps quality and economics aligned for both sides.
        </p>
      </div>

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
                Paid onboarding that establishes the starting truth set. Maps sessions, transactions, validations, and credentials into one reconcilable view. The Parking Performance Baseline (PPB) is what makes a site controls-ready for recurring PACT Oversight.
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
                <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-text">ADD-ON MODULE</span>
                <h3 className="text-18 font-semibold text-text-primary">
                  Remote Command Center
                </h3>
                <p className="mt-2 text-14 text-text-secondary">
                  Priced on scope
                </p>
                <p className="mt-4 text-14 leading-relaxed text-text-secondary">
                  24/7 remote monitoring, alert triage, and dispatch for revenue-at-risk incidents. Permissioned operational actions with time-stamped evidence. Reduces reliance on onsite coverage during nights, weekends, and low-volume hours. Attached where the coverage math works.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="card-lift rounded-lg border border-border bg-bg-raised p-8">
                <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-text">ADD-ON MODULE</span>
                <h3 className="text-18 font-semibold text-text-primary">
                  Remote Call Center
                </h3>
                <p className="mt-2 text-14 text-text-secondary">
                  Priced on scope
                </p>
                <p className="mt-4 text-14 leading-relaxed text-text-secondary">
                  Branded customer support operating under Encompass scripts, authority limits, and refund governance. Every interaction logged and fed back into the control layer. No more refund-first defaults.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Engagements ─── */}
      <Reveal>
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
            <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">Consulting Services</p>
            <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">Engagements</h2>
            <p className="mt-4 text-18 text-text-secondary">For owners who need specific work, outside the monthly cadence.</p>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border border-border bg-bg-raised p-8 h-full">
                <h3 className="text-xl font-semibold text-text-primary">Parking Performance Baseline (Standalone)</h3>
                <p className="mt-3 flex-1 text-14 leading-relaxed text-text-secondary">A one-time engagement for owners who want the baseline truth set without committing to recurring oversight. Full PPB artifact delivered: data pipeline established, session-to-deposit tie-out, permissions posture documented, exception taxonomy, and control gap findings. Owner keeps the baseline and decides next steps.</p>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-12 text-text-tertiary"><span className="text-accent-text">Priced</span> by portfolio size</p>
                  <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-14 font-medium text-accent-text hover:text-text-primary transition-colors">
                    Start a conversation <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-border bg-bg-raised p-8 h-full">
                <h3 className="text-xl font-semibold text-text-primary">Operator Transition Support</h3>
                <p className="mt-3 flex-1 text-14 leading-relaxed text-text-secondary">When you are changing operators (RFP, selection, or transition period), Encompass provides the independent control layer during the transition. We baseline the outgoing operator, establish continuity requirements, audit the handover, and verify the incoming operator is meeting spec from site-month one. Finite engagement, typically six to nine months.</p>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-12 text-text-tertiary"><span className="text-accent-text">Priced</span> on scope</p>
                  <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-14 font-medium text-accent-text hover:text-text-primary transition-colors">
                    Start a conversation <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-border bg-bg-raised p-8 h-full">
                <h3 className="text-xl font-semibold text-text-primary">Rate and Revenue Strategy Review</h3>
                <p className="mt-3 flex-1 text-14 leading-relaxed text-text-secondary">An advisory engagement for owners who suspect their rate structure, validation program, or product mix is leaving money on the table. Data-driven analysis of transactions, comparable market rates, validation absorption patterns, and product elasticity. Deliverable is a revenue strategy memo with specific moves and expected impact. Standalone or bolted onto PACT Oversight.</p>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-12 text-text-tertiary"><span className="text-accent-text">Priced</span> by scope</p>
                  <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-14 font-medium text-accent-text hover:text-text-primary transition-colors">
                    Start a conversation <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-border bg-bg-raised p-8 h-full">
                <h3 className="text-xl font-semibold text-text-primary">Feasibility Study</h3>
                <p className="mt-3 flex-1 text-14 leading-relaxed text-text-secondary">For new builds, expansions, acquisitions, and repositioning projects. We model demand, supply, pricing sensitivity, operating expense structure, and net operating income across multiple scenarios. Includes stakeholder interviews, site surveys, comparable property analysis, and sensitivity modeling. Deliverable is an underwriting-grade report the capital team can defend.</p>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-12 text-text-tertiary"><span className="text-accent-text">Priced</span> by project</p>
                  <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-14 font-medium text-accent-text hover:text-text-primary transition-colors">
                    Start a conversation <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-border bg-bg-raised p-8 h-full">
                <h3 className="text-xl font-semibold text-text-primary">Technical Specifications and PARCS Procurement</h3>
                <p className="mt-3 flex-1 text-14 leading-relaxed text-text-secondary">Independent specification writing for PARCS, LPR, payment, and adjacent technology stacks. We produce performance-based specs that protect the owner, run the vendor RFP, evaluate responses against stated requirements, and support contract negotiation. Vendor-agnostic by design. No commissions, no preferred partners, no rebates.</p>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-12 text-text-tertiary"><span className="text-accent-text">Priced</span> by project scope</p>
                  <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-14 font-medium text-accent-text hover:text-text-primary transition-colors">
                    Start a conversation <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-border bg-bg-raised p-8 h-full">
                <h3 className="text-xl font-semibold text-text-primary">Operator RFP and Selection</h3>
                <p className="mt-3 flex-1 text-14 leading-relaxed text-text-secondary">Independent operator procurement for owners who need a new management partner. We write the RFP to the owner&rsquo;s requirements rather than the industry&rsquo;s boilerplate, manage the process, evaluate responses on operational capability and financial proposal, conduct site visits and reference checks, and support contract negotiation. The objective is the right operator, not the cheapest bid.</p>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-12 text-text-tertiary"><span className="text-accent-text">Priced</span> by portfolio size</p>
                  <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-14 font-medium text-accent-text hover:text-text-primary transition-colors">
                    Start a conversation <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-border bg-bg-raised p-8 h-full">
                <h3 className="text-xl font-semibold text-text-primary">Mystery Shop and Operational Audit</h3>
                <p className="mt-3 flex-1 text-14 leading-relaxed text-text-secondary">Independent evaluation of site-level operational performance. Trained auditors visit sites unannounced, evaluate against standardized scoring criteria, and document findings with time-stamped evidence. Covers revenue controls, customer experience, operator compliance, and condition. Delivered as a portfolio-level scorecard with site-by-site detail. Can be one-time or quarterly cadence.</p>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-12 text-text-tertiary"><span className="text-accent-text">Priced</span> by site count</p>
                  <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-14 font-medium text-accent-text hover:text-text-primary transition-colors">
                    Start a conversation <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col rounded-lg border border-border bg-bg-raised p-8 h-full">
                <h3 className="text-xl font-semibold text-text-primary">Close-Pack Standard Design</h3>
                <p className="mt-3 flex-1 text-14 leading-relaxed text-text-secondary">A design engagement for owners who want to define the close-pack artifact itself, before bringing it to operators. We produce the template: variance categories, reason code taxonomy, approval hierarchy, exception escalation paths, and the evidence standard operators must meet. Becomes the owner&rsquo;s specification document that every current and future operator is measured against.</p>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-12 text-text-tertiary"><span className="text-accent-text">Priced</span> by project</p>
                  <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-14 font-medium text-accent-text hover:text-text-primary transition-colors">
                    Start a conversation <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col rounded-lg border border-border bg-bg-raised p-8 h-full">
                <h3 className="text-xl font-semibold text-text-primary">Parking Operations Training</h3>
                <p className="mt-3 flex-1 text-14 leading-relaxed text-text-secondary">Custom training engagements for owner-side asset managers, acquisitions teams, and property managers who want to understand parking operations well enough to hold operators accountable. Covers revenue control, PARCS fundamentals, rate and validation policy, financial statement literacy, and the tells that indicate operational drift. Half-day, full-day, or multi-session formats.</p>
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-12 text-text-tertiary"><span className="text-accent-text">Priced</span> by format</p>
                  <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-14 font-medium text-accent-text hover:text-text-primary transition-colors">
                    Start a conversation <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

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
                <p className="font-mono text-32 font-medium text-text-primary">$80-$250</p>
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


      <ClosingCTA />

      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Parking Asset Controllership",
            serviceType: "Parking Operations Audit and Reconciliation",
            provider: {
              "@type": "Organization",
              name: "Encompass Parking",
              url: "https://encompassparking.com",
            },
            areaServed: { "@type": "Country", name: "United States" },
            offers: [
              { "@type": "Offer", name: "PACT Oversight Foundation", description: "For portfolios establishing controllership for the first time. Automated data feeds required.", price: "2250", priceCurrency: "USD" },
              { "@type": "Offer", name: "PACT Oversight Performance", description: "For portfolios with mixed data posture and deeper variance closure needs.", price: "3500", priceCurrency: "USD" },
              { "@type": "Offer", name: "PACT Oversight Enterprise", description: "For institutional portfolios requiring cross-operator normalization and executive-level rollups.", price: "6750", priceCurrency: "USD" },
            ],
          }),
        }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCTA } from "@/components/ClosingCTA";
import { TierSection } from "@/components/services/TierSection";
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
      <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-8 md:pt-32 md:pb-12">
        <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent-text">
          Pricing &amp; models
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

      {/* ─── Tier Cards + Portfolio Sizer ─── */}
      <TierSection />

      {/* ─── Scope Allowances ─── */}
      <div className="mt-6 mb-12 mx-auto max-w-[1200px] border-l-2 border-accent/30 pl-6">
        <p className="text-[15px] leading-relaxed text-text-secondary">
          Every engagement includes defined scope allowances. If operational workload materially exceeds included capacity, we discuss an adjusted tier or overage openly. No surprise invoices, no quietly absorbed scope creep. This keeps quality and economics aligned for both sides.
        </p>
      </div>

      {/* ─── Comparison Matrix ─── */}
      <ComparisonMatrix />

      {/* ─── Implementation + PPB Strip ─── */}
      <div className="my-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <div
            className="relative overflow-hidden p-7 rounded-[14px] border border-accent/35 flex items-center gap-6 flex-wrap"
            style={{
              background:
                "linear-gradient(135deg, #1a1430 0%, var(--bg-elevated) 60%)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #6C5CE7 0%, transparent 60%)",
              }}
            />
            <div className="shrink-0 w-[52px] h-[52px] rounded-xl bg-accent/18 grid place-items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="flex-1 min-w-[280px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-text mb-1.5">
                Required for all new sites
              </div>
              <div className="text-[17px] font-medium mb-1.5">
                Implementation + Parking Performance Baseline (PPB)
              </div>
              <div className="text-[13px] text-text-secondary leading-[1.55] max-w-[560px]">
                Paid onboarding that establishes the starting truth set. The PPB
                is what makes a site controls-ready for recurring PACT Oversight.
                Roughly 6 to 8 weeks per site.
              </div>
            </div>
            <div className="w-px self-stretch bg-accent/20 mx-1 hidden md:block" />
            <div className="shrink-0 text-right">
              <div className="font-mono text-[26px] font-medium">$4,500</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent-text">
                per site, one-time
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Optional Modules ─── */}
      <div className="py-6 pb-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent-text">
            Optional modules
          </p>
          <h2 className="mt-3 text-32 font-semibold tracking-tight md:text-48">
            Attach where coverage economics justify it.
          </h2>
          <p className="mt-3 text-[15px] text-text-secondary">
            Each module is independently scoped and priced. Attach to any tier.
          </p>
          <div className="flex flex-col gap-3.5 mt-8">
            {/* Remote Command Center */}
            <div className="group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 p-6 md:p-7 border border-border/70 rounded-xl bg-bg-raised items-start transition-all duration-150 hover:border-accent/45 hover:bg-[#1c1c20]">
              <div className="w-14 h-14 rounded-[11px] bg-accent/10 grid place-items-center transition-colors duration-150 group-hover:bg-accent/18">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="inline-block bg-accent/15 text-accent-text text-[10px] uppercase tracking-[0.15em] px-2.5 py-0.5 rounded-full mb-2 font-mono">
                  Add-on module
                </div>
                <div className="text-[17px] font-medium mb-1.5">
                  Remote Command Center
                </div>
                <div className="text-[13px] text-text-secondary leading-[1.6]">
                  24/7 remote monitoring, alert triage, and dispatch for
                  revenue-at-risk incidents. Permissioned operational actions
                  with time-stamped evidence. Reduces reliance on onsite coverage
                  during nights, weekends, and low-volume hours.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-[18px] pt-[18px] border-t border-border/60">
                  <div className="px-0 md:px-4 md:pl-0 py-2.5 md:py-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary mb-1">Coverage</div>
                    <div className="text-[13px] font-medium text-text-primary leading-[1.3]">24/7 monitoring</div>
                  </div>
                  <div className="px-0 md:px-4 py-2.5 md:py-0 border-t md:border-t-0 md:border-l border-border/50">
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary mb-1">Authority</div>
                    <div className="text-[13px] font-medium text-text-primary leading-[1.3]">Permissioned actions</div>
                  </div>
                  <div className="px-0 md:px-4 py-2.5 md:py-0 border-t md:border-t-0 md:border-l border-border/50">
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary mb-1">Audit trail</div>
                    <div className="text-[13px] font-medium text-text-primary leading-[1.3]">Time-stamped evidence</div>
                  </div>
                </div>
              </div>
              <div className="self-start inline-flex items-center gap-1.5 px-3.5 py-2 bg-accent/12 border border-accent/30 rounded-full text-[12px] text-accent-text font-mono tracking-wide font-medium whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-text" />
                Priced on scope
              </div>
            </div>

            {/* Remote Call Center */}
            <div className="group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 p-6 md:p-7 border border-border/70 rounded-xl bg-bg-raised items-start transition-all duration-150 hover:border-accent/45 hover:bg-[#1c1c20]">
              <div className="w-14 h-14 rounded-[11px] bg-accent/10 grid place-items-center transition-colors duration-150 group-hover:bg-accent/18">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="inline-block bg-accent/15 text-accent-text text-[10px] uppercase tracking-[0.15em] px-2.5 py-0.5 rounded-full mb-2 font-mono">
                  Add-on module
                </div>
                <div className="text-[17px] font-medium mb-1.5">
                  Remote Call Center
                </div>
                <div className="text-[13px] text-text-secondary leading-[1.6]">
                  Branded customer support operating under Encompass scripts,
                  authority limits, and refund governance. Every interaction
                  logged and fed back into the control layer. No more
                  refund-first defaults.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-[18px] pt-[18px] border-t border-border/60">
                  <div className="px-0 md:px-4 md:pl-0 py-2.5 md:py-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary mb-1">Operating model</div>
                    <div className="text-[13px] font-medium text-text-primary leading-[1.3]">Branded support</div>
                  </div>
                  <div className="px-0 md:px-4 py-2.5 md:py-0 border-t md:border-t-0 md:border-l border-border/50">
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary mb-1">Refund control</div>
                    <div className="text-[13px] font-medium text-text-primary leading-[1.3]">Authority limits</div>
                  </div>
                  <div className="px-0 md:px-4 py-2.5 md:py-0 border-t md:border-t-0 md:border-l border-border/50">
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary mb-1">Feedback loop</div>
                    <div className="text-[13px] font-medium text-text-primary leading-[1.3]">Logged into control layer</div>
                  </div>
                </div>
              </div>
              <div className="self-start inline-flex items-center gap-1.5 px-3.5 py-2 bg-accent/12 border border-accent/30 rounded-full text-[12px] text-accent-text font-mono tracking-wide font-medium whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-text" />
                Priced on scope
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Engagements ─── */}
      <div className="py-6 pb-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent-text">
            Engagements
          </p>
          <h2 className="mt-3 text-32 font-semibold tracking-tight md:text-48">
            For owners who need specific work, outside the monthly cadence.
          </h2>
          <p className="mt-3 text-[15px] text-text-secondary">
            Project-based and advisory engagements. Bolt onto PACT Oversight or stand alone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-8">
            {[
              { category: "Baseline", title: "Parking Performance Baseline (Standalone)", description: "One-time engagement for owners who want the baseline truth set without committing to recurring oversight.", priceNote: "Priced by portfolio size", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg> },
              { category: "Transition", title: "Operator Transition Support", description: "Independent control layer during operator changes. Baseline outgoing, audit handover, verify incoming meets spec.", priceNote: "Priced on scope", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 3 4 7 8 11" /><path d="M4 7h16" /><polyline points="16 21 20 17 16 13" /><path d="M20 17H4" /></svg> },
              { category: "Strategy", title: "Rate and Revenue Strategy Review", description: "Data-driven analysis of rate structure, validation program, and product mix. Revenue strategy memo with expected impact.", priceNote: "Priced by scope", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
              { category: "Advisory", title: "Feasibility Study", description: "For new builds, expansions, acquisitions, repositioning. Demand, supply, pricing sensitivity, NOI scenarios.", priceNote: "Priced by project", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="22" x2="9" y2="2" /><line x1="15" y1="22" x2="15" y2="2" /><path d="M4 12h16" /></svg> },
              { category: "Procurement", title: "Technical Specifications and PARCS Procurement", description: "Vendor-agnostic spec writing for PARCS, LPR, payment, and integrations. We run the RFP. No commissions, no preferred partners.", priceNote: "Priced by project scope", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg> },
              { category: "Procurement", title: "Operator RFP and Selection", description: "Independent operator procurement. Owner-aligned RFP, evaluation against capability and proposal, contract negotiation support.", priceNote: "Priced by portfolio size", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
              { category: "Audit", title: "Operational Performance Audit", description: "Trained auditors evaluate site-level operational performance unannounced. Portfolio scorecard with site-by-site detail.", priceNote: "Priced by site count", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> },
              { category: "Technology", title: "Parking Technology Design", description: "Upstream technology consulting. Lane configuration, equipment selection, payment architecture, integration requirements.", priceNote: "Priced by project", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg> },
              { category: "Technology", title: "Third-Party Project Management", description: "Independent PM for parking technology installations. Vendor milestone tracking, oversight, integration testing, punch-list governance.", priceNote: "Priced by project scope", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg> },
            ].map((card) => (
              <Link
                key={card.title}
                href="/contact"
                className="group relative overflow-hidden p-5 border border-border/70 rounded-xl bg-bg-raised flex flex-col gap-2.5 transition-all duration-150 hover:border-accent/40 hover:bg-[#1c1c20]"
              >
                <div className="absolute top-0 left-0 h-0.5 bg-accent w-0 group-hover:w-full transition-[width] duration-[250ms]" />
                <div className="w-10 h-10 rounded-[9px] bg-accent/10 grid place-items-center mb-1 group-hover:bg-accent/20 transition-colors duration-150 text-accent-text">
                  {card.icon}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary">
                  {card.category}
                </div>
                <div className="text-[15px] font-medium text-text-primary leading-[1.3]">
                  {card.title}
                </div>
                <div className="text-[13px] text-text-secondary leading-[1.55] flex-1">
                  {card.description}
                </div>
                <div className="font-mono text-[11px] text-text-tertiary pt-2.5 border-t border-border/60 tracking-wide">
                  {card.priceNote}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

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

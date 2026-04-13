"use client";

import { useState } from "react";
import Link from "next/link";
import { InfoTooltip } from "@/components/ui/InfoTooltip";

type Availability = true | false | "Add-on";

interface Feature {
  name: string;
  tooltip: string;
  foundation: Availability;
  performance: Availability;
  enterprise: Availability;
}

interface Category {
  name: string;
  features: Feature[];
}

const categories: Category[] = [
  {
    name: "Data posture and onboarding",
    features: [
      { name: "Automated transaction ingestion", tooltip: "Direct data feeds from PARCS, LPR, and payment systems normalized into a single reconcilable format.", foundation: true, performance: true, enterprise: true },
      { name: "Manual artifact processing", tooltip: "Digitization and normalization of manual close packs, paper tickets, and non-automated data sources.", foundation: false, performance: true, enterprise: true },
      { name: "Cross-operator normalization", tooltip: "Standardizing data across multiple operators with different PARCS and reporting formats into one portfolio view.", foundation: false, performance: false, enterprise: true },
    ],
  },
  {
    name: "Pricing, products, and market governance",
    features: [
      { name: "Rate integrity monitoring", tooltip: "Continuous verification that published rates match what the PARCS system is actually charging.", foundation: true, performance: true, enterprise: true },
      { name: "Product mix optimization", tooltip: "Analysis and recommendations for revenue-optimal product configurations (early bird, monthly, event, etc.).", foundation: false, performance: true, enterprise: true },
      { name: "Competitive market benchmarking", tooltip: "Rate positioning relative to nearby competitors and market demand signals.", foundation: false, performance: false, enterprise: true },
    ],
  },
  {
    name: "Validations and discount governance",
    features: [
      { name: "Validation policy compliance", tooltip: "Verifying that discount and validation programs operate within authorized parameters.", foundation: true, performance: true, enterprise: true },
      { name: "Validation abuse detection", tooltip: "Identifying patterns of validation misuse, over-discounting, or credential sharing.", foundation: false, performance: true, enterprise: true },
      { name: "Custom discount taxonomy", tooltip: "Asset-class-specific discount and validation frameworks aligned to portfolio governance standards.", foundation: false, performance: false, enterprise: true },
    ],
  },
  {
    name: "Monthly parkers and lease compliance",
    features: [
      { name: "Monthly parker reconciliation", tooltip: "Matching monthly parker billing against access credentials and actual usage.", foundation: true, performance: true, enterprise: true },
      { name: "Lease compliance audit", tooltip: "Verifying monthly and reserved parking lease terms match actual access and billing.", foundation: false, performance: true, enterprise: true },
    ],
  },
  {
    name: "Channels, aggregators, and allocation",
    features: [
      { name: "Channel revenue tracking", tooltip: "Reconciling revenue from third-party aggregators, apps, and direct channels.", foundation: true, performance: true, enterprise: true },
      { name: "Allocation discipline", tooltip: "Governing inventory allocation across channels to optimize yield and prevent overselling.", foundation: false, performance: true, enterprise: true },
    ],
  },
  {
    name: "Uptime and operations health",
    features: [
      { name: "Equipment uptime monitoring", tooltip: "Tracking PARCS device availability and downtime impact on revenue.", foundation: true, performance: true, enterprise: true },
      { name: "Credential and permissions audit", tooltip: "Regular review of operator access levels, system permissions, and credential hygiene.", foundation: false, performance: true, enterprise: true },
    ],
  },
  {
    name: "Close artifacts and variance closure",
    features: [
      { name: "Session-to-deposit reconciliation", tooltip: "Tracing every parking session through transaction, settlement, and bank deposit.", foundation: true, performance: true, enterprise: true },
      { name: "Monthly close-pack audit", tooltip: "Standardized monthly audit of the operator's financial close package.", foundation: true, performance: true, enterprise: true },
      { name: "Exception governance", tooltip: "Driving exceptions to closure with reason codes, tiered approvals, and deadline standards.", foundation: true, performance: true, enterprise: true },
      { name: "Variance workup and root-cause analysis", tooltip: "Deep investigation of revenue variances beyond standard exception handling.", foundation: false, performance: true, enterprise: true },
      { name: "Owner-facing monthly summary", tooltip: "Synthesized executive report — not an inbox dump. Key metrics, exceptions, and recommendations.", foundation: true, performance: true, enterprise: true },
    ],
  },
  {
    name: "Portfolio standardization and executive reporting",
    features: [
      { name: "Portfolio-level rollup reporting", tooltip: "Aggregated performance views across all sites in the portfolio.", foundation: false, performance: false, enterprise: true },
      { name: "Executive dashboard access", tooltip: "Real-time portfolio dashboard with drill-down to site-level metrics.", foundation: false, performance: false, enterprise: true },
      { name: "Operator scorecard and SLA tracking", tooltip: "Standardized operator performance metrics tracked against service level agreements.", foundation: false, performance: false, enterprise: true },
      { name: "Quarterly business review", tooltip: "In-depth quarterly review with Encompass principals covering portfolio performance and strategic recommendations.", foundation: false, performance: false, enterprise: true },
    ],
  },
  {
    name: "Governance cadence",
    features: [
      { name: "Monthly calibration", tooltip: "Standard monthly governance rhythm — audit, variance, closure, summary, calibration.", foundation: true, performance: true, enterprise: true },
      { name: "Bi-weekly calibration calls", tooltip: "More frequent check-ins for sites with active variance workups or transition periods.", foundation: false, performance: true, enterprise: true },
      { name: "Priority escalation path", tooltip: "Direct access to Encompass principals for urgent revenue-at-risk situations.", foundation: false, performance: true, enterprise: true },
      { name: "Dedicated analyst", tooltip: "Named Encompass analyst assigned to your portfolio for continuity and relationship management.", foundation: true, performance: true, enterprise: true },
    ],
  },
];

const tiers = [
  { key: "foundation" as const, name: "Foundation", price: "$2,250", data: "Automated feeds" },
  { key: "performance" as const, name: "Performance", price: "$3,500", data: "Mixed posture", highlight: true },
  { key: "enterprise" as const, name: "Enterprise", price: "$6,750", data: "Any posture" },
];

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto">
      <circle cx="8" cy="8" r="8" fill="var(--status-revenue)" fillOpacity="0.15" />
      <path d="M5 8l2 2 4-4" stroke="var(--status-revenue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return <span className="block text-center text-text-tertiary">&mdash;</span>;
}

function CellValue({ value }: { value: Availability }) {
  if (value === true) return <Check />;
  if (value === "Add-on") return <span className="block text-center text-12 text-text-secondary">Add-on</span>;
  return <Cross />;
}

export function ComparisonMatrix() {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
        {/* ─── Desktop: Full Matrix ─── */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="sticky top-16 z-10 bg-bg-base">
                <th className="w-[40%] pb-6 text-left" />
                {tiers.map((t) => (
                  <th
                    key={t.key}
                    className={`w-[20%] pb-6 text-center ${t.highlight ? "border-x border-t border-accent rounded-t-lg" : ""}`}
                  >
                    <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">{t.name}</p>
                    <p className="mt-2 font-mono text-32 font-medium text-text-primary">{t.price}</p>
                    <p className="mt-1 text-12 text-text-tertiary">per site-month</p>
                    <Link
                      href={`/contact?tier=${t.key}`}
                      className="mt-3 inline-block rounded-full bg-accent px-4 py-1.5 text-12 font-semibold text-white transition-colors hover:bg-accent-dim"
                    >
                      Request this tier
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <>
                  <tr key={cat.name}>
                    <td
                      colSpan={4}
                      className="border-t border-border pt-8 pb-3 text-12 font-semibold uppercase tracking-widest text-text-tertiary"
                    >
                      {cat.name}
                    </td>
                  </tr>
                  {cat.features.map((f) => (
                    <tr key={f.name} className="border-t border-border/50 hover:bg-bg-raised/50 transition-colors">
                      <td className="py-3 pr-4 text-14 text-text-secondary">
                        {f.name}
                        <InfoTooltip text={f.tooltip} />
                      </td>
                      <td className="py-3 text-center"><CellValue value={f.foundation} /></td>
                      <td className={`py-3 text-center ${tiers[1].highlight ? "border-x border-accent/20" : ""}`}>
                        <CellValue value={f.performance} />
                      </td>
                      <td className="py-3 text-center"><CellValue value={f.enterprise} /></td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* ─── Mobile: Accordion ─── */}
        <div className="lg:hidden space-y-4">
          {tiers.map((t) => (
            <div
              key={t.key}
              className={`rounded-lg border ${t.highlight ? "border-accent" : "border-border"} bg-bg-raised`}
            >
              <button
                onClick={() => setExpandedTier(expandedTier === t.key ? null : t.key)}
                className="flex w-full items-center justify-between p-6 text-left"
                aria-expanded={expandedTier === t.key}
              >
                <div>
                  <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">{t.name}</p>
                  <p className="mt-1 font-mono text-32 font-medium text-text-primary">{t.price}</p>
                  <p className="text-12 text-text-tertiary">per site-month &middot; {t.data}</p>
                </div>
                <span className={`text-24 text-text-tertiary transition-transform ${expandedTier === t.key ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {expandedTier === t.key && (
                <div className="border-t border-border px-6 pb-6">
                  {categories.map((cat) => {
                    const included = cat.features.filter((f) => f[t.key] === true);
                    const addons = cat.features.filter((f) => f[t.key] === "Add-on");
                    if (included.length === 0 && addons.length === 0) return null;
                    return (
                      <div key={cat.name} className="mt-4">
                        <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">{cat.name}</p>
                        <ul className="mt-2 space-y-2">
                          {included.map((f) => (
                            <li key={f.name} className="flex items-start gap-2 text-14 text-text-secondary">
                              <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-status-revenue" />
                              {f.name}
                            </li>
                          ))}
                          {addons.map((f) => (
                            <li key={f.name} className="flex items-start gap-2 text-14 text-text-tertiary">
                              <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-text-tertiary" />
                              {f.name} (Add-on)
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  <Link
                    href={`/contact?tier=${t.key}`}
                    className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-14 font-semibold text-white transition-colors hover:bg-accent-dim"
                  >
                    Request this tier
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

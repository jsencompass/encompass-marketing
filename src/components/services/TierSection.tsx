"use client";

import { useState } from "react";
import Link from "next/link";
import { PortfolioSizer } from "./PortfolioSizer";

const tiers = [
  {
    name: "Foundation",
    price: "$2,250+",
    description:
      "For owners new to controllership establishing a baseline cadence.",
    bullets: [
      "Monthly close pack audit",
      "Session-to-deposit tie-out",
      "Owner-facing month-end summary",
      "Exception log with reason codes",
      "Quarterly principal review",
    ],
    featured: false,
  },
  {
    name: "Performance",
    price: "$3,500+",
    description:
      "The standard cadence for portfolios in active governance.",
    bullets: [
      "Everything in Foundation",
      "Tiered exception approvals",
      "Rate and validation governance",
      "Variance workup with reason codes",
      "Monthly principal review",
      "Continuous improvement memos",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$6,750+",
    description:
      "For complex portfolios with multi-operator and multi-stack environments.",
    bullets: [
      "Everything in Performance",
      "Multi-operator governance",
      "Custom artifact specifications",
      "Quarterly executive review",
      "Dedicated principal liaison",
      "Bi-weekly sync cadence",
    ],
    featured: false,
  },
];

function getRecommendedTier(count: number): string {
  if (count <= 5) return "Foundation";
  if (count <= 25) return "Performance";
  return "Enterprise";
}

export function TierSection() {
  const [siteCount, setSiteCount] = useState(10);
  const recommendedTier = getRecommendedTier(siteCount);

  return (
    <div className="mx-auto max-w-[1200px] px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => {
          const isRecommended = tier.name === recommendedTier;
          return (
            <article
              key={tier.name}
              data-tier={tier.name.toLowerCase()}
              className={`relative rounded-[14px] p-7 flex flex-col transition-all duration-200 hover:-translate-y-0.5 ${
                tier.featured
                  ? isRecommended
                    ? "border border-accent/85 hover:border-accent/90"
                    : "border border-accent/55 hover:border-accent/70"
                  : isRecommended
                    ? "bg-bg-raised border border-accent/85 hover:border-accent/90"
                    : "bg-bg-raised border border-border/70 hover:border-accent/35"
              }`}
              style={{
                ...(tier.featured
                  ? {
                      background:
                        "linear-gradient(180deg, rgba(108,92,231,0.10) 0%, var(--bg-elevated) 70%)",
                    }
                  : {}),
                ...(isRecommended
                  ? {
                      boxShadow:
                        "0 0 0 1px rgba(108,92,231,0.4), 0 12px 40px rgba(108,92,231,0.18)",
                    }
                  : {}),
              }}
            >
              {tier.featured && (
                <span className="absolute -top-[13px] left-1/2 -translate-x-1/2 bg-accent-text text-[#1a1430] text-[10px] uppercase tracking-[0.18em] px-3.5 py-[5px] rounded-full font-mono font-medium z-[2] whitespace-nowrap">
                  Most common
                </span>
              )}
              <div
                className={`font-mono text-[11px] uppercase tracking-[0.18em] mb-2 ${
                  tier.featured ? "text-accent-text" : "text-text-tertiary"
                }`}
              >
                PACT
              </div>
              <h3 className="text-[22px] font-medium tracking-tight text-text-primary">
                {tier.name}
              </h3>
              <div className="mt-3.5 flex items-baseline gap-1.5">
                <span className="font-mono text-[38px] font-medium tracking-[-0.025em]">
                  {tier.price}
                </span>
                <span className="text-[13px] text-text-tertiary">
                  per site-month
                </span>
              </div>
              <p className="text-[13px] text-text-secondary mt-3 leading-[1.55] min-h-[40px]">
                {tier.description}
              </p>
              <ul className="list-none p-0 my-[18px] mb-[22px] flex-1">
                {tier.bullets.map((b) => (
                  <li
                    key={b}
                    className="relative pl-[22px] py-[6px] text-[13px] text-text-secondary leading-[1.5] before:content-[''] before:absolute before:left-0 before:top-[13px] before:w-3 before:h-px before:bg-accent"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={
                  tier.featured
                    ? "cta-primary inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-white transition-all hover:brightness-110"
                    : "inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium text-text-primary transition-all hover:border-white/30 hover:bg-white/5"
                }
              >
                Request a demo
              </Link>
              {isRecommended && (
                <div className="mt-3.5 px-3 py-2 bg-accent/15 border border-accent/40 rounded-lg font-mono text-[11px] uppercase tracking-[0.1em] text-accent-text text-center font-medium">
                  Matches your portfolio
                </div>
              )}
            </article>
          );
        })}
      </div>

      <PortfolioSizer
        count={siteCount}
        onChange={setSiteCount}
        recommendedTier={recommendedTier}
      />
    </div>
  );
}

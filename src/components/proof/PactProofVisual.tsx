"use client";

import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const taxonomyCards = [
  { label: "Potential Revenue", value: "$106K", color: "var(--status-revenue)" },
  { label: "Potential Loss", value: "$77K", color: "var(--status-loss)" },
  { label: "Current Cost", value: "$25K", color: "var(--status-cost)" },
  { label: "Potential Exposure", value: "$25K", color: "var(--status-fines)" },
];

const dataBars = [
  { label: "PARCS Transactions", fill: 0.82 },
  { label: "Bank Deposits", fill: 0.74 },
  { label: "Operator P&L", fill: 0.61 },
  { label: "Monthly Roster", fill: 0.48 },
];

export function PactProofVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative w-full rounded-xl border border-border bg-bg-raised p-6 md:p-8 overflow-hidden">
      {/* "Representative composition" label */}
      <p className="absolute top-4 right-4 text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
        Representative composition
      </p>

      {/* Taxonomy cards row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {taxonomyCards.map((card) => (
          <div key={card.label} className="rounded-lg border border-border bg-bg-elevated p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
              {card.label}
            </p>
            <p className="mt-2 font-mono text-24 font-medium text-text-primary">{card.value}</p>
            <div className="mt-2 h-0.5 w-full rounded-full" style={{ backgroundColor: card.color, opacity: 0.6 }} />
          </div>
        ))}
      </div>

      {/* Lower section: confidence ring + data bars */}
      <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr]">
        {/* Confidence ring */}
        <div className="flex flex-col items-center justify-center">
          <svg width="140" height="140" viewBox="0 0 140 140">
            {/* Background track */}
            <circle cx="70" cy="70" r="56" fill="none" stroke="var(--border)" strokeWidth="8" />
            {/* Progress arc — 64% */}
            <circle
              cx="70"
              cy="70"
              r="56"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${0.64 * 2 * Math.PI * 56} ${2 * Math.PI * 56}`}
              transform="rotate(-90 70 70)"
              className={reduced ? "" : "confidence-pulse"}
            />
            <text x="70" y="66" textAnchor="middle" fill="var(--text-primary)" fontSize="28" fontFamily="var(--font-jetbrains-mono)" fontWeight="500">
              64%
            </text>
            <text x="70" y="86" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="var(--font-inter)" letterSpacing="1.5" style={{ textTransform: "uppercase" }}>
              confidence
            </text>
          </svg>
        </div>

        {/* Data bars */}
        <div className="space-y-4">
          {dataBars.map((bar) => (
            <div key={bar.label}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-12 text-text-tertiary">{bar.label}</p>
                <p className="font-mono text-12 text-text-secondary">{Math.round(bar.fill * 100)}%</p>
              </div>
              <div className="h-2 w-full rounded-full bg-bg-elevated">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${bar.fill * 100}%`,
                    backgroundColor: "var(--status-revenue)",
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

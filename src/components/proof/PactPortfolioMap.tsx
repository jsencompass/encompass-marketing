"use client";

import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const pins = [
  { x: 38, y: 36, delay: 0 },    // DTLA 1
  { x: 42, y: 40, delay: 0.4 },  // DTLA 2
  { x: 36, y: 42, delay: 0.8 },  // DTLA 3
  { x: 44, y: 38, delay: 1.2 },  // DTLA 4
  { x: 28, y: 30, delay: 0.3 },  // Hollywood 1
  { x: 24, y: 34, delay: 1.1 },  // WeHo
  { x: 55, y: 42, delay: 0.7 },  // Century City
  { x: 58, y: 38, delay: 1.5 },  // Westwood
  { x: 68, y: 28, delay: 0.5 },  // Pasadena
  { x: 40, y: 55, delay: 0.9 },  // Mid-city 1
  { x: 46, y: 58, delay: 1.3 },  // South-central
  { x: 18, y: 62, delay: 1.6 },  // LAX/coastal
];

const stats = [
  { label: "Potential Revenue", value: "$2.4M", color: "var(--status-revenue)" },
  { label: "Potential Loss", value: "$1.8M", color: "var(--status-loss)" },
  { label: "Current Cost", value: "$450K", color: "var(--status-cost)" },
  { label: "Potential Exposure", value: "$680K", color: "var(--status-fines)" },
];

const dataBars = [
  { label: "PARCS Transactions", fill: 0.92 },
  { label: "Bank Deposits", fill: 0.88 },
  { label: "Operator P&L", fill: 0.74 },
  { label: "Monthly Roster", fill: 0.81 },
];

export function PactPortfolioMap() {
  const reduced = useReducedMotion();

  return (
    <div>
      {/* Desktop: map with overlaid cards */}
      <div className="relative hidden w-full overflow-hidden rounded-xl border border-border bg-bg-raised md:block" style={{ aspectRatio: "5/3" }}>
        {/* Map backdrop — abstracted coastline/mountain hints */}
        <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect width="100" height="80" fill="var(--bg-raised)" />
          {/* Soft gradient: mountains top-right, coast bottom-left */}
          <defs>
            <radialGradient id="geo-grad" cx="75%" cy="25%" r="60%">
              <stop offset="0%" stopColor="var(--bg-elevated)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--bg-raised)" stopOpacity="0" />
            </radialGradient>
            <pattern id="map-grid2" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M 6 0 L 0 0 0 6" fill="none" stroke="var(--accent-dim)" strokeWidth="0.1" opacity="0.03" />
            </pattern>
          </defs>
          <rect width="100" height="80" fill="url(#geo-grad)" />
          <rect width="100" height="80" fill="url(#map-grid2)" />
          {/* Coastline arc hint */}
          <path d="M2,50 Q12,65 30,72 Q50,78 70,75" fill="none" stroke="var(--border)" strokeWidth="0.3" opacity="0.3" />
          {/* Mountain contour hints */}
          <path d="M55,8 Q65,12 80,10 Q90,15 98,18" fill="none" stroke="var(--border)" strokeWidth="0.2" opacity="0.2" />
          <path d="M60,12 Q72,16 85,14" fill="none" stroke="var(--border)" strokeWidth="0.15" opacity="0.15" />
          {/* Pins */}
          {pins.map((pin, i) => (
            <circle
              key={i}
              cx={pin.x}
              cy={pin.y}
              r="1.2"
              fill="var(--accent)"
              className={reduced ? "" : "map-pin-pulse"}
              style={reduced ? {} : { animationDelay: `${pin.delay}s` }}
            />
          ))}
        </svg>

        {/* Portfolio Potential — top-right, dominant */}
        <div className="absolute top-8 right-8 w-[460px] rounded-2xl border border-border bg-bg-raised/95 p-8 backdrop-blur-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">Portfolio Potential</p>
          <p className="mt-1 text-14 text-text-secondary">12 sites under active oversight</p>
          <div className="my-4 h-px bg-border" />
          <div className="space-y-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-1">
                <span className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">{s.label}</span>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[28px] font-medium leading-tight text-text-primary">{s.value}</span>
                  <span className="mt-1 h-0.5 w-12 rounded-full" style={{ backgroundColor: s.color, opacity: 0.7 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Confidence — bottom-left, dominant */}
        <div className="absolute bottom-8 left-8 w-[520px] rounded-2xl border border-border bg-bg-raised/95 p-8 backdrop-blur-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">Portfolio Confidence</p>
          <div className="mt-4 flex gap-8">
            {/* Confidence ring */}
            <svg width="140" height="140" viewBox="0 0 140 140" className="flex-shrink-0">
              <circle cx="70" cy="70" r="56" fill="none" stroke="var(--border)" strokeWidth="6" />
              <circle
                cx="70" cy="70" r="56"
                fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${0.78 * 2 * Math.PI * 56} ${2 * Math.PI * 56}`}
                transform="rotate(-90 70 70)"
              />
              <text x="70" y="66" textAnchor="middle" fill="var(--text-primary)" fontSize="32" fontWeight="600" fontFamily="var(--font-jetbrains-mono)">78%</text>
              <text x="70" y="88" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9" letterSpacing="1.5" style={{ textTransform: "uppercase" }}>confidence</text>
            </svg>
            {/* Data bars */}
            <div className="flex-1 space-y-3 pt-2">
              {dataBars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-12 text-text-tertiary">{bar.label}</span>
                    <span className="font-mono text-12 text-text-secondary">{Math.round(bar.fill * 100)}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-bg-elevated">
                    <div className="h-2 rounded-full" style={{ width: `${bar.fill * 100}%`, backgroundColor: "var(--status-revenue)", opacity: 0.6 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards with small map between */}
      <div className="space-y-4 md:hidden">
        {/* Stats card */}
        <div className="rounded-xl border border-border bg-bg-raised p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">Portfolio Potential</p>
          <p className="mt-1 text-14 text-text-secondary">12 sites under active oversight</p>
          <div className="my-3 h-px bg-border" />
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label}>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">{s.label}</span>
                <p className="mt-1 font-mono text-24 font-medium text-text-primary">{s.value}</p>
                <span className="mt-1 block h-0.5 w-8 rounded-full" style={{ backgroundColor: s.color, opacity: 0.7 }} />
              </div>
            ))}
          </div>
        </div>
        {/* Mini map */}
        <div className="relative h-[200px] overflow-hidden rounded-xl border border-border bg-bg-raised">
          <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
            <rect width="100" height="80" fill="var(--bg-raised)" />
            <defs><pattern id="map-grid-m" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="var(--accent-dim)" strokeWidth="0.15" opacity="0.03" /></pattern></defs>
            <rect width="100" height="80" fill="url(#map-grid-m)" />
            {pins.map((pin, i) => (
              <circle key={i} cx={pin.x} cy={pin.y} r="1.5" fill="var(--accent)" className={reduced ? "" : "map-pin-pulse"} style={reduced ? {} : { animationDelay: `${pin.delay}s` }} />
            ))}
          </svg>
        </div>
        {/* Confidence card */}
        <div className="rounded-xl border border-border bg-bg-raised p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">Portfolio Confidence</p>
          <div className="mt-4 flex gap-6">
            <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0">
              <circle cx="40" cy="40" r="32" fill="none" stroke="var(--border)" strokeWidth="5" />
              <circle cx="40" cy="40" r="32" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${0.78 * 2 * Math.PI * 32} ${2 * Math.PI * 32}`} transform="rotate(-90 40 40)" />
              <text x="40" y="38" textAnchor="middle" fill="var(--text-primary)" fontSize="18" fontWeight="600" fontFamily="var(--font-jetbrains-mono)">78%</text>
              <text x="40" y="52" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7" letterSpacing="1">CONFIDENCE</text>
            </svg>
            <div className="flex-1 space-y-2">
              {dataBars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between mb-1"><span className="text-[10px] text-text-tertiary">{bar.label}</span><span className="font-mono text-[10px] text-text-secondary">{Math.round(bar.fill * 100)}%</span></div>
                  <div className="h-1.5 w-full rounded-full bg-bg-elevated"><div className="h-1.5 rounded-full" style={{ width: `${bar.fill * 100}%`, backgroundColor: "var(--status-revenue)", opacity: 0.6 }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <p className="mt-3 text-right text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
        Representative composition &middot; illustrative portfolio data
      </p>
    </div>
  );
}

"use client";

import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const pins = [
  { x: 52, y: 38, delay: 0 },    // DTLA 1
  { x: 55, y: 42, delay: 0.4 },  // DTLA 2
  { x: 49, y: 35, delay: 0.8 },  // DTLA 3
  { x: 56, y: 36, delay: 1.2 },  // DTLA 4
  { x: 40, y: 44, delay: 1.6 },  // Mid-Wilshire 1
  { x: 42, y: 40, delay: 0.3 },  // Mid-Wilshire 2
  { x: 38, y: 30, delay: 0.7 },  // Hollywood 1
  { x: 35, y: 34, delay: 1.1 },  // WeHo
  { x: 28, y: 45, delay: 1.5 },  // Century City
  { x: 30, y: 50, delay: 0.5 },  // Westwood
  { x: 22, y: 65, delay: 0.9 },  // LAX
  { x: 65, y: 72, delay: 1.3 },  // Long Beach
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
      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-bg-raised" style={{ aspectRatio: "5/3" }}>
        {/* Map base layer */}
        <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          {/* Water suggestion */}
          <rect width="100" height="80" fill="var(--bg-base)" />
          {/* Land mass — simplified LA basin shape */}
          <path
            d="M10,20 Q15,15 25,18 Q35,12 50,15 Q65,10 80,18 Q90,22 95,35 Q92,50 85,60 Q75,70 60,75 Q45,78 30,72 Q18,68 12,55 Q8,40 10,20Z"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="0.3"
          />
          {/* Grid overlay */}
          <defs>
            <pattern id="map-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--accent-dim)" strokeWidth="0.15" opacity="0.04" />
            </pattern>
          </defs>
          <rect width="100" height="80" fill="url(#map-grid)" />

          {/* Pins */}
          {pins.map((pin, i) => (
            <g key={i}>
              <circle
                cx={pin.x}
                cy={pin.y}
                r="1.2"
                fill="var(--accent)"
                className={reduced ? "" : "map-pin-pulse"}
                style={reduced ? {} : { animationDelay: `${pin.delay}s` }}
              />
            </g>
          ))}
        </svg>

        {/* Portfolio stats overlay — top right */}
        <div className="absolute top-4 right-4 w-[220px] rounded-lg border border-border bg-bg-raised/92 p-4 backdrop-blur-md md:w-[320px] md:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">Portfolio Potential</p>
          <p className="mt-1 text-12 text-text-secondary">12 sites under active oversight</p>
          <div className="mt-3 space-y-2">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">{s.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-14 font-medium text-text-primary">{s.value}</span>
                  <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: s.color, opacity: 0.7 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence + data bars overlay — bottom left */}
        <div className="absolute bottom-4 left-4 hidden w-[360px] rounded-lg border border-border bg-bg-raised/92 p-4 backdrop-blur-md md:block md:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">Portfolio Confidence</p>
          <div className="mt-3 flex gap-6">
            <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0">
              <circle cx="40" cy="40" r="32" fill="none" stroke="var(--border)" strokeWidth="5" />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${0.78 * 2 * Math.PI * 32} ${2 * Math.PI * 32}`}
                transform="rotate(-90 40 40)"
              />
              <text x="40" y="38" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="500" fontFamily="var(--font-jetbrains-mono)">78%</text>
              <text x="40" y="52" textAnchor="middle" fill="var(--text-tertiary)" fontSize="7" letterSpacing="1">CONFIDENCE</text>
            </svg>
            <div className="flex-1 space-y-2.5">
              {dataBars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-text-tertiary">{bar.label}</span>
                    <span className="font-mono text-[10px] text-text-secondary">{Math.round(bar.fill * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-bg-elevated">
                    <div className="h-1.5 rounded-full" style={{ width: `${bar.fill * 100}%`, backgroundColor: "var(--status-revenue)", opacity: 0.6 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Attribution line */}
      <p className="mt-3 text-right text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
        Representative composition &middot; illustrative portfolio data
      </p>
    </div>
  );
}

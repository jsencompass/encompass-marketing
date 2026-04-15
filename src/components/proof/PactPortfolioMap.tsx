"use client";

import Image from "next/image";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const pins = [
  { left: 38, top: 45, delay: 0, label: "DTLA 1" },
  { left: 42, top: 50, delay: 0.4, label: "DTLA 2" },
  { left: 36, top: 52.5, delay: 0.8, label: "DTLA 3" },
  { left: 44, top: 47.5, delay: 1.2, label: "DTLA 4" },
  { left: 28, top: 37.5, delay: 0.3, label: "Hollywood" },
  { left: 24, top: 42.5, delay: 1.1, label: "WeHo" },
  { left: 55, top: 52.5, delay: 0.7, label: "Century City" },
  { left: 58, top: 47.5, delay: 1.5, label: "Westwood" },
  { left: 68, top: 35, delay: 0.5, label: "Pasadena" },
  { left: 40, top: 68.75, delay: 0.9, label: "Mid-city" },
  { left: 46, top: 72.5, delay: 1.3, label: "South-central" },
  { left: 18, top: 77.5, delay: 1.6, label: "LAX/coastal" },
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
        {/* Map backdrop */}
        <Image
          src="/imagery/LA-map.png"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[--bg-base]/40 via-transparent to-[--bg-base]/60" aria-hidden="true" />

        {/* Logo */}
        <Image
          src="/logo.png"
          alt=""
          width={128}
          height={40}
          className="absolute top-6 left-6 z-10 opacity-80"
          aria-hidden="true"
        />

        {/* Pins */}
        {pins.map((pin, i) => (
          <div
            key={i}
            className="absolute z-10"
            style={{ top: `${pin.top}%`, left: `${pin.left}%` }}
          >
            <span className="block h-3 w-3 rounded-full bg-accent" />
            {!reduced && (
              <span
                className="absolute inset-0 rounded-full bg-accent div-pin-pulse"
                style={{ animationDelay: `${pin.delay}s` }}
              />
            )}
          </div>
        ))}

        {/* Portfolio Potential — top-right */}
        <div className="absolute top-8 right-8 z-20 w-[460px] rounded-2xl border border-border bg-bg-raised/95 p-8 backdrop-blur-2xl">
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

        {/* Portfolio Confidence — bottom-left */}
        <div className="absolute bottom-8 left-8 z-20 w-[520px] rounded-2xl border border-border bg-bg-raised/95 p-8 backdrop-blur-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">Portfolio Confidence</p>
          <div className="mt-4 flex gap-8">
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

      {/* Mobile: stacked cards with map between */}
      <div className="space-y-4 md:hidden">
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
        <div className="relative h-[200px] overflow-hidden rounded-xl border border-border">
          <Image
            src="/imagery/LA-map.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[--bg-base]/40 via-transparent to-[--bg-base]/60" aria-hidden="true" />
          {pins.map((pin, i) => (
            <div key={i} className="absolute" style={{ top: `${pin.top}%`, left: `${pin.left}%` }}>
              <span className="block h-2.5 w-2.5 rounded-full bg-accent" />
            </div>
          ))}
        </div>
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

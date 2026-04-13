"use client";

import { CountUp } from "@/components/motion/CountUp";

const stats = [
  { numeric: 70, prefix: "", suffix: "+", label: "years combined in parking operations" },
  { numeric: null, display: "LAX", label: "$85M revenue, 800+ employees managed" },
  { numeric: 10, prefix: "$", suffix: "B", label: "One Beverly Hills \u2014 active engagement" },
  { numeric: 800, prefix: "", suffix: "+", label: "PARCS and technology projects delivered" },
  { numeric: 3000, prefix: "", suffix: "+", label: "Parking PI mystery shops completed" },
];

export function CredibilityBand() {
  return (
    <section className="border-b border-border bg-bg-raised">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <p className="mb-10 text-12 font-semibold uppercase tracking-widest text-text-tertiary">
          Built by operators who&rsquo;ve owned the problem
        </p>
        <div className="flex flex-wrap items-baseline justify-between gap-8">
          {stats.map((s, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <span className="font-mono text-32 font-medium text-text-primary md:text-48">
                {s.numeric !== null ? (
                  <CountUp
                    value={s.numeric}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    formatThousands={s.numeric >= 1000}
                  />
                ) : (
                  s.display
                )}
              </span>
              <span className="max-w-[160px] text-14 leading-snug text-text-tertiary">
                {s.label}
              </span>
              {i < stats.length - 1 && (
                <span className="ml-4 hidden h-10 w-px bg-border md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

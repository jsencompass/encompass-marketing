"use client";

import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

const verticalsList = "airports, hospitality, medical, class\u00A0A, municipal, transit, valet, mixed-use, events, self-park";

const statItems = [
  { id: "years", numeric: 70, prefix: "", suffix: "+", label: "years combined in parking operations" },
  { id: "projects", numeric: 800, prefix: "", suffix: "+", label: "PARCS and technology projects delivered" },
  { id: "shops", numeric: 3000, prefix: "", suffix: "+", label: "Parking PI mystery shops completed" },
  { id: "lax", display: "LAX", label: "$85M revenue, 800+ employees managed" },
  { id: "verticals", display: "ALL VERTICALS", list: verticalsList },
];

export function CredibilityBand() {
  return (
    <section className="border-y border-border bg-bg-raised">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <p className="mb-10 text-12 font-semibold uppercase tracking-widest text-text-tertiary">
          Built by operators who&rsquo;ve owned the problem
        </p>
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-5 md:gap-0">
          {statItems.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.08}>
              <div className={`flex flex-col min-h-[120px] ${i < statItems.length - 1 ? "md:border-r md:border-border/40" : ""} ${i > 0 ? "md:pl-6" : ""} ${i < statItems.length - 1 ? "md:pr-6" : ""}`}>
                <span className={`font-mono font-medium text-text-primary ${stat.id === "verticals" ? "text-24 md:text-32" : "text-32 md:text-48"}`}>
                  {"numeric" in stat && stat.numeric !== undefined ? (
                    <CountUp value={stat.numeric} prefix={stat.prefix} suffix={stat.suffix} formatThousands={stat.numeric >= 1000} />
                  ) : (
                    stat.display
                  )}
                </span>
                {"label" in stat && stat.label && (
                  <span className="mt-2 text-14 leading-snug text-text-tertiary">{stat.label}</span>
                )}
                {"list" in stat && stat.list && (
                  <span className="mt-2 text-12 leading-relaxed text-text-tertiary">{stat.list}</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/who-we-are" className="group inline-flex items-center gap-1 text-14 font-medium text-text-secondary transition-colors hover:text-text-primary">
            Learn about the principals <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

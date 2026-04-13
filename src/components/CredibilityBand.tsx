"use client";

import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

const verticalsList = "airports, hospitality, medical, class\u00A0A, municipal, transit, valet, mixed-use, events, self-park";

export function CredibilityBand() {
  return (
    <section className="border-y border-border bg-bg-raised">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <p className="mb-10 text-12 font-semibold uppercase tracking-widest text-text-tertiary">
          Built by operators who&rsquo;ve owned the problem
        </p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-6">
          {/* 70+ years */}
          <Reveal delay={0}>
            <div className="flex flex-col">
              <span className="font-mono text-32 font-medium text-text-primary md:text-48">
                <CountUp value={70} suffix="+" />
              </span>
              <span className="mt-2 text-14 leading-snug text-text-tertiary">
                years combined in parking operations
              </span>
            </div>
          </Reveal>

          {/* LAX */}
          <Reveal delay={0.08}>
            <div className="flex flex-col">
              <span className="font-mono text-32 font-medium text-text-primary md:text-48">
                LAX
              </span>
              <span className="mt-2 text-14 leading-snug text-text-tertiary">
                $85M revenue, 800+ employees managed
              </span>
            </div>
          </Reveal>

          {/* ALL VERTICALS — wider */}
          <Reveal delay={0.16}>
            <div className="col-span-2 flex flex-col md:col-span-1">
              <span className="font-mono text-24 font-medium text-text-primary md:text-32">
                ALL VERTICALS
              </span>
              <span className="mt-2 text-12 leading-relaxed text-text-tertiary">
                {verticalsList}
              </span>
            </div>
          </Reveal>

          {/* 800+ projects */}
          <Reveal delay={0.24}>
            <div className="flex flex-col">
              <span className="font-mono text-32 font-medium text-text-primary md:text-48">
                <CountUp value={800} suffix="+" />
              </span>
              <span className="mt-2 text-14 leading-snug text-text-tertiary">
                PARCS and technology projects delivered
              </span>
            </div>
          </Reveal>

          {/* 3,000+ shops */}
          <Reveal delay={0.32}>
            <div className="flex flex-col">
              <span className="font-mono text-32 font-medium text-text-primary md:text-48">
                <CountUp value={3000} suffix="+" formatThousands />
              </span>
              <span className="mt-2 text-14 leading-snug text-text-tertiary">
                Parking PI mystery shops completed
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

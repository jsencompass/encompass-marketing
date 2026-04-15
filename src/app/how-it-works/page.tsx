import type { Metadata } from "next";
import { ClosingCTA } from "@/components/ClosingCTA";
import { VerticalsGrid } from "@/components/verticals/VerticalsGrid";
import { ImagePlaceholder } from "@/components/placeholders/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "How It Works | Encompass Parking",
  description:
    "Four lanes, one standard of rigor. How Encompass delivers recurring controllership for parking assets.",
};

const lanes = [
  {
    number: "01",
    eyebrow: "Controls-Onboarding + PPB",
    description: "Every engagement starts with a paid Parking Performance Baseline (PPB). Think of it as a baseline audit: we ingest and normalize your data sources, map sessions to transactions to settlements to deposits, document the permissions posture, establish the exception taxonomy, and issue the baseline truth set. This is what makes a site controls-ready for recurring oversight. Without a PPB, there is nothing to measure future months against.",
    imgPath: "/public/how-it-works/01-ppb.png",
    imgDesc: "Abstract workflow diagram or dossier screenshot showing onboarding process.",
  },
  {
    number: "02",
    eyebrow: "PACT Oversight (Run-State)",
    description: "Every site-month we audit the operator's close pack, validate session-to-deposit tie-out, drive exceptions to closure with reason codes and tiered approvals, and govern rate, product, and validation integrity as operating levers. The findings feed continuous improvement: rate tuning, validation policy refinement, exception pattern elimination, and operational calibration that compounds over time. Month-end produces an owner-facing summary, not an inbox dump.",
    imgPath: "/public/how-it-works/02-oversight.png",
    imgDesc: "Abstract monthly close flow or variance workup visualization.",
  },
  {
    number: "03",
    eyebrow: "Remote Command Center (Optional)",
    description: "24/7 remote monitoring, alert triage, and dispatch for revenue-at-risk incidents. Permissioned operational actions with time-stamped evidence. Reduces reliance on onsite coverage during nights, weekends, and low-volume hours. Attached where the coverage math works.",
    imgPath: "/public/how-it-works/03-command.png",
    imgDesc: "Command center monitoring dashboard or alert triage interface.",
  },
  {
    number: "04",
    eyebrow: "Remote Call Center (Optional)",
    description: "Branded customer support operating under Encompass scripts, authority limits, and refund governance. Every interaction logged and fed back into the control layer. No more refund-first defaults.",
    imgPath: "/public/how-it-works/04-call.png",
    imgDesc: "Call center interface or customer support flow diagram.",
  },
];

export default function HowItWorks() {
  return (
    <>
      {/* ─── Page Header ─── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
            The Operating Model
          </p>
          <h1 className="mt-4 max-w-3xl text-48 font-semibold leading-tight tracking-tight md:text-64 md:leading-[1.1]">
            Four lanes. One standard of rigor.
          </h1>
          <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
            Most parking consulting is bespoke: the firm&rsquo;s senior people show up, diagnose, leave behind recommendations, and move on. Encompass is built differently. We turn parking expertise into standard work that runs every month, at every site, to the same specification. Four operating lanes, one cadence, one set of artifacts. The same governance quality applies whether you have five sites or two hundred.
          </p>
        </section>

      {/* ─── Four Lanes ─── */}
      {lanes.map((lane, i) => (
        <section
          key={lane.number}
          className={`border-t border-border ${i % 2 === 1 ? "bg-bg-raised" : ""}`}
        >
          <Reveal>
            <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-24 md:grid-cols-[1fr_1fr] md:py-32">
              <div>
                <span className="font-mono text-48 font-medium text-accent-text/40 md:text-64" aria-hidden="true">
                  {lane.number}
                </span>
                <p className="mt-4 text-12 font-semibold uppercase tracking-widest text-text-tertiary">
                  {lane.eyebrow}
                </p>
                <p className="mt-6 text-18 leading-relaxed text-text-secondary">
                  {lane.description}
                </p>
              </div>
              <ImagePlaceholder
                path={lane.imgPath}
                dimensions="800 &times; 600"
                format="PNG, optimized"
                description={lane.imgDesc}
                aspectRatio="4/3"
              />
            </div>
          </Reveal>
        </section>
      ))}

      {/* ─── The Rhythm ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <Reveal>
            <>
              <h2 className="text-32 font-semibold tracking-tight md:text-48">
                The governance cadence
              </h2>
              <p className="mt-6 text-18 leading-relaxed text-text-secondary">Every site-month follows the same monthly rhythm.</p>
              <div className="space-y-6 mt-12">
                {[
                  { num: "01", text: "Audit the operator's month-end close package against source data." },
                  { num: "02", text: "Work up variances between what was reported and what actually happened." },
                  { num: "03", text: "Drive every exception to documented closure, on a deadline, with a reason code." },
                  { num: "04", text: "Deliver an owner-facing summary that explains what happened and why." },
                  { num: "05", text: "Recalibrate for the next month based on what we found." },
                ].map((step) => (
                  <div key={step.num} className="flex gap-6 md:gap-8">
                    <div className="font-mono text-base tracking-[0.15em] text-accent-text w-10 flex-none pt-0.5">{step.num}</div>
                    <p className="text-text-primary flex-1">{step.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-18 leading-relaxed text-text-secondary">The cadence is the same whether the site is a hospital valet or a class-A office tower. It does not bend to the operator&rsquo;s timeline or the technology stack&rsquo;s reporting quirks. This is why our owners get evidence at month-end instead of a narrative.</p>
            </>
          </Reveal>
        </div>
      </section>

      {/* ─── Standardization ─── */}
      <section className="border-t border-border bg-bg-raised">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <Reveal>
            <>
              <h2 className="text-32 font-semibold tracking-tight md:text-48">
                Standardization is the scaling mechanism.
              </h2>
              <p className="mt-8 max-w-3xl text-18 leading-relaxed text-text-secondary">
                The way we categorize exceptions, the approval hierarchy for closing them, the permission boundaries on who can touch what, the structure of the close package, and the monthly cadence itself: these are fixed. They do not change from site to site, regardless of which PARCS platform the site runs or which operator manages the gate. What adapts to each site is the data pipeline and the operator&rsquo;s workflow. The standards do not adapt. That is why a three-principal firm can govern a portfolio of any size. We did not scale by hiring proportionally. We scaled by making the work systematically reproducible.
              </p>
            </>
          </Reveal>
        </div>
      </section>

      {/* ─── All Verticals ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <Reveal>
            <>
              <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
                Vertical-Agnostic by Design
              </p>
              <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
                Controllership applies across every parking vertical.
              </h2>
              <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
                Our discipline applies whether you own, manage, or operate a
                Class&nbsp;A office, a mixed-use asset, on- and off-street, an
                airport, a hospital, a hotel, valet, or hybrid operations. We&rsquo;ve
                done the work inside every type of parking asset, and the
                control framework is the same regardless of what sits on top of it.
              </p>
              <div className="mt-12">
                <VerticalsGrid />
              </div>
            </>
          </Reveal>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <ClosingCTA />
    </>
  );
}

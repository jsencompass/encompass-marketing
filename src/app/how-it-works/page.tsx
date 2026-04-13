import type { Metadata } from "next";
import { ClosingCTA } from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "How It Works — Encompass Parking",
  description:
    "Four lanes, one standard of rigor. How Encompass delivers recurring controllership for parking assets.",
};

const lanes = [
  {
    number: "01",
    eyebrow: "Controls-Onboarding + PPB",
    description:
      "Every engagement starts with a paid Parking Performance Baseline. We ingest and normalize your data sources, map sessions to transactions to settlements to deposits, document permissions posture, establish exception taxonomy, and issue the baseline truth set. This is the deliverable that makes a site controls-ready.",
    // Image: dossier screenshot or abstract workflow diagram, 800x600, /public/how-it-works/01-ppb.png
  },
  {
    number: "02",
    eyebrow: "PACT Oversight (Run-State)",
    description:
      "Every site-month we audit the operator\u2019s close pack, validate session-to-deposit tie-out, drive exceptions to closure with reason codes and tiered approvals, and govern rate, product, and validation integrity as operating levers. Month-end produces an owner-facing summary \u2014 not an inbox dump.",
    // Image: /public/how-it-works/02-oversight.png
  },
  {
    number: "03",
    eyebrow: "Remote Command Center (Optional)",
    description:
      "Contracted where coverage economics justify it. 24/7 remote monitoring, alert triage, and dispatch for revenue-at-risk incidents. Permissioned operational actions with time-stamped evidence. Attached to 10\u201322% of sites.",
    // Image: /public/how-it-works/03-command.png
  },
  {
    number: "04",
    eyebrow: "Remote Call Center (Optional)",
    description:
      "Branded customer support via Umojo\u2019s NexPark platform, operated under Encompass scripts and authority limits. Reduces refund-first habits and keeps customer-support issues feeding back into governance.",
    // Image: /public/how-it-works/04-call.png
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
          Encompass scales by turning parking expertise into standard work. The
          objective is not founder-driven heroics across more garages &mdash; it
          is a repeatable production system that delivers the same governance
          quality at site 200 as it does at site 5.
        </p>
      </section>

      {/* ─── Four Lanes ─── */}
      {lanes.map((lane, i) => (
        <section
          key={lane.number}
          className={`border-t border-border ${i % 2 === 1 ? "bg-bg-raised" : ""}`}
        >
          <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-24 md:grid-cols-[1fr_1fr] md:py-32">
            <div>
              <span className="font-mono text-48 font-medium text-accent/30 md:text-64" aria-hidden="true">
                {lane.number}
              </span>
              <p className="mt-4 text-12 font-semibold uppercase tracking-widest text-text-tertiary">
                {lane.eyebrow}
              </p>
              <p className="mt-6 text-18 leading-relaxed text-text-secondary">
                {lane.description}
              </p>
            </div>
            {/* Placeholder image: /public/how-it-works/{number}-*.png, 800x600 */}
            <div className="flex items-center justify-center rounded-lg border border-border bg-bg-raised">
              <div className="flex h-[300px] w-full items-center justify-center">
                <p className="text-14 text-text-tertiary">
                  Lane {lane.number} visual (placeholder)
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── The Rhythm ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <h2 className="text-32 font-semibold tracking-tight md:text-48">
            The governance cadence
          </h2>
          <p className="mt-8 max-w-3xl text-18 leading-relaxed text-text-secondary">
            Every site-month follows the same rhythm: close-pack audit, variance
            workup, exception closure to standard and deadline, owner-facing
            summary delivery, and next-month calibration. The cadence does not
            bend to the operator&rsquo;s timeline or the technology
            stack&rsquo;s reporting quirks. It is the fixed frame against which
            all parties operate, and the reason month-end becomes evidence
            rather than narrative.
          </p>
        </div>
      </section>

      {/* ─── Standardization ─── */}
      <section className="border-t border-border bg-bg-raised">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <h2 className="text-32 font-semibold tracking-tight md:text-48">
            Standardization is the scaling mechanism.
          </h2>
          <p className="mt-8 max-w-3xl text-18 leading-relaxed text-text-secondary">
            Reason codes, approval hierarchies, permission boundaries, exception
            taxonomy, standard close artifact sets, governance cadences &mdash;
            these do not change site-to-site. What changes is the data source,
            the operator&rsquo;s workflow, and the parking stack. The control
            layer adapts to the stack without bending the standards. That is how
            a three-principal firm governs a portfolio of any size: not by
            adding headcount proportionally, but by making the work
            systematically reproducible.
          </p>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <ClosingCTA />
    </>
  );
}

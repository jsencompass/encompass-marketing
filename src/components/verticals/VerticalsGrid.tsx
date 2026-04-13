"use client";

import { useState } from "react";

const verticals = [
  { name: "Airports / Aviation", description: "Concessionaire operations, high-volume transient, shuttle coordination, federal compliance, revenue-critical peak windows." },
  { name: "Hospitality / Hotels", description: "Valet-dominant operations, guest service as revenue driver, banquet event spikes, daily PMS reconciliation." },
  { name: "Medical / Healthcare Campus", description: "Patient/visitor/staff mixed rate structures, extended-stay validation programs, 24/7 access, payer-sensitive billing." },
  { name: "Class A Office / Commercial", description: "Monthly parker dominance, tenant validation governance, lease abstract compliance, after-hours utilization." },
  { name: "Municipal / Government", description: "On- and off-street combined, metered revenue, enforcement coordination, public accountability, RFP-driven contracts." },
  { name: "Transit / Transportation Authority", description: "Commuter parking, fare integration, multi-facility standardization, grant-funded capital oversight." },
  { name: "Valet / Full-Service", description: "Labor-intensive operations, ticket reconciliation, key control, tip handling discipline, claim management." },
  { name: "Mixed-Use / Retail Destinations", description: "Multi-tenant validation, anchor-tenant lease obligations, event overlays, variable demand management." },
  { name: "Events / Stadiums / Venues", description: "Surge operations, prepaid channel coordination, staffing spikes, post-event settlement discipline." },
  { name: "Self-Park / Public Lot", description: "Automated operations, exception-heavy environments, attendant-optional designs, aggregator channel management." },
];

export function VerticalsGrid() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {verticals.map((v, i) => {
          const isExpanded = expanded === i;
          return (
            <button
              key={v.name}
              onClick={() => setExpanded(isExpanded ? null : i)}
              aria-expanded={isExpanded}
              className={`card-lift relative rounded-lg border p-6 text-left transition-all duration-200 ${
                isExpanded
                  ? "border-accent bg-bg-elevated"
                  : "border-border bg-bg-raised"
              }`}
              style={{ minHeight: isExpanded ? "auto" : "140px" }}
            >
              <span className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-accent opacity-60" />
              <h3 className="text-14 font-semibold text-text-primary md:text-16">
                {v.name}
              </h3>
              <div
                className={`mt-3 overflow-hidden transition-all duration-200 ${
                  isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-13 leading-relaxed text-text-secondary">
                  {v.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      <p className="mt-8 text-12 font-semibold uppercase tracking-widest text-text-tertiary">
        And any other parking operation &mdash; the discipline travels.
      </p>
    </div>
  );
}

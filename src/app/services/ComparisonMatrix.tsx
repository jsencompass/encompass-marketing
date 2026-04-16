import Link from "next/link";

type CellValue = true | false | string;

interface MatrixRow {
  name: string;
  foundation: CellValue;
  performance: CellValue;
  enterprise: CellValue;
}

interface MatrixCategory {
  name: string;
  rows: MatrixRow[];
}

const categories: MatrixCategory[] = [
  {
    name: "Foundational components",
    rows: [
      { name: "Monthly close pack audit", foundation: true, performance: true, enterprise: true },
      { name: "Session-to-deposit tie-out", foundation: true, performance: true, enterprise: true },
      { name: "Owner-facing month-end summary", foundation: true, performance: true, enterprise: true },
      { name: "Exception log with reason codes", foundation: true, performance: true, enterprise: true },
    ],
  },
  {
    name: "Governance & oversight",
    rows: [
      { name: "Variance workup with closure standards", foundation: false, performance: true, enterprise: true },
      { name: "Tiered exception approval hierarchy", foundation: false, performance: true, enterprise: true },
      { name: "Rate and validation policy governance", foundation: false, performance: true, enterprise: true },
      { name: "Continuous improvement memos", foundation: false, performance: true, enterprise: true },
    ],
  },
  {
    name: "Cadence & reviews",
    rows: [
      { name: "Quarterly principal review", foundation: true, performance: true, enterprise: false },
      { name: "Monthly principal review", foundation: false, performance: true, enterprise: true },
      { name: "Bi-weekly sync cadence", foundation: false, performance: false, enterprise: true },
      { name: "Quarterly executive review", foundation: false, performance: false, enterprise: true },
    ],
  },
  {
    name: "Multi-operator & complex environments",
    rows: [
      { name: "Multi-operator governance design", foundation: false, performance: false, enterprise: true },
      { name: "Custom close-pack artifact specs", foundation: false, performance: false, enterprise: true },
      { name: "Dedicated principal liaison", foundation: false, performance: false, enterprise: true },
      { name: "Stack-agnostic data ingest", foundation: "Standard", performance: "Standard", enterprise: "Custom" },
    ],
  },
  {
    name: "Sites & portfolio scale",
    rows: [
      { name: "Sites included in baseline", foundation: "1\u20135", performance: "5\u201325", enterprise: "25+" },
      { name: "Implementation + PPB required", foundation: true, performance: true, enterprise: true },
      { name: "Module attach available", foundation: true, performance: true, enterprise: true },
    ],
  },
];

function Check() {
  return <span className="text-accent text-[15px]">&#x2713;</span>;
}

function Dash() {
  return <span className="inline-block w-3.5 h-px bg-[#3a3a40]" aria-hidden="true" />;
}

function CellContent({ value }: { value: CellValue }) {
  if (value === true) return <Check />;
  if (value === false) return <Dash />;
  return <span>{value}</span>;
}

export function ComparisonMatrix() {
  return (
    <section className="bg-[#0F0F11] py-14 mt-8" id="compare-features">
      {/* ─── Section header ─── */}
      <div className="mx-auto max-w-[1200px] px-6 mb-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent-text">
          Compare features
        </p>
        <h2 className="mt-3 text-32 font-semibold tracking-tight md:text-48">
          Every line item, every tier.
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] text-text-secondary leading-[1.6]">
          The headers dock below the nav as you scroll, so you can match any
          feature to its tier without losing context. Hover any row to track it
          across columns.
        </p>
      </div>

      {/* ─── Sticky tier header ─── */}
      <div className="sticky top-[80px] z-[15] bg-[#0F0F11]/98 backdrop-blur-lg border-b border-border/70 py-3.5 shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-[1.7fr_1fr_1fr_1fr] gap-0 items-stretch">
            <div />
            <div className="py-1.5 px-2 flex flex-col items-center gap-2">
              <div className="text-[14px] font-medium text-text-primary tracking-[-0.005em] text-center leading-[1.2]">
                Foundation
              </div>
              <Link
                href="/contact?tier=foundation"
                className="px-4 py-1.5 text-[12px] rounded-[7px] border border-white/18 bg-transparent text-text-primary font-medium hover:border-white/50 transition-all whitespace-nowrap"
              >
                Request
              </Link>
            </div>
            <div className="py-1.5 px-2 flex flex-col items-center gap-2 bg-accent/8 border-l border-r border-accent/20 rounded-md">
              <div className="text-[14px] font-medium text-text-primary tracking-[-0.005em] text-center leading-[1.2]">
                Performance
              </div>
              <Link
                href="/contact?tier=performance"
                className="px-4 py-1.5 text-[12px] rounded-[7px] border border-accent bg-accent text-white font-medium hover:border-accent/90 transition-all whitespace-nowrap"
              >
                Request
              </Link>
            </div>
            <div className="py-1.5 px-2 flex flex-col items-center gap-2">
              <div className="text-[14px] font-medium text-text-primary tracking-[-0.005em] text-center leading-[1.2]">
                Enterprise
              </div>
              <Link
                href="/contact?tier=enterprise"
                className="px-4 py-1.5 text-[12px] rounded-[7px] border border-white/18 bg-transparent text-text-primary font-medium hover:border-white/50 transition-all whitespace-nowrap"
              >
                Request
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Matrix rows ─── */}
      <div className="mx-auto max-w-[1200px] px-6 mt-6">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="pt-8 pb-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-text-tertiary border-b border-border/60 mb-1">
              {cat.name}
            </div>
            {cat.rows.map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-[1.7fr_1fr_1fr_1fr] gap-0 py-3.5 border-b border-border/40 items-center transition-colors duration-100 hover:bg-accent/5 [&:hover_.feature-label]:text-accent-text [&>*:nth-child(3)]:bg-accent/5 [&:hover>*:nth-child(3)]:bg-accent/10"
              >
                <div className="feature-label text-[14px] text-text-primary pr-4 transition-colors">
                  {row.name}
                </div>
                <div className="text-[14px] text-text-secondary px-3 text-center">
                  <CellContent value={row.foundation} />
                </div>
                <div className="text-[14px] text-text-primary px-3 text-center">
                  <CellContent value={row.performance} />
                </div>
                <div className="text-[14px] text-text-secondary px-3 text-center">
                  <CellContent value={row.enterprise} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

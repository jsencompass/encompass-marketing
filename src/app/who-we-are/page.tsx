import type { Metadata } from "next";
import { ClosingCTA } from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Who We Are — Encompass Parking",
  description:
    "Three principals with seventy years of combined parking operations experience. Built by operators who've owned the problem.",
};

const principals = [
  {
    id: "joe",
    name: "Joe Dudek",
    initials: "JD",
    role: "Operations & Governance",
    bio: [
      "Joe Dudek served as Chief Operating Officer for LAX parking — a single-campus operation generating $85 million in annual gross revenue with more than 800 employees across multiple operators. In that role he owned every control surface: session reconciliation, rate integrity, validation governance, employee credentialing, cash handling, and audit response. Under his leadership the operation achieved a 40% net revenue increase while simultaneously onboarding a new PARCS platform, restructuring operator contracts, and standing up a real-time exception-management discipline.",
      "Before LAX, Joe held senior operating roles across institutional parking portfolios in Southern California, building a governance philosophy grounded in three principles: controls must be documented before they can be audited, exceptions must be closed to a standard and a deadline, and no month-end packet should require faith. That philosophy is the foundation of PACT\u2019s oversight methodology and the reason Encompass exists as a controllership layer rather than another consulting firm.",
    ],
  },
  {
    id: "jason",
    name: "Jason Scott",
    initials: "JS",
    role: "Delivery & Assurance",
    bio: [
      "Jason Scott spent a decade at LAX managing large-scale PARCS implementations, technology rollouts, and operational transitions across one of the most complex parking campuses in the country. He oversaw 800+ projects representing more than $150 million in installation value — coordinating between equipment manufacturers, systems integrators, airport operations, and multiple concurrent operators. That experience built an intuition for where technology promises break down: at the seam between what a system can do and what an operation actually disciplines itself to use.",
      "After LAX, Jason founded JDE Parking Consultants and created Parking PI, a mystery-shopping and compliance-audit platform that has completed over 3,000 shops across the western United States. Parking PI proved a thesis that would become central to Encompass: controls that aren\u2019t independently verified aren\u2019t controls — they\u2019re assumptions. Jason brings to Encompass the delivery methodology, field-verification discipline, and technology integration rigor that turns PACT from a reporting framework into an operating standard.",
    ],
  },
  {
    id: "steven",
    name: "Steven Grant",
    initials: "SG",
    role: "Technology & Architecture",
    bio: [
      "Steven Grant built technology platforms at Oracle, Booz Allen Hamilton, and LTK Engineering before bringing that enterprise architecture discipline to parking. His career spans five major airport technology deployments — projects where failure modes aren\u2019t theoretical, uptime requirements are absolute, and integration complexity across legacy systems, real-time data feeds, and regulatory reporting is the defining challenge.",
      "At Westfield Century City, Steven designed and deployed one of the industry\u2019s first fully frictionless parking environments — LPR-based entry and exit, mobile payment integration, and real-time occupancy management operating without gates or ticket dispensers. That project became a proof point for the thesis that parking technology works when it\u2019s governed, and fails when it\u2019s installed and forgotten. Steven brings to Encompass the platform architecture, data-pipeline design, and systems-integration methodology that makes PACT a technology product, not a spreadsheet exercise.",
    ],
  },
];

export default function WhoWeAre() {
  return (
    <>
      {/* ─── Page Header ─── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <p className="text-12 font-semibold uppercase tracking-widest text-accent">
          The Team
        </p>
        <h1 className="mt-4 max-w-3xl text-48 font-semibold leading-tight tracking-tight md:text-64 md:leading-[1.1]">
          Built by operators who&rsquo;ve owned the problem.
        </h1>
        <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
          Encompass is what you build when you stop being consultants who
          diagnose the problem and start being the control layer that prevents
          it from recurring.
        </p>
      </section>

      {/* ─── Principal Bios ─── */}
      {principals.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`border-t border-border ${i % 2 === 1 ? "bg-bg-raised" : ""}`}
        >
          <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-24 md:grid-cols-[1fr_2fr] md:py-32">
            {/* Headshot placeholder */}
            <div className="flex justify-center md:justify-start">
              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-bg-elevated md:h-[200px] md:w-[200px]">
                <span className="text-36 font-semibold text-text-secondary md:text-48">
                  {p.initials}
                </span>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-32 font-semibold tracking-tight md:text-48">
                {p.name}
              </h2>
              <p className="mt-2 text-18 text-text-secondary">{p.role}</p>
              <div className="mt-8 space-y-6">
                {p.bio.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-16 leading-relaxed text-text-secondary"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <a
                href="#"
                className="group mt-8 inline-flex items-center gap-1 text-14 font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                Connect on LinkedIn
                <span className="transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* ─── Formation Story ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
            How Encompass Was Formed
          </p>
          <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
            Three firms. One operating philosophy.
          </h2>
          <div className="mt-8 max-w-3xl space-y-6">
            <p className="text-16 leading-relaxed text-text-secondary">
              Joe, Jason, and Steven first worked together at Westfield Valley
              Fair, where their firms were independently engaged on overlapping
              scopes — operations consulting, technology implementation, and
              compliance auditing. That project revealed an uncomfortable truth:
              each firm was diagnosing the same systemic gaps, writing parallel
              reports, and handing recommendations to an owner who lacked the
              standing team to implement them continuously.
            </p>
            <p className="text-16 leading-relaxed text-text-secondary">
              Subsequent engagements at Sacramento International Airport and
              the Port of Portland deepened the conviction. In both cases, the
              consulting deliverables were strong, the technology was capable,
              and the operations team was competent — but the proof layer that
              should connect all three didn&rsquo;t exist. Month-end packets
              arrived as articles of faith rather than auditable evidence.
            </p>
            <p className="text-16 leading-relaxed text-text-secondary">
              One Beverly Hills became the catalyst. A $10 billion mixed-use
              development with institutional governance requirements that no
              single consulting engagement could satisfy on a recurring basis.
              The owner didn&rsquo;t need another audit — they needed a
              permanent controllership function that could operate across
              operators, normalize across technology stacks, and deliver
              closure-grade evidence every month.
            </p>
            <p className="text-18 font-medium leading-relaxed text-text-primary">
              Encompass is what you build when you stop being consultants who
              diagnose the problem and start being the control layer that
              prevents it from recurring.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <ClosingCTA />
    </>
  );
}

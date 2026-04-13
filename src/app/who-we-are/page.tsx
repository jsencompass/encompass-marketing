import type { Metadata } from "next";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/placeholders/ImagePlaceholder";

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
    role: "Co-Founder & Managing Principal, Operations & Governance",
    bio: [
      "Joe has spent 35+ years in parking, with deep expertise in financial management, operational leadership, and asset-level governance across airports, hospitality, medical centers, Class A office, valet, and municipal contracts. He is a super-connector in the industry and one of the most respected operational voices in the western United States.",
      "His defining operational credential is LAX. Joe ran one of the largest parking operations in the country \u2014 800+ employees, $85M+ in annual gross revenue, and simultaneous oversight of multiple third-party operators across the airport campus. Under his leadership the operation delivered a 40% increase in net revenue and a 200% improvement in net operating income. That came not from technology upgrades but from financial controls, staff discipline, contract enforcement, and operational accountability. Joe has seen every way a parking operation can underperform \u2014 and built the playbook for fixing it.",
      "Joe leads governance at Encompass. He sets the standards for what proof looks like, how exceptions get handled, how close packs are verified, and what separates an auditable operation from a reporting exercise.",
    ],
    closing: "At Encompass, Joe owns the discipline \u2014 what gets reconciled, how, and to what standard.",
  },
  {
    id: "jason",
    name: "Jason Scott",
    initials: "JS",
    role: "Co-Founder & Managing Partner, Delivery & Assurance",
    bio: [
      "Jason brings 20+ years of parking operations, project management, and assurance experience. His career has two chapters and both are essential to what Encompass delivers.",
      "The first chapter was operations. At LAX, Jason managed 450+ employees, a $22M payroll, and parking operations generating 30%+ profit margins. He learned what breaks inside a parking operation when nobody is watching \u2014 and what it takes to build systems that catch it.",
      "The second chapter was JDE, where Jason built the project management and assurance practice into a nationally recognized capability: 800+ projects, $150M+ in installation value managed, 30,000+ PGS spaces across 90+ facilities. The range tells the story \u2014 from One Beverly Hills ($10B luxury development, active engagement) to the LAX PARCS program ($6M airport installation) to LA Metro (28,000+ spaces across 92 facilities) to 40 concurrent SKIDATA projects run simultaneously. He also built the assurance practice end-to-end: PreFlight audits across 8-city portfolios, Little Tokyo Mall ($600K projected revenue increase), Kilroy Realty portfolio reviews, and the Parking PI mystery shop program from concept through 3,000+ completed shops.",
      "Jason leads delivery at Encompass. He sets the standard for how sites get onboarded, how governance cadences run, and how quality holds as the delivery team grows beyond the founders.",
    ],
    closing: "At Encompass, Jason owns execution \u2014 how the work gets done, at every site, every month.",
  },
  {
    id: "steven",
    name: "Steven Grant",
    initials: "SG",
    role: "Co-Founder, Technology & Architecture",
    bio: [
      "Steven brings blue-chip consulting DNA to the parking industry. His career includes Oracle, Booz Allen Hamilton, and LTK Engineering \u2014 a combination of enterprise systems architecture, strategic consulting, and large-scale infrastructure program management that is rare in parking. He has led five major airport parking technology deployments and pioneered the frictionless parking system at Westfield Century City.",
      "Jason and Steven first met as opposing consultants on Westfield Valley Fair in San Jose \u2014 a $1.1B renovation for Unibail-Rodamco-Westfield with 4,200+ new parking spaces and full PARCS deployment, complicated mid-construction by COVID. They crossed paths again on opposing sides at Sacramento International Airport and the Port of Portland before aligning at One Beverly Hills, where JDE brought AMG in as a strategic technology partner. Working together at that scale proved the combined model.",
      "Steven leads technology architecture at Encompass. He ensures integrations are designed correctly, data pipelines are reliable, and the PACT platform scales without accumulating technical debt. His experience bridging enterprise technology frameworks with parking-specific requirements is what makes Encompass\u2019s vendor-agnostic approach technically credible.",
    ],
    closing: "At Encompass, Steven owns the architecture \u2014 how data moves, how systems connect, how the platform scales.",
  },
];

export default function WhoWeAre() {
  return (
    <>
      {/* ─── Page Header ─── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
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
          <Reveal delay={i * 0.2}>
            <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-24 md:grid-cols-[1fr_2fr] md:py-32">
              {/* Headshot placeholder */}
              <div className="flex justify-center md:justify-start">
                <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full border border-accent-dim bg-bg-elevated md:h-[200px] md:w-[200px]">
                  <span className="text-36 font-semibold text-text-primary md:text-48">
                    {p.initials}
                  </span>
                  <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-accent md:bottom-2 md:right-2 md:h-3 md:w-3" />
                </div>
                <ImagePlaceholder path={"/public/team/" + p.id + ".jpg"} dimensions="800 × 800" format="JPG, ~150KB optimized" description={p.name + " — professional headshot, neutral dark background, institutional posture, color-graded for dark site aesthetic."} />
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
                <p className="mt-8 text-16 font-medium text-text-secondary">
                  {p.closing}
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      ))}

      {/* ─── Formation Story ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <Reveal>
            <>
              <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">
                How Encompass Was Formed
              </p>
              <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">
                Three firms. One operating philosophy.
              </h2>
              <div className="mt-8 max-w-3xl space-y-6">
                <p className="text-16 leading-relaxed text-text-secondary">
                  Jason and Steven first met as opposing consultants on Westfield
                  Valley Fair in San Jose &mdash; a $1.1B renovation for
                  Unibail-Rodamco-Westfield with 4,200+ new parking spaces and full
                  PARCS deployment, complicated mid-construction by COVID. They
                  crossed paths again on opposing sides at Sacramento International
                  Airport and the Port of Portland before aligning at One Beverly
                  Hills, where JDE brought AMG in as a strategic technology partner.
                </p>
                <p className="text-16 leading-relaxed text-text-secondary">
                  Working together at that scale proved what each firm had
                  independently concluded: the parking industry&rsquo;s control
                  gap was structural, not incidental. Each firm was diagnosing the
                  same systemic problems, writing parallel reports, and handing
                  recommendations to owners who lacked the standing team to
                  implement them continuously.
                </p>
                <p className="text-16 leading-relaxed text-text-secondary">
                  One Beverly Hills became the catalyst. A $10 billion mixed-use
                  development with institutional governance requirements that no
                  single consulting engagement could satisfy on a recurring basis.
                  The owner didn&rsquo;t need another audit &mdash; they needed a
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
            </>
          </Reveal>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <ClosingCTA />
    </>
  );
}

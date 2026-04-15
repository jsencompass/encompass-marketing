import Link from "next/link";
import Image from "next/image";
import { ClosingCTA } from "@/components/ClosingCTA";
import { PactIcon } from "@/components/icons/PactIcon";
import { OperatorsIcon } from "@/components/icons/problem/OperatorsIcon";
import { VendorsIcon } from "@/components/icons/problem/VendorsIcon";
import { YourAssetIcon } from "@/components/icons/problem/YourAssetIcon";
import { ParkingPiIcon } from "@/components/icons/ParkingPiIcon";
import { ProTrackIcon } from "@/components/icons/ProTrackIcon";
import { CommandCenterIcon } from "@/components/icons/CommandCenterIcon";
import { HeroSpotlight } from "@/components/hero/HeroSpotlight";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { HeroEntrance, HeroEyebrow, HeroTitle, HeroSubhead, HeroCTAs } from "@/components/hero/HeroEntrance";
import { Reveal } from "@/components/motion/Reveal";
import { CredibilityBand } from "@/components/CredibilityBand";
import { PactPortfolioMap } from "@/components/proof/PactPortfolioMap";
import { DrawOnReveal } from "@/components/motion/DrawOnReveal";

import { getAllPosts } from "@/lib/insights";
import { PostThumbnail } from "@/components/insights/PostThumbnail";

const capabilities = [
  { name: "Implementation + PPB", description: "Every new site starts with a paid Parking Performance Baseline (PPB). Think of it as a baseline audit: we ingest and normalize your data, map sessions to transactions to validations to deposits, and produce the starting truth set your operation is measured against. The PPB is what makes a site controls-ready for recurring PACT Oversight.", tag: "Base" },
  { name: "PACT Oversight", description: "Monthly close-pack audit, session-to-deposit tie-out, and exception governance. Rate, product, and validation integrity managed as operating levers.", tag: "Base" },
  { name: "Remote Command Center", description: "24/7 remote monitoring, alert triage, and dispatch for revenue-at-risk incidents. Permissioned operational actions with time-stamped evidence. Reduces reliance on onsite coverage during nights, weekends, and low-volume hours. Attached where the coverage math works.", tag: "Optional" },
  { name: "Remote Call Center", description: "Branded customer support operating under Encompass scripts, authority limits, and refund governance. Every interaction logged and fed back into the control layer. No more refund-first defaults.", tag: "Optional" },
];

const tiers = [
  { name: "Foundation", price: "$2,250+", description: "For portfolios establishing controllership for the first time. Automated data feeds required.", highlight: false },
  { name: "Performance", price: "$3,500+", description: "For portfolios with mixed data posture and deeper variance closure needs.", highlight: true },
  { name: "Enterprise", price: "$6,750+", description: "For institutional portfolios requiring cross-operator normalization and executive-level rollups.", highlight: false },
];

const platformIcons: Record<string, React.ReactNode> = {
  pact: <PactIcon className="text-accent" />,
  pi: <ParkingPiIcon className="text-accent" />,
  protrack: <ProTrackIcon className="text-accent" />,
  command: <CommandCenterIcon className="text-accent" />,
};

const platforms = [
  { key: "pact", name: "PACT\u2122", title: "Parking Asset Control Tower (PACT)", description: "The vendor-agnostic controllership layer. Reconciles revenue, governs exceptions, enforces policy across any operator and any stack." },
  { key: "pi", name: "Parking PI\u2122", title: "Mystery Shop Platform", description: "The industry\u2019s only mystery shop platform purpose-built for parking. 3,000+ shops completed. Shopper portal, weighted scoring, client dashboard." },
  { key: "protrack", name: "ProTrack\u2122", title: "Project Management", description: "Project management platform for PARCS installations and technology upgrades. 800+ projects. Backbone of institutional-grade delivery." },
  { key: "command", name: "Command Center", title: "Remote Operations", description: "Remote monitoring, alert triage, and dispatch for revenue-at-risk incidents. 24/7 coverage with permissioned operational response." },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <HeroSpotlight>
        <section className="relative min-h-[70vh] md:min-h-[85vh] bg-bg-base">
          <HeroBackground />
          <div className="relative mx-auto max-w-[1100px] px-6 pt-32 pb-24 md:pt-40 md:pb-32">
            <HeroEntrance>
              <HeroEyebrow>Controllership for Parking Revenue</HeroEyebrow>
              <HeroTitle>
                Operators run the garage.{" "}
                <span className="text-accent-text">We own the proof.</span>
              </HeroTitle>
              <HeroSubhead>
                Encompass is the controllership layer for parking assets. We sit
                above any operator and any technology stack, reconciling
                revenue, governing exceptions, and continuously improving NOI
                across every site in the portfolio.
              </HeroSubhead>
              <HeroCTAs>
                <Link href="/contact" className="cta-primary rounded-full bg-accent px-6 py-3 text-14 font-semibold text-white transition-colors hover:bg-accent-dim">
                  Request an engagement
                </Link>
                <Link href="/contact#schedule" className="group flex items-center gap-1 text-14 font-medium text-text-secondary transition-colors hover:text-text-primary">
                  Book an intro call
                  <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </Link>
              </HeroCTAs>
            </HeroEntrance>
          </div>
          <Image
            src="/logo.png"
            alt=""
            width={144}
            height={45}
            className="absolute bottom-8 right-8 z-10 opacity-60"
            aria-hidden="true"
          />
        </section>
      </HeroSpotlight>

      {/* ─── Why Encompass Exists ─── */}
      <Reveal>
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
            <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">Why Encompass Exists</p>
            <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">Until Encompass, nobody did.</h2>
            <p className="mt-8 max-w-3xl text-18 leading-relaxed text-text-secondary">
              Parking is a $30B industry managed by capable parties across fractured seams. Operators run throughput. PARCS vendors run devices. Finance teams receive month-end packets. Everyone is doing a real job, and until Encompass, the full chain of proof, closure, and policy discipline belonged to no one. That gap is where NOI erodes quietly, through drift, exceptions, and controls that go unverified. We built the controllership layer to close it.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { eyebrow: "Operators", primary: "Manage throughput and staffing.", secondary: "Keep the garage running day-to-day.", icon: <OperatorsIcon />, accent: "var(--status-revenue)" },
                { eyebrow: "Vendors", primary: "Manage devices and settlement.", secondary: "Keep the tech functional.", icon: <VendorsIcon />, accent: "var(--status-cost)" },
                { eyebrow: "Your Asset", primary: "Has no standing controllership.", secondary: "Nobody owns the proof.", icon: <YourAssetIcon />, accent: "var(--status-loss)" },
              ].map((card, i) => (
                <Reveal key={card.eyebrow} delay={i * 0.1}>
                  <div className="card-lift h-full rounded-lg border border-border bg-bg-raised p-8" style={{ borderLeft: `3px solid ${card.accent}` }}>
                    <div className="mb-4 text-text-tertiary">{card.icon}</div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">{card.eyebrow}</p>
                    <p className="mt-2 text-[20px] font-semibold text-text-primary">{card.primary}</p>
                    <p className="mt-1 text-14 text-text-secondary">{card.secondary}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ─── What We Do — PACT ─── */}
      <Reveal>
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
            <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">Parking Asset Control Tower (PACT)</p>
            <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">A recurring controllership layer, delivered per site-month.</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {capabilities.map((cap, i) => (
                <Reveal key={cap.name} delay={i * 0.12}>
                  <div className="card-lift h-full rounded-lg border border-border bg-bg-raised p-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-18 font-semibold text-text-primary">{cap.name}</h3>
                      <span className={`rounded-full px-3 py-0.5 text-12 font-medium ${cap.tag === "Base" ? "bg-accent/10 text-accent-text" : "bg-bg-elevated text-text-tertiary"}`}>{cap.tag}</span>
                    </div>
                    <p className="mt-3 text-14 leading-relaxed text-text-secondary">{cap.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ─── Services & Pricing ─── */}
      <Reveal>
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
            <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">Services &amp; Pricing</p>
            <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">Three tiers. One standard of rigor.</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {tiers.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.1}>
                  <div className={`card-lift h-full rounded-lg border p-8 ${tier.highlight ? "card-lift-accent border-accent bg-bg-raised" : "border-border bg-bg-raised"}`}>
                    <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">{tier.name}</p>
                    <p className="mt-3 font-mono text-32 font-medium text-text-primary">{tier.price}</p>
                    <p className="mt-1 text-14 text-text-tertiary">per site-month</p>
                    <p className="mt-4 text-14 leading-relaxed text-text-secondary">{tier.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-14 text-text-tertiary">
              Implementation + PPB: $4,500+ per site. Optional modules priced separately.{" "}
              <Link href="/services" className="text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary">See Services for the full matrix.</Link>
            </p>
          </div>
        </section>
      </Reveal>

      {/* ─── Capabilities Band ─── */}
      <Reveal>
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
            <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">What We Bring to the Asset</p>
            <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">Four proprietary platforms. One recurring operating system.</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {platforms.map((p, i) => (
                <div key={p.key} className="card-lift h-full rounded-lg border border-border bg-bg-raised p-8">
                  <DrawOnReveal delay={i * 0.18}>
                    <div className="flex h-8 w-8 items-center justify-center">{platformIcons[p.key]}</div>
                  </DrawOnReveal>
                  <h3 className="mt-4 text-16 font-semibold text-text-primary">{p.name}</h3>
                  <p className="mt-1 text-12 text-text-tertiary">{p.title}</p>
                  <p className="mt-3 text-14 leading-relaxed text-text-secondary">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ─── Team Credibility Band ─── */}
      <CredibilityBand />

      {/* ─── Latest from Insights ─── */}
      <Reveal>
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
            <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">Insights</p>
            <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">What we see when we audit the numbers.</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {getAllPosts().slice(0, 2).map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.12}>
                  <Link href={`/insights/${post.slug}`} className="card-lift h-full overflow-hidden rounded-lg bg-bg-raised">
                    <PostThumbnail slug={post.slug} className="aspect-[16/9]" />
                    <div className="p-6">
                      <h3 className="text-18 font-semibold text-text-primary">{post.title}</h3>
                      <p className="mt-2 text-14 leading-relaxed text-text-secondary">{post.excerpt.substring(0, 120)}&hellip;</p>
                      <div className="mt-3 flex items-center gap-3 text-12 text-text-tertiary">
                        <span>{post.author.name}</span>
                        <span>&middot;</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/insights" className="group inline-flex items-center gap-1 text-14 font-medium text-accent-text transition-colors hover:text-text-primary">
                Read all insights <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ─── Proof Visual ─── */}
      <Reveal>
        <section className="border-b border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
            <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">What Governance Looks Like</p>
            <h2 className="mt-4 text-32 font-semibold tracking-tight md:text-48">PACT makes revenue proof continuous.</h2>
            <div className="mt-12"><PactPortfolioMap /></div>
            <p className="mt-6 max-w-3xl text-14 leading-relaxed text-text-secondary">
              Session-to-deposit tie-out against source-of-truth data. Exception governance with reason codes, approval hierarchies, and closure standards. Rate, product, and validation integrity tracked as operating levers across a live portfolio. Every site, every month, against the same specification.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ─── Closing CTA ─── */}
      <ClosingCTA />

      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Encompass Parking",
            legalName: "Encompass Parking, LLC",
            url: "https://encompassparking.com",
            logo: "https://encompassparking.com/og-default.png",
            description: "Owner-aligned parking controllership: monthly close-pack reconciliation, audits, and findings for parking facility owners.",
            founder: [
              { "@type": "Person", name: "Joe Dudek" },
              { "@type": "Person", name: "Jason Scott" },
              { "@type": "Person", name: "Steven Grant" },
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              email: "contact@encompassparking.com",
              url: "https://encompassparking.com/contact",
            },
          }),
        }}
      />
    </>
  );
}

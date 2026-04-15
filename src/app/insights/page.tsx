import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/insights";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Reveal } from "@/components/motion/Reveal";
import { PostThumbnail } from "@/components/insights/PostThumbnail";
import { InlineSubscribe } from "@/components/insights/InlineSubscribe";

const categoryMap: Record<string, string> = {
  "01-why-controllership": "Controllership",
  "02-lost-art-parking-audit": "Audit",
  "03-four-lane-operating-model": "Operations",
  "04-noi-erosion-patterns": "NOI + Revenue",
  "05-what-a-real-close-pack-looks-like": "Close Pack",
  "06-validation-absorption-drift": "NOI + Revenue",
  "07-parcs-uptime-revenue-at-risk": "Technology",
  "08-monthly-report-isnt-proof": "Close Pack",
  "09-remote-command-center-economics": "Operations",
  "10-parking-pi-scoring": "Audit",
  "11-reconciliation-vs-reporting": "Close Pack",
};

export const metadata: Metadata = {
  title: "Insights | Encompass Parking",
  description:
    "Quarterly notes from the Encompass principals on parking controllership, operator dynamics, revenue governance, and industry shifts.",
};

const POSTS_PER_PAGE = 12;

export default function Insights() {
  const allPosts = getAllPosts();
  const featured = allPosts.find((p) => p.featured);
  const remaining = allPosts.filter((p) => p !== featured).slice(0, POSTS_PER_PAGE - 1);

  return (
    <>
      {/* ─── Page Header ─── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-12 md:pt-32">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent-text">
            INSIGHTS
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 mb-4 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
            Notes from the field.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="max-w-[640px] text-[20px] leading-relaxed text-text-secondary">
            Controllership patterns, audit findings, and operator-honest
            analysis from the people building the layer above the stack.
          </p>
          <a
            href="/insights/feed.xml"
            className="mt-4 inline-block text-sm text-text-tertiary transition-colors hover:text-accent-text"
          >
            RSS &rarr;
          </a>
        </Reveal>
      </section>

      <div className="mx-auto max-w-[1200px] px-6">
        <hr className="border-t border-[--border]" />
      </div>

      <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">

      {allPosts.length === 0 ? (
        <div className="mt-16 max-w-xl">
          <p className="text-18 text-text-secondary">
            First edition coming soon. Subscribe to get it in your inbox.
          </p>
          <div className="mt-8">
            <NewsletterSignup variant="inline" />
          </div>
        </div>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <Reveal>
              <div className="mb-12 md:mb-16">
                <span className="mb-4 inline-block rounded-full bg-accent/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-text">
                  FEATURED
                </span>
                <Link
                  href={`/insights/${featured.slug}`}
                  className="group card-lift overflow-hidden rounded-lg bg-bg-raised grid md:grid-cols-5 gap-0"
                >
                  <div className="relative md:col-span-2 aspect-[16/9] md:aspect-auto overflow-hidden bg-bg-elevated">
                    <PostThumbnail slug={featured.slug} className="h-full w-full" />
                    {categoryMap[featured.slug] && (
                      <span className="absolute top-3 left-3 z-10 rounded-full bg-accent/12 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-text">{categoryMap[featured.slug]}</span>
                    )}
                  </div>
                  <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                    <h2 className="text-xl md:text-2xl font-semibold text-text-primary group-hover:text-accent-text transition-colors mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-text-secondary leading-relaxed line-clamp-4 mb-4">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wide text-text-tertiary bg-bg-base/40">{featured.author.name}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wide text-text-tertiary bg-bg-base/40">{new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wide text-text-tertiary bg-bg-base/40">{featured.readingTime}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </Reveal>
          )}

          {/* Remaining posts */}
          {remaining.length > 0 && (
            <>
            <h2 className="mb-8 text-2xl font-semibold text-text-primary">Recent</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {remaining.map((post, index) => (
                <Reveal key={post.slug} delay={(index % 4) * 0.1}>
                  {index === 4 && remaining.length > 4 && (
                    <div className="col-span-full mb-8 -mt-0" />
                  )}
                  <Link
                    href={`/insights/${post.slug}`}
                    className="group card-lift h-full overflow-hidden rounded-lg bg-bg-raised flex flex-col"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-bg-elevated">
                      <PostThumbnail slug={post.slug} className="h-full w-full" />
                      {categoryMap[post.slug] && (
                        <span className="absolute top-3 left-3 z-10 rounded-full bg-accent/12 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-text">{categoryMap[post.slug]}</span>
                      )}
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-text transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wide text-text-tertiary bg-bg-base/40">{post.author.name}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wide text-text-tertiary bg-bg-base/40">{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wide text-text-tertiary bg-bg-base/40">{post.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Mid-grid interstitial */}
            {remaining.length > 4 && (
              <section className="py-12 md:py-16 border-y border-border/30 my-8 md:my-12">
                <div className="max-w-[560px] mx-auto text-center px-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-accent-text mb-3 font-mono">Stay current</p>
                  <h3 className="text-2xl md:text-3xl text-text-primary mb-4 font-semibold">Field notes on parking controllership.</h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">Delivered when we have something worth sending.</p>
                  <InlineSubscribe />
                </div>
              </section>
            )}
            </>
          )}
        </>
      )}
    </section>
    </>
  );
}

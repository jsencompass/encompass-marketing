import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/insights";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Insights — Encompass Parking",
  description:
    "Quarterly notes from the Encompass principals on parking controllership, operator dynamics, revenue governance, and industry shifts.",
};

export default function Insights() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured);
  const remaining = posts.filter((p) => p !== featured);

  return (
    <>
      {/* ─── Page Header ─── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
            Insights
          </p>
          <h1 className="mt-4 text-48 font-semibold tracking-tight">
            Notes on parking controllership.
          </h1>
          <p className="mt-6 max-w-2xl text-18 leading-relaxed text-text-secondary">
            Quarterly perspective from the Encompass principals on what
            we&rsquo;re seeing across portfolios &mdash; operator incentive
            conflicts, validation drift, PARCS tradeoffs, and the operating
            disciplines that keep NOI intact.
          </p>
        </section>

      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">

      {posts.length === 0 ? (
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
              <Link
                href={`/insights/${featured.slug}`}
                className="card-lift mt-16 block rounded-lg border border-border bg-bg-raised p-8 md:p-12"
              >
                <p className="text-12 font-semibold uppercase tracking-widest text-accent-text">
                  Featured
                </p>
                <h2 className="mt-4 text-32 font-semibold tracking-tight text-text-primary md:text-48">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl text-18 leading-relaxed text-text-secondary">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-14 text-text-tertiary">
                  <span>{featured.author.name}</span>
                  <span>&middot;</span>
                  <span>{new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span>&middot;</span>
                  <span>{featured.readingTime}</span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Remaining posts */}
          {remaining.length > 0 && (
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {remaining.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.1}>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="card-lift rounded-lg border border-border bg-bg-raised p-8"
                  >
                    <h3 className="text-18 font-semibold text-text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-14 leading-relaxed text-text-secondary">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-12 text-text-tertiary">
                      <span>{post.author.name}</span>
                      <span>&middot;</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>&middot;</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-16 max-w-xl">
            <NewsletterSignup variant="inline" />
          </div>
        </>
      )}
    </section>
    </>
  );
}

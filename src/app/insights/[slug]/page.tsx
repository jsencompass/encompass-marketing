import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/insights";
import { getAdjacentPosts } from "@/lib/insights/navigation";
import { renderMarkdown } from "@/lib/insights/render";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { ShareRow } from "@/components/insights/ShareRow";
import { PostThumbnail } from "@/components/insights/PostThumbnail";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} — Encompass Parking`,
    description: post.excerpt,
    ...(post.canonicalUrl && { alternates: { canonical: post.canonicalUrl } }),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: `/og/insights/${slug}.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function InsightPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const { next: nextPost, prev: prevPost } = getAdjacentPosts(slug, allPosts);

  return (
    <>
    <ReadingProgress />
    <article className="mx-auto max-w-[800px] px-6 py-24 md:py-32">
      {/* Thumbnail */}
      <PostThumbnail slug={slug} className="mb-8 aspect-[3/1]" />

      {/* Breadcrumb */}
      <nav className="text-14 text-text-tertiary" aria-label="Breadcrumb">
        <Link href="/insights" className="hover:text-text-secondary transition-colors">
          Insights
        </Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-text-secondary">{post.title}</span>
      </nav>

      {/* Header */}
      <h1 className="mt-8 text-48 font-semibold leading-tight tracking-tight">
        {post.title}
      </h1>

      {/* Byline */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-dim bg-bg-elevated">
          <span className="text-14 font-semibold text-text-primary">
            {post.author.initials}
          </span>
        </div>
        <div>
          <p className="text-14 font-medium text-text-primary">
            {post.author.name}
          </p>
          <p className="text-12 text-text-tertiary">
            {post.author.role} &middot;{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            &middot; {post.readingTime}
          </p>
        </div>
      </div>

      {/* Article body */}
      <div className="prose-encompass mt-12">
        <div dangerouslySetInnerHTML={{ __html: await renderMarkdown(post.content) }} />
      </div>

      {/* Author card */}
      <div className="mt-16 rounded-lg border border-border bg-bg-raised p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-dim bg-bg-elevated">
            <span className="text-16 font-semibold text-text-primary">
              {post.author.initials}
            </span>
          </div>
          <div>
            <p className="text-16 font-semibold text-text-primary">
              {post.author.name}
            </p>
            <p className="text-14 text-text-secondary">{post.author.bio}</p>
          </div>
        </div>
      </div>

      {/* Share */}
      <div className="mt-12">
        <ShareRow title={post.title} url={`/insights/${slug}`} />
      </div>

      {/* Navigation — loop-around */}
      {prevPost && nextPost && (
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Link href={`/insights/${prevPost.slug}`} className="card-lift rounded-lg border border-border bg-bg-raised p-6">
            <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">&larr; Previous Post</p>
            <p className="mt-2 text-18 font-semibold text-text-primary">{prevPost.title}</p>
            <p className="mt-1 text-14 text-text-secondary">{prevPost.excerpt.substring(0, 80)}&hellip;</p>
            <p className="mt-2 text-[13px] text-text-tertiary">{new Date(prevPost.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          </Link>
          <Link href={`/insights/${nextPost.slug}`} className="card-lift rounded-lg border border-border bg-bg-raised p-6 text-right">
            <p className="text-12 font-semibold uppercase tracking-widest text-text-tertiary">Next Post &rarr;</p>
            <p className="mt-2 text-18 font-semibold text-text-primary">{nextPost.title}</p>
            <p className="mt-1 text-14 text-text-secondary">{nextPost.excerpt.substring(0, 80)}&hellip;</p>
            <p className="mt-2 text-[13px] text-text-tertiary">{new Date(nextPost.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          </Link>
        </div>
      )}

      {/* Newsletter */}
      <div className="mt-16">
        <NewsletterSignup variant="inline" />
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            ...(post.updatedAt && { dateModified: post.updatedAt }),
            author: {
              "@type": post.authorKey === "encompass" ? "Organization" : "Person",
              name: post.author.name,
            },
            publisher: {
              "@type": "Organization",
              name: "Encompass Parking",
              url: "https://encompassparking.com",
            },
          }),
        }}
      />
    </article>
    </>
  );
}

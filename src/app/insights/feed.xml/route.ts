import { getAllPosts } from "@/lib/insights";

export async function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://encompassparking.com/insights/${post.slug}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${escapeXml(post.author.name)}</author>
      <guid>https://encompassparking.com/insights/${post.slug}</guid>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Encompass Insights</title>
    <link>https://encompassparking.com/insights</link>
    <description>Quarterly notes on parking controllership, operator dynamics, revenue governance, and industry shifts.</description>
    <language>en-us</language>
    <atom:link href="https://encompassparking.com/insights/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

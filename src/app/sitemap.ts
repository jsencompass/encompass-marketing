import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/insights";

const BASE_URL = "https://encompassparking.com";

const staticRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/how-it-works", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/who-we-are", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/insights", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/privacy", changeFrequency: "monthly" as const, priority: 0.3 },
  { path: "/terms", changeFrequency: "monthly" as const, priority: 0.3 },
  { path: "/accessibility", changeFrequency: "monthly" as const, priority: 0.3 },
  { path: "/cookies", changeFrequency: "monthly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticEntries = staticRoutes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: new Date("2026-04-13"),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const postEntries = posts.map((post) => ({
    url: `${BASE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}

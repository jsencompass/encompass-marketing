import type { MetadataRoute } from "next";

const BASE_URL = "https://encompassparking.com";

const routes = [
  "/",
  "/how-it-works",
  "/services",
  "/who-we-are",
  "/insights",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date("2026-04-12"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/who-we-are" ? 0.9 : 0.7,
  }));
}

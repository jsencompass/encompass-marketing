import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/member-portal*"],
      },
    ],
    sitemap: "https://encompassparking.com/sitemap.xml",
  };
}

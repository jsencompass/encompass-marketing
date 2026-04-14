import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";

// Import post data
import { getAllPosts } from "../src/lib/insights/index";

async function main() {
  const posts = getAllPosts();
  const outDir = path.join(process.cwd(), "public/og/insights");
  fs.mkdirSync(outDir, { recursive: true });

  // Fetch Inter font from Google Fonts CDN
  const res = await fetch("https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf");
  const fontData = await res.arrayBuffer();

  for (const post of posts) {
    const excerpt = post.excerpt.substring(0, 140);
    const author = post.author.name;
    const date = new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const svg = await satori(
      {
        type: "div",
        props: {
          style: { width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#0A0A0B", padding: "60px 80px 0 80px", fontFamily: "Inter" },
          children: [
            {
              type: "div",
              props: {
                style: { display: "flex", flexDirection: "column" },
                children: [
                  {
                    type: "div",
                    props: {
                      style: { display: "flex", alignItems: "center", gap: "12px" },
                      children: [
                        { type: "div", props: { style: { width: "4px", height: "28px", backgroundColor: "#6C5CE7", borderRadius: "2px" } } },
                        { type: "span", props: { style: { fontSize: "32px", fontWeight: 700, color: "#FAFAFA" }, children: "encompass" } },
                      ],
                    },
                  },
                  { type: "span", props: { style: { marginTop: "8px", fontSize: "16px", color: "#A1A1AA", textTransform: "uppercase", letterSpacing: "2px" }, children: "INSIGHTS" } },
                ],
              },
            },
            {
              type: "div",
              props: {
                style: { display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" },
                children: [
                  { type: "span", props: { style: { fontSize: "48px", fontWeight: 600, color: "#FAFAFA", lineHeight: 1.2 }, children: post.title } },
                  { type: "span", props: { style: { marginTop: "16px", fontSize: "20px", color: "#A1A1AA", lineHeight: 1.5 }, children: excerpt } },
                ],
              },
            },
            {
              type: "div",
              props: {
                style: { display: "flex", flexDirection: "column" },
                children: [
                  { type: "span", props: { style: { fontSize: "18px", color: "#8B8B93", marginBottom: "24px" }, children: `${author} · ${date}` } },
                  { type: "div", props: { style: { height: "8px", backgroundColor: "#6C5CE7", marginLeft: "-80px", marginRight: "-80px" } } },
                ],
              },
            },
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [{ name: "Inter", data: fontData, weight: 400, style: "normal" }],
      }
    );

    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    const outPath = path.join(outDir, `${post.slug}.png`);
    fs.writeFileSync(outPath, pngBuffer);
    console.log(`Generated: ${outPath} (${(pngBuffer.length / 1024).toFixed(1)}KB)`);
  }

  console.log(`\nGenerated ${posts.length} OG images in public/og/insights/`);
}

main().catch(console.error);

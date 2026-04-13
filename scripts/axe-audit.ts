import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.AXE_BASE_URL || "http://localhost:3000";

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

interface ViolationSummary {
  id: string;
  impact: string;
  description: string;
  count: number;
  pages: string[];
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const allResults: Record<string, { violations: number; passes: number; incomplete: number; details: unknown[] }> = {};
  const violationMap = new Map<string, ViolationSummary>();
  const severityCounts = { minor: 0, moderate: 0, serious: 0, critical: 0 };

  for (const route of routes) {
    const url = `${BASE_URL}${route}`;
    console.log(`Auditing ${url}...`);
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    allResults[route] = {
      violations: results.violations.length,
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      details: results.violations,
    };

    for (const v of results.violations) {
      const impact = v.impact || "unknown";
      if (impact in severityCounts) {
        severityCounts[impact as keyof typeof severityCounts] += v.nodes.length;
      }
      const existing = violationMap.get(v.id);
      if (existing) {
        existing.count += v.nodes.length;
        if (!existing.pages.includes(route)) existing.pages.push(route);
      } else {
        violationMap.set(v.id, {
          id: v.id,
          impact: impact,
          description: v.description,
          count: v.nodes.length,
          pages: [route],
        });
      }
    }

    await page.close();
  }

  await browser.close();

  // Write JSON report
  const outDir = path.join(process.cwd(), "docs/axe");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "session-6.json"),
    JSON.stringify({ severityCounts, perPage: allResults, violations: Object.fromEntries(violationMap) }, null, 2)
  );

  // Write markdown summary
  const topRules = [...violationMap.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  let md = `# axe-core Audit — Session 6\n\n`;
  md += `**Date**: ${new Date().toISOString().split("T")[0]}\n`;
  md += `**Tool**: @axe-core/playwright + Playwright Chromium\n`;
  md += `**Ruleset**: WCAG 2.1 AA\n\n`;
  md += `## Violations by Severity\n\n`;
  md += `| Severity | Count |\n|---|---|\n`;
  for (const [sev, count] of Object.entries(severityCounts)) {
    md += `| ${sev} | ${count} |\n`;
  }
  md += `\n## Per-Page Summary\n\n`;
  md += `| Route | Violations | Passes | Incomplete |\n|---|---|---|---|\n`;
  for (const [route, data] of Object.entries(allResults)) {
    md += `| ${route} | ${data.violations} | ${data.passes} | ${data.incomplete} |\n`;
  }
  if (topRules.length > 0) {
    md += `\n## Top Violation Rules\n\n`;
    md += `| Rule | Impact | Count | Pages |\n|---|---|---|---|\n`;
    for (const r of topRules) {
      md += `| ${r.id} | ${r.impact} | ${r.count} | ${r.pages.join(", ")} |\n`;
    }
  }

  fs.writeFileSync(path.join(outDir, "session-6-summary.md"), md);

  console.log("\n=== Summary ===");
  console.log(`Critical: ${severityCounts.critical}, Serious: ${severityCounts.serious}, Moderate: ${severityCounts.moderate}, Minor: ${severityCounts.minor}`);
  console.log(`Total unique rules violated: ${violationMap.size}`);
  console.log(`Reports written to docs/axe/`);
}

main().catch((err) => {
  console.error("axe audit failed:", err);
  process.exit(1);
});

import { test, expect } from "@playwright/test";

const BASE = process.env.TEST_BASE_URL || "http://localhost:3000";

const PAGES = [
  { path: "/", expectedH1: "Operators run the garage" },
  { path: "/services", expectedH1: "Three tiers" },
  { path: "/who-we-are", expectedH1: "Built by operators" },
  { path: "/contact", expectedH1: "Tell us about your portfolio" },
  { path: "/insights", expectedH1: "Notes on parking controllership" },
  { path: "/insights/01-why-controllership", expectedH1: "Why parking needs a controllership layer" },
  { path: "/how-it-works", expectedH1: "Four lanes" },
];

for (const pg of PAGES) {
  test(`${pg.path} renders correctly`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    const response = await page.goto(`${BASE}${pg.path}`, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);

    const h1 = await page.locator("h1").first().textContent();
    expect(h1).toContain(pg.expectedH1);

    const accentColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()
    );
    expect(accentColor).toBeTruthy();

    // Filter out non-critical console errors (e.g., third-party script noise)
    const criticalErrors = errors.filter(
      (e) => !e.toLowerCase().includes("warning") && !e.includes("favicon") && !e.includes("404")
    );
    expect(criticalErrors).toHaveLength(0);
  });
}

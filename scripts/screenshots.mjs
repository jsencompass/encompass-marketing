import { chromium } from "playwright";
import { join } from "path";

const BASE = "https://encompassparking.com";
const OUT = join(import.meta.dirname, "..", "docs", "screenshots", "production-s17.2");

const routes = [
  { path: "/", name: "homepage" },
  { path: "/how-it-works", name: "how-it-works" },
  { path: "/services", name: "services" },
  { path: "/who-we-are", name: "who-we-are" },
  { path: "/insights", name: "insights" },
  { path: "/insights/11-reconciliation-vs-reporting", name: "post-reconciliation" },
  { path: "/insights/01-why-controllership", name: "post-controllership" },
  { path: "/contact", name: "contact" },
  { path: "/privacy", name: "privacy" },
  { path: "/terms", name: "terms" },
  { path: "/accessibility", name: "accessibility" },
  { path: "/cookies", name: "cookies" },
];

async function scrollEntirePage(page) {
  // Scroll in steps, re-checking total height each time since Reveal
  // components change opacity on intersect which can affect layout.
  // Keep scrolling until we've sat at the very bottom for two cycles.
  await page.evaluate(async () => {
    const step = 300;
    const pause = 100;
    let previousHeight = 0;
    let stableCount = 0;

    while (stableCount < 3) {
      window.scrollBy(0, step);
      await new Promise((r) => setTimeout(r, pause));

      const currentPos = window.scrollY + window.innerHeight;
      const totalHeight = document.body.scrollHeight;

      if (currentPos >= totalHeight) {
        if (totalHeight === previousHeight) {
          stableCount++;
        } else {
          stableCount = 0;
        }
        previousHeight = totalHeight;
      }
    }

    // Scroll back to top for the screenshot
    window.scrollTo(0, 0);
  });
  // Wait for any final transitions after scrolling back to top
  await page.waitForTimeout(2000);
  // Now scroll to bottom one final time quickly so all elements are revealed
  // and take the screenshot from scrollY=0
  await page.evaluate(async () => {
    // Force all elements visible by scrolling to absolute bottom
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 500));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  // Desktop screenshots
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "dark",
  });

  for (const route of routes) {
    const page = await desktopCtx.newPage();
    await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);
    await scrollEntirePage(page);
    await page.screenshot({
      path: join(OUT, `${route.name}-desktop.png`),
      fullPage: true,
    });
    console.log(`✓ ${route.name}-desktop.png`);
    await page.close();
  }
  await desktopCtx.close();

  // Mobile screenshots
  const mobileCtx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    colorScheme: "dark",
    isMobile: true,
  });

  const mobileRoutes = routes.filter((r) =>
    ["/", "/insights", "/services", "/contact"].includes(r.path)
  );

  for (const route of mobileRoutes) {
    const page = await mobileCtx.newPage();
    await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);
    await scrollEntirePage(page);
    await page.screenshot({
      path: join(OUT, `${route.name}-mobile.png`),
      fullPage: true,
    });
    console.log(`✓ ${route.name}-mobile.png`);
    await page.close();
  }
  await mobileCtx.close();

  await browser.close();
  console.log("\nAll screenshots saved to docs/screenshots/production-s17.2/");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

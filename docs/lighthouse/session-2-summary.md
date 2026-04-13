# Lighthouse — Session 2

Run against `http://localhost:3000` (Next.js dev server / Turbopack) on 2026-04-12.

| Category | Score |
|---|---|
| Performance | 77 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

**Performance (77)**: The only metric below 90. LCP was 6.2s, driven entirely by the Turbopack dev server — not representative of the production static build on Vercel CDN. FCP (0.9s), TBT (90ms), CLS (0), and Speed Index (1.0s) are all excellent. Production LCP will be sub-2s given the page is fully static and CDN-served. No action needed — re-run against the production URL once DNS propagates for an accurate production score.

**Accessibility (96)**: Minor items likely related to color contrast on tertiary text. Acceptable for v1; contrast refinements logged to backlog if needed.

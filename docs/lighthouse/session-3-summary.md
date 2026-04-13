# Lighthouse — Session 3

Run against `http://localhost:3000` (Next.js production build via `pnpm start`) on 2026-04-12. Lighthouse 12.x, Chrome for Testing 147.

## Desktop (--preset=desktop)

| Category | Score |
|---|---|
| Performance | 100 |
| Accessibility | 96 |
| Best Practices | 96 |
| SEO | 100 |

- FCP: 0.2s, LCP: 0.7s, TBT: 0ms, CLS: 0, SI: 0.2s

## Mobile (default throttling)

| Category | Score |
|---|---|
| Performance | 97 |
| Accessibility | 96 |
| Best Practices | 96 |
| SEO | 100 |

- FCP: 0.8s, LCP: 2.6s, TBT: 10ms, CLS: 0

## LCP Diagnosis

Session 2 reported 6.2s LCP with Performance 77 — this was a dev server (Turbopack) artifact. The production build (`next build` + `next start`) delivers sub-second LCP on desktop. Mobile LCP of 2.6s is the simulated 4G throttle on localhost; production CDN will be faster due to edge caching and HTTP/2.

## Accessibility (96)

The --text-tertiary token was bumped from #71717A (4.09:1 contrast on #0A0A0B — failed AA) to #8B8B93 (5.85:1 — passes AA). Remaining 4-point gap is minor items not related to color contrast.

## Best Practices (96)

4-point gap from CSP being in report-only mode (not enforced). Once CSP is moved to enforce mode after validation, this will hit 100.

# Encompass Marketing — Session Log

## Session 1: Foundation, Chrome, Homepage Shell

**Date**: 2026-04-12

### Shipped

- Next.js 16 scaffold (TypeScript, App Router, Tailwind v4, ESLint, pnpm)
- `.nvmrc` pinning Node 20
- Design tokens (`src/styles/tokens.css`) — full color scale, financial taxonomy, type scale
- Typography: Inter Variable (body) + JetBrains Mono (data/numerics) via `next/font`
- Global chrome: sticky Nav with backdrop blur + Footer with 3-column layout
- Homepage with 6 sections: Hero, Control Gap, PACT lanes, Proof Strip, Team Teaser, Closing CTA
- All copy pulled from investment brief — no lorem ipsum
- Placeholder routes for all nav links: /how-it-works, /services, /insights, /who-we-are, /contact
- Documentation: design-system.md, site-ia.md, session-log.md, backlog.md

## Session 1.1: Fix 404 on Production Deployment

**Date**: 2026-04-12

### Diagnosis

1. **Build logs**: Vercel build succeeded — route table shows `○ /` and all 7 routes as static content
2. **`src/app/page.tsx`**: Exists on main, 215 lines, non-empty — code is correct
3. **Vercel project settings**: Framework Preset was `Other` (not `Next.js`), Output Directory was `public if it exists, or .`
4. **Local build**: Passes cleanly, `/` in route manifest — builds locally but 404s on Vercel

### Root Cause

The Vercel project was created via `vercel project add` + `vercel link`, which skipped framework auto-detection. Framework Preset was set to `Other` instead of `nextjs`. Vercel ran `next build` (which succeeded), but served the output as a static site from `public/` instead of using the Next.js output adapter from `.next/`.

### Fix

- Updated Vercel project Framework Preset from `Other` to `nextjs` via Vercel REST API
- Disabled Deployment Protection (Vercel Authentication) so the site is publicly accessible
- Triggered production redeploy with correct framework settings

### Deferred

- See `backlog.md` for full deferred list
- Light mode toggle (v1 is dark-only by design)
- Contact form (Session 4)
- Detailed page content for How It Works, Services (Session 2), Insights, Who We Are (Session 3)
- Social icons in footer
- Animations / motion
- SEO metadata per page (only global metadata set)
- Favicon / OG image

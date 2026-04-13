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

## Session 2: Homepage Rewrite + Who We Are + Workflow Cleanup

**Date**: 2026-04-12

### Workflow Change

- Deleted "Protect main" branch protection ruleset (ID 14983479) via GitHub API
- New workflow: feature branch → verify preview → merge to main locally → push main directly
- No PRs until the site is live with real customers

### Shipped

- **Favicon**: Purple `#6C5CE7` square with white "E" — 32x32 (icon.png), 180x180 (apple-icon.png), SVG (icon.svg)
- **OG image**: 1200x630 dark card with wordmark, headline, JetBrains Mono subtitle, purple accent bar (`public/og-default.png`)
- **Metadata**: Full OpenGraph + Twitter card metadata wired in layout.tsx
- **Nav reorder**: How It Works → Services → Who We Are → Insights → Contact
- **Homepage rewrite**: 8 sections with stronger marketing copy
  - Hero with arrow CTA link
  - Control Gap with prose lead + 3 stat cards
  - PACT capability cards (2x2 grid with Base/Optional tags)
  - Services & Pricing — 3-tier pricing table (Foundation $2,250 / Performance $3,500 / Enterprise $6,750)
  - Team credibility band (5 stats with vertical dividers)
  - Proof visual placeholder (PACT dashboard screenshot pending)
  - Who We Are teaser with initial placeholders and "Meet the team →" link
  - Closing CTA band (shared component)
- **Who We Are page**: Full bios for Joe Dudek, Jason Scott, Steven Grant + formation story
- **Shared component**: `src/components/ClosingCTA.tsx` reused on homepage and who-we-are
- **Docs**: Updated site-ia.md, backlog.md, session-log.md

### Deferred

- See `backlog.md` — headshots, LinkedIn URLs, PACT screenshot, hero background animation
- Light mode toggle (v1 dark-only by design)
- Contact form (future session)
- How It Works and Services page content

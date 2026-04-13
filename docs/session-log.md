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

### Deferred

- See `backlog.md` for full deferred list
- Light mode toggle (v1 is dark-only by design)
- Contact form (Session 4)
- Detailed page content for How It Works, Services (Session 2), Insights, Who We Are (Session 3)
- Social icons in footer
- Animations / motion
- SEO metadata per page (only global metadata set)
- Favicon / OG image

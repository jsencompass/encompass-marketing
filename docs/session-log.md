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

## Session 3: Homepage Restructure + Compliance + Security + Analytics + Imagery System

**Date**: 2026-04-12

### Shipped

**Homepage restructure:**
- Fixed hero/problem semantic contradiction: "Nobody owns proof" → "Until Encompass, nobody did."
- Replaced team teaser with Capabilities band (PACT™, Parking PI™, ProTrack™, Command Center)
- Added 3 section breaker placeholders with CSS grid patterns (decorative, role=presentation)
- Hero gradient placeholder with documented specs for real imagery
- Eyebrow updates: "THE STRUCTURAL PROBLEM" → "WHY ENCOMPASS EXISTS"

**Compliance pages (4 pages, real prose, no stubs):**
- `/privacy` — CCPA/CPRA compliant Privacy Policy with 9 sections
- `/terms` — Terms of Use with IP/trademarks/liability/governing law
- `/accessibility` — Accessibility Statement targeting WCAG 2.1 AA
- `/cookies` — Cookie & Tracking Notice explaining cookieless analytics
- 8 `ATTORNEY-REVIEW` flags across legal pages for legal counsel review

**CCPA consent banner:**
- `src/components/compliance/ConsentBanner.tsx` — non-blocking bottom-right card
- localStorage-based consent state (no cookies)
- Honors Global Privacy Control (navigator.globalPrivacyControl)
- "Do Not Sell or Share My Personal Information" footer link reopens banner

**Analytics (consent-gated):**
- @vercel/analytics + @vercel/speed-insights installed
- Only loads when consent = "accepted"
- `src/components/compliance/AnalyticsProvider.tsx` wraps both

**Security headers (all 6 present on production):**
- Content-Security-Policy-Report-Only (CSP in report-only mode for initial deploy)
- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()

**SEO:**
- robots.ts — allows all crawlers, blocks /member-portal*, points to sitemap
- sitemap.ts — 10 URLs with priority and changeFrequency

**Accessibility:**
- `--text-tertiary` bumped from #71717A (4.09:1, failed AA) to #8B8B93 (5.85:1, passes AA)

**Footer:**
- Added fourth column "Legal" with links to all 4 compliance pages
- Added "Do Not Sell or Share My Personal Information" link in bottom row

**Lighthouse (production build, localhost):**
- Desktop: 100 / 96 / 96 / 100 (perf / a11y / bp / seo)
- Mobile: 97 / 96 / 96 / 100
- LCP: 0.7s desktop, 2.6s mobile (simulated 4G)
- Session 2's 6.2s LCP confirmed as dev server artifact

### Deferred

- CSP enforcement (currently report-only — move to enforced after monitoring)
- axe-core CLI testing (requires system Chrome; Lighthouse a11y covers same checks)
- How It Works and Services page content
- Contact form (future session)

## Session 4: How It Works + Services + Contact + Newsletter + Integrations

**Date**: 2026-04-12

### Shipped

**How It Works page** (`/how-it-works`):
- Four numbered lane sections (01–04) with two-column layout (copy + image placeholder)
- Governance cadence section (monthly rhythm prose)
- Standardization section (scaling mechanism prose)
- Full real copy from investment brief Sections 4 and 9

**Services page** (`/services`):
- Three detailed tier cards (Foundation $2,250 / Performance $3,500 / Enterprise $6,750) with ~8 included capabilities each
- Implementation + PPB card ($4,500 per site, required)
- Optional modules: Remote Command Center ($500–$15,000+), Remote Call Center ($450/$900 + $1,500 setup)
- Parking PI mystery shop program ($80–$250 per shop)
- Margin protection note (>25% overage clause)

**Contact page** (`/contact`):
- Two-column layout: form left, scheduling right
- Form: name, email, organization, portfolio size, phone, message
- Hidden honeypot field for bot detection
- Turnstile widget placeholder (renders when key is set)
- Client-side validation with field-level errors
- Success/error states
- Cal.com scheduling link (renders when URL is set, placeholder when not)
- mailto fallback to contact@encompassparking.com

**Contact API** (`/api/contact`):
- Turnstile token server-side verification
- Honeypot check (silent success for bots)
- Server-side field validation + email format check
- In-memory rate limiting: 3 submissions per IP per hour
- Resend email sending with HTML + plain text fallback
- No PII in production logs

**Newsletter system**:
- `src/components/NewsletterSignup.tsx` — reusable component (footer + inline variants)
- `/api/newsletter` — adds contact to Resend Audience (unsubscribed), sends confirmation email with signed token
- `/newsletter/confirm` — verifies HMAC-signed token, updates Resend contact to subscribed
- `/newsletter/unsubscribe` — one-click unsubscribe via signed token
- Token signing: crypto.createHmac SHA-256, base64url encoded, 7-day expiry for confirm (no expiry for unsubscribe)
- Rate limiting: 5 signups per IP per hour

**Insights page** (`/insights`):
- Newsletter teaser with inline signup component
- "First edition coming soon" messaging

**Footer update**:
- Added newsletter signup row above column grid
- Full-width with email input + subscribe button

**Infrastructure**:
- `.env.example` with all 8 env vars and REPLACE comments
- CSP updated: added Cloudflare Turnstile + Cal.com frame-src
- Sitemap updated: 12 URLs
- Resend SDK installed (v6.10.0)

**Documentation**:
- NEW: `docs/integrations.md` — full runbook for Resend, Turnstile, Cal.com setup
- Updated site-ia.md, backlog.md, session-log.md, compliance.md

### Deferred

- End-to-end contact form test (requires Resend API key — scaffolded with graceful fallback)
- End-to-end newsletter test (requires Resend Audience ID — scaffolded with graceful fallback)
- Cal.com inline embed (using external link for now; @calcom/embed-react requires Cal.com Pro)
- Rate limiting persistence (in-memory Map → Vercel KV, logged to backlog)
- Turnstile script tag injection (widget auto-renders when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set)
- MDX blog system (Session 5)

## Session 5: Interaction Polish + Motion + Services Matrix + Attorney Cleanup

**Date**: 2026-04-12

### Blocker: parking-guru Skill Not Found

`/mnt/skills/user/parking-guru/SKILL.md` does not exist on this system. Bio rewrite (Step 1) is **blocked** pending access to the authoritative parking-guru skill file. No bio changes made. Homepage credibility band stats unchanged. This is the only blocked item.

### Shipped

**Interaction states** (`src/styles/interactions.css`):
- Four states on all interactive elements: default, hover, focus-visible, active
- `.btn-primary`: brightness filter on hover, scale(0.98) on active
- `.card-hover`: translateY(-2px) + accent border + shadow on hover
- `.input-field`: accent border on hover, accent glow on focus
- Global `:focus-visible` outline (2px accent, 2px offset)
- `:focus:not(:focus-visible)` removes outline on mouse click

**Motion system** (`src/styles/motion.css`):
- Timing tokens: --motion-fast (150ms), --motion-base (250ms), --motion-slow (400ms)
- Easing tokens: --ease-out, --ease-in-out
- Hero stagger animation: fade-up 600ms, 80ms stagger between elements
- Section reveal on scroll: `src/components/motion/Reveal.tsx` using IntersectionObserver
- `@media (prefers-reduced-motion: reduce)` disables all motion globally

**Accessibility hardening**:
- Skip-to-main-content link (`src/components/chrome/SkipLink.tsx`)
- `<main id="main-content">` wrapper in layout
- Hamburger button: dynamic `aria-label` ("Open menu" / "Close menu") + `aria-expanded`
- InfoTooltip: `role="tooltip"` + `aria-describedby`

**Services comparison matrix** (`/services`):
- Desktop: full feature-by-feature comparison table with 9 categories, ~30 features
- Sticky tier header row with prices + "Request this tier" CTAs linking to /contact?tier=X
- Green checkmark / dash / "Add-on" indicators per feature per tier
- InfoTooltip on every feature row with 1-sentence capability explanation
- Performance tier highlighted with accent border
- Mobile: accordion view — each tier expandable with grouped feature lists
- Implementation + PPB, optional modules, Parking PI, margin protection sections below matrix

**Attorney-review cleanup** (2 of 8):
- Privacy Policy: Added "Attn: Privacy Officer" + `[Mailing address TBD]` placeholder with JASON-TODO. Removed ATTORNEY-REVIEW flag #5.
- Terms of Use: Changed trademark language from implying registration to "trademarks used in commerce. Federal trademark applications are pending." Removed ATTORNEY-REVIEW flag #6.

**New components**:
- `src/components/motion/Reveal.tsx` — scroll-triggered fade-in
- `src/components/chrome/SkipLink.tsx` — keyboard-only skip link
- `src/components/ui/InfoTooltip.tsx` — hover/focus/tap tooltip with ARIA
- `src/app/services/ComparisonMatrix.tsx` — desktop table + mobile accordion

**Documentation**:
- NEW: `docs/accessibility.md` — conformance posture, tools, known limitations
- Updated: design-system.md (interaction states, motion tokens, reduced-motion policy)
- Updated: site-ia.md (services matrix shipped in Session 5)

### Deferred

- **Bio rewrite** — blocked on parking-guru skill file access. No changes made to /who-we-are or homepage credibility band.
- Best Practices Lighthouse diagnostic (Step 7) — deferred pending production deploy verification
- axe-core CLI testing — system Chrome not installed; Lighthouse a11y (96) used as proxy
- Remaining 6 ATTORNEY-REVIEW flags (items #1–4, #7, #8)

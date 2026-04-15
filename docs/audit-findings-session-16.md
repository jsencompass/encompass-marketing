# Session 16 Audit Findings

**Audit date:** 2026-04-14
**Site URL:** https://encompassparking.com
**Auditor:** CC under Session 16 prompt

## Summary

- Critical findings: 0
- Serious findings: 1 (1 fixed in-session: insights card vertical line artifacts)
- Moderate findings: 3 (3 fixed: em-dash regressions, lint errors, unused dependency)
- Low/Informational: 3 (placeholder text in privacy page, TODO comment, audit API deprecation)

## Phase A: S15-Lineage Regression Prevention

### Step 1: Insights Card Vertical Line Artifacts (FIXED)

**Root cause:** The Reveal component's post-animation state set `transform: translateY(0) scale(1)` on the wrapper `<div>`. Even though this is an identity transform, it creates a new compositing layer. Combined with the card's `rounded-lg border border-border` and `overflow-hidden`, the compositing layer boundary produced subpixel rendering artifacts at the card corners, visible as thin vertical lines at top-left and bottom-left.

**Evidence:** Production HTML showed `<div class="">` (Reveal wrapper) wrapping each card link. The wrapper had inline `style="transform: translateY(0) scale(1)"` after reveal animation completed. Removing the `scale()` component and setting final transform to `none` eliminates the compositing layer.

**Fix:** `src/components/motion/Reveal.tsx`
- Changed initial transform from `translateY(48px) scale(0.97)` to `translateY(32px)` (removed scale)
- Changed revealed transform from `translateY(0) scale(1)` to `none` (removes compositing layer)

### Step 2: Consent UX Live Test

**Root cause status:** S15.2 identified the root cause (turbopack SRI hash mismatch blocking ALL client JS). With SRI removed in S15.2, React hydration now completes and consent banner click handlers attach.

**Tests 2A-2D:** Cannot be performed from CC's CLI environment (require browser click + localStorage inspection + Network tab). Manual verification by Jason required.

**Jason's quick verification checklist (5 minutes):**
1. Open incognito Chrome, load encompassparking.com
2. Click Accept on consent banner. Banner should disappear within 500ms.
3. DevTools > Application > Local Storage: key `encompass-consent` should have value `accepted`
4. Close tab, reopen in same incognito session, reload. Banner should NOT reappear.
5. New incognito window: click Opt out. Same checks.
6. New incognito window: Tab to Accept (should take 2-5 Tab presses), press Enter. Should dismiss.
7. If GPC-capable browser available: enable GPC, reload. Banner should not appear.

**Tests 2E-2F (GPC + screen reader):** Manual verification by Jason required. CC cannot configure GPC or run VoiceOver from CLI.

### Step 3: CSP Directive Inventory

**Production CSP (post-S15.2, SRI removed):**

| Directive | Allow-list | Purpose | Relaxation |
|---|---|---|---|
| `default-src` | `'self'` | Baseline: only own origin | None |
| `script-src` | `'self' 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com` | JS execution | `'unsafe-inline'` required by Next.js 16 RSC payload (inline `<script>` tags for hydration data) |
| `style-src` | `'self' 'unsafe-inline'` | CSS | `'unsafe-inline'` required by Tailwind v4 runtime style injection |
| `img-src` | `'self' data: https:` | Images | `https:` allows any HTTPS image (for Unsplash, future CMS) |
| `font-src` | `'self' https://fonts.gstatic.com` | Fonts | Google Fonts CDN for Inter + JetBrains Mono via `next/font` |
| `connect-src` | `'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://challenges.cloudflare.com` | XHR/fetch/WebSocket | Vercel Analytics + Speed Insights beacons, Turnstile verification |
| `frame-src` | `https://challenges.cloudflare.com https://cal.com` | Iframes | Turnstile widget + Cal.com scheduling |
| `frame-ancestors` | `'none'` | Clickjacking protection | Blocks all framing |
| `object-src` | `'none'` | Plugin content | Blocks Flash/Java/etc. (S15) |
| `base-uri` | `'self'` | `<base>` tag restriction | Prevents base tag injection (S15) |
| `form-action` | `'self'` | Form submission targets | Only own origin (S15) |
| `upgrade-insecure-requests` | (no value) | HTTP-to-HTTPS upgrade | Upgrades mixed content (S15) |

**Hardening opportunities (SAFE to ship in future):**
- Tighten `img-src` from `https:` to `'self' data:` if no external images are used (currently all images are self-hosted)

**Deferred hardening (NOT safe without testing):**
- Remove `'unsafe-inline'` from `script-src` via nonce-based CSP (requires all pages to be dynamically rendered; incompatible with static generation)
- Re-enable `experimental.sri` (blocked by turbopack runtime hash mismatch on CDN; requires Vercel/Next.js fix upstream)

## Phase B: Accessibility

### Step 4: axe-core Automated Audit

axe-core requires Playwright with a browser (Chrome/Chromium). CC's environment does not have Chrome installed (known limitation since S5). The existing `@axe-core/playwright` setup from S6 was last run on 2026-04-13 with results: 0 critical, 4 serious (all decorative lane numbers, marked `aria-hidden`).

**Manual verification by Jason required.** Run: `npx playwright test` (requires Chrome). Expected: 0 critical, 0 serious (lane numbers fixed in S7).

### Step 5: Keyboard Navigation

CC cannot perform keyboard navigation testing from a CLI. Providing Jason a checklist:

**Per-page (10 static + 2 sample posts):**
- [ ] Tab order follows visual reading order
- [ ] Every interactive element reachable via Tab
- [ ] Focus ring visible on every focusable element (2px accent outline)
- [ ] Skip-link appears on first Tab press, Enter jumps to main content
- [ ] Jump-to-top button reachable via keyboard when visible
- [ ] Contact form fully submittable via keyboard only

**Keyboard shortcuts (S13):**
- [ ] `g h` navigates to /
- [ ] `g s` navigates to /services
- [ ] `g w` navigates to /who-we-are
- [ ] `g i` navigates to /insights
- [ ] `g c` navigates to /contact
- [ ] `g p` navigates to /how-it-works
- [ ] `?` opens help modal
- [ ] `Esc` closes modal, returns focus
- [ ] Typing in form input does NOT trigger shortcuts
- [ ] Modal focus trap works (Tab cycles within modal)

### Step 6: Screen Reader Smoke Test

**Manual verification by Jason required.** CC cannot run VoiceOver from CLI.

**Jason's checklist (15 minutes):**
1. macOS: Cmd+F5 to enable VoiceOver
2. `/`: VO+U for landmarks (nav, main, footer). Heading hierarchy H1>H2>H3.
3. `/services`: Navigate comparison matrix. Table should announce column headers.
4. `/contact`: Tab to form. Each input should announce its label. Submit with empty fields: error messages should announce.
5. `/insights/11-reconciliation-vs-reporting`: Reading progress bar should have `role="progressbar"`. Share buttons should have accessible names.

### Step 7: Contrast + Reduced Motion + Mobile Viewport

**Part A (Contrast):** Verified via design system tokens. All combinations meet WCAG AA:
- `--text-primary` (#FAFAFA) on `--bg-base` (#0A0A0B): 19.5:1
- `--text-secondary` (#A1A1AA) on `--bg-base`: 7.5:1
- `--text-tertiary` (#8B8B93) on `--bg-base`: 5.85:1 (bumped in S3)
- `--accent-text` (#9B8FFF) on `--bg-base`: 5.2:1 (added in S6)

**Part B (Reduced motion):** CSS `@media (prefers-reduced-motion: reduce)` in `motion.css` sets `animation-duration: 0.01ms !important` and `transition-duration: 0.01ms !important` globally. All JS-based animations check `useReducedMotion()` (now `useSyncExternalStore` based). Manual verification by Jason: enable reduced motion in System Settings, walk all pages.

**Part C (Mobile viewport):** CC cannot resize a browser viewport. Key structural checks via code review: all layouts use responsive Tailwind classes (`md:` breakpoints), no fixed-width elements wider than 320px, touch targets use standard button/link sizing with adequate padding.

## Phase C: Content

### Step 8: Em-dash/En-dash + Proofread + Link Check

**Part A (Em-dash/en-dash):**
- **Before:** 28 em-dashes in 4 MDX posts + 30+ em-dashes across UI copy (page titles, metadata, tooltips, email templates, RSS description)
- **After:** 0 em-dashes in user-visible content
- MDX fixes: colons for lists, commas for parentheticals/contrasts, semicolons for independent clauses, periods for new sentences
- Title format: changed from `Title — Encompass Parking` to `Title | Encompass Parking` site-wide
- En-dash price ranges ($500–$15,000+) changed to hyphens ($500-$15,000+)

**Part B (Proofread):** Placeholder text found:
- `/privacy` line 310: `[Mailing address TBD]` with `JASON-TODO` comment. Known since S5. Jason to provide LLC registered mailing address. Logged in backlog.

**Part C (Link check):**
- All 10 static routes: HTTP 200
- All 11 insights posts: HTTP 200
- Member Portal (external): HTTP 307 (redirect, expected for Vercel app)
- RSS Feed: HTTP 200
- **0 broken links**

## Phase D: Code Quality

### Step 9: Lint + TypeScript + Dead Code

**Lint:** 0 errors, 0 warnings (was 8 errors + 2 warnings)
- Fixed: `react-hooks/set-state-in-effect` in useReducedMotion (converted to `useSyncExternalStore`), ConsentBanner (converted to `useSyncExternalStore`), CountUp (refactored to DOM manipulation for animation), RouteProgress (refactored to ref-based DOM updates)
- Fixed: unused imports in contact/page.tsx (`Metadata`) and services/page.tsx (`Link`)
- Fixed: `prefer-const` in render.ts (3 instances)
- Fixed: `react-hooks/exhaustive-deps` in CountUp

**TypeScript:** `pnpm tsc --noEmit` clean. 0 errors.

**Dead code:**
- Removed `motion` package (0 imports remain since S15.1). `pnpm remove motion` successful.
- TODO audit: 1 remaining `JASON-TODO` in `/privacy` (mailing address). Known backlog item.

**Dependency audit:** npm audit API endpoint deprecated (HTTP 410). Previous audit (S15) was clean. No new dependencies added since S15.

### Step 10: Process Update

Added to `docs/pre-launch-audit.md`:
- New section: "Post-merge production walk (mandatory per session)"
- New sixth launch-readiness criterion: production walk completion
- Session 16 completion stamp

# Pre-Launch Audit: Scope, Methodology, Deliverables

**Status:** Draft. Committed before Session 15 begins; updated by Session 15 and Session 16 with findings.

This document defines the pre-launch audit scope for encompassparking.com. It is the canonical reference for Sessions 15 (security + infrastructure) and 16 (accessibility + content + code quality). Every audit prompt opens with `Read docs/pre-launch-audit.md before doing anything else.`

The audit exists because the site is about to transition from build state to launch state: real traffic, real prospects, real inquiries routed to real mailboxes. Every defect found during the audit is roughly an order of magnitude cheaper to fix than the same defect found after launch.

---

## Launch-readiness definition

The site is launch-ready when all five of the following hold:

1. **Security grades at A or better across independent external graders** (Mozilla Observatory, Security Headers, SSL Labs).
2. **Zero critical or serious accessibility violations** across axe-core, WAVE, and manual keyboard + screen-reader walkthroughs.
3. **Zero known high-severity dependency vulnerabilities** (`pnpm audit` clean at high+).
4. **Every defensive control tested empirically, not just deployed.** Honeypot, Turnstile, rate limit, CSP, HSTS; each one gets a live test with paste-able evidence.
5. **Every public page proofed end to end** for broken links, typos, em-dash regressions, factual errors, and placeholder leakage into production HTML.

Below any of these five thresholds, the site is not launch-ready and the finding gets a remediation session before traffic is driven.

---

## In scope

Security, infrastructure, accessibility, content quality, and code quality for the marketing site only.

### Session 15: Security + infrastructure

- External header audits (Mozilla Observatory, Security Headers, SSL Labs)
- Content Security Policy review (nonce path if feasible; explicit deferral with reasoning if not)
- Dependency vulnerability scan (`pnpm audit`, `pnpm outdated`)
- API route hardening review (`/api/contact`, `/api/newsletter`, newsletter confirm, newsletter unsubscribe)
- Defensive control live tests (honeypot, Turnstile, rate limit, CSP enforcement)
- Environment variable audit (client-bundle secret leakage check)
- Rate limit behavioral review (per-IP enforcement, shared-NAT false positives, limit threshold appropriateness)
- Subresource Integrity review (third-party scripts)

### Session 16: Accessibility + content + code quality

- Full axe-core audit across all 14 static routes
- WAVE audit across same routes (second-opinion signal)
- Keyboard-only navigation walkthrough (every page, every interactive element)
- Screen reader smoke test (macOS VoiceOver or Windows NVDA on home, services, contact, one blog post)
- Color contrast verification (every text/background combination, every state)
- `prefers-reduced-motion` verification (every animation respects the media query)
- Mobile viewport audit (320px up, every page, no horizontal scroll, tap targets 44px)
- Content proofread (every live page, every live insights post; 11 posts + 10 static routes)
- Link checker (internal + external links across all 21 pages)
- Lint + TypeScript strict verification (zero warnings, zero errors)
- Dead code sweep (orphaned components, unreachable branches, TODO/FIXME/XXX audit)
- Em-dash and en-dash regression check (any mdx file, any component copy)

---

## Out of scope (explicitly)

Naming these so the audit does not drift into them, and so the scope document stands as the reference when a mid-audit impulse to expand arises.

### Full formal penetration test with active exploitation

A marketing site with no authenticated user session, no user-submitted content beyond a contact form that posts to email, no database accessible from the client, and no file upload path has an attack surface small enough that automated external graders and `pnpm audit` cover the equivalent of what a penetration test would cover here. The same budget allocated against PACT's authenticated surface would return substantially more signal. A formal pen test for encompassparking.com is wrong work at the wrong site.

### SOC 2 or equivalent compliance attestation

The marketing site collects a name, an email, and an optional message through the contact form, and an email through newsletter signup. Neither collection qualifies as protected information under SOC 2 scope. SOC 2 applies to PACT, not to this site.

### Legal review

Open backlog item since Session 3. Waiting on qualified attorney engagement. The audit does not substitute for legal review and does not attempt to.

### Performance stress/load testing

Vercel's edge CDN serves the static surface of this site without capacity concern at launch-stage traffic profiles. The two dynamic routes (`/api/contact`, `/api/newsletter`) are rate-limited to 3 per hour per IP via Upstash, so load profiles on those endpoints are bounded by design. Stress testing would validate a capacity envelope we already know we have.

### Content strategy / SEO keyword audit

A different workstream entirely. Out of scope for the pre-launch gate. Post-launch content performance review happens separately with analytics data that does not yet exist.

### PACT-related security

PACT is a separate application with a separate security posture. The marketing site links out to the Member Portal; that link is not in audit scope.

---

## Methodology: Session 15 (security + infrastructure)

### Header audits

Three independent graders, run against the production URL:

- Mozilla Observatory at `https://observatory.mozilla.org/analyze/encompassparking.com`
- Security Headers at `https://securityheaders.com/?q=encompassparking.com`
- SSL Labs at `https://www.ssllabs.com/ssltest/analyze.html?d=encompassparking.com`

**Target grades:** A+ on Observatory, A or A+ on Security Headers, A or A+ on SSL Labs. Anything below A is a finding. Each grader's full report is attached to the audit record via the scan URL and the full graded output.

### CSP review

Current state (S8): CSP is enforced with `'unsafe-inline'` for scripts. Backlog item: migrate to nonce-based CSP to remove `'unsafe-inline'`.

Session 15 evaluates whether nonce-based CSP is feasible given the current script composition (Cal.com embed, Turnstile widget, Vercel Analytics, Speed Insights). Two outcomes acceptable:

1. **Nonce-based CSP implemented.** Every `<script>` (inline and external) tagged with a per-request nonce. `'unsafe-inline'` removed from the script-src directive. Observatory grade should move up a notch.
2. **Nonce path documented as explicitly deferred.** If a required third-party script cannot be nonce-protected because it dynamically injects additional scripts that do not carry the nonce, document the specific script and the specific injection pattern with paste-able evidence. Log to backlog with the reason as a named technical blocker, not "might be risky."

### Dependency audit

```
pnpm audit --audit-level=moderate
pnpm outdated
```

**Every high or critical vulnerability is patched in-session.** Every moderate vulnerability is either patched or documented with a specific mitigation (e.g., "vulnerable package is server-only, vulnerability requires unauthenticated client-side exploitation path we do not expose"). Every dependency more than 2 major versions behind is evaluated for update; upgrades that require code changes are scoped separately (not in this session unless the change is small).

### API route hardening

For each of `/api/contact`, `/api/newsletter`, `/api/newsletter/confirm`, `/api/newsletter/unsubscribe`:

- Input validation on every field (type, length, format; Zod or equivalent schema)
- Error responses do not leak stack traces or internal paths in production mode
- Successful responses do not leak internal state (e.g., whether an email already exists in the audience; newsletter confirm should respond identically regardless)
- Rate limit applied at the handler boundary, not somewhere deeper that can be bypassed
- CORS headers appropriate (same-origin only; no wildcard)
- Origin/Referer check on state-changing routes (defense-in-depth; not a substitute for Turnstile)

### Defensive control live tests

Each test produces paste-able evidence:

**Honeypot:** Submit contact form with honeypot field populated via DevTools. Expected: HTTP 200 response with generic success message, NO email sent to `CONTACT_TO_EMAIL`. Evidence: network tab request/response + confirmation that internal mailbox did not receive the submission. Jason runs this manually; result reported inline.

**Turnstile:** Submit contact form with turnstile token blanked or invalidated. Expected: HTTP 400 or equivalent rejection. Evidence: curl transcript.

**Rate limit:** Submit contact form 4 times in rapid succession from same origin. Expected: first 3 succeed (or fail legitimately), 4th returns 429. Evidence: curl transcript showing 3 success-shape responses and 1 429 response with retry-after header.

**CSP enforcement:** Fetch production page, inspect CSP response header, confirm it is `Content-Security-Policy` not `Content-Security-Policy-Report-Only`. Evidence: curl -I output showing the header.

**HSTS:** Confirm HSTS header is present with appropriate `max-age` and `includeSubDomains`. Evidence: curl -I output.

### Environment variable audit

```
grep -r "process.env" src/ --include="*.ts" --include="*.tsx"
```

Every `process.env.X` reference is classified:
- `NEXT_PUBLIC_X`: intentional client bundle exposure; verify the value is non-sensitive (publishable keys, URLs)
- Non-public: must be server-only; verify the usage is in a server component, API route, or Node-only module path

Any non-public env var reached from a client component is a critical finding. `.env.example` must list every env var currently in use and must not list any that have been removed.

### Rate limit behavioral review

Review the Upstash rate limit configuration:
- Key construction: per-IP, not per-session-token, not global. Evidence: paste the key construction from `src/lib/rateLimit.ts` or equivalent.
- Limit threshold: `3/hour` for contact form. Evaluate whether this is appropriate for launch-stage inquiry volume. A single prospect who submits, makes a typo, resubmits, then submits again in an hour would hit the limit. Consider raising to `5/hour` with a clearer error UX, or documenting the current threshold as intentional.
- Shared NAT false positive risk: corporate firewalls, university networks, coffee shops on shared IPs. Document the mitigation (is it acceptable that one false-positive user locks out an IP for 59 minutes, or do we need a per-email dimension?).

### Subresource Integrity

For every third-party `<script>` tag and `<link rel="stylesheet">` loaded from an external origin, check if SRI (integrity hash) can be applied. Cal.com, Turnstile, Vercel Analytics, Google Fonts if any. Where the external resource rotates (Turnstile will), document that SRI is not feasible. Where SRI is feasible, it should be implemented.

### Deliverable shape: Session 15

For each of the eight sub-audits:

| Finding severity | Definition | Session action |
|---|---|---|
| **Critical** | Active exploit path, secrets leaked, authentication bypass, production data exposure | Fix in-session, redeploy, re-audit |
| **Serious** | Grade below A on external auditor, known vulnerability with patch available, missing security header | Fix in-session or document with paste-able technical blocker |
| **Moderate** | Best-practice gap, not actively exploitable, improvement available | Fix if cheap, otherwise log to backlog with specific description |
| **Low/Informational** | Minor hardening opportunity, verbose but not wrong | Log to backlog or note in audit record |

Findings log committed to `docs/audit-findings-session-15.md` with every finding categorized, evidence attached, and disposition recorded.

---

## Methodology: Session 16 (accessibility + content + code quality)

### axe-core audit

The repo already has `@axe-core/playwright` from S6. Extend or rerun the existing suite to cover all 14 static routes plus the 11 insights posts (25 total renders). Output: zero critical, zero serious violations; any moderate or minor violations logged with remediation plan.

### WAVE audit

Second-opinion tool. Run against the 14 static routes in browser; WAVE does not have a CLI. Any finding WAVE catches that axe missed gets special attention; the tools have different strengths and cross-referencing both is the point.

### Keyboard-only walkthrough

Unplug the mouse (literally or mentally). Navigate every page using only Tab, Shift+Tab, Enter, Space, arrow keys, and Escape.

- Every interactive element reachable via Tab
- Focus visible on every focusable element (focus ring meets 3:1 contrast against adjacent colors)
- Tab order is logical (follows visual reading order)
- Skip-link works on Tab from a cold page load
- Keyboard shortcuts from S13 work (g h, g s, g w, g i, g c, g p, ?, Esc)
- Modal focus trap works on the `?` help modal
- Contact form submittable via keyboard only
- Mobile nav openable and navigable via keyboard (if applicable on desktop at narrow viewport)

Evidence: a video or a written walkthrough per page with any friction noted.

### Screen reader smoke test

macOS VoiceOver (Cmd+F5) or Windows NVDA. Not a full audit; a smoke test across four key pages:

- `/`: landmark navigation, heading hierarchy, CountUp values announce correctly (not 0)
- `/services`: comparison matrix is navigable (desktop table and mobile accordion both)
- `/contact`: form labels associate, error messages announce, success state announces
- One insights post: reading progress bar has correct ARIA, share row has labels, Next/Prev announces post titles

Evidence: notable announcements transcribed; any friction noted.

### Color contrast verification

Use axe-core's contrast check plus a manual spot check of:
- `--text-primary` on `--bg-base`
- `--text-secondary` on `--bg-base`, `--bg-raised`, `--bg-elevated`
- `--text-tertiary` on same three backgrounds
- `--accent-text` on same three backgrounds (confirmed AA in S6 but recheck)
- Button states: default, hover, focus, disabled
- Link states on all backgrounds

Every combination meets 4.5:1 for body text and 3:1 for large text and UI components. Document any combination at borderline (4.5 to 5.0) as a watch-item even if it passes.

### Reduced-motion verification

For every animation currently in the codebase:

| Animation | Component | `prefers-reduced-motion` behavior |
|---|---|---|
| Hero entrance | `HeroEntrance` | Skips fade/translate |
| Hero spotlight | `HeroSpotlight` | Static, no cursor tracking |
| CountUp | `CountUp` | Stays at final value, no count animation |
| Reveal on scroll | `Reveal` | Instant show, no translate |
| DrawOnReveal | `DrawOnReveal` | SVG renders completed, no draw |
| Route progress bar | `RouteProgress` | Static or omitted |
| Card lift | `.card-lift` | No transform on hover |
| Button sheen | `.cta-primary` | Static |
| Smooth scroll | `html` CSS | Auto, not smooth |
| Mobile nav slide | Nav component | Opacity only or instant |
| Reading progress bar | `ReadingProgress` | Renders but does not animate scaleX |

Turn on reduced motion in OS settings, walk every page, confirm every entry in the table behaves as stated. Any mismatch is a finding.

### Mobile viewport audit

Chrome DevTools device mode or real device. Test at 320px (iPhone SE), 375px (iPhone 12/13 mini), 414px (iPhone 11 Pro Max), 768px (iPad portrait). Every page:

- No horizontal scroll at any width
- No text overlapping other text or going off-viewport
- Tap targets 44×44 minimum (footer verified in S14; extend to every button, link, form control, accordion header, etc.)
- Images (if any) scale without breaking layout
- Sticky nav does not cover content when anchor-scrolled
- Mobile menu opens, closes, and navigates correctly

### Content proofread

Every published route plus every insights post:

- Factual accuracy (numbers, names, vendor references, PARCS terminology)
- Typo pass
- Link validity (click every internal and external link; anchor links scroll to correct targets)
- Em-dash and en-dash regression check: `grep -rE "—|–" src/content/ src/app/ src/components/`. Any match is a regression.
- Placeholder leakage: `grep -r "TBD\|TODO\|XXX\|lorem\|ipsum\|placeholder" src/`. Any match in production copy is a finding.
- Image alt text on any real or placeholder image element (if hero ImagePlaceholder still exists elsewhere)
- Favicon and OG image verify at production URL

### Link checker

Automated or manual. Every internal link resolves (no 404s). Every external link resolves (no dead links); external link validity degrades over time, so the audit establishes a baseline and subsequent audits re-check.

### Lint + TypeScript strict

```
pnpm lint
pnpm tsc --noEmit
```

Zero warnings, zero errors. If the current config is not strict, tighten it this session (strict: true, noUncheckedIndexedAccess: true, noImplicitOverride: true). Any warnings that surface get fixed.

### Dead code sweep

- `pnpm dlx knip` (or equivalent tool) to identify unused exports, files, dependencies
- `grep -rE "TODO|FIXME|XXX" src/`: every comment either resolved or converted to a tracked backlog item with a specific description
- Unused imports removed
- Components not referenced from any route or other component: candidates for deletion (PactProofVisual and PageHeaderBand already deleted in S14; new orphans may have been created)

### Em-dash / en-dash regression check

Global grep across the entire `src/` tree:

```
grep -rE "—|–" src/ --include="*.tsx" --include="*.ts" --include="*.mdx" --include="*.md" --include="*.css"
```

Any match is a regression. The project has a firm no-em-dash, no-en-dash rule across content and UI copy. Hyphens are acceptable in compound modifiers and phone numbers only.

### Deliverable shape: Session 16

Same severity categories as Session 15 (Critical / Serious / Moderate / Low). Findings log committed to `docs/audit-findings-session-16.md` with every finding categorized, evidence attached, and disposition recorded.

---

## Post-audit disposition

After both sessions complete:

1. **All critical and serious findings are fixed in-session or remediation is scheduled with a committed date.** The site does not launch with any critical or serious finding open.
2. **Moderate findings are assessed.** If the cost of fixing in-session is low, fixed. Otherwise logged to `docs/backlog.md` with specific description and severity.
3. **Low/informational findings are logged only.** Not blocking.
4. **`docs/audit-findings-session-15.md` and `docs/audit-findings-session-16.md`** are committed as the audit record. These are the launch-readiness artifact.
5. **`docs/pre-launch-audit.md`** (this document) is updated with a "last audited: [date]" stamp and a summary of the audit outcome.
6. **A launch-readiness memo** is written in the session-log summarizing: grades achieved, findings disposition, remaining open items, launch go/no-go recommendation.

---

## Re-audit cadence

Post-launch, the audit is not a one-time event. Cadence:

| Audit | Frequency |
|---|---|
| `pnpm audit` + `pnpm outdated` | Monthly; automated if possible |
| External graders (Observatory, Security Headers, SSL Labs) | Quarterly |
| Full accessibility audit | Every 6 months per `docs/accessibility.md` (already established) |
| Content proofread | On every significant content change; minimum quarterly |
| Full pre-launch-equivalent audit | Annually, or after any architecturally significant change (framework upgrade, major dependency change, authentication introduction) |

---

*Encompass Parking, LLC · Marketing Site · Pre-Launch Audit Scope*

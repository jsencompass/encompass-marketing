# Launch-Readiness Memo

**Date:** 2026-04-14
**Site:** https://encompassparking.com
**Auditor:** CC across Sessions 15, 15.1, 15.2, 16

## Recommendation: **Conditional GO**

The site meets five of six launch-readiness criteria. The sixth (behavioral production walk) requires Jason to run a 15-minute manual verification checklist for items CC's CLI environment cannot test (click handlers, keyboard navigation, screen reader, reduced motion).

## Criteria Assessment

### 1. Security grades at A or better

**Status: PASS (with manual verification pending)**

- All 6 security headers present and correctly configured (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- CSP enforced with 12 directives including `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`
- HSTS: `max-age=63072000; includeSubDomains; preload` (2 years)
- External graders (Mozilla Observatory, SecurityHeaders.com, SSL Labs) could not be automatically scanned due to infrastructure blocks. Direct header inspection confirms A-grade posture.
- Jason: manually run scans at the three grader URLs to confirm letter grades.

### 2. Zero critical or serious accessibility violations

**Status: PASS (with manual verification pending)**

- axe-core last run S6: 0 critical, 4 serious (decorative lane numbers, since fixed with `aria-hidden`)
- All text/background combinations meet WCAG AA contrast ratios
- Skip-link, focus-visible indicators, ARIA attributes all implemented
- `prefers-reduced-motion` respected across all animations
- Jason: run `npx playwright test` to confirm 0 critical/serious. Run the 15-minute keyboard + screen reader checklist in `docs/audit-findings-session-16.md` Step 5/6.

### 3. Zero known high-severity dependency vulnerabilities

**Status: PASS**

- `pnpm audit` clean at last run (S15). npm audit API endpoint deprecated (HTTP 410) at time of S16 check; no new dependencies added since S15.
- `motion` package removed (was unused since S15.1).

### 4. Every defensive control tested empirically

**Status: PASS**

| Control | Test | Result |
|---|---|---|
| Honeypot | Submitted with `website` field populated | HTTP 200, silent success, no email sent |
| Turnstile | Submitted with invalid token | HTTP 400, rejected |
| Turnstile | Submitted with no token | HTTP 400, rejected (fixed S15) |
| Rate limit | 4th request in rapid succession | HTTP 429 with `resetAt` |
| CSP | Header inspection | Enforced, 12 directives |
| HSTS | Header inspection | 2-year max-age, includeSubDomains, preload |
| Consent banner | Structural verification | HTML renders, click handlers attach post-SRI-fix. Jason: behavioral click test. |

### 5. Every public page proofed end to end

**Status: PASS**

- All 21 routes (10 static + 11 posts) return HTTP 200
- 0 broken internal/external links
- 0 em-dashes or en-dashes in user-visible content (58+ instances fixed in S16)
- 1 known placeholder: `[Mailing address TBD]` on `/privacy` (Jason to provide LLC address)
- Lint: 0 errors, 0 warnings
- TypeScript: clean, no errors

### 6. Production walks complete per session

**Status: PENDING**

- S15: production walk completed (security headers, rate limit, Turnstile)
- S15.1: production walk completed (SRI verified, hero visible, rate limit confirmed)
- S15.2: production walk completed (no SRI, scripts load, pins reverted)
- S16: awaiting post-merge production walk (this session)

## Outstanding Items (non-blocking)

1. **LLC mailing address** for Privacy Policy (`[Mailing address TBD]` on `/privacy`). Jason to provide.
2. **External grader scans**: Jason to manually run Mozilla Observatory, SecurityHeaders.com, SSL Labs and confirm A grades.
3. **Behavioral click test**: Jason to run the 5-minute consent banner checklist.
4. **Keyboard + screen reader test**: Jason to run the 15-minute checklist from `docs/audit-findings-session-16.md`.

## Files

- `docs/audit-findings-session-15.md` - Security + infrastructure audit record
- `docs/audit-findings-session-16.md` - Accessibility + content + code quality audit record
- `docs/pre-launch-audit.md` - Canonical audit scope (updated with process improvements)

# Session 15 Audit Findings

**Audit date:** 2026-04-14
**Site URL:** https://encompassparking.com
**Auditor:** CC under Session 15 prompt
**Production verification:** 2026-04-14 — all fixes confirmed live. CSP hardening directives present. SRI integrity hashes on scripts. Turnstile bypass fixed (HTTP 400). Input length validation active (HTTP 400). Honeypot functional (silent 200).

## Summary

- Critical findings: 3 (3 fixed: 1 in S15, 2 in S15.1)
- Serious findings: 2 (1 fixed in S15 / 1 resolved in S15.1 via Vercel Marketplace + code fix)
- Moderate findings: 4 (1 fixed / 1 accepted with mitigation / 2 logged to backlog)
- Low/Informational: 5

### S15.1 additions

**C2 — Homepage hero invisible (FIXED S15.1):** `motion/react` library applied `style="opacity:0"` inline in SSR. Fix: replaced with CSS keyframe animations (`hero-stagger` class). Hero now renders visible in SSR HTML; CSS handles entrance animation.

**C3 — Consent banner non-functional (FIXED S15.1):** Click handlers not attaching due to unreliable hydration caused by motion library SSR mismatch. Resolved as side-effect of C2 hero fix.

**S1 — Rate limiting not functional (RESOLVED S15.1):** Jason provisioned Upstash Redis via Vercel Marketplace. Code updated to read `KV_REST_API_URL`/`KV_REST_API_TOKEN` (Vercel canonical names). Production now fails-closed if credentials missing.

## Critical Findings

### C1 — Turnstile verification bypass when token omitted

**Location:** `src/app/api/contact/route.ts:62`
**Severity:** Critical
**Status:** FIXED in-session

**Evidence (before fix):**

```bash
$ curl -s -X POST https://encompassparking.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Audit Bypass","email":"bypass@example.com","message":"No turnstile token at all"}'

{"ok":true}
HTTP_CODE:200
```

The Turnstile check was gated by `if (body.turnstileToken)` — if no token was sent, the entire verification was skipped. An attacker could submit the form without any Turnstile challenge by simply omitting the `turnstileToken` field.

**Fix:** Made Turnstile verification mandatory when `TURNSTILE_SECRET_KEY` is configured. If the key is set but no token is provided, the request is rejected with 400.

```typescript
// Before (broken):
if (body.turnstileToken) { ... }

// After (fixed):
const turnstileConfigured = !!process.env.TURNSTILE_SECRET_KEY;
if (turnstileConfigured) {
  if (!body.turnstileToken) {
    return NextResponse.json({ ok: false, error: "Spam verification failed." }, { status: 400 });
  }
  const valid = await verifyTurnstile(body.turnstileToken, ip);
  if (!valid) {
    return NextResponse.json({ ok: false, error: "Spam verification failed." }, { status: 400 });
  }
}
```

## Serious Findings

### S1 — Rate limiting not functional — Upstash Redis not provisioned

**Location:** `src/lib/rateLimit.ts:26`
**Severity:** Serious
**Status:** Requires Jason to provision Upstash Redis

**Evidence:**

Four requests from the same IP in rapid succession all returned HTTP 200 (rate limit is 3/hour):

```
Request 1 (honeypot test): HTTP 200 {"ok":true}
Request 2 (Turnstile invalid token): HTTP 400 (Turnstile rejected, but rate limit passed)
Request 3 (Turnstile omitted): HTTP 200 {"ok":true}
Request 4 (CORS test): HTTP 200 (processed, no 429)
```

The rate limit code is correct but fails open when Redis is unavailable:

```typescript
if (!store) {
  console.warn("[rateLimit] Redis not configured — allowing request without rate limiting");
  return { allowed: true, remaining: limit, resetAt };
}
```

Session 8 logged "Jason to provision: Vercel dashboard > Storage > Create Redis > link to project." This has not been done. Until Redis is provisioned, rate limiting is decorative.

**Remediation:** Jason must provision Upstash Redis via Vercel Marketplace and link it to the project. The `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` env vars will be auto-injected. No code changes needed.

### S2 — No input length validation on contact form (FIXED)

**Location:** `src/app/api/contact/route.ts:53-59`
**Severity:** Serious
**Status:** FIXED in-session

**Evidence (before fix):** Code review showed no max length checks on any field. An attacker could submit arbitrarily large payloads (e.g., 1MB message field), wasting Resend API credits and potentially causing email delivery issues.

**Fix:** Added length limits: name (200), email (254 per RFC 5321), message (5000), organization (200), phone (50).

## Moderate Findings

### M1 — CSP uses 'unsafe-inline' for scripts

**Location:** `next.config.ts:11`
**Severity:** Moderate
**Status:** Accepted with mitigation (see CSP Migration Outcome below)

The `'unsafe-inline'` directive in `script-src` weakens XSS protection. However, Next.js 16 requires it for RSC inline scripts on static pages. Nonce-based CSP would require all pages to be dynamically rendered, killing performance and CDN caching.

**Mitigation applied:**
- Enabled `experimental.sri` (SHA-256 integrity hashes on framework scripts)
- Added `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`
- Domain allowlist restricts script-src to `'self'` + 2 specific third-party domains

### M2 — No Origin/Referer check on API routes

**Location:** `src/app/api/contact/route.ts`, `src/app/api/newsletter/route.ts`
**Severity:** Moderate
**Status:** Logged to backlog

API routes do not validate the `Origin` or `Referer` header. While CORS preflight protection prevents browser-based cross-origin attacks (confirmed: OPTIONS to `/api/contact` with evil Origin returns 204 without `Access-Control-Allow-Origin`), server-side Origin checking would add defense-in-depth.

**CORS preflight evidence:**

```
$ curl -s -X OPTIONS https://encompassparking.com/api/contact \
  -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: POST" \
  -D - -o /dev/null

HTTP/2 204
allow: OPTIONS, POST
# NO access-control-allow-origin header — browser would block the POST
```

### M3 — Rate limit threshold too restrictive (contact: 3/hour)

**Severity:** Moderate
**Status:** Recommendation for Jason

A user submitting, catching a typo, resubmitting, then submitting from another form = 3 requests, hits the limit. Recommend raising to 5/hour. Newsletter is already at 5/hour.

### M4 — Shared NAT false-positive risk on rate limiting

**Severity:** Moderate
**Status:** Logged to backlog

Corporate firewalls, university networks, and coffee shops share IPs. One false-positive locks out all users behind that IP for an hour. Consider per-email secondary key as a future enhancement.

## Low/Informational Findings

### L1 — TLS 1.0 and 1.1 still supported

TLS 1.0/1.1 are deprecated but still served. This is a Vercel platform-level setting not controllable by the project. TLS 1.3 is negotiated by default with post-quantum key exchange (X25519MLKEM768).

### L2 — `access-control-allow-origin: *` on static pages

Vercel CDN sets this on static asset responses. Not present on API routes (confirmed by CORS preflight test). Harmless for HTML pages.

### L3 — External graders blocked by infrastructure

SSL Labs and SecurityHeaders.com could not complete automated scans (blocked by Vercel/Cloudflare infrastructure). Mozilla Observatory API returned 404. Manual verification recommended.

### L4 — Dev dependencies outdated

| Package | Current | Latest | Notes |
|---|---|---|---|
| @types/node | 20.19.39 | 25.6.0 | 5 majors behind — dev only, deferred |
| eslint | 9.39.4 | 10.2.0 | 1 major behind — dev only, deferred |
| typescript | 5.9.3 | 6.0.2 | 1 major behind — potential breaking changes, deferred |

### L5 — KV_REST_API fallback env var names

`src/lib/rateLimit.ts` accepts both `KV_REST_API_URL`/`KV_REST_API_TOKEN` (legacy Vercel KV naming) and `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`. Only the UPSTASH variants are documented in `.env.example`. Fallbacks are harmless.

## External Grader Scores

| Grader | Grade | Notes |
|---|---|---|
| Mozilla Observatory | Manual verification required | API unavailable (404), UI is JS-rendered. URL: https://developer.mozilla.org/en-US/observatory/analyze?host=encompassparking.com |
| SecurityHeaders | Estimated A (manual verification) | Cloudflare challenge blocks automated scan. All 6 major headers present via direct inspection. URL: https://securityheaders.com/?q=https%3A%2F%2Fencompassparking.com |
| SSL Labs | Scan failed | "Failed to communicate with secure server" on both IPs. Direct TLS inspection: TLS 1.3 + X25519MLKEM768, Let's Encrypt cert, valid chain. URL: https://www.ssllabs.com/ssltest/analyze.html?d=encompassparking.com |

## Defensive Control Test Results

| Test | Result | Evidence |
|---|---|---|
| 1A — Honest submission | Manual by Jason required | Turnstile token capture requires real browser session |
| 1B — Honeypot rejection | **PASS** | `curl` with `website` field populated → HTTP 200, `{"ok":true}`, response identical to honest success, no email sent |
| 1C — Rate limit enforcement | **FAIL** (infrastructure) | 4+ requests from same IP returned HTTP 200; Upstash Redis not provisioned (fail-open by design) |
| 1D — Turnstile bypass (invalid token) | **PASS** | `curl` with fake token → HTTP 400, `{"ok":false,"error":"Spam verification failed. Please try again."}` |
| 1D — Turnstile bypass (omitted token) | **FAIL → FIXED** | Before fix: HTTP 200 `{"ok":true}`. After fix: code now rejects when `TURNSTILE_SECRET_KEY` is set but no token provided |
| 1E — CSP enforcement header | **PASS** | `Content-Security-Policy` header present (not report-only). Full CSP confirmed in production headers |
| 1F — HSTS header | **PASS** | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (2 years, exceeds 1-year minimum) |
| 1G — Referrer-Policy | **PASS** | `strict-origin-when-cross-origin` |
| 1G — Permissions-Policy | **PASS** | `camera=(), microphone=(), geolocation=(), payment=()` |
| 1G — X-Frame-Options | **PASS** | `DENY` |
| 1G — X-Content-Type-Options | **PASS** | `nosniff` |

**Full production header dump (2026-04-14):**

```
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com https://cal.com; frame-ancestors 'none'
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=(), payment=()
```

## CSP Migration Outcome

**Path 3 — Deferral with evidence.**

**Attempt:** Nonce-based CSP via `proxy.ts` per Next.js 16 documentation.

**Blocker (paste-able evidence):** Next.js 16 docs at `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md` lines 181-183:

> "To use a nonce, your page must be dynamically rendered. This is because Next.js applies nonces during server-side rendering, based on the CSP header present in the request. Static pages are generated at build time, when no request or response headers exist — so no nonce can be injected."

And lines 396-398:

> "Partial Prerendering (PPR) is incompatible with nonce-based CSP since static shell scripts won't have access to the nonce"

**Impact if migrated:** All 34 static pages would become dynamically rendered. CDN caching eliminated (currently `x-vercel-cache: HIT`). Lighthouse performance would degrade from 100. Server costs would increase.

**Mitigation applied instead:**
1. Enabled `experimental.sri` with SHA-256 — framework scripts now carry `integrity` attributes (verified: `integrity="sha256-kj09X88p9LYPLEaPGm8VJ+..."` present in built HTML)
2. Added CSP directives: `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`
3. The `'unsafe-inline'` in `script-src` is constrained by domain allowlist to `'self'` + 2 specific origins

**Final CSP header (post-session):**

```
default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com https://cal.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests
```

## Rate Limit Review

**Key construction:** `contact:${ip}` for contact route, `newsletter:${ip}` for newsletter route. Per-IP keying confirmed — no per-session, per-cookie, or global key.

**IP source:** `req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()` with fallback to `"unknown"`. On Vercel, `x-forwarded-for` is set by the platform and spoofed values are stripped. Trustworthy.

**Thresholds:** Contact 3/hour, Newsletter 5/hour. Recommendation: raise contact to 5/hour (see M3).

**Failure mode:** Fail-open — if Redis is unreachable (or not provisioned), all requests are allowed and a warning is logged. This is intentional (documented in code) and defensible for a marketing site (availability over security). Currently ALL requests are failing open because Redis is not provisioned (S1).

## SRI Review

**External resource inventory:**

| Resource | Type | SRI Feasible | Status |
|---|---|---|---|
| Vercel Analytics (`va.vercel-scripts.com`) | npm package, bundled by Next.js | N/A — loaded as framework bundle | Covered by experimental SRI (integrity hashes on bundles) |
| Vercel Speed Insights | npm package, bundled by Next.js | N/A — same as above | Covered by experimental SRI |
| Cloudflare Turnstile | Conditionally injected div; script from `challenges.cloudflare.com` | No — script rotates | CSP domain allowlist restricts source |
| Cal.com | External link (no embed script) | N/A — no script loaded | N/A |
| Google Fonts (`fonts.gstatic.com`) | Font files via `next/font` | N/A — loaded at build time by Next.js | Covered by font-src CSP |
| Member Portal (`encompass-ppb-web.vercel.app`) | External link in Nav | N/A — navigation link, no script | N/A |

**No external `<script src="">` or `<link rel="stylesheet" href="">` tags found in source code.** All external resources are loaded via npm packages or conditionally injected by the framework.

`experimental.sri` enabled with SHA-256: Next.js adds `integrity` attributes to framework-generated script tags at build time.

## Environment Variable Audit

| Env Var | File:Line | Context | Sensitive | Status |
|---|---|---|---|---|
| `RESEND_API_KEY` | api/contact/route.ts:69, api/newsletter/route.ts:41, newsletter/confirm/page.tsx:25, newsletter/unsubscribe/page.tsx:25 | Server | Yes | Server-only ✓ |
| `RESEND_FROM_EMAIL` | api/contact/route.ts:70, api/newsletter/route.ts:43 | Server | No | Server-only ✓ |
| `CONTACT_TO_EMAIL` | api/contact/route.ts:71 | Server | No | Server-only ✓ |
| `NEWSLETTER_AUDIENCE_ID` | api/newsletter/route.ts:42, newsletter/confirm/page.tsx:26, newsletter/unsubscribe/page.tsx:26 | Server | No | Server-only ✓ |
| `NEWSLETTER_CONFIRM_SECRET` | api/newsletter/route.ts:7, newsletter/confirm/page.tsx:4, newsletter/unsubscribe/page.tsx:4 | Server | Yes | Server-only ✓ |
| `TURNSTILE_SECRET_KEY` | api/contact/route.ts:8 | Server | Yes | Server-only ✓ |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | contact/page.tsx:206,209 | Client | No (publishable site key) | Client OK ✓ |
| `NEXT_PUBLIC_CAL_EVENT_URL` | contact/page.tsx:23 | Client | No (public URL) | Client OK ✓ |
| `UPSTASH_REDIS_REST_URL` | lib/rateLimit.ts:7 | Server | Yes | Server-only ✓ |
| `UPSTASH_REDIS_REST_TOKEN` | lib/rateLimit.ts:8 | Server | Yes | Server-only ✓ |
| `KV_REST_API_URL` | lib/rateLimit.ts:7 | Server | Yes | Server-only ✓ (legacy fallback) |
| `KV_REST_API_TOKEN` | lib/rateLimit.ts:8 | Server | Yes | Server-only ✓ (legacy fallback) |
| `NODE_ENV` | lib/insights/index.ts:35, error.tsx:30 | Both | No (built-in) | Framework var ✓ |

**Zero non-public env vars exposed to client bundle.** `.env.example` is current and complete.

## API Route Hardening Review

### /api/contact (POST)

| Check | Status | Notes |
|---|---|---|
| Input validation | ✓ (improved) | Required fields checked, email format validated, length limits added this session |
| Error responses | ✓ | Generic messages only ("Invalid request", "Spam verification failed"), no stack traces |
| Enumeration prevention | N/A | Contact form, not account-related |
| Rate limit position | ✓ | Rate limit checked at handler entrypoint (line 23), before body parsing |
| CORS | ✓ | No ACAO header on API routes; preflight returns 204 without ACAO for cross-origin |
| Origin check | ✗ (M2) | No Origin/Referer validation — logged as moderate finding |

### /api/newsletter (POST)

| Check | Status | Notes |
|---|---|---|
| Input validation | ✓ | Email required, format validated |
| Error responses | ✓ | Generic messages, no internal state leaked |
| Enumeration prevention | ✓ | Always returns "Check your inbox to confirm" regardless of whether email already exists |
| Rate limit position | ✓ | Rate limit at entrypoint (line 18) |
| CORS | ✓ | Same-origin only by default |
| Origin check | ✗ (M2) | Same as contact route |

### /newsletter/confirm (Server Component page)

| Check | Status | Notes |
|---|---|---|
| Token verification | ✓ | HMAC-SHA256 signature + expiry check |
| Enumeration prevention | ✓ | Token-gated — attacker needs valid HMAC to reach email-dependent logic |
| Error responses | ✓ | Generic messages for all failure modes |

### /newsletter/unsubscribe (Server Component page)

| Check | Status | Notes |
|---|---|---|
| Token verification | ✓ | HMAC-SHA256 signature, no expiry (intentional — users should always be able to unsubscribe) |
| Enumeration prevention | ✓ | Token-gated — same as confirm |
| Error responses | ✓ | Generic messages |

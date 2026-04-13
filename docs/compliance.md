# Encompass Marketing — Compliance Posture

## CCPA / CPRA (California Consumer Privacy Act)

- **Privacy Policy** at `/privacy` covers all required CCPA sections: right to know, delete, correct, limit, opt-out of sale/sharing, non-discrimination
- **"Do Not Sell or Share My Personal Information"** link in footer on every page
- **Consent banner** appears on first visit with Accept / Opt out options
- **Global Privacy Control (GPC)** honored automatically — if `navigator.globalPrivacyControl === true`, analytics are not loaded
- **No personal data collection**: Vercel Analytics is cookieless, anonymizes IPs, does not track across sites
- **8 ATTORNEY-REVIEW flags** in legal pages for legal counsel review (see `docs/backlog.md`)

## WCAG 2.1 Level AA (Accessibility)

- **Target conformance**: WCAG 2.1 Level AA
- **Statement**: Published at `/accessibility`
- **Testing**: Lighthouse accessibility (96/100), color contrast verified mathematically
- **Color contrast**: `--text-tertiary` bumped from #71717A (4.09:1) to #8B8B93 (5.85:1) to pass AA on both `--bg-base` (#0A0A0B) and `--bg-raised` (#111113)
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3), landmark roles, decorative elements marked with `role="presentation"`
- **Contact**: accessibility@encompassparking.com

## Security Headers

All headers applied via `next.config.ts` to all routes:

| Header | Value | Notes |
|---|---|---|
| Content-Security-Policy | **Enforced** (Session 8, 2026-04-13) | `default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com https://cal.com; frame-ancestors 'none'`. Note: `'unsafe-inline'` for scripts required by Next.js 16 RSC payload; for styles required by Tailwind v4. |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | 2-year HSTS with preload |
| X-Frame-Options | DENY | Prevents framing |
| X-Content-Type-Options | nosniff | Prevents MIME sniffing |
| Referrer-Policy | strict-origin-when-cross-origin | Sends origin on cross-origin, full URL on same-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=(), payment=() | Disables unused browser APIs |

## Analytics

- **Provider**: Vercel Analytics (@vercel/analytics) + Vercel Speed Insights (@vercel/speed-insights)
- **Approach**: Cookieless, privacy-first. No cookies set, IP addresses anonymized, no cross-site tracking.
- **Consent-gated**: Analytics scripts only load when `encompass-consent === 'accepted'` in localStorage
- **GPC support**: If Global Privacy Control is detected, consent is auto-set to "denied"
- **Data collected (aggregate only)**: Page views, referrer URLs, geography (country/state), device type, browser, Web Vitals

## Transactional Email (Resend)

- **Provider**: Resend (resend.com)
- **Sending domain**: `send.encompassparking.com` (subdomain — does not affect Proton MX on apex)
- **Contact form**: Sends to `contact@encompassparking.com` via Resend with Reply-To set to submitter's email
- **No PII logging**: Server logs record organization name only, not email addresses or phone numbers

## Newsletter (Double Opt-In)

- **Provider**: Resend Audiences
- **Flow**: Subscribe → confirmation email with signed token → click to confirm → subscribed
- **Token signing**: HMAC-SHA256 with `NEWSLETTER_CONFIRM_SECRET`, base64url encoded, 7-day expiry
- **Unsubscribe**: One-click via signed token link in every newsletter email (no expiry on unsubscribe tokens)
- **Initial state**: Contacts added as `unsubscribed: true` until confirmation is clicked
- **CAN-SPAM compliant**: Double opt-in, immediate unsubscribe, physical address in Privacy Policy

## SEO

- **robots.txt**: Allows all crawlers, blocks `/member-portal*`, references sitemap
- **sitemap.xml**: 10 URLs with priority and changeFrequency metadata
- **OpenGraph + Twitter Cards**: Configured in root layout with default OG image (1200x630)

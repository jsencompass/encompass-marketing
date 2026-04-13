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
| Content-Security-Policy | Report-Only mode | Allows self + Vercel Analytics + inline styles. To be moved to enforced after monitoring. |
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

## SEO

- **robots.txt**: Allows all crawlers, blocks `/member-portal*`, references sitemap
- **sitemap.xml**: 10 URLs with priority and changeFrequency metadata
- **OpenGraph + Twitter Cards**: Configured in root layout with default OG image (1200x630)

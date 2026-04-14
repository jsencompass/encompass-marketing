# Encompass Marketing — Integrations Runbook

## Environment Variables

All env vars must be set in Vercel project settings (Production + Preview).

| Variable | Source | Scope | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | Resend dashboard > API Keys | Server | Transactional email sending |
| `RESEND_FROM_EMAIL` | Set after domain verification | Server | `noreply@send.encompassparking.com` |
| `CONTACT_TO_EMAIL` | Static | Server | `contact@encompassparking.com` |
| `NEWSLETTER_AUDIENCE_ID` | Resend dashboard > Audiences | Server | Double opt-in newsletter list |
| `NEWSLETTER_CONFIRM_SECRET` | Generate: `openssl rand -hex 32` | Server | HMAC signing for newsletter tokens |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare dashboard > Turnstile | Client | Spam protection widget |
| `TURNSTILE_SECRET_KEY` | Cloudflare dashboard > Turnstile | Server | Token verification |
| `NEXT_PUBLIC_CAL_EVENT_URL` | Cal.com after setup | Client | Scheduling link |

## Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Add domain: `send.encompassparking.com` (subdomain only — does not affect apex Proton MX)
3. Add DNS records at Dreamhost for `send.encompassparking.com` (see DNS section below)
4. Wait for domain verification (usually <1 hour)
5. Create API key with "Sending" permission
6. Create Audience for newsletter (name: "Encompass Insights")
7. Paste `RESEND_API_KEY`, `NEWSLETTER_AUDIENCE_ID` into Vercel env vars
8. Set `RESEND_FROM_EMAIL=noreply@send.encompassparking.com`

### Resend DNS Records for Dreamhost

**IMPORTANT**: These records go on the `send.encompassparking.com` subdomain ONLY. Your Proton MX records on the apex `encompassparking.com` stay untouched. Inbound mail to `contact@encompassparking.com` continues to land in Proton.

After creating the domain in Resend dashboard, Resend will provide the exact record values. Standard structure:

| Type | Host | Value | Notes |
|---|---|---|---|
| MX | `send.encompassparking.com` | `feedback-smtp.us-east-1.amazonses.com` (priority 10) | Resend MX for bounce handling |
| TXT | `send.encompassparking.com` | `v=spf1 include:amazonses.com ~all` | SPF record |
| TXT | `resend._domainkey.send.encompassparking.com` | *(DKIM value from Resend dashboard)* | DKIM signing key |

**Pull exact values from Resend dashboard after domain creation** — the DKIM value is unique per domain.

## Cloudflare Turnstile Setup

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com)
2. Go to Turnstile > Add site
3. Site name: "Encompass Parking"
4. Domain: `encompassparking.com`
5. Widget mode: "Managed" (recommended)
6. Theme: "Dark"
7. Copy Site Key → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in Vercel
8. Copy Secret Key → `TURNSTILE_SECRET_KEY` in Vercel

## Cal.com Setup

1. Sign up at [cal.com](https://cal.com) with `contact@encompassparking.com` or personal email
2. Connect primary calendar (Google Calendar or Outlook)
3. Create event type:
   - Title: "Intro Call — Encompass Parking"
   - Duration: 30 minutes
   - Buffer before: 15 minutes
   - Buffer after: 15 minutes
   - Minimum notice: 24 hours
   - Availability: Weekdays 9:00 AM – 5:00 PM Pacific
4. Set event URL slug to `intro-call`
5. Final URL format: `https://cal.com/[your-slug]/intro-call`
6. Paste URL into Vercel env var `NEXT_PUBLIC_CAL_EVENT_URL`

## Activation Checklist

- [ ] Resend account created
- [ ] `send.encompassparking.com` domain added in Resend
- [ ] DNS records added at Dreamhost
- [ ] Domain verified in Resend
- [ ] Resend API key created and added to Vercel
- [ ] Resend Audience created, ID added to Vercel
- [ ] `NEWSLETTER_CONFIRM_SECRET` generated and added to Vercel
- [ ] Cloudflare Turnstile site created
- [ ] Turnstile keys added to Vercel
- [ ] Cal.com account created, calendar connected
- [ ] Event type created, URL added to Vercel
- [ ] Upstash Redis provisioned via Vercel Marketplace (rate limiting)
- [ ] Test contact form submission
- [ ] Test newsletter double opt-in flow
- [ ] Verify email arrives at `contact@encompassparking.com`

## Content Security Policy

Configured in `next.config.ts`. Enforced (not report-only) since Session 8.

**Current directives (updated Session 15):**
- `default-src 'self'`
- `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com` — `'unsafe-inline'` required by Next.js 16 for RSC payload on static pages
- `style-src 'self' 'unsafe-inline'` — required by Tailwind v4 runtime
- `img-src 'self' data: https:`
- `font-src 'self' https://fonts.gstatic.com`
- `connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://challenges.cloudflare.com`
- `frame-src https://challenges.cloudflare.com https://cal.com`
- `frame-ancestors 'none'`
- `object-src 'none'` — added Session 15
- `base-uri 'self'` — added Session 15
- `form-action 'self'` — added Session 15
- `upgrade-insecure-requests` — added Session 15

**Subresource Integrity:** `experimental.sri` enabled with SHA-256 (Session 15). Framework scripts carry `integrity` attributes at build time.

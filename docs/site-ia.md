# Encompass Marketing — Site Information Architecture (v1)

## Page Inventory

| Route | Status | Session | Notes |
|---|---|---|---|
| `/` | Shipped | 3 | Full homepage with pricing, capabilities, proof sections. Hero has logo overlay (S15.1). PACT section uses real LA map imagery (S15.1). |
| `/how-it-works` | Shipped | 4 | Four-lane operating model + governance cadence |
| `/services` | Shipped | 5 | Comparison matrix + optional modules + Parking PI |
| `/who-we-are` | Shipped | 2 | Three principal bios + formation story |
| `/insights` | Shipped | 6 | Blog index with featured post + newsletter |
| `/insights/[slug]` | Shipped | 6 | Individual MDX blog post renderer. OG images as cover images above H1 (S15.1). |
| `/contact` | Shipped | 4 | Contact form + Cal.com scheduling + Turnstile |
| `/privacy` | Shipped | 3 | Privacy Policy (CCPA/CPRA compliant) |
| `/terms` | Shipped | 3 | Terms of Use |
| `/accessibility` | Shipped | 3 | Accessibility Statement (WCAG 2.1 AA) |
| `/cookies` | Shipped | 3 | Cookie & Tracking Notice |
| `/newsletter/confirm` | Shipped | 4 | Double opt-in confirmation |
| `/newsletter/unsubscribe` | Shipped | 4 | One-click unsubscribe |
| `/api/contact` | Shipped | 4 | Contact form POST handler (Resend + Turnstile) |
| `/api/newsletter` | Shipped | 4 | Newsletter signup POST handler (Resend Audiences) |
| `/robots.txt` | Shipped | 3 | Next.js metadata route |
| `/sitemap.xml` | Shipped | 3 | Next.js metadata route (12 URLs) |

## Navigation

- **Nav**: Sticky 64px header. Links: How It Works, Services, Who We Are, Insights, Contact. Pill CTA: Member Portal (external).
- **Footer**: Newsletter signup row + four columns (Company / Services / Connect / Legal). Copyright. Location line. DNSS link.

## Global Chrome

- Layout: `src/app/layout.tsx` — Inter + JetBrains Mono fonts, Nav + Footer + ConsentBanner + AnalyticsProvider
- Tokens: `src/styles/tokens.css`
- Components: `src/components/chrome/Nav.tsx`, `src/components/chrome/Footer.tsx`
- Shared: `src/components/ClosingCTA.tsx`, `src/components/NewsletterSignup.tsx`
- Compliance: `src/components/compliance/ConsentBanner.tsx`, `src/components/compliance/AnalyticsProvider.tsx`

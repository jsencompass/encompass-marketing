# Encompass Marketing — Site Information Architecture (v1)

## Page Inventory

| Route | Status | Session | Notes |
|---|---|---|---|
| `/` | Shipped | 3 | Full homepage with pricing, capabilities, proof sections |
| `/how-it-works` | Stub | — | Placeholder heading |
| `/services` | Stub | — | Placeholder heading |
| `/who-we-are` | Shipped | 2 | Three principal bios + formation story |
| `/insights` | Stub | — | Blog/insights landing |
| `/contact` | Stub | — | Contact form + scheduling |
| `/privacy` | Shipped | 3 | Privacy Policy (CCPA/CPRA compliant) |
| `/terms` | Shipped | 3 | Terms of Use |
| `/accessibility` | Shipped | 3 | Accessibility Statement (WCAG 2.1 AA) |
| `/cookies` | Shipped | 3 | Cookie & Tracking Notice |
| `/robots.txt` | Shipped | 3 | Next.js metadata route |
| `/sitemap.xml` | Shipped | 3 | Next.js metadata route (10 URLs) |

## Navigation

- **Nav**: Sticky 64px header. Links: How It Works, Services, Who We Are, Insights, Contact. Pill CTA: Member Portal (external).
- **Footer**: Four columns (Company / Services / Connect / Legal). Copyright. Location line. DNSS link.

## Global Chrome

- Layout: `src/app/layout.tsx` — Inter + JetBrains Mono fonts, Nav + Footer + ConsentBanner + AnalyticsProvider
- Tokens: `src/styles/tokens.css`
- Components: `src/components/chrome/Nav.tsx`, `src/components/chrome/Footer.tsx`
- Shared: `src/components/ClosingCTA.tsx`
- Compliance: `src/components/compliance/ConsentBanner.tsx`, `src/components/compliance/AnalyticsProvider.tsx`

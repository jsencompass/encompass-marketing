# Encompass Marketing — Site Information Architecture (v1)

## Page Inventory

| Route | Status | Session | Notes |
|---|---|---|---|
| `/` | Shipped | 2 | Full homepage with pricing, team, proof sections |
| `/how-it-works` | Stub | — | Placeholder heading |
| `/services` | Stub | — | Placeholder heading |
| `/who-we-are` | Shipped | 2 | Three principal bios + formation story |
| `/insights` | Stub | — | Blog/insights landing |
| `/contact` | Stub | — | Contact form + scheduling |

## Navigation

- **Nav**: Sticky 64px header. Links: How It Works, Services, Who We Are, Insights, Contact. Pill CTA: Member Portal (external).
- **Footer**: Three columns (Company / Services / Connect). Copyright. Location line.

## Global Chrome

- Layout: `src/app/layout.tsx` — Inter + JetBrains Mono fonts, Nav + Footer wrapping all pages.
- Tokens: `src/styles/tokens.css`
- Components: `src/components/chrome/Nav.tsx`, `src/components/chrome/Footer.tsx`
- Shared: `src/components/ClosingCTA.tsx` — reusable CTA band

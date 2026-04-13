# Encompass Marketing — Site Information Architecture (v1)

## Page Inventory

| Route | Status | Session | Notes |
|---|---|---|---|
| `/` | Shipped | 1 | Homepage shell with real copy |
| `/how-it-works` | Stub | 2 | Placeholder heading |
| `/services` | Stub | 2 | Placeholder heading |
| `/insights` | Stub | 3 | Blog/insights landing |
| `/who-we-are` | Stub | 3 | Team bios with anchors |
| `/contact` | Stub | 4 | Contact form + scheduling |

## Navigation

- **Nav**: Sticky 64px header. Links: How It Works, Services, Insights, Who We Are, Contact. Pill CTA: Member Portal (external).
- **Footer**: Three columns (Company / Services / Connect). Copyright. Location line.

## Global Chrome

- Layout: `src/app/layout.tsx` — Inter + JetBrains Mono fonts, Nav + Footer wrapping all pages.
- Tokens: `src/styles/tokens.css`
- Components: `src/components/chrome/Nav.tsx`, `src/components/chrome/Footer.tsx`

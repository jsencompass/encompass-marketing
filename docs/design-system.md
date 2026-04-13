# Encompass Marketing — Design System

## Aesthetic

Dark-mode-forward, data-dense, Stripe/Linear sophistication. Continuous with the PACT product aesthetic — same purple accent, same typographic density, same card vocabulary — without being a product demo.

## Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#0A0A0B` | Page background |
| `--bg-raised` | `#111113` | Card / section fill |
| `--bg-elevated` | `#18181B` | Elevated surfaces, dropdowns |
| `--border` | `#27272A` | Borders, dividers |
| `--text-primary` | `#FAFAFA` | Headings, body |
| `--text-secondary` | `#A1A1AA` | Descriptions, subtext |
| `--text-tertiary` | `#8B8B93` | Labels, metadata (bumped from #71717A for WCAG AA 5.85:1 contrast) |
| `--accent` | `#6C5CE7` | Purple accent (CTAs, links, highlights) |
| `--accent-dim` | `#4C3FB8` | Hover/active state for accent |

### Financial Taxonomy (PACT)

| Token | Hex | Usage |
|---|---|---|
| `--status-revenue` | `#10B981` | Revenue-positive indicators |
| `--status-loss` | `#EF4444` | Loss / risk indicators |
| `--status-cost` | `#F59E0B` | Cost indicators |
| `--status-fines` | `#EAB308` | Fine / penalty indicators |

## Typography

- **Body**: Inter Variable (weights 400, 500, 600) via `next/font`
- **Data / Numerics**: JetBrains Mono (weights 400, 500) via `next/font`

### Type Scale

| Class | Size | Line Height |
|---|---|---|
| `text-12` | 12px / 0.75rem | 16px / 1rem |
| `text-14` | 14px / 0.875rem | 20px / 1.25rem |
| `text-16` | 16px / 1rem | 24px / 1.5rem |
| `text-18` | 18px / 1.125rem | 28px / 1.75rem |
| `text-24` | 24px / 1.5rem | 32px / 2rem |
| `text-32` | 32px / 2rem | 40px / 2.5rem |
| `text-48` | 48px / 3rem | 56px / 3.5rem |
| `text-64` | 64px / 4rem | 72px / 4.5rem |

## Spacing

Standard Tailwind spacing scale (4px base unit). Section padding: 96–128px vertical (`py-24` to `py-32`). Max container width: 1200px.

## Component Vocabulary

- **Cards**: `rounded-lg border border-border bg-bg-raised p-8`. Hover state adds `border-accent/40`.
- **Eyebrow labels**: `text-12 font-semibold uppercase tracking-widest text-text-tertiary`
- **Tags**: Pill-shaped, small — `rounded-full px-3 py-0.5 text-12 font-medium`
- **CTA buttons**: `rounded-full bg-accent px-6 py-3 text-14 font-semibold text-white`

## Interaction States

All interactive elements use four states with smooth transitions:

1. **Default** — current styling
2. **Hover** — brightness +8% for buttons, `translateY(-2px)` + accent border for cards, accent color for text links
3. **Focus-visible** — 2px `--accent` outline with 2px offset (keyboard only, not mouse)
4. **Active** — `scale(0.98)` for tactile feedback

Shared utilities in `src/styles/interactions.css`: `.btn-primary`, `.btn-secondary`, `.link-text`, `.card-hover`, `.input-field`.

## Motion System

Tokens in `src/styles/motion.css`:

| Token | Value | Usage |
|---|---|---|
| `--motion-fast` | 150ms | Hover, focus, active feedback |
| `--motion-base` | 250ms | Card lifts, state changes |
| `--motion-slow` | 400ms | Section reveals, page transitions |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Exits, reveals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetric motion |

Animations:
- **Hero stagger**: Fade-up + translate 12px, staggered 80ms per element
- **Section reveal**: Fade-in + translate 16px on scroll via `IntersectionObserver`
- **Card lift**: `translateY(-2px)` + accent border on hover
- **Button press**: `scale(0.98)` on `:active`

### Reduced Motion

`@media (prefers-reduced-motion: reduce)` disables all transitions and animations globally. The `Reveal` component checks `matchMedia` and auto-applies the revealed state immediately.

## Dark Mode

Site is dark-only for v1. No light mode toggle.

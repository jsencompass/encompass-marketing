# Encompass Marketing — Motion System

## Foundation

Library: `motion` (v12, standalone successor to framer-motion, ~18kb gzipped)

## Tokens (`src/lib/motion/tokens.ts`)

### Duration

| Token | Value | Usage |
|---|---|---|
| `instant` | 0.1s | Micro-interactions |
| `fast` | 0.2s | Hover states, focus feedback |
| `base` | 0.35s | Standard transitions |
| `slow` | 0.6s | Section reveals, hero entrance |
| `cinematic` | 0.9s | Full-page transitions |

### Easing

| Token | Value | Character |
|---|---|---|
| `standard` | `[0.22, 1, 0.36, 1]` | Cinematic out — primary ease |
| `gentle` | `[0.25, 0.46, 0.45, 0.94]` | Ease-out-quad — body text, subheads |
| `spring` | `[0.34, 1.56, 0.64, 1]` | Back-out spring — CTAs, buttons |
| `sharp` | `[0.4, 0, 0.2, 1]` | Material standard — utility |

### Stagger

| Token | Value | Usage |
|---|---|---|
| `tight` | 0.05s | Dense lists |
| `base` | 0.1s | Card grids, section children |
| `loose` | 0.15s | Hero sequence |

## Components

### HeroSpotlight (`src/components/hero/HeroSpotlight.tsx`)
Cursor-aware ambient glow. Tracks mouse position via CSS custom properties, renders a radial gradient pseudo-element. Mobile: centered static glow.

### HeroEntrance (`src/components/hero/HeroEntrance.tsx`)
Orchestrated hero entrance: eyebrow fade-in → H1 translate-up → subhead fade → CTAs spring. Uses `motion/react` for GPU-accelerated animations.

### CountUp (`src/components/motion/CountUp.tsx`)
Animated number counter. IntersectionObserver triggers at 30% visibility, ease-out-cubic curve, fires once. Formats with `Intl.NumberFormat`.

### Reveal (`src/components/motion/Reveal.tsx`)
Scroll-triggered section reveal. TranslateY 32px → 0, opacity 0 → 1, 600ms duration, standard easing. Fires at 15% visibility, once per element. Supports stagger via `delay` prop.

### RouteProgress (`src/components/motion/RouteProgress.tsx`)
2px accent progress bar at viewport top. Fires on `usePathname` change: 0→80% in 300ms, 80→100% in 200ms, fade out.

## CSS Classes

### `.cta-primary`
Button sheen effect: gradient sweep from left to right on hover, 800ms, single pass.

### `.card-lift`
Card hover: translateY(-4px), accent-dim border, composite shadow (12px blur + accent glow).

### `.card-lift-accent`
Enhanced for highlighted cards: translateY(-6px), full accent border, stronger shadow.

### `.hero-spotlight`
Pseudo-element radial gradient following cursor position via CSS custom properties.

## Reduced Motion

All motion respects `prefers-reduced-motion: reduce`:

- `src/lib/motion/useReducedMotion.ts` — React hook, used by all motion components
- `src/styles/motion.css` — Global `@media` rule sets `animation-duration: 0.01ms`, `transition-duration: 0.01ms`
- Components: when reduced, either skip animation entirely or reduce to opacity-only with `duration.fast`
- CountUp: renders final value immediately
- Reveal: renders fully visible immediately
- HeroSpotlight: glow disabled
- RouteProgress: still functions (informational, not decorative)

## Performance Notes

- All motion uses `transform` and `opacity` (compositor-only properties)
- `will-change: transform` applied only where needed (not globally)
- IntersectionObserver used for scroll-triggered animations (no scroll event listeners)
- Hero image uses `priority` for LCP optimization
- Motion library tree-shakes — only imported components are bundled

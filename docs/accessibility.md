# Encompass Marketing — Accessibility Posture

## Target Conformance

WCAG 2.1 Level AA

## Tools Used

- **Lighthouse accessibility audit**: Integrated into CI, run per-session. Current score: 96/100.
- **axe-core**: Available for CLI testing (requires system Chrome or Playwright). To be integrated as part of PR checks.
- **Manual testing**: Keyboard navigation, focus-ring verification, heading hierarchy review.

## Current State

### Implemented

- Skip-to-main-content link (`src/components/chrome/SkipLink.tsx`) — invisible until keyboard-focused
- `<main id="main-content">` landmark for skip link target
- Proper heading hierarchy (h1 → h2 → h3) on all pages
- All form inputs have explicit `<label>` elements with `htmlFor` matching `id`
- `aria-describedby` on form inputs with error messages
- `aria-label` on hamburger menu button (dynamic: "Open menu" / "Close menu")
- `aria-expanded` on hamburger and accordion toggles
- `role="presentation"` on decorative section breakers
- `role="tooltip"` with `aria-describedby` on info tooltips
- Color contrast: `--text-tertiary` #8B8B93 on `--bg-base` #0A0A0B = 5.85:1 (AA pass)
- Focus-visible indicators: 2px `--accent` outline with 2px offset on all interactive elements
- `prefers-reduced-motion: reduce` disables all transitions and animations
- Motion system with `IntersectionObserver`-based reveal that auto-applies `revealed` class when reduced motion is preferred

### Known Limitations

- Placeholder images lack descriptive alt text (will be updated as real imagery is added)
- Comparison matrix table on `/services` may be complex for screen readers — consider adding `aria-label` on cells
- Consent banner does not trap focus (low priority — non-blocking card, not a modal)

## Contact

accessibility@encompassparking.com

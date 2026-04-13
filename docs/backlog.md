# Encompass Marketing — Backlog

## Polish

- Per-page SEO metadata — partial (homepage, who-we-are, legal pages done; stubs pending)
- Nav active-link highlighting
- Smooth scroll for anchor links
- Mobile nav animation (slide instead of instant show/hide)
- Footer responsive refinement at small breakpoints
- CSP enforcement — move Content-Security-Policy from report-only to enforced after monitoring for violations

## Imagery

- **Hero background**: `/public/hero/hero-bg.jpg` — 2400x1400 source, srcset 1x/2x. Institutional parking structure at dusk, wide aspect, downtown LA preferred. Overlay: `--bg-base` at 0.75 opacity. Motion: parallax 0.3x scroll speed desktop, static mobile. Min-height: 720px desktop / 600px mobile. Currently using CSS gradient placeholder.
- **Section breaker 01**: `/public/breakers/breaker-01.svg` — full-width, 240px tall. Abstract data motif — subtle grid pattern or low-opacity dashboard fragment in `--accent-dim`. Static, decorative (no alt text). Currently using CSS repeating-linear-gradient at 2% opacity.
- **Section breaker 02**: `/public/breakers/breaker-02.svg` — same spec as breaker-01, different motif (diagonal grid).
- **Section breaker 03**: `/public/breakers/breaker-03.svg` — same spec, horizontal/vertical grid variation.
- **PACT screenshot**: `/public/proof/pact-baseline.png` — 1200x720 desktop, full-width mobile. Baseline dossier view (financial taxonomy cards + confidence ring). Crop tight, add subtle border glow in `--accent-dim`. Ken Burns: scale 1.0 → 1.03 over 8s, ease-in-out, reverses on desktop. Static mobile.
- **Team headshots**: `/public/team/joe.jpg`, `jason.jpg`, `steven.jpg` — 400x400 source, served at 120px circle desktop / 96px mobile. Professional photography pending. Currently showing initials on `--bg-elevated` circles.

## Content

- How It Works page
- Services page (full pricing matrix)
- Insights landing page
- Contact page with form + scheduling embed

## Features

- Contact form integration
- Blog / insights CMS integration
- Social icons in footer
- Light mode toggle (deferred indefinitely — v1 is dark-only)

## Assets Pending

- LinkedIn URLs for Joe Dudek, Jason Scott, Steven Grant (currently placeholder `#`)
- Capability icons for PACT, Parking PI, ProTrack, Command Center (currently using abstract accent dots)

## Motion & Animation (Polish Session)

- Hero: parallax background imagery (0.3x scroll speed desktop, static mobile)
- Proof section: Ken Burns slow-zoom on PACT screenshot (scale 1.0 → 1.03 over 8s, ease-in-out, reverses on desktop; static on mobile)
- Card hover states: subtle scale or border glow transitions
- Section breakers: consider subtle pulse or drift animation (very low speed, ~0.1px/s)

## Legal Review

ATTORNEY-REVIEW flags in compliance pages requiring legal counsel review:

1. **Privacy → Information Sharing**: Confirm whether Encompass uses any other third-party services (CRM, email marketing) requiring disclosure
2. **Privacy → CCPA Verification**: Confirm verification process for CCPA requests and whether authorized agent process is needed
3. **Privacy → CCPA Analytics**: Verify that cookieless Vercel Analytics does not constitute "sharing" under CPRA's broad definition
4. **Privacy → Security**: Confirm "reasonable security measures" language meets California AG guidance
5. **Privacy → Contact Address**: Add physical mailing address if required by CCPA (currently using city only)
6. **Terms → Trademarks**: Confirm trademark registration status for PACT, Parking PI, ProTrack. Consider ™ vs SM designation.
7. **Terms → Liability Cap**: Consider adding a liability cap (California courts may require some floor)
8. **Accessibility → Known Limitations**: Update as audits are completed

## Deferred-from-session


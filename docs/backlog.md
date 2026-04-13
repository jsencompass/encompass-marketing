# Encompass Marketing — Backlog

## Polish

- Nav active-link highlighting
- Smooth scroll for anchor links
- Mobile nav animation (slide instead of instant show/hide)
- Footer responsive refinement at small breakpoints
- CSP enforcement — move Content-Security-Policy from report-only to enforced after monitoring for violations
- Contact form — add Turnstile widget script tag (currently scaffolded, widget renders when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set)

## Imagery

- **Hero background**: `/public/hero/hero-bg.jpg` — 2400x1400 source, srcset 1x/2x. Institutional parking structure at dusk, wide aspect, downtown LA preferred. Overlay: `--bg-base` at 0.75 opacity. Motion: parallax 0.3x scroll speed desktop, static mobile. Min-height: 720px desktop / 600px mobile. Currently using CSS gradient placeholder.
- ~~Section breakers~~ — SHIPPED Session 6 as SVG `<pattern>` components (BreakerGrid, BreakerDiagonal, BreakerDots)
- **PACT screenshot**: `/public/proof/pact-baseline.png` — 1200x720 desktop, full-width mobile.
- **Team headshots**: `/public/team/joe.jpg`, `jason.jpg`, `steven.jpg` — 400x400 source, 120px circle.
- **How It Works lane visuals**: `/public/how-it-works/01-ppb.png`, `02-oversight.png`, `03-command.png`, `04-call.png` — 800x600 each. Dossier screenshots or abstract workflow diagrams.

## Infrastructure

- Rate limiting — upgrade from in-memory Map to Vercel KV for persistence across function instances
- Cal.com embed — consider @calcom/embed-react inline widget instead of external link (requires Cal.com Pro)
- Blog / insights CMS integration (Session 5 — MDX or headless CMS)

## Features

- Social icons in footer
- Light mode toggle (deferred indefinitely — v1 is dark-only)

## Assets Pending

- LinkedIn URLs for Joe Dudek, Jason Scott, Steven Grant (currently placeholder `#`)
- ~~Capability icons~~ — SHIPPED Session 6 as SVG components (PactIcon, ParkingPiIcon, ProTrackIcon, CommandCenterIcon)

## Accessibility Polish

- 4 decorative lane numbers on /how-it-works flagged by axe (intentionally low-contrast, aria-hidden applied — consider raising opacity or removing from DOM)
- MDX syntax highlighting for code blocks in blog posts

## Motion & Animation (Polish Session)

- Hero: parallax background imagery (0.3x scroll speed desktop, static mobile)
- Proof section: Ken Burns slow-zoom on PACT screenshot
- Card hover states: subtle scale or border glow transitions
- Section breakers: consider subtle pulse or drift animation

## Legal Review

All 8 ATTORNEY-REVIEW flags closed with conservative defaults (Sessions 5 + 7):

1. ~~Privacy → Information Sharing~~ — CLOSED S7: Added Third-Party Services section (Vercel, Resend, Cloudflare Turnstile)
2. ~~Privacy → CCPA Verification~~ — CLOSED S7: Added identity verification language
3. ~~Privacy → CCPA Analytics~~ — CLOSED S7: Added explicit CPRA "not a sale or sharing" clause
4. ~~Privacy → Security~~ — CLOSED S7: Replaced "reasonable measures" with specific enumeration (HTTPS, CSP, HSTS, least-privilege, processor review)
5. ~~Privacy → Contact Address~~ — CLOSED S5: Added Attn: Privacy Officer + [Mailing address TBD]
6. ~~Terms → Trademarks~~ — CLOSED S5: Changed to "trademarks used in commerce, federal applications pending"
7. ~~Terms → Liability Cap~~ — CLOSED S7: Added $100 aggregate liability cap with jurisdictional savings clause
8. ~~Accessibility → Known Limitations~~ — CLOSED S7: Added quarterly review cadence + remediation tracking

**Remaining**: Full legal review of privacy, terms, accessibility, cookies pages by qualified attorney before customer-facing campaign launch.

## Jason to Provide

- LLC registered mailing address for Privacy Policy (currently `[Mailing address TBD]` with JASON-TODO in `/privacy`)
- parking-guru SKILL.md — authoritative bio narratives for Dudek/Scott/Grant (path: `/mnt/skills/user/parking-guru/SKILL.md`)

## Deferred-from-session


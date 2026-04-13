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
- **Section breaker 01**: `/public/breakers/breaker-01.svg` — full-width, 240px tall. Abstract data motif.
- **Section breaker 02**: `/public/breakers/breaker-02.svg` — diagonal grid variation.
- **Section breaker 03**: `/public/breakers/breaker-03.svg` — horizontal/vertical grid variation.
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
- Capability icons for PACT, Parking PI, ProTrack, Command Center (currently using abstract accent dots)

## Motion & Animation (Polish Session)

- Hero: parallax background imagery (0.3x scroll speed desktop, static mobile)
- Proof section: Ken Burns slow-zoom on PACT screenshot
- Card hover states: subtle scale or border glow transitions
- Section breakers: consider subtle pulse or drift animation

## Legal Review

ATTORNEY-REVIEW flags in compliance pages requiring legal counsel review:

1. **Privacy → Information Sharing**: Confirm third-party services disclosure (now includes Resend)
2. **Privacy → CCPA Verification**: Confirm verification process for CCPA requests
3. **Privacy → CCPA Analytics**: Verify cookieless analytics "sharing" under CPRA
4. **Privacy → Security**: Confirm "reasonable security measures" language
5. **Privacy → Contact Address**: Add physical mailing address if required
6. **Terms → Trademarks**: Confirm registration status for PACT, Parking PI, ProTrack
7. **Terms → Liability Cap**: Consider adding a liability cap
8. **Accessibility → Known Limitations**: Update as audits complete

## Jason to Provide

- LLC registered mailing address for Privacy Policy (currently `[Mailing address TBD]` with JASON-TODO in `/privacy`)
- parking-guru SKILL.md — authoritative bio narratives for Dudek/Scott/Grant (path: `/mnt/skills/user/parking-guru/SKILL.md`)

## Deferred-from-session


# Encompass Marketing — Assets Needed

All assets below are referenced in the codebase with placeholder elements. When the real file is placed at the documented path, it will display automatically unless noted otherwise.

## Team Headshots

| File | Path | Dimensions | Format | Notes |
|---|---|---|---|---|
| Joe Dudek | `/public/team/joe.jpg` | 800x800 min (retina @2x at 400px display) | JPG | Professional photographer, neutral dark background, shoulders-up, natural posture. Color-grade to complement dark UI. Alt text: "Joe Dudek, Co-Founder and Managing Principal, Operations & Governance" |
| Jason Scott | `/public/team/jason.jpg` | 800x800 min | JPG | Same style as Joe. Alt text: "Jason Scott, Co-Founder and Managing Partner, Delivery & Assurance" |
| Steven Grant | `/public/team/steven.jpg` | 800x800 min | JPG | Same style. Alt text: "Steven Grant, Co-Founder, Technology & Architecture" |

**Swap-in**: Replace file at path. Code change needed: update `src/app/who-we-are/page.tsx` and homepage team section to use `<Image>` with real paths instead of initials placeholders.

## Hero Background

| File | Path | Dimensions | Format | Size Target | Notes |
|---|---|---|---|---|---|
| Hero bg | `/public/hero/hero-bg.jpg` | 2400x1400 | JPG | ~300KB after optimization | Wide institutional parking structure, downtown LA preferred, shot at dusk or blue hour. Avoid literal building branding. Alt text: decorative (use `alt=""`). |

**Swap-in**: Replace file at path, then update `src/app/page.tsx` hero section to use `<Image>` with overlay div at `--bg-base` 0.75 opacity. Code change required.

## PACT Baseline Screenshot

| File | Path | Dimensions | Format | Notes |
|---|---|---|---|---|
| PACT baseline | `/public/proof/pact-baseline.png` | 1200x720 | PNG | Exported from PACT baseline dossier view at the 832 Francisco St site. Crop to include: financial taxonomy cards (Potential Revenue / Loss / Cost / Fines) and Baseline Confidence ring. Alt text: "PACT baseline dossier showing financial taxonomy and confidence score for a managed site." |

**Swap-in**: Replace file at path. Code change needed: update homepage proof section to use `<Image>` instead of placeholder text.

## How It Works Lane Visuals

| File | Path | Dimensions | Format | Notes |
|---|---|---|---|---|
| Lane 01 — PPB | `/public/how-it-works/01-ppb.png` | 800x600 | PNG | PACT dossier screenshot or abstract workflow diagram showing data normalization. Alt text: "Parking Performance Baseline workflow — data ingestion, session mapping, truth set delivery" |
| Lane 02 — Oversight | `/public/how-it-works/02-oversight.png` | 800x600 | PNG | Monthly close-pack audit view or governance cadence diagram. Alt text: "PACT Oversight monthly governance cycle — audit, variance, closure, summary" |
| Lane 03 — Command | `/public/how-it-works/03-command.png` | 800x600 | PNG | Command center monitoring view or alert dashboard. Alt text: "Remote Command Center — 24/7 monitoring, alert triage, dispatch" |
| Lane 04 — Call | `/public/how-it-works/04-call.png` | 800x600 | PNG | Call center interface or customer support flow. Alt text: "Remote Call Center — branded customer support under Encompass authority" |

**Swap-in**: Replace files at paths. Code change needed: update `src/app/how-it-works/page.tsx` lane sections to use `<Image>` instead of placeholder text.

## Favicon / OG Image Upgrade

When the Encompass logo is finalized:
- Replace `/src/app/icon.png` (32x32), `/src/app/apple-icon.png` (180x180), `/src/app/icon.svg` with logo-based versions
- Replace `/public/og-default.png` (1200x630) with logo version

**Swap-in**: Replace files at paths, no code change needed.

## Delivery Checklist

- [ ] Team headshots (3 files)
- [ ] Hero background (1 file)
- [ ] PACT baseline screenshot (1 file)
- [ ] How It Works lane visuals (4 files)
- [ ] Logo for favicon/OG (when available)
- [ ] LLC registered mailing address for Privacy Policy
- [ ] LinkedIn URLs for Joe, Jason, Steven

# DESIGN.md · The Case Files of Shubh Ghiya

Source of truth for visuals: `mentalist_portfolio_prd.md` (section 4). This file records the decisions made while building it.

## Concept
An investigator's case archive after hours. Dark ink room, warm paper evidence, one crimson thread. The theme is the presentation layer; every number is labelled with what kind of proof it is.

## Colour (dark only; PRD 4.2 is dark-first, so there is no light theme)
| Token | Hex | Role |
|---|---|---|
| ink | #101113 | page background |
| ink-soft | #181a1d | alternate sections, cards |
| panel | #202226 | board cards, bar tracks |
| paper | #f1eee7 | primary text; evidence/exhibit surfaces |
| paper-muted | #c5c0b6 | secondary text |
| paper-ink / paper-ink-muted | #1b1c1f / #55524b | text on paper |
| ash | #8b8c90 | metadata (PRD #85868A nudged up for 5:1 on ink) |
| line | #383a3f | rules, borders |
| crimson / crimson-bright | #a51e32 / #c52b42 | buttons, threads, accents. Not for small text |
| signal | #e35d70 | crimson for small text on ink (added; 5.3:1) |
| brass | #b9a27b | archival labels, sparingly |
| success | #8ba68b | LIVE / PRODUCTION markers only |

Red John (contact) is the only crimson-flooded surface: #140709 base with crimson radial light.

## Type
- Display: Bebas Neue 400, uppercase, line-height 0.88. Hero 60–148px fluid.
- Body: Manrope variable 200–800, 15–18px, line-height 1.5–1.7, measure 68ch.
- Labels: IBM Plex Mono 400/500, 11–13px, uppercase, tracking 0.14em.
- Fonts are self-hosted in `app/fonts` (OFL, copied from @fontsource).

## Shape and space
- Square corners everywhere (paper and files). Only pins are round.
- Gutter clamp(16px, 4vw, 56px); max width 1440px. Sections 96–128px vertical.
- Buttons 52px tall; every tap target ≥ 44px.

## Components
- Evidence board (hero, ≥768px): 7 file cards + subject card + sealed File 08, strings drawn in SVG; hover/focus lights a card's string crimson and shows its one verified clue. Phones get a plain numbered index instead.
- Case card: file tab (paper) + dark body, status stamp, headline result with evidence-kind tag.
- Case page: cover with giant ghost number and stamp, sticky case index (desktop) / disclosure (mobile), six numbered sections, paper exhibit cards, one bespoke diagram per case.
- Evidence kinds: PRODUCTION · LOCAL BENCHMARK · OFFLINE EVALUATION · COMPETITION RESULT · CODE-VERIFIED.

## Motion (CSS only, no animation library)
- Entrance: translateY 18px + fade, 700ms cubic-bezier(.2,.7,.2,1), 70ms stagger.
- Board: cards pin in, strings draw (stroke-dashoffset), stamps thump in once.
- Scroll: `animation-timeline: view()` reveals and a scroll progress bar; skipped where unsupported (content stays visible).
- Lamp: warm radial light follows a mouse on the hero only.
- `prefers-reduced-motion: reduce` removes all of it.

## Content rules
Only facts marked verified/stated in `Resume Builder/profile`. Respect every PRD do-not-claim list. Local numbers say "local". No phone number on the public site.

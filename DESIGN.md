# DESIGN.md · The Case Files of Shubh Ghiya

Source of truth for visuals: `mentalist_portfolio_prd.md` (section 4). This file records the decisions made while building it.

## Concept (v2, 2026-11-04: "Golden hour → Red John")
A consultant's case room in late-afternoon Sacramento sun: cream walls, venetian-blind light, manila folders, a cork evidence board with red string, tea rings, and handwritten margin notes. The investigation happens in daylight. Only the final file (Red John / contact) turns the lights off. v1 (dark noir, Bebas Neue) was replaced at the user's request because it read as a generic crime thriller.

## Colour
| Token | Day | Night (.night, contact page) | Role |
|---|---|---|---|
| ground | #f4ead5 | #120708 | page background |
| sunk | #ebddc1 | #1a0b0d | alternate sections, panels |
| card | #fbf6ea | #21100f | paper, index cards, controls |
| folder | #e3c88e | - | manila surfaces (.manila) |
| cork | #a97f52 | - | evidence board |
| fg / muted / faint | #2a1e16 / #5c4a3b / #6e5a47 | #f3e9d7 / #cdbfa8 / #a08f7c | text (faint ≥ 4.5:1 on ground and sunk) |
| line | #d8c4a0 | #4a2a28 | rules |
| crimson | #9e1b2c | same | primary button, red string, notes, alerts |
| amber | #82540e | #d9b26a | small amber text |
| sun | #e9a646 | - | light only, never text |
| success | #3f6b45 | - | LIVE / production markers |

## Type
- Display: Cormorant Garamond 500/600 (+500 italic), sentence case, line-height 0.95. Italic for the one emphasised word.
- Hand: Caveat variable, only for margin notes, cold reading and the card trick. Never for facts or numbers that matter.
- Body: Manrope variable. Labels: IBM Plex Mono, uppercase, tracked.
- All fonts self-hosted in app/fonts (OFL).

## Signature moments
- Hero: blinds light + sunbeam that follows the mouse; handwritten aside under the headline.
- Cold reading (hero): three handwritten lines deduced in the browser (time of day, referrer or device, last case visited). Nothing is sent anywhere.
- Card trick (home, section B): pick the role you're hiring for; the card flips to "I knew you'd pick that one", then the relevant files. The note admits it's theatre.
- Evidence board: cork, manila cards, red string; a black string leads to File 08.
- Case pages: a handwritten margin note under the opening line (editorial, never a claim).
- Case 02: live interrogation of the real EC2 service through /api/ledger/* (server proxy, key never in the browser, per-IP rate limit, visitor-scoped sandbox merchant).
- Contact: :root:has(.night) turns the whole page dark crimson.

## Shape, space, motion
Unchanged from v1: square corners, 1440px max width, 52px buttons, 44px tap targets, CSS-only motion (entrance, write-in for handwriting, card flip, string draw), all removed under prefers-reduced-motion.

## Content rules
Only facts marked verified/stated in `Resume Builder/profile`. Respect every PRD do-not-claim list. Local numbers say "local". No phone number on the public site.

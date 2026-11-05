# DESIGN.md · The Case Files of Shubh Ghiya

Source of truth for visuals: `mentalist_portfolio_prd.md` (section 4). This file records the decisions made while building it.

## Concept (v2, 2026-11-04: "Golden hour → Red John"; v3 motion and interactions 2026-11-05)
A consultant's case room in late-afternoon Sacramento sun: cream walls, venetian-blind light, manila folders, a cork evidence board with red string, tea rings, and handwritten margin notes. The investigation happens in daylight. Only the final file (Red John / contact) turns the lights off. v1 (dark noir, Bebas Neue) was replaced at the user's request because it read as a generic crime thriller.

## Colour
| Token | Day | Night (dark theme + .night contact page) | Role |
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
- Contact (Case 08, "Red John"): always night. A visible-only `:root:has(.night:not([style*="display: none"], [style*="display: none"] *))` turns the page dark (Next keeps hidden routes mounted, so a plain `:has(.night)` leaked dark mode to other pages). The large thumbprint sits above a pinned manila **contact note** (Web3Forms): name, email, message ≤ 1000, honeypot; success state stamps the note with the thumbprint ("Note received. I'll find you. By email.").
- Theme: light by default, dark = Red John palette (`html[data-theme=dark]`, saved in localStorage). Toggle icon is chosen by CSS (no hydration flash); toggle is disabled on /contact.
- Home index ("Seven files on the table"): each row opens like a manila file. Mouse: folder fill sweeps in, a tab rises ("Case 0X · Investigate it yourself"); on ≥1024px a **case file** slides out from the right with an original wax seal (case number), suspects (3 lines from the case's own problem text, `suspects` in content/cases.ts), clues (headline + proof type + 2 stack items) and a "Sealed" stamp. Phones: the row nearest the middle of the screen opens while scrolling (lighter fill, no text swap).
- Card trick: "Shuffle and pick again" gathers the cards into a pile, riffles twice and deals them out in a new random order; focus returns to the first card.
- About: "How I investigate", six habits (question the obvious, go looking for the failure, reproduce before fixing, honest baseline, check don't trust, plan for the dependency going down), each linked to the case that proves it.

## Shape, space
Square corners, 1440px max width (`.wrap`), 52px buttons, 44px tap targets, 72px header (use 72px in any `calc(100svh - header)`). Case-page titles size to their column with container units (`@container` + `clamp(44px, 15cqi, 124px)`) so they never run under the hero photo. Note: `.wrap` is unlayered CSS and beats Tailwind padding utilities; mark overrides important (`lg:pr-[...]!`).

## Motion (CSS only, no libraries; every moving part off under prefers-reduced-motion)
- Easing `--ease-out-file: cubic-bezier(.2,.7,.2,1)`. Hovers 180-420ms; entrances 600-900ms; shuffle ~1.8s total.
- Entrance: `.enter` (70ms stagger via `--i`), `.write-in` (handwriting), `.stamp-in`, evidence-board pins, string draw, portrait pinned last (`.board-subject`).
- Scroll (CSS scroll/view timelines; skipped where unsupported): `.reveal`, hero board sinks / copy drifts, section titles `.wipe`, exhibits slide from the drawer (`.exhibit`), card trick dealt from one deck (`.deal`), closing lamp warms (`.dusk-glow`), phone index row scan (named timeline `--row`).
- Hover (movement only on `(hover: hover)`; colour changes for everyone): ink-wipe `.btn-ghost`, button lift with `--shadow-lift` (warm shadow by day, red glow at night), proof-number underline, index row file, tool dash stretch, pinned photos straighten.
- Rule: entrance and scroll keyframes animate `transform`; hovers use the separate `translate` / `rotate` / `scale` properties, so a finished animation's fill never freezes a hover.

## Accessibility (axe WCAG 2.2 AA clean on all pages and key states, 2026-11-05)
- Skip link first; focus moves to the card-trick result after a pick and back to the deck after shuffle; case-file hover also opens on keyboard focus (decorative, `aria-hidden`).
- Scrollable tables are focusable regions. Nav numbers use `faint`/`tag-muted` (no opacity). Labels on tinted panels use `muted`, not `faint`.

## Content rules
Only facts marked verified/stated in `Resume Builder/profile`. Respect every PRD do-not-claim list. Local numbers say "local". No phone number on the public site.

# The Case Files of Shubh Ghiya

Personal portfolio built as an investigator's case archive. Next.js 16 (App Router, Cache Components) + TypeScript + Tailwind CSS 4. No animation or icon libraries: motion is CSS, icons are inline SVG.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## Deploy (Vercel or any Node host)

Set `SITE_URL` to the real domain (for example `https://shubhghiya.tech`) so canonical URLs, the sitemap and Open Graph links are correct.

## Where things live

| Path | What |
|---|---|
| `content/cases.ts` | All seven case files: facts, evidence (typed by kind), links, lessons |
| `content/profile.ts` | Contact, education, experience, awards, skills |
| `app/page.tsx` | Home: hero + evidence board, index, strongest evidence, skills, profile, CTA |
| `app/case-files/` | Archive with filters, and the case page template (`[slug]`) |
| `components/diagrams/case-visuals.tsx` | One bespoke diagram per case |
| `app/contact/` | Case 08 · Red John (`/red-john` redirects here) |
| `app/resume/` | HTML résumé; `public/resume/Shubh-Ghiya-Resume.pdf` is printed from it |
| `DESIGN.md` | Tokens, type, motion and component decisions |

## Content rules

Every number comes from `Resume Builder/profile` and respects the PRD's do-not-claim lists. To change a fact, edit `content/*.ts` only. If you edit the résumé page, regenerate the PDF (print `/resume` to A4 PDF, margins 12/14 mm).

import Link from "next/link";
import { cases, evidenceLabel } from "@/content/cases";
import { portrait, profile, skills } from "@/content/profile";
import { PinnedPhoto } from "@/components/case-study/pinned-photo";
import { EvidenceBoard } from "@/components/hero/evidence-board";
import { Lamp } from "@/components/hero/lamp";
import { ColdReading } from "@/components/hero/cold-reading";
import { CardTrick } from "@/components/card-trick";
import { SectionHead } from "@/components/section-head";
import { ArrowRight } from "@/components/icons";
import { siteUrl } from "@/content/site";

// Three proof points for an SDE-first audience (PRD 6.1 B). Each links to its case.
const strongest = [
  {
    slug: "nakhrali",
    value: "100+ orders",
    label: "processed on a live e-commerce platform I built and run as sole developer, with 100+ registered users.",
    kind: "production" as const,
    note: "Self-reported, Oct 2026",
  },
  {
    slug: "idempotent-event-processor",
    value: "18,000 / 18,000",
    label: "unique payment events processed in 90 s on 3 workers, with 3.78 ms API p95 under duplicate-heavy load.",
    kind: "local-benchmark" as const,
    note: "Local load test, not production",
  },
  {
    slug: "movielens",
    value: "0.099 → 0.151",
    label: "NDCG@10 against a Bayesian popularity baseline (1.53×), on 6,255 held-out users.",
    kind: "offline-eval" as const,
    note: "Chronological split",
  },
];

const proof = [
  { slug: "nakhrali", value: "100+", label: "orders processed in production (Nakhrali Luxury)" },
  { slug: "quickpark", value: "Best Project", label: "Award, IIT Madras (QuickPark)" },
  { slug: "movielens", value: "1.53×", label: "NDCG@10 over a popularity baseline (MovieLens)" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  image: `${siteUrl}${portrait.src}`,
  description: profile.positioning,
  address: { "@type": "PostalAddress", addressLocality: "Bhopal", addressCountry: "IN" },
  knowsAbout: ["Backend engineering", "Full-stack web development", "Machine learning", "Payment systems"],
  sameAs: [profile.github, profile.linkedin],
  alumniOf: ["Indian Institute of Technology Madras", "University Institute of Technology, RGPV"],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------- Hero ---------- */}
      <Lamp className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="blinds absolute inset-0" />
        <section aria-labelledby="hero-title" className="wrap relative grid min-h-[calc(100svh-72px)] items-center gap-12 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="hero-copy lg:col-span-7">
            <p className="label enter flex flex-wrap items-center gap-x-3 gap-y-1 text-muted" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="inline-flex items-center gap-2 text-fg">
                <span aria-hidden className="h-2 w-2 rounded-full bg-success" />
                Open to SDE internships 2026 · full-time 2027
              </span>
              <span aria-hidden className="hidden text-crimson-bright sm:inline">/</span>
              <span>Final year · IIT Madras + UIT RGPV</span>
            </p>
            <h1
              id="hero-title"
              className="display enter mt-6 text-[clamp(52px,13.5vw,80px)] text-fg md:text-[clamp(76px,9.5vw,104px)] lg:text-[clamp(64px,6.2vw,108px)]"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              I notice the details.
              <br />
              <span className="text-muted">I build the </span>
              <em className="relative inline-block text-crimson">
                systems.
                <span aria-hidden className="absolute -bottom-1 left-0 h-[0.04em] w-full bg-crimson" />
              </em>
            </h1>
            <p className="hand write-in mt-4 -rotate-2 pl-1 text-[clamp(22px,2vw,28px)] text-amber" style={{ "--i": 1 } as React.CSSProperties}>
              ...and then break them on purpose, to be sure.
            </p>
            <p className="enter measure mt-6 text-[clamp(18px,1.5vw,21px)] leading-relaxed text-muted" style={{ "--i": 2 } as React.CSSProperties}>
              I&apos;m <span className="text-fg">Shubh Ghiya</span>, a developer interested in reliable backends, useful
              developer tools and data-driven products. These are the systems I&apos;ve built, tested and shipped.
            </p>
            <div className="enter mt-8 flex flex-wrap items-center gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              <Link href="/case-files" className="btn btn-primary">
                Open the case files <ArrowRight />
              </Link>
              <a href={profile.resumePdf} target="_blank" rel="noopener" className="btn btn-ghost">
                Examine my resume
              </a>
            </div>

            {/* Proof line: verified results only, each opens its case */}
            <ul className="enter mt-10 grid max-w-2xl grid-cols-1 border-t border-line sm:grid-cols-3" style={{ "--i": 4 } as React.CSSProperties}>
              {proof.map((p) => (
                <li key={p.slug} className="border-b border-line sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <Link href={`/case-files/${p.slug}`} className="group block py-4 sm:px-4 sm:first:pl-0">
                    <span className="proof-value display inline-block text-[clamp(28px,2.4vw,36px)] leading-none text-fg group-hover:text-crimson">{p.value}</span>
                    <span className="mt-1.5 block text-[13px] leading-snug text-muted">{p.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-board hidden w-full max-w-[620px] md:mx-auto md:block lg:col-span-5 lg:max-w-none">
            <EvidenceBoard />
          </div>

          {/* Phone: the board becomes a pinned photo plus a compact index of files (PRD 16) */}
          <nav aria-label="Case files" className="md:hidden">
            <PinnedPhoto shot={portrait} sizes="60vw" className="mx-auto mb-10 w-[min(240px,62vw)] -rotate-2" />
            <p className="label mb-3 text-faint">Evidence on file</p>
            <ol className="grid grid-cols-1 border-t border-line">
              {cases.map((c) => (
                <li key={c.slug} className="border-b border-line">
                  <Link href={`/case-files/${c.slug}`} className="flex min-h-14 items-center gap-4 py-3">
                    <span className="label text-faint">{c.number}</span>
                    <span className="display flex-1 text-[24px] leading-none">{c.title}</span>
                    <ArrowRight className="text-faint" />
                  </Link>
                </li>
              ))}
              <li className="border-b border-line">
                <Link href="/contact" className="flex min-h-14 items-center gap-4 py-3 text-alert">
                  <span className="label">08</span>
                  <span className="display flex-1 text-[24px] leading-none">Red John · Contact</span>
                  <ArrowRight />
                </Link>
              </li>
            </ol>
          </nav>
        </section>
        <p className="label wrap pointer-events-none absolute inset-x-0 bottom-5 hidden !text-[11px] text-faint lg:block" aria-hidden>
          Scroll to examine the evidence ↓
        </p>
      </Lamp>

      {/* The cold reading: a light personal touch, kept out of the way of the hero's proof */}
      <div className="border-b border-line bg-sunk">
        <div className="wrap py-8">
          <ColdReading />
        </div>
      </div>

      {/* ---------- A. The investigator's index ---------- */}
      <section aria-labelledby="index-title" className="wrap py-24 md:py-32">
        <SectionHead
          id="index-title"
          kicker="A · The investigator's index"
          title="Seven files on the table"
          intro="Production ownership first, then backend reliability, developer tooling, machine learning and AI. Each file opens a full case."
        />
        <ol className="border-t border-line">
          {cases.map((c) => (
            <li key={c.slug} className="index-item reveal border-b border-line">
              <Link
                href={`/case-files/${c.slug}`}
                className="index-row group relative -mx-3 grid px-3 md:-mx-4 md:px-4 grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 py-6 md:grid-cols-[64px_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.9fr)_24px] md:gap-x-8 md:py-7"
              >
                <span className="label col-start-1 row-start-1 text-faint transition-colors group-hover:text-alert">{c.number}</span>
                <span className="display col-start-2 row-start-1 text-[clamp(30px,3.6vw,56px)] text-fg transition-transform duration-300 group-hover:translate-x-2">
                  {c.title}
                </span>
                <span className="col-start-2 row-start-2 text-[14px] text-muted md:col-start-3 md:row-start-1">
                  {c.name}
                  <span className="label mt-1 block !text-[10px] text-faint">{c.categories.join(" / ")}</span>
                </span>
                <span className="hidden text-[13px] leading-snug text-faint md:col-start-4 md:row-start-1 md:block">
                  <span className="display block text-[28px] text-fg">{c.headline.value}</span>
                  <span className="label !text-[10px]">{evidenceLabel[c.headline.kind]}</span>
                </span>
                <ArrowRight className="col-start-3 row-start-1 text-faint transition-colors group-hover:text-alert md:col-start-5" />
                {/* Folder tab that appears when the row is opened like a file; the whole row is the link. */}
                <span aria-hidden className="index-tab label">
                  Case {c.number} · Investigate it yourself <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- B. The reading (card trick) ---------- */}
      <section aria-labelledby="trick-title" className="relative overflow-hidden border-t border-line bg-sunk">
        <span aria-hidden className="tea-ring top-10 right-[8%] scale-150" />
        <div className="wrap py-24 md:py-32">
          <SectionHead
            id="trick-title"
            kicker="B · A small demonstration"
            title="Think of the role you're hiring for. Now pick a card."
            intro="Don't tell me. I'll know. Then I'll hand you the files that matter for it."
          />
          <CardTrick />
        </div>
      </section>

      {/* ---------- C. The strongest evidence ---------- */}
      <section aria-labelledby="evidence-title" className="overflow-x-clip border-y border-line">
        <div className="wrap py-24 md:py-32">
          <SectionHead
            id="evidence-title"
            kicker="C · The strongest evidence"
            title="Three exhibits"
            intro="Every number carries a label saying what kind of proof it is. A local benchmark is never presented as production."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {strongest.map((s, i) => {
              const c = cases.find((x) => x.slug === s.slug)!;
              return (
                <Link
                  key={s.slug}
                  href={`/case-files/${s.slug}`}
                  className="manila exhibit group relative flex flex-col p-6 md:p-8"
                  style={{ "--r": `${[-0.6, 0.4, -0.3][i]}deg`, "--dir": i % 2 ? -1 : 1 } as React.CSSProperties}
                >
                  <span className="label flex justify-between !text-[11px] text-tag-muted">
                    <span>Exhibit {String.fromCharCode(65 + i)}</span>
                    <span>Case {c.number}</span>
                  </span>
                  <span className="display mt-8 text-[clamp(44px,4.6vw,72px)] text-tag-ink">{s.value}</span>
                  <span className="mt-3 text-[15px] leading-relaxed text-tag-muted">{s.label}</span>
                  <span className="mt-8 flex items-end justify-between gap-4 border-t border-tag-ink/15 pt-4">
                    <span>
                      <span className="stamp -rotate-2 text-crimson">{evidenceLabel[s.kind]}</span>
                      <span className="label mt-2 block !text-[10px] text-tag-muted">{s.note}</span>
                    </span>
                    <span className="label inline-flex items-center gap-2 text-tag-ink group-hover:text-crimson">
                      Open case <ArrowRight />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- C. What I work with ---------- */}
      <section aria-labelledby="skills-title" className="wrap py-24 md:py-32">
        <SectionHead
          id="skills-title"
          kicker="D · What I work with"
          title="Tools of the trade"
          intro="Only tools that appear in the case files. If it is listed here, there is a project you can open that uses it."
        />
        <div className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => (
            <div key={g.group} className="reveal border-r border-b border-line p-6">
              <h3 className="label text-amber">{g.group}</h3>
              <ul className="mt-5 space-y-2.5 text-[16px] text-fg">
                {g.items.map((s) => (
                  <li key={s} className="skill-item flex items-baseline gap-3">
                    <span aria-hidden className="skill-dash h-px w-3 shrink-0 translate-y-[-4px] bg-line" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- D. Short profile ---------- */}
      <section aria-labelledby="profile-title" className="border-t border-line">
        <div className="wrap grid gap-10 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-4">
            <p className="label text-alert">E · Profile</p>
            <h2 id="profile-title" className="display mt-3 text-[clamp(44px,6vw,88px)]">
              The investigator
            </h2>
            <PinnedPhoto shot={portrait} sizes="(min-width: 768px) 280px, 70vw" className="reveal mt-10 w-[min(280px,70vw)] rotate-2" />
          </div>
          <div className="reveal md:col-span-7 md:col-start-6">
            <p className="text-[clamp(20px,2vw,26px)] leading-snug text-fg">
              Final-year dual-degree student at <span className="text-amber">IIT Madras</span> (B.S. Data Science &amp;
              Applications) and <span className="text-amber">UIT RGPV</span> (B.Tech. Computer Science), graduating in 2027.
            </p>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">
              I like problems where being slightly wrong is expensive: payments that must not double-charge, bookings that
              must not collide, metrics that must not leak. {profile.seeking}
            </p>
            <Link href="/about" className="label link-underline mt-8 inline-flex min-h-11 items-center gap-2 text-fg">
              Behind the evidence <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- E. Closing CTA ---------- */}
      <section aria-labelledby="close-title" className="relative isolate overflow-hidden border-t border-line">
        <div aria-hidden className="dusk-glow absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_50%_120%,rgba(233,166,70,.35),transparent_70%)]" />
        <div className="wrap py-28 text-center md:py-40">
          <p className="label text-faint">End of the briefing</p>
          <h2 id="close-title" className="display reveal mx-auto mt-5 max-w-[14ch] text-[clamp(52px,8vw,128px)]">
            The files are open. The next move is yours.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/case-files" className="btn btn-fg">
              Open the case files <ArrowRight />
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Make contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

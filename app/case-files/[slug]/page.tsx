import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cases, getCase, neighbours } from "@/content/cases";
import { caseVisuals } from "@/components/diagrams/case-visuals";
import { KindTag } from "@/components/case-card";
import { CopyButton } from "@/components/copy-button";
import { RememberCase } from "@/components/hero/cold-reading";
import { LedgerDemo } from "@/components/ledger-demo";
import { Thumbprint } from "@/components/thumbprint";
import { Gallery } from "@/components/case-study/gallery";
import { PinnedPhoto } from "@/components/case-study/pinned-photo";
import { ArrowLeft, ArrowRight, External } from "@/components/icons";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-files/[slug]">): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  return {
    title: { absolute: `${c.name} — Case ${c.number} | Shubh Ghiya` },
    description: c.summary,
    alternates: { canonical: `/case-files/${c.slug}` },
    openGraph: { title: `${c.name} — Case ${c.number}`, description: c.summary },
  };
}

const sections = [
  ["case", "The case"],
  ["investigation", "The investigation"],
  ["build", "The build"],
  ["evidence", "Evidence"],
  ["lessons", "What I learned"],
  ["links", "Links"],
] as const;

// params are read inside <Suspense> so the shared shell can prerender and navigation stays instant.
export default function CasePage({ params }: PageProps<"/case-files/[slug]">) {
  return (
    <Suspense fallback={<div className="wrap min-h-[70svh] py-20" aria-busy="true" />}>
      <CaseBody params={params} />
    </Suspense>
  );
}

async function CaseBody({ params }: Pick<PageProps<"/case-files/[slug]">, "params">) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const { prev, next } = neighbours(c.slug);
  const Visual = caseVisuals[c.slug];

  return (
    <article>
      <RememberCase slug={c.slug} />
      {/* ---------- Cover ---------- */}
      <header className="relative overflow-hidden border-b border-line">
        {!c.hero && (
          <span
            aria-hidden
            className="display pointer-events-none absolute -top-[0.12em] right-[-0.04em] text-[clamp(220px,38vw,560px)] leading-none text-line"
          >
            {c.number}
          </span>
        )}
        <div className={`wrap relative py-14 md:py-20 ${c.hero ? "lg:min-h-[640px] lg:pr-[calc(44%+var(--gutter))]" : ""}`}>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/case-files" className="label link-underline inline-flex min-h-11 items-center gap-2 text-muted hover:text-fg">
              <ArrowLeft /> Archive
            </Link>
            <span className="label text-faint" aria-hidden>
              /
            </span>
            <span className="label text-alert">
              Case {c.number} of 0{cases.length}
            </span>
            <span className={`stamp stamp-in ml-2 -rotate-3 ${c.status === "LIVE" ? "text-success" : "text-amber"}`}>{c.status}</span>
            {c.award && <span className="stamp stamp-in rotate-2 text-crimson">{c.award}</span>}
          </div>

          <h1 className="display enter mt-8 max-w-[16ch] text-[clamp(52px,8vw,124px)]" style={{ "--i": 1 } as React.CSSProperties}>
            {c.title}
          </h1>
          <p className="enter mt-5 text-[clamp(20px,2vw,26px)] text-fg" style={{ "--i": 2 } as React.CSSProperties}>
            {c.name}
          </p>
          <dl className="label enter mt-6 flex flex-wrap gap-x-8 gap-y-2 !text-[11px] text-faint" style={{ "--i": 3 } as React.CSSProperties}>
            <div className="flex gap-2">
              <dt>File type</dt>
              <dd className="text-muted">{c.classification}</dd>
            </div>
            <div className="flex gap-2">
              <dt>Period</dt>
              <dd className="text-muted">{c.period}</dd>
            </div>
          </dl>
          <div className="enter mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            {c.links.map((l, i) => (
              <a key={l.href} href={l.href} className={`btn ${i === 0 ? "btn-primary" : "btn-ghost"}`}>
                {l.label} {l.href.startsWith("/") ? <ArrowRight /> : <External />}
              </a>
            ))}
          </div>

          {c.hero && (
            <PinnedPhoto
              shot={c.hero}
              priority
              className="enter mt-12 max-w-[640px] rotate-[1.5deg] lg:absolute lg:top-20 lg:right-[var(--gutter)] lg:mt-0 lg:w-[40%] lg:max-w-[600px] lg:rotate-[2.5deg]"
            />
          )}

          <blockquote className="enter mt-14 max-w-[40ch] border-l-2 border-crimson-bright pl-6 text-[clamp(25px,2.6vw,36px)] leading-[1.15] text-muted font-display italic" style={{ "--i": 5 } as React.CSSProperties}>
            {c.opening}
          </blockquote>
          <p className="hand write-in mt-6 ml-8 -rotate-2 text-[clamp(24px,2.2vw,32px)] text-crimson" style={{ "--i": 2 } as React.CSSProperties}>
            {c.note}
          </p>
        </div>
      </header>

      <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
        {/* ---------- Case index: sticky rail on desktop, disclosure on smaller screens ---------- */}
        <aside className="lg:col-span-3">
          <details className="group border border-line lg:hidden">
            <summary className="label flex min-h-12 cursor-pointer list-none items-center justify-between px-4">
              <span>
                Case {c.number} · <span className="text-fg">{c.name}</span>
              </span>
              <span aria-hidden className="transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <CaseIndex current={c.slug} />
          </details>
          <nav aria-label="All case files" className="sticky top-24 hidden lg:block">
            <p className="label mb-3 text-faint">Case index</p>
            <CaseIndex current={c.slug} />
            <p className="label mt-8 mb-3 text-faint">In this file</p>
            <ul className="space-y-1">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="label inline-flex min-h-8 items-center !text-[11px] text-muted hover:text-fg">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 lg:col-span-9">
          {/* 01 The case */}
          <Section id="case" n="01" title="The case">
            <div className="grid gap-10 md:grid-cols-5">
              <p className="measure text-[18px] leading-relaxed text-fg md:col-span-3">{c.problem}</p>
              <div className="md:col-span-2">
                <h3 className="label text-amber">My role</h3>
                <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted">
                  {c.role.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <h3 className="label mt-8 text-amber">Stack</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {c.stack.map((s) => (
                    <li key={s} className="border border-line px-2 py-1 font-mono text-[12px] text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* 02 The investigation */}
          <Section id="investigation" n="02" title="The investigation">
            <div className="grid gap-px border border-line bg-line md:grid-cols-2">
              {c.story.map((s, i) => (
                <div key={s.title} className={`bg-ground p-6 md:p-7 ${c.story.length % 2 === 1 && i === c.story.length - 1 ? "md:col-span-2" : ""}`}>
                  <p className="label !text-[10px] text-faint">Lead {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-[20px] font-semibold text-fg">{s.title}</h3>
                  {s.tag && <p className="label mt-2 !text-[10px] text-amber">{s.tag}</p>}
                  <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden className="mt-[0.72em] h-0.5 w-2.5 shrink-0 bg-crimson-bright" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* 03 The build */}
          <Section id="build" n="03" title="The build">
            {Visual && <Visual />}
          </Section>

          {c.shots && (
            <Section id="field" n="Photos" title="From the field">
              <Gallery shots={c.shots} name={c.name} />
            </Section>
          )}

          {c.slug === "idempotent-event-processor" && (
            <Section id="interrogate" n="Live" title="Interrogate it yourself">
              <p className="measure mb-8 text-[17px] leading-relaxed text-muted">
                This talks to the real service running on AWS EC2: PostgreSQL, Redis Streams, relay and workers. Try to make it
                charge twice. <span className="hand text-[22px] text-crimson">You won&apos;t.</span>
              </p>
              <LedgerDemo />
            </Section>
          )}

          {/* 04 Evidence */}
          <Section id="evidence" n="04" title="Evidence">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {c.evidence.map((e, i) => (
                <div key={e.label} className="manila reveal flex flex-col p-5" style={{ rotate: `${[-0.5, 0.3, -0.2, 0.4][i % 4]}deg` }}>
                  <span className="label !text-[10px] text-tag-muted">Exhibit {c.number}-{String.fromCharCode(65 + i)}</span>
                  <span className="display mt-4 text-[clamp(34px,3.2vw,48px)] text-tag-ink">{e.value}</span>
                  <span className="mt-1 text-[14px] leading-snug text-tag-muted">{e.label}</span>
                  <span className="mt-auto pt-5">
                    <KindTag kind={e.kind} onPaper />
                    {e.note && <span className="mt-1 block text-[12px] text-tag-muted">{e.note}</span>}
                  </span>
                </div>
              ))}
            </div>
            {c.caveat && <p className="mt-6 border-l-2 border-amber pl-4 text-[14px] text-muted">{c.caveat}</p>}
          </Section>

          {/* 05 Lessons */}
          <Section id="lessons" n="05" title="What I learned">
            <ol className="space-y-6">
              {c.lessons.map((l, i) => (
                <li key={l} className="reveal grid grid-cols-[48px_1fr] gap-4 border-t border-line pt-6">
                  <span className="display text-4xl text-crimson-bright">{i + 1}</span>
                  <p className="measure text-[18px] leading-relaxed text-fg">{l}</p>
                </li>
              ))}
            </ol>
          </Section>

          {/* 06 Links */}
          <Section id="links" n="06" title="Links">
            <ul className="border-t border-line">
              {c.links.map((l) => (
                <li key={l.href} className="border-b border-line">
                  <a href={l.href} className="group flex min-h-16 flex-wrap items-center justify-between gap-3 py-4">
                    <span className="display text-3xl transition-colors group-hover:text-alert">{l.label}</span>
                    <span className="label inline-flex items-center gap-2 break-all !text-[11px] text-faint">
                      {l.href.replace(/^https?:\/\//, "")} <External />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {c.cli && (
              <div className="mt-6 border border-line bg-sunk p-5">
                <p className="label mb-3 !text-[11px] text-faint">Run the CLI</p>
                <CopyButton text={c.cli} label="Copy command" />
              </div>
            )}
            <p className="label mt-6 !text-[10px] text-faint">Facts and links last verified {c.lastVerified}</p>
          </Section>

          {/* Next file + contact nudge */}
          <nav aria-label="Previous and next case" className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2">
            {prev ? (
              <Link href={`/case-files/${prev.slug}`} className="group bg-ground p-6 hover:bg-sunk">
                <span className="label inline-flex items-center gap-2 text-faint">
                  <ArrowLeft /> Previous · Case {prev.number}
                </span>
                <span className="display mt-3 block text-[clamp(28px,3vw,44px)] group-hover:text-alert">{prev.title}</span>
              </Link>
            ) : (
              <Link href="/case-files" className="group bg-ground p-6 hover:bg-sunk">
                <span className="label inline-flex items-center gap-2 text-faint">
                  <ArrowLeft /> Back
                </span>
                <span className="display mt-3 block text-[clamp(28px,3vw,44px)] group-hover:text-alert">The case archive</span>
              </Link>
            )}
            {next ? (
              <Link href={`/case-files/${next.slug}`} className="group bg-ground p-6 text-right hover:bg-sunk">
                <span className="label inline-flex items-center gap-2 text-faint">
                  Next file · Case {next.number} <ArrowRight />
                </span>
                <span className="display mt-3 block text-[clamp(28px,3vw,44px)] group-hover:text-alert">{next.title}</span>
              </Link>
            ) : (
              <Link href="/contact" className="group bg-crimson/15 p-6 text-right hover:bg-crimson/25">
                <span className="label inline-flex items-center gap-2 text-alert">
                  Final file · Case 08 <ArrowRight />
                </span>
                <span className="display mt-3 block text-[clamp(28px,3vw,44px)]">Red John</span>
              </Link>
            )}
          </nav>
          <div className="relative mt-10 flex items-end justify-between gap-6 border-t border-line pt-8">
            <div>
              <p className="display text-[clamp(32px,3.4vw,48px)]">Case closed.</p>
              <p className="mt-2 text-[15px] text-muted">
                Want to talk about this case?{" "}
                <Link href="/contact" className="link-underline text-fg">
                  Make contact
                </Link>
                .
              </p>
            </div>
            <Thumbprint id={`tp-${c.slug}`} className="w-[clamp(72px,9vw,120px)] shrink-0 rotate-[12deg]" />
          </div>
        </div>
      </div>
    </article>
  );
}

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`${id}-h`} className="mb-20 scroll-mt-24 last:mb-0" id={id}>
      <h2 id={`${id}-h`} className="mb-8 flex items-baseline gap-4 border-b border-line pb-4">
        <span className="label text-alert">{n}</span>
        <span className="display text-[clamp(36px,4vw,60px)]">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function CaseIndex({ current }: { current: string }) {
  return (
    <ol className="border-t border-line">
      {cases.map((x) => (
        <li key={x.slug} className="border-b border-line">
          <Link
            href={`/case-files/${x.slug}`}
            aria-current={x.slug === current ? "page" : undefined}
            className="flex min-h-11 items-center gap-3 px-4 py-2 text-[14px] text-muted hover:text-fg aria-[current=page]:bg-sunk aria-[current=page]:text-fg lg:px-0 lg:aria-[current=page]:bg-transparent"
          >
            <span className="label w-6 !text-[11px] text-faint">{x.number}</span>
            <span className="flex-1">{x.name}</span>
            {x.slug === current && <span aria-hidden className="h-1.5 w-1.5 bg-crimson-bright" />}
          </Link>
        </li>
      ))}
    </ol>
  );
}

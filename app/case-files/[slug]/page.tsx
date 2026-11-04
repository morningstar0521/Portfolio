import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cases, getCase, neighbours } from "@/content/cases";
import { caseVisuals } from "@/components/diagrams/case-visuals";
import { KindTag } from "@/components/case-card";
import { CopyButton } from "@/components/copy-button";
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
      {/* ---------- Cover ---------- */}
      <header className="relative overflow-hidden border-b border-line">
        <span
          aria-hidden
          className="display pointer-events-none absolute -top-[0.12em] right-[-0.04em] text-[clamp(220px,38vw,560px)] leading-none text-ink-soft"
        >
          {c.number}
        </span>
        <div className="wrap relative py-14 md:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/case-files" className="label link-underline inline-flex min-h-11 items-center gap-2 text-paper-muted hover:text-paper">
              <ArrowLeft /> Archive
            </Link>
            <span className="label text-ash" aria-hidden>
              /
            </span>
            <span className="label text-signal">
              Case {c.number} of 0{cases.length}
            </span>
            <span className={`stamp stamp-in ml-2 -rotate-3 ${c.status === "LIVE" ? "text-success" : "text-brass"}`}>{c.status}</span>
          </div>

          <h1 className="display enter mt-8 max-w-[14ch] text-[clamp(60px,10vw,168px)]" style={{ "--i": 1 } as React.CSSProperties}>
            {c.title}
          </h1>
          <p className="enter mt-5 text-[clamp(20px,2vw,26px)] text-paper" style={{ "--i": 2 } as React.CSSProperties}>
            {c.name}
          </p>
          <dl className="label enter mt-6 flex flex-wrap gap-x-8 gap-y-2 !text-[11px] text-ash" style={{ "--i": 3 } as React.CSSProperties}>
            <div className="flex gap-2">
              <dt>File type</dt>
              <dd className="text-paper-muted">{c.classification}</dd>
            </div>
            <div className="flex gap-2">
              <dt>Period</dt>
              <dd className="text-paper-muted">{c.period}</dd>
            </div>
          </dl>
          <div className="enter mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            {c.links.map((l, i) => (
              <a key={l.href} href={l.href} className={`btn ${i === 0 ? "btn-primary" : "btn-ghost"}`}>
                {l.label} <External />
              </a>
            ))}
          </div>

          <blockquote className="enter mt-14 max-w-[40ch] border-l-2 border-crimson-bright pl-6 text-[clamp(20px,2.1vw,28px)] leading-snug text-paper-muted" style={{ "--i": 5 } as React.CSSProperties}>
            {c.opening}
          </blockquote>
        </div>
      </header>

      <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
        {/* ---------- Case index: sticky rail on desktop, disclosure on smaller screens ---------- */}
        <aside className="lg:col-span-3">
          <details className="group border border-line lg:hidden">
            <summary className="label flex min-h-12 cursor-pointer list-none items-center justify-between px-4">
              <span>
                Case {c.number} · <span className="text-paper">{c.name}</span>
              </span>
              <span aria-hidden className="transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <CaseIndex current={c.slug} />
          </details>
          <nav aria-label="All case files" className="sticky top-24 hidden lg:block">
            <p className="label mb-3 text-ash">Case index</p>
            <CaseIndex current={c.slug} />
            <p className="label mt-8 mb-3 text-ash">In this file</p>
            <ul className="space-y-1">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="label inline-flex min-h-8 items-center !text-[11px] text-paper-muted hover:text-paper">
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
              <p className="measure text-[18px] leading-relaxed text-paper md:col-span-3">{c.problem}</p>
              <div className="md:col-span-2">
                <h3 className="label text-brass">My role</h3>
                <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-paper-muted">
                  {c.role.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <h3 className="label mt-8 text-brass">Stack</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {c.stack.map((s) => (
                    <li key={s} className="border border-line px-2 py-1 font-mono text-[12px] text-paper-muted">
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
                <div key={s.title} className={`bg-ink p-6 md:p-7 ${c.story.length % 2 === 1 && i === c.story.length - 1 ? "md:col-span-2" : ""}`}>
                  <p className="label !text-[10px] text-ash">Lead {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-[20px] font-semibold text-paper">{s.title}</h3>
                  {s.tag && <p className="label mt-2 !text-[10px] text-brass">{s.tag}</p>}
                  <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-paper-muted">
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

          {/* 04 Evidence */}
          <Section id="evidence" n="04" title="Evidence">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {c.evidence.map((e, i) => (
                <div key={e.label} className="paper reveal flex flex-col p-5" style={{ rotate: `${[-0.5, 0.3, -0.2, 0.4][i % 4]}deg` }}>
                  <span className="label !text-[10px] text-paper-ink-muted">Exhibit {c.number}-{String.fromCharCode(65 + i)}</span>
                  <span className="display mt-4 text-[clamp(34px,3.2vw,48px)] text-paper-ink">{e.value}</span>
                  <span className="mt-1 text-[14px] leading-snug text-paper-ink-muted">{e.label}</span>
                  <span className="mt-auto pt-5">
                    <KindTag kind={e.kind} onPaper />
                    {e.note && <span className="mt-1 block text-[12px] text-paper-ink-muted">{e.note}</span>}
                  </span>
                </div>
              ))}
            </div>
            {c.caveat && <p className="mt-6 border-l-2 border-brass pl-4 text-[14px] text-paper-muted">{c.caveat}</p>}
          </Section>

          {/* 05 Lessons */}
          <Section id="lessons" n="05" title="What I learned">
            <ol className="space-y-6">
              {c.lessons.map((l, i) => (
                <li key={l} className="reveal grid grid-cols-[48px_1fr] gap-4 border-t border-line pt-6">
                  <span className="display text-4xl text-crimson-bright">{i + 1}</span>
                  <p className="measure text-[18px] leading-relaxed text-paper">{l}</p>
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
                    <span className="display text-3xl transition-colors group-hover:text-signal">{l.label}</span>
                    <span className="label inline-flex items-center gap-2 break-all !text-[11px] text-ash">
                      {l.href.replace(/^https?:\/\//, "")} <External />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {c.cli && (
              <div className="mt-6 border border-line bg-ink-soft p-5">
                <p className="label mb-3 !text-[11px] text-ash">Run the CLI</p>
                <CopyButton text={c.cli} label="Copy command" />
              </div>
            )}
            <p className="label mt-6 !text-[10px] text-ash">Facts and links last verified {c.lastVerified}</p>
          </Section>

          {/* Next file + contact nudge */}
          <nav aria-label="Previous and next case" className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2">
            {prev ? (
              <Link href={`/case-files/${prev.slug}`} className="group bg-ink p-6 hover:bg-ink-soft">
                <span className="label inline-flex items-center gap-2 text-ash">
                  <ArrowLeft /> Previous · Case {prev.number}
                </span>
                <span className="display mt-3 block text-[clamp(28px,3vw,44px)] group-hover:text-signal">{prev.title}</span>
              </Link>
            ) : (
              <Link href="/case-files" className="group bg-ink p-6 hover:bg-ink-soft">
                <span className="label inline-flex items-center gap-2 text-ash">
                  <ArrowLeft /> Back
                </span>
                <span className="display mt-3 block text-[clamp(28px,3vw,44px)] group-hover:text-signal">The case archive</span>
              </Link>
            )}
            {next ? (
              <Link href={`/case-files/${next.slug}`} className="group bg-ink p-6 text-right hover:bg-ink-soft">
                <span className="label inline-flex items-center gap-2 text-ash">
                  Next file · Case {next.number} <ArrowRight />
                </span>
                <span className="display mt-3 block text-[clamp(28px,3vw,44px)] group-hover:text-signal">{next.title}</span>
              </Link>
            ) : (
              <Link href="/contact" className="group bg-crimson/15 p-6 text-right hover:bg-crimson/25">
                <span className="label inline-flex items-center gap-2 text-signal">
                  Final file · Case 08 <ArrowRight />
                </span>
                <span className="display mt-3 block text-[clamp(28px,3vw,44px)]">Red John</span>
              </Link>
            )}
          </nav>
          <p className="mt-8 text-[15px] text-paper-muted">
            Want to talk about this case?{" "}
            <Link href="/contact" className="link-underline text-paper">
              Make contact
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`${id}-h`} className="mb-20 scroll-mt-24 last:mb-0" id={id}>
      <h2 id={`${id}-h`} className="mb-8 flex items-baseline gap-4 border-b border-line pb-4">
        <span className="label text-signal">{n}</span>
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
            className="flex min-h-11 items-center gap-3 px-4 py-2 text-[14px] text-paper-muted hover:text-paper aria-[current=page]:bg-ink-soft aria-[current=page]:text-paper lg:px-0 lg:aria-[current=page]:bg-transparent"
          >
            <span className="label w-6 !text-[11px] text-ash">{x.number}</span>
            <span className="flex-1">{x.name}</span>
            {x.slug === current && <span aria-hidden className="h-1.5 w-1.5 bg-crimson-bright" />}
          </Link>
        </li>
      ))}
    </ol>
  );
}

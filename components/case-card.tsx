import Link from "next/link";
import { type CaseFile, evidenceLabel } from "@/content/cases";
import { ArrowRight, External } from "./icons";

export function KindTag({ kind, onPaper = false }: { kind: keyof typeof evidenceLabel; onPaper?: boolean }) {
  const prod = kind === "production";
  return (
    <span
      className={`label inline-flex items-center gap-1.5 !text-[10px] ${onPaper ? "text-paper-ink-muted" : "text-ash"}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 ${prod ? "bg-success" : onPaper ? "border border-paper-ink-muted" : "border border-ash"}`} />
      {evidenceLabel[kind]}
    </span>
  );
}

export function CaseCard({ c, featured = false }: { c: CaseFile; featured?: boolean }) {
  const live = c.links.find((l) => l.kind === "live");
  const source = c.links.find((l) => l.kind === "source");
  return (
    <article className="group relative flex h-full flex-col border border-line bg-ink-soft transition-colors hover:border-ash">
      {/* File tab */}
      <div className="flex items-stretch justify-between border-b border-line">
        <span className="label flex items-center bg-paper px-3 py-2 !text-[11px] text-paper-ink">Case {c.number}</span>
        <span className="label flex items-center px-3 !text-[10px] text-ash">{c.categories.join(" / ")}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className={`display text-paper ${featured ? "text-[clamp(40px,4.4vw,68px)]" : "text-[clamp(34px,3vw,46px)]"}`}>
            <Link href={`/case-files/${c.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {c.title}
            </Link>
          </h3>
          <span className={`stamp mt-1 shrink-0 ${c.status === "LIVE" ? "text-success" : "text-brass"}`}>{c.status}</span>
        </div>
        <p className="label mt-2 text-paper-muted">{c.name}</p>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-paper-muted">{c.summary}</p>

        <div className="mt-6 border-l-2 border-crimson-bright pl-4">
          <p className="display text-[clamp(28px,2.6vw,40px)] text-paper">{c.headline.value}</p>
          <p className="text-[13px] leading-snug text-paper-muted">{c.headline.label}</p>
          <div className="mt-1.5">
            <KindTag kind={c.headline.kind} />
          </div>
        </div>

        <ul className="label mt-6 flex flex-wrap gap-x-3 gap-y-1 !text-[11px] text-ash" aria-label="Stack">
          {c.stackShort.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          <span className="label inline-flex items-center gap-2 text-paper transition-colors group-hover:text-signal">
            Open case <ArrowRight />
          </span>
          {live && (
            <a href={live.href} className="label relative z-10 inline-flex min-h-11 items-center gap-1.5 text-paper-muted hover:text-paper">
              Live demo <External />
              <span className="sr-only">(opens {c.name} live site)</span>
            </a>
          )}
          {source && (
            <a href={source.href} className="label relative z-10 inline-flex min-h-11 items-center gap-1.5 text-paper-muted hover:text-paper">
              Source <External />
              <span className="sr-only">({c.name} on GitHub)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

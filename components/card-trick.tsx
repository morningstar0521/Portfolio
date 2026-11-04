"use client";

import Link from "next/link";
import { useState } from "react";
import { cases } from "@/content/cases";
import { ArrowRight } from "./icons";

// Theatre, not mind reading: the "prediction" is written after the pick, and the note admits it.
const roles = [
  { id: "backend", label: "Backend", suit: "♠", files: ["idempotent-event-processor", "nakhrali", "quickpark"] },
  { id: "fullstack", label: "Full-stack", suit: "♥", files: ["nakhrali", "venturelens", "quickpark"] },
  { id: "ml", label: "Machine learning", suit: "♦", files: ["movielens", "comment-category-prediction"] },
  { id: "ai", label: "AI / LLM apps", suit: "♣", files: ["venturelens", "movielens"] },
];

export function CardTrick() {
  const [pick, setPick] = useState<string | null>(null);
  const chosen = roles.find((r) => r.id === pick);

  return (
    <div>
      <div className="mx-auto grid max-w-[960px] grid-cols-2 gap-4 md:grid-cols-4" role="group" aria-label="Pick the role you are hiring for">
        {roles.map((r, i) => {
          const flipped = pick === r.id;
          return (
            <div key={r.id} className="trick-card" data-flipped={flipped}>
              <div className="inner">
                <button
                  type="button"
                  onClick={() => setPick(r.id)}
                  aria-pressed={flipped}
                  disabled={!!pick && !flipped}
                  className="front flex aspect-[5/7] flex-col justify-between border border-line bg-card p-4 text-left shadow-[0_14px_24px_-16px_rgba(60,30,5,.6)] transition-transform duration-300 hover:-translate-y-1.5 disabled:opacity-40 disabled:hover:translate-y-0"
                  style={{ rotate: `${[-2, 1, -1, 2][i]}deg` }}
                >
                  <span className="display text-3xl text-crimson" aria-hidden>
                    {r.suit}
                  </span>
                  <span className="display text-[clamp(22px,2.2vw,32px)] leading-[1] text-fg">{r.label}</span>
                  <span className="display self-end text-3xl text-crimson" aria-hidden>
                    {r.suit}
                  </span>
                </button>
                <div aria-hidden={!flipped} className="back manila flex aspect-[5/7] flex-col justify-center p-4 text-center">
                  <p className="hand text-[clamp(20px,2vw,28px)] leading-tight text-tag-ink">
                    {r.label}.
                    <br />I knew you&apos;d pick that one.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-10 min-h-[1px]">
        {chosen && (
          <div className="enter grid gap-6 border-t border-line pt-8 md:grid-cols-12">
            <p className="hand text-[22px] leading-snug text-muted md:col-span-4">
              Wrote it down before you chose. <span className="text-faint">(I didn&apos;t. But it works more often than you&apos;d think.)</span>
            </p>
            <ul className="grid gap-3 md:col-span-8 md:grid-cols-2">
              {chosen.files.map((slug) => {
                const c = cases.find((x) => x.slug === slug)!;
                return (
                  <li key={slug}>
                    <Link href={`/case-files/${slug}`} className="group flex h-full flex-col border border-line bg-card p-4 hover:border-fg">
                      <span className="label !text-[10px] text-faint">Case {c.number} · {c.name}</span>
                      <span className="display mt-1 text-[26px] leading-[1] group-hover:text-crimson">{c.title}</span>
                      <span className="mt-2 text-[13px] text-muted">
                        {c.headline.value} · {c.headline.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <button type="button" onClick={() => setPick(null)} className="label inline-flex min-h-11 items-center gap-2 text-fg hover:text-crimson">
                  Shuffle and pick again <ArrowRight />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

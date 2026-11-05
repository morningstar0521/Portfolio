"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cases } from "@/content/cases";
import { ArrowRight } from "./icons";

// Theatre, not mind reading: the "prediction" is written after the pick, and the note admits it.
const roles = [
  { id: "backend", label: "Backend", suit: "♠", files: ["idempotent-event-processor", "nakhrali", "quickpark"] },
  { id: "fullstack", label: "Full-stack", suit: "♥", files: ["nakhrali", "venturelens", "quickpark"] },
  { id: "ml", label: "Machine learning", suit: "♦", files: ["movielens", "comment-category-prediction"] },
  { id: "ai", label: "AI / LLM apps", suit: "♣", files: ["venturelens", "movielens"] },
];

// A new order that is never the same as the current one.
function reshuffle(ids: string[]) {
  let next = ids;
  while (next.join() === ids.join()) next = [...ids].sort(() => Math.random() - 0.5);
  return next;
}

export function CardTrick() {
  const [pick, setPick] = useState<string | null>(null);
  const [order, setOrder] = useState(() => roles.map((r) => r.id));
  const [shuffling, setShuffling] = useState(false);
  const chosen = roles.find((r) => r.id === pick);
  // Picking disables the other cards, so move focus to the result instead of dropping it on <body>.
  const result = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const cards = useRef(new Map<string, HTMLDivElement>());
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const dealing = useRef(false);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));

  function choose(id: string) {
    setPick(id);
    requestAnimationFrame(() => result.current?.focus());
  }
  const focusFirst = () => deck.current?.querySelector("button")?.focus();

  // Distance from a card's resting slot to the middle of the deck.
  function toCentre(el: HTMLDivElement) {
    const d = deck.current!.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return [d.left + d.width / 2 - (r.left + r.width / 2), d.top + d.height / 2 - (r.top + r.height / 2)];
  }

  // Gather the cards into one pile, riffle twice, then deal them back out in a new order.
  function shuffle() {
    setPick(null);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOrder(reshuffle);
      requestAnimationFrame(focusFirst);
      return;
    }
    setShuffling(true);
    order.forEach((id, k) => {
      const el = cards.current.get(id)!;
      const [dx, dy] = toCentre(el);
      el.style.setProperty("--dx", `${dx}px`);
      el.style.setProperty("--dy", `${dy - k * 3}px`);
      el.style.setProperty("--s", k % 2 ? "1" : "-1");
      el.style.zIndex = String(10 + k);
      el.style.transition = "translate 420ms cubic-bezier(.2,.7,.2,1)";
      el.style.translate = `${dx}px ${dy - k * 3}px`;
    });
    later(() => cards.current.forEach((el) => el.classList.add("riffle")), 450);
    later(() => {
      cards.current.forEach((el) => el.classList.remove("riffle"));
      dealing.current = true;
      setOrder(reshuffle);
    }, 1100);
  }

  // After the new order renders, start every card from the pile and slide it to its new slot.
  useLayoutEffect(() => {
    if (!dealing.current) return;
    dealing.current = false;
    order.forEach((id, k) => {
      const el = cards.current.get(id)!;
      el.style.transition = "none";
      el.style.translate = "none";
      const [dx, dy] = toCentre(el);
      el.style.translate = `${dx}px ${dy}px`;
      void el.offsetWidth; // commit the start position before animating away from it
      el.style.transition = `translate 560ms cubic-bezier(.2,.7,.2,1) ${k * 90}ms`;
      el.style.translate = "";
    });
    later(() => {
      cards.current.forEach((el) => {
        el.style.transition = "";
        el.style.zIndex = "";
      });
      setShuffling(false);
      requestAnimationFrame(focusFirst);
    }, 560 + order.length * 90);
  }, [order]);

  return (
    <div>
      <div ref={deck} className="mx-auto grid max-w-[960px] grid-cols-2 gap-4 md:grid-cols-4" role="group" aria-label="Pick the role you are hiring for">
        {order.map((id, i) => {
          const r = roles.find((x) => x.id === id)!;
          const flipped = pick === r.id;
          return (
            <div
              key={r.id}
              ref={(el) => {
                if (el) cards.current.set(r.id, el);
                else cards.current.delete(r.id);
              }}
              className="trick-card deal relative"
              data-flipped={flipped}
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="inner">
                <button
                  type="button"
                  onClick={() => choose(r.id)}
                  aria-pressed={flipped}
                  disabled={shuffling || (!!pick && !flipped)}
                  className="front flex aspect-[5/7] flex-col justify-between border border-line bg-card p-4 text-left shadow-[0_14px_24px_-16px_rgba(60,30,5,.6)] transition-transform duration-300 hover:-translate-y-1.5 disabled:hover:translate-y-0 [&:disabled:not([aria-busy])]:opacity-40"
                  aria-busy={shuffling || undefined}
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
          <div ref={result} tabIndex={-1} aria-label={`Recommended case files for ${chosen.label}`} className="enter grid gap-6 border-t border-line pt-8 md:grid-cols-12">
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
                <button type="button" onClick={shuffle} disabled={shuffling} className="label inline-flex min-h-11 items-center gap-2 text-fg hover:text-crimson">
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

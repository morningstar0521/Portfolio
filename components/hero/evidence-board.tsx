import Link from "next/link";
import { cases } from "@/content/cases";

// Card centres on a 100x100 board, plus a small tilt. Loose 3x3 with the subject in the middle.
const spots = [
  { x: 17, y: 12, r: -3 },
  { x: 50, y: 9, r: 2 },
  { x: 83, y: 14, r: -1.5 },
  { x: 83, y: 47, r: 2.5 },
  { x: 17, y: 80, r: -2 },
  { x: 17, y: 46, r: 1.5 },
  { x: 50, y: 83, r: 1 },
];
const subject = { x: 50, y: 45 };
const redJohn = { x: 83, y: 80 };

const highlight = cases
  .map(
    (c) =>
      `.board:has([data-n="${c.number}"]:is(:hover,:focus-visible)) line[data-n="${c.number}"]{stroke:var(--color-crimson-bright);stroke-width:2}`,
  )
  .join("");

export function EvidenceBoard() {
  return (
    <div role="group" className="board relative aspect-[1/1.02] w-full select-none" aria-label="Evidence board: seven case files">
      <style>{highlight}</style>

      {/* Strings: the subject connects to every file; one crimson thread leads to the final file. */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {cases.map((c, i) => (
          <line
            key={c.slug}
            data-n={c.number}
            className="board-string"
            style={{ "--i": i } as React.CSSProperties}
            x1={subject.x}
            y1={subject.y}
            x2={spots[i].x}
            y2={spots[i].y}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <line
          className="board-string"
          style={{ stroke: "var(--color-crimson)", "--i": 8 } as React.CSSProperties}
          x1={subject.x}
          y1={subject.y}
          x2={redJohn.x}
          y2={redJohn.y}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Subject card */}
      <div
        className="paper absolute w-[34%] -translate-x-1/2 -translate-y-1/2 p-3 shadow-[0_20px_40px_-16px_rgba(0,0,0,.8)] xl:p-4"
        style={{ left: `${subject.x}%`, top: `${subject.y}%` }}
      >
        <Pin />
        <p className="label !text-[10px] text-paper-ink-muted">Subject</p>
        <p className="display text-[clamp(22px,2.4vw,38px)]">Shubh Ghiya</p>
        <dl className="label mt-2 grid grid-cols-[auto_1fr] gap-x-3 !text-[10px] text-paper-ink-muted">
          <dt>Files</dt>
          <dd className="text-paper-ink">07</dd>
          <dt>Status</dt>
          <dd className="text-crimson">Open</dd>
        </dl>
      </div>

      {cases.map((c, i) => (
        <Link
          key={c.slug}
          href={`/case-files/${c.slug}`}
          data-n={c.number}
          className="board-card group absolute w-[31%] -translate-x-1/2 -translate-y-1/2 outline-offset-4"
          style={{ left: `${spots[i].x}%`, top: `${spots[i].y}%`, "--r": `${spots[i].r}deg`, "--i": i } as React.CSSProperties}
        >
          <span className="block border border-line bg-panel p-3 xl:p-4">
            <Pin muted />
            <span className="label block !text-[10px] text-ash">File {c.number}</span>
            <span className="display mt-1.5 block text-[clamp(15px,1.45vw,22px)] text-paper group-hover:text-white">{c.title}</span>
            <span className="label mt-1 block !text-[10px] !tracking-[0.1em] text-paper-muted">{c.name}</span>
          </span>
          {/* Clue: one verified result, shown on hover or keyboard focus */}
          <span className={`clue absolute ${spots[i].y > 70 ? "bottom-full mb-2" : "top-full mt-2"} ${spots[i].x > 70 ? "right-0" : "left-0"} z-10 block w-[150%] max-w-[260px] border-l-2 border-crimson-bright bg-ink px-3 py-2 text-left shadow-xl`}>
            <span className="label block !text-[10px] text-brass">{c.categories.join(" / ")}</span>
            <span className="display mt-1 block text-xl text-paper">{c.headline.value}</span>
            <span className="block text-[12px] leading-snug text-paper-muted">{c.headline.label}</span>
          </span>
        </Link>
      ))}

      <Link
        href="/contact"
        className="board-card absolute w-[27%] -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${redJohn.x}%`, top: `${redJohn.y}%`, "--r": "-4deg", "--i": 7 } as React.CSSProperties}
      >
        <span className="block border border-crimson bg-crimson/15 p-3 xl:p-4">
          <span className="label block !text-[10px] text-signal">File 08</span>
          <span className="display mt-1.5 block text-[clamp(18px,1.8vw,28px)] text-paper">Red John</span>
          <span className="label mt-1 block !text-[10px] text-paper-muted">Make contact</span>
        </span>
      </Link>
    </div>
  );
}

function Pin({ muted = false }: { muted?: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute -top-1.5 left-1/2 block h-3 w-3 -translate-x-1/2 rounded-full ${muted ? "bg-ash" : "bg-crimson"} shadow-[0_2px_3px_rgba(0,0,0,.6)]`}
    />
  );
}

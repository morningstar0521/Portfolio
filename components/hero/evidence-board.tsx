import Link from "next/link";
import Image from "next/image";
import { cases } from "@/content/cases";
import { portrait } from "@/content/profile";
import { Thumbprint } from "../thumbprint";

// Card centres on a 100x100 board, plus a small tilt. Loose 3x3 with the subject in the middle.
const spots = [
  { x: 19, y: 15, r: -3 },
  { x: 50, y: 12, r: 2 },
  { x: 81, y: 16, r: -1.5 },
  { x: 81, y: 48, r: 2.5 },
  { x: 19, y: 81, r: -2 },
  { x: 19, y: 48, r: 1.5 },
  { x: 50, y: 84, r: 1 },
];
const subject = { x: 50, y: 47 };
const area: Record<string, string> = { BACKEND: "Backend", "FULL-STACK": "Full-stack", "MACHINE LEARNING": "ML", AI: "AI", "DEVELOPER TOOLS": "Dev tools" };
const redJohn = { x: 81, y: 81 };

const highlight = cases
  .map(
    (c) =>
      `.board:has([data-n="${c.number}"]:is(:hover,:focus-visible)) line[data-n="${c.number}"]{stroke:var(--color-crimson);stroke-width:2.5}`,
  )
  .join("");

export function EvidenceBoard() {
  return (
    <div role="group" className="board cork relative aspect-[1/1.02] w-full select-none" aria-label="Evidence board: seven case files">
      <style>{highlight}</style>

      {/* Red string from the subject to every file. */}
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
            y2={spots[i].y - 6}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <line
          className="board-string"
          style={{ stroke: "#1a0d08", "--i": 8 } as React.CSSProperties}
          x1={subject.x}
          y1={subject.y}
          x2={redJohn.x}
          y2={redJohn.y - 6}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Subject: the pinned photo every case board starts with */}
      <figure
        className="board-subject absolute w-[27%] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] bg-paper p-1.5 pb-8 shadow-[0_20px_34px_-14px_rgba(40,20,5,.75)] xl:p-2 xl:pb-10"
        style={{ left: `${subject.x}%`, top: `${subject.y}%` }}
      >
        <Pin />
        <Image src={portrait.src} alt="Shubh Ghiya" width={portrait.width} height={portrait.height} sizes="200px" priority className="h-auto w-full" />
        <figcaption className="hand absolute right-2 bottom-1.5 left-2 text-center text-[clamp(16px,1.5vw,24px)] leading-none text-tag-ink xl:bottom-2">
          Shubh Ghiya
        </figcaption>
      </figure>

      {cases.map((c, i) => (
        <Link
          key={c.slug}
          href={`/case-files/${c.slug}`}
          data-n={c.number}
          className="board-card group absolute w-[29%] -translate-x-1/2 -translate-y-1/2 outline-offset-4"
          style={{ left: `${spots[i].x}%`, top: `${spots[i].y}%`, "--r": `${spots[i].r}deg`, "--i": i } as React.CSSProperties}
        >
          <span className="manila relative block p-3 xl:p-4">
            <Pin muted={i % 2 === 1} />
            <span className="label block !text-[10px] text-tag-muted">
              {c.number} · {area[c.categories[0]]}
            </span>
            <span className="display mt-1.5 block text-[clamp(17px,1.65vw,26px)] leading-[1.02] text-tag-ink group-hover:text-crimson">{c.title}</span>
          </span>
          {/* Clue: one verified result, shown on hover or keyboard focus */}
          <span
            className={`clue absolute ${spots[i].y > 70 ? "bottom-full mb-2" : "top-full mt-2"} ${spots[i].x > 70 ? "right-0" : "left-0"} z-10 block w-[150%] max-w-[260px] bg-paper px-3 py-2 text-left text-tag-ink shadow-xl`}
          >
            <span className="label block !text-[10px] text-[#82540e]">{c.name}</span>
            <span className="display mt-1 block text-2xl">{c.headline.value}</span>
            <span className="block text-[12px] leading-snug text-tag-muted">{c.headline.label}</span>
          </span>
        </Link>
      ))}

      <Link
        href="/contact"
        className="board-card absolute w-[27%] -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${redJohn.x}%`, top: `${redJohn.y}%`, "--r": "-4deg", "--i": 7 } as React.CSSProperties}
      >
        <span className="relative block bg-[#16090a] p-3 shadow-[0_18px_30px_-14px_rgba(0,0,0,.8)] xl:p-4">
          <Pin />
          <span className="label block !text-[10px] text-[#f07a88]">File 08</span>
          <span className="display mt-1 block text-[clamp(20px,2vw,30px)] text-[#f3e9d7]">Red John</span>
          <span className="hand mt-0.5 block text-[16px] text-[#cdbfa8]">make contact</span>
          <Thumbprint id="tp-board" className="absolute -right-[18%] -bottom-[42%] w-[46%] rotate-[-14deg] !text-[#c4283f]" />
        </span>
      </Link>

    </div>
  );
}

function Pin({ muted = false }: { muted?: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute -top-1.5 left-1/2 block h-3.5 w-3.5 -translate-x-1/2 rounded-full ${muted ? "bg-[#d9a13b]" : "bg-crimson-bright"} shadow-[inset_-2px_-2px_3px_rgba(0,0,0,.35),0_3px_4px_rgba(0,0,0,.45)]`}
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import { cases } from "@/content/cases";

// A Jane-style "cold reading" built only from what the browser already knows.
// Nothing is sent anywhere; the last case visited lives in this browser's localStorage.
function read(): string[] {
  const lines: string[] = [];
  const h = new Date().getHours();
  lines.push(
    h < 5 || h >= 23
      ? "It's late. People who read portfolios at this hour usually have an interview tomorrow."
      : h < 12
        ? "Morning. You'd think coffee, but I'd say you're a tea person."
        : h < 17
          ? "Afternoon. A gap between meetings, and you chose to spend it here."
          : "Evening. The day's work is done, so this is the careful read.",
  );

  let ref = "";
  try {
    ref = document.referrer ? new URL(document.referrer).hostname : "";
  } catch {}
  if (ref.includes("linkedin")) lines.push("You came from LinkedIn. A recruiter, or an engineer checking my work?");
  else if (ref.includes("github")) lines.push("You came from GitHub. You've already looked at the code.");
  else if (ref.includes("google") || ref.includes("bing")) lines.push("You searched for my name. Someone mentioned me.");
  else if (matchMedia("(pointer: coarse)").matches) lines.push("You're on your phone, between two other things. I'll keep it short.");
  else lines.push("A big screen and your full attention. You're evaluating, not browsing.");

  let last: string | null = null;
  try {
    last = localStorage.getItem("lastCase");
  } catch {}
  const c = cases.find((x) => x.slug === last);
  lines.push(
    c
      ? `You've been here before. Case ${c.number}, ${c.name}, held your attention.`
      : "First visit. Start with Case 01. Everyone does, but it's the right call.",
  );
  return lines;
}

export function ColdReading() {
  const [lines, setLines] = useState<string[] | null>(null);
  // Reads browser-only state after mount so the server HTML stays identical for every visitor.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setLines(read()), []);

  return (
    <aside aria-label="A cold reading" className="relative grid gap-3 border-l-2 border-crimson/50 pl-5 lg:grid-cols-[200px_1fr] lg:items-center lg:gap-8">
      <p className="label !text-[10px] text-faint">A few things I already know about you</p>
      <ul className="min-h-[4.6em] space-y-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:grid lg:min-h-0 lg:grid-cols-3 lg:gap-8 lg:space-y-0" aria-live="polite">
        {(lines ?? ["", "", ""]).map((l, i) => (
          <li key={i} className="hand write-in text-[clamp(17px,1.35vw,20px)] leading-snug text-muted" style={{ "--i": i } as React.CSSProperties}>
            {l}
          </li>
        ))}
      </ul>
      <p className="label !text-[9.5px] text-faint lg:col-start-1 lg:row-start-2">Read from your browser · nothing leaves it</p>
    </aside>
  );
}

/** Remembers the last case opened, so the next cold reading can mention it. */
export function RememberCase({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      localStorage.setItem("lastCase", slug);
    } catch {}
  }, [slug]);
  return null;
}

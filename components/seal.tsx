// Original wax seal: a lumpy red disc with a pressed ring and the case number.
// Deterministic geometry (no randomness) so server and client render the same SVG.
const blob = Array.from({ length: 48 }, (_, s) => {
  const t = (s / 48) * Math.PI * 2;
  const r = 46 + 2.6 * Math.sin(t * 5) + 1.6 * Math.sin(t * 9 + 1.3) + 1.2 * Math.sin(t * 14);
  return `${s ? "L" : "M"}${(50 + Math.cos(t) * r).toFixed(1)} ${(50 + Math.sin(t) * r).toFixed(1)}`;
}).join("") + "Z";

export function Seal({ number, className = "" }: { number: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d={blob} fill="#8e1424" />
      <path d={blob} fill="none" stroke="#5e0b17" strokeWidth="1.5" opacity=".6" />
      <circle cx="50" cy="50" r="33" fill="none" stroke="#5e0b17" strokeWidth="2.2" opacity=".75" />
      <circle cx="50" cy="50" r="29" fill="none" stroke="#c4475a" strokeWidth="0.8" opacity=".55" />
      <ellipse cx="38" cy="32" rx="14" ry="7" fill="#fff" opacity=".12" transform="rotate(-30 38 32)" />
      <text x="50" y="59" textAnchor="middle" fontFamily="var(--font-display)" fontSize="28" fontWeight="600" fill="#f3d9c4">
        {number}
      </text>
    </svg>
  );
}

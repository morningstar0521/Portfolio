// Original calling card: a thumbprint pressed in red paint, with two drips.
// Deterministic geometry (no randomness) so server and client render the same SVG.
const ridges = Array.from({ length: 22 }, (_, k) => {
  const rx = 5 + k * 3.4;
  const ry = 7 + k * 4.4;
  const gap = 0.35 + (k % 3) * 0.22; // each ridge breaks at a different angle
  let d = "";
  for (let s = 0; s <= 64; s++) {
    const t = gap + (s / 64) * (Math.PI * 2 - 0.55);
    const w = 1 + 0.035 * Math.sin(t * 3 + k) + 0.02 * Math.sin(t * 7 - k * 0.6);
    const x = 100 + Math.cos(t) * rx * w;
    const y = 110 - Math.sin(t) * ry * w * (t > Math.PI ? 0.82 : 1);
    d += `${s ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
});

/** `id` must be unique on the page (it names the SVG filters). Colour follows the theme via .thumbprint. */
export function Thumbprint({ id, className = "", drips = true }: { id: string; className?: string; drips?: boolean }) {
  return (
    <svg viewBox="0 0 200 260" className={`thumbprint ${className}`} aria-hidden fill="none">
      <defs>
        <filter id={`${id}-ink`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 .85 1 1" />
          </feComponentTransfer>
        </filter>
        <filter id={`${id}-rough`}>
          <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="9" />
        </filter>
        <clipPath id={`${id}-clip`}>
          <ellipse cx="100" cy="112" rx="70" ry="88" />
        </clipPath>
      </defs>
      <g filter={`url(#${id}-rough)`}>
        <g clipPath={`url(#${id}-clip)`} filter={`url(#${id}-ink)`}>
          {ridges.map((d, i) => (
            <path key={i} d={d} stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" opacity={1 - i * 0.02} />
          ))}
        </g>
        {drips && (
          <>
            <path d="M70 186q2 30 1 46q-1 6 3 6q4 0 3-6q-2-16 2-44Z" fill="currentColor" opacity=".9" />
            <path d="M118 194q1 18 0 26q0 5 3 5q3 0 2-5q-1-10 1-24Z" fill="currentColor" opacity=".85" />
          </>
        )}
      </g>
    </svg>
  );
}

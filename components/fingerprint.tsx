// Original fingerprint mark, generated from distorted concentric loops (deterministic, no assets).
const ridges = Array.from({ length: 22 }, (_, k) => {
  const rx = 5 + k * 3.7;
  const ry = 7 + k * 4.7;
  const gap = 0.35 + (k % 3) * 0.22; // each ridge breaks at a different angle
  const pts: string[] = [];
  for (let s = 0; s <= 64; s++) {
    const t = gap + (s / 64) * (Math.PI * 2 - 0.55);
    const wobble = 1 + 0.035 * Math.sin(t * 3 + k) + 0.02 * Math.sin(t * 7 - k * 0.6);
    const x = 100 + Math.cos(t) * rx * wobble;
    const y = 112 - Math.sin(t) * ry * wobble * (t > Math.PI ? 0.82 : 1);
    pts.push(`${s ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join("");
});

export function Fingerprint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden fill="none">
      {ridges.map((d, i) => (
        <path
          key={i}
          d={d}
          className="board-string"
          style={{ stroke: "currentColor", "--i": i } as React.CSSProperties}
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={1 - i * 0.025}
        />
      ))}
    </svg>
  );
}

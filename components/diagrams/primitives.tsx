// Diagram building blocks. Every diagram is real HTML text (readable, selectable, screen-reader friendly).

export type Step = { title: string; sub?: string; accent?: boolean };

export function Flow({ steps, label }: { steps: Step[]; label: string }) {
  return (
    <ol aria-label={label} className="flex flex-col gap-0 lg:flex-row lg:items-stretch">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-col lg:min-w-0 lg:flex-1 lg:flex-row lg:items-stretch">
          <div
            className={`flex-1 border p-4 ${s.accent ? "border-crimson-bright bg-crimson/10" : "border-line bg-ground"}`}
          >
            <p className="label !text-[10px] text-faint">Step {String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1.5 text-[15px] font-semibold leading-snug text-fg">{s.title}</p>
            {s.sub && <p className="mt-1 text-[13px] leading-snug text-muted">{s.sub}</p>}
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden className="flex h-7 items-center justify-center text-faint lg:h-auto lg:w-7 lg:shrink-0">
              <span className="lg:hidden">↓</span>
              <span className="hidden lg:inline">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export type Bar = { label: string; value: number; display: string; accent?: boolean };

export function Bars({ bars, max, label, unit }: { bars: Bar[]; max: number; label: string; unit?: string }) {
  return (
    <figure>
      <figcaption className="label mb-4 !text-[11px] text-faint">{label}</figcaption>
      <ul className="space-y-4">
        {bars.map((b) => (
          <li key={b.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-4 text-[14px]">
              <span className="text-muted">{b.label}</span>
              <span className={`font-mono text-[14px] ${b.accent ? "text-fg" : "text-muted"}`}>
                {b.display}
                {unit}
              </span>
            </div>
            <div className="h-3 w-full bg-card">
              <div
                className={`h-full ${b.accent ? "bg-crimson-bright" : "bg-faint/60"}`}
                style={{ width: `${(b.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function Panel({ title, children, note }: { title: string; children: React.ReactNode; note?: string }) {
  return (
    <div className="min-w-0 border border-line bg-sunk p-5 md:p-7">
      <p className="label mb-5 flex items-center gap-3 text-amber">
        <span aria-hidden className="h-px w-6 bg-amber" />
        {title}
      </p>
      {children}
      {note && <p className="mt-5 text-[13px] leading-relaxed text-faint">{note}</p>}
    </div>
  );
}

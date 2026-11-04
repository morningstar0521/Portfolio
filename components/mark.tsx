// Original portfolio mark: a stamped file square with the initials. Not derived from any show artwork.
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <rect x="1.5" y="1.5" width="29" height="29" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 9.5h29" stroke="currentColor" strokeWidth="1" opacity=".5" />
      <text
        x="16"
        y="26"
        textAnchor="middle"
        fill="currentColor"
        style={{ font: "400 17px var(--font-bebas), Impact, sans-serif", letterSpacing: "0.04em" }}
      >
        SG
      </text>
      <circle cx="26" cy="5.5" r="1.6" fill="#c52b42" />
    </svg>
  );
}

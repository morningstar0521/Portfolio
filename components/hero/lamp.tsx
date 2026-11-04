"use client";

import { useRef } from "react";

// Warm desk-lamp light that follows a fine pointer. Decorative only; static on touch and reduced motion.
export function Lamp({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div ref={ref} onPointerMove={move} className={`lamp ${className ?? ""}`}>
      {children}
    </div>
  );
}

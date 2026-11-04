"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Copy } from "./icons";

// Copies text and announces it. If the clipboard is blocked, selects the text so the visitor can copy it manually.
export function CopyButton({ text, label, className = "" }: { text: string; label: string; className?: string }) {
  const [state, setState] = useState<"idle" | "done" | "manual">("idle");
  const id = useId();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      const el = document.getElementById(id);
      if (el) window.getSelection()?.selectAllChildren(el);
      setState("manual");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2500);
  }

  return (
    <span className={`inline-flex flex-wrap items-center gap-3 ${className}`}>
      <code id={id} className="font-mono text-[15px] text-fg">
        {text}
      </code>
      <button
        type="button"
        onClick={copy}
        className="label inline-flex min-h-11 items-center gap-2 border border-line px-3 !text-[11px] text-muted transition-colors hover:border-fg hover:text-fg"
      >
        <Copy /> {label}
      </button>
      <span role="status" aria-live="polite" className="label !text-[11px] text-success">
        {state === "done" ? "Copied" : state === "manual" ? "Selected, press Ctrl/⌘ + C" : ""}
      </span>
    </span>
  );
}

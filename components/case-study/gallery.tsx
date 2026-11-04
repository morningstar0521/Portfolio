"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Shot } from "@/content/cases";

// Screenshot strip with a native <dialog> lightbox: Escape closes, focus returns to the thumbnail.
export function Gallery({ shots, name }: { shots: Shot[]; name: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const open = (n: number) => {
    setI(n);
    dialog.current?.showModal();
  };
  const step = (d: number) => setI((n) => (n + d + shots.length) % shots.length);
  const s = shots[i];

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-2">
        {shots.map((shot, n) => (
          <li key={shot.src} className={n === 0 ? "md:col-span-2" : ""}>
            <figure className="group">
              <button
                type="button"
                onClick={() => open(n)}
                className="block w-full overflow-hidden border border-line bg-card p-1.5 shadow-[0_18px_30px_-20px_rgba(60,30,5,.6)] transition-transform duration-300 hover:-translate-y-1"
                aria-label={`Enlarge: ${shot.alt}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes={n === 0 ? "(min-width: 1024px) 900px, 100vw" : "(min-width: 1024px) 440px, 100vw"}
                  className="h-auto w-full"
                />
              </button>
              <figcaption className="mt-2 text-[13px] leading-snug text-muted">
                <span className="label mr-2 !text-[10px] text-faint">Fig. {n + 1}</span>
                {shot.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`${name} screenshots`}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[94dvh] w-[min(96vw,1400px)] max-w-none bg-transparent p-0 backdrop:bg-[rgba(18,7,8,.86)]"
      >
        <figure className="bg-card p-2 md:p-3">
          <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="96vw" className="h-auto max-h-[80dvh] w-full object-contain" />
          <figcaption className="flex flex-wrap items-center justify-between gap-3 px-1 pt-3 text-[14px] text-fg">
            <span>
              <span className="label mr-2 !text-[10px] text-faint">
                {i + 1} / {shots.length}
              </span>
              {s.caption}
            </span>
            <span className="flex gap-2">
              {shots.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} className="label min-h-11 border border-line px-3 !text-[11px]">
                    Prev
                  </button>
                  <button type="button" onClick={() => step(1)} className="label min-h-11 border border-line px-3 !text-[11px]">
                    Next
                  </button>
                </>
              )}
              <button type="button" onClick={() => dialog.current?.close()} className="label min-h-11 bg-fg px-4 !text-[11px] text-ground" autoFocus>
                Close
              </button>
            </span>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}

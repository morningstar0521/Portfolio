import Image from "next/image";
import type { Shot } from "@/content/cases";

// A photo pinned to the case file: paper border, red pushpin, handwritten label.
export function PinnedPhoto({ shot, className = "", priority = false, sizes = "(min-width: 1024px) 560px, 92vw" }: { shot: Shot; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <figure className={`relative bg-paper p-2 pb-12 shadow-[0_26px_40px_-20px_rgba(40,20,5,.65)] md:p-3 md:pb-14 ${className}`}>
      <span
        aria-hidden
        className="absolute -top-2 left-1/2 z-10 block h-5 w-5 -translate-x-1/2 rounded-full bg-crimson-bright shadow-[inset_-3px_-3px_4px_rgba(0,0,0,.35),0_4px_6px_rgba(0,0,0,.45)]"
      />
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        priority={priority}
        sizes={sizes}
        className="h-auto w-full border border-[#2a1e16]/10"
      />
      <figcaption className="hand absolute right-4 bottom-2.5 left-4 text-[clamp(18px,1.6vw,24px)] text-[#2a1e16] md:bottom-3.5">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

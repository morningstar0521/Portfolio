"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const path = usePathname();
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  const close = () => document.getElementById("menu")?.hidePopover();

  return nav.map((item, i) => {
    const active = isActive(item.href);
    return mobile ? (
      <Link
        key={item.href}
        href={item.href}
        onClick={close}
        aria-current={active ? "page" : undefined}
        className="display flex items-baseline gap-4 border-b border-line py-4 text-5xl aria-[current=page]:text-signal"
      >
        <span className="label text-ash">0{i}</span>
        {item.label}
      </Link>
    ) : (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className="label relative inline-flex min-h-11 items-center px-3 whitespace-nowrap text-paper-muted transition-colors hover:text-paper aria-[current=page]:text-paper aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-2 aria-[current=page]:after:h-px aria-[current=page]:after:bg-signal"
      >
        {item.label}
      </Link>
    );
  });
}

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
        className="display flex items-baseline gap-4 border-b border-line py-4 text-5xl aria-[current=page]:text-alert"
      >
        <span className="label text-faint">0{i}</span>
        {item.label}
      </Link>
    ) : (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className="folder-tab label relative -mb-px inline-flex h-11 items-center gap-2 px-3.5 whitespace-nowrap lg:px-5 text-muted transition-colors hover:text-fg aria-[current=page]:text-tag-ink"
      >
        <span className="hidden !text-[10px] text-faint lg:inline [[aria-current=page]>&]:text-tag-muted">0{i + 1}</span>
        {item.label}
      </Link>
    );
  });
}

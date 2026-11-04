import Link from "next/link";
import { NavLinks } from "./nav-links";
import { Mark } from "./mark";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-line/70 bg-ink/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="Shubh Ghiya, home">
          <Mark className="h-8 w-8 text-paper transition-colors group-hover:text-signal" />
          <span className="label hidden text-paper-muted sm:inline md:hidden lg:inline">
            The case files of <span className="text-paper">Shubh Ghiya</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavLinks />
          <Link
            href="/contact"
            className="label ml-3 inline-flex min-h-11 items-center gap-2 border border-crimson px-4 text-paper transition-colors hover:bg-crimson"
          >
            <span className="text-signal" aria-hidden>
              08
            </span>
            Contact
          </Link>
        </nav>

        <button
          type="button"
          popoverTarget="menu"
          className="label inline-flex min-h-11 items-center gap-3 border border-line px-4 md:hidden"
        >
          Menu
          <span aria-hidden className="flex flex-col gap-[5px]">
            <span className="block h-px w-5 bg-paper" />
            <span className="block h-px w-5 bg-paper" />
          </span>
        </button>
      </div>
      <span className="progress" aria-hidden />

      <div id="menu" popover="auto" className="menu-sheet md:hidden">
        <div className="wrap flex h-16 items-center justify-between border-b border-line">
          <span className="label text-paper-muted">Index</span>
          <button
            type="button"
            popoverTarget="menu"
            popoverTargetAction="hide"
            className="label inline-flex min-h-11 items-center border border-line px-4"
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="wrap flex flex-col py-6">
          <NavLinks mobile />
          <Link href="/contact" className="display flex items-baseline gap-4 border-b border-line py-4 text-5xl text-signal">
            <span className="label text-ash">08</span>Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

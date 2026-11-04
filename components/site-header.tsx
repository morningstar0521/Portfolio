import Link from "next/link";
import { NavLinks } from "./nav-links";
import { Mark } from "./mark";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header no-print sticky top-0 z-50 border-b border-line bg-ground/90 backdrop-blur-md">
      <div className="header-row wrap flex items-stretch justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3 self-center" aria-label="Shubh Ghiya, home">
          <Mark className="h-9 w-9 shrink-0 text-fg transition-colors group-hover:text-alert" />
          {/* Wordmark: tracked monospace capitals, like a typed file label */}
          <span className="hidden flex-col sm:flex md:hidden lg:flex">
            <span className="font-mono text-[15px] leading-none font-medium tracking-[0.3em] whitespace-nowrap text-fg uppercase">Shubh Ghiya</span>
            <span className="label mt-1.5 hidden !text-[9.5px] !tracking-[0.22em] whitespace-nowrap text-faint xl:block">Software engineer · case archive</span>
          </span>
        </Link>

        <div className="hidden items-stretch gap-2 md:flex lg:gap-4">
          {/* Folder tabs sit on the header's bottom rule; the open file is manila */}
          <nav aria-label="Primary" className="flex items-end">
            <NavLinks />
          </nav>
          <div className="flex items-center gap-2 lg:gap-3">
            <span aria-hidden className="hidden h-6 w-px bg-line lg:block" />
            <ThemeToggle />
            <Link
              href="/contact"
              className="label inline-flex h-11 items-center gap-2.5 bg-[#9e1b2c] px-4 text-[#fbf6ea] transition-colors hover:bg-[#b3253a]"
            >
              <span className="!text-[10px] opacity-75" aria-hidden>
                08
              </span>
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            popoverTarget="menu"
            className="label inline-flex h-11 items-center gap-3 border border-line px-4"
          >
            Menu
            <span aria-hidden className="flex flex-col gap-[5px]">
              <span className="block h-px w-5 bg-fg" />
              <span className="block h-px w-5 bg-fg" />
            </span>
          </button>
        </div>
      </div>
      <span className="progress" aria-hidden />

      <div id="menu" popover="auto" className="menu-sheet md:hidden">
        <div className="wrap flex h-16 items-center justify-between border-b border-line">
          <span className="label text-muted">Index</span>
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
          <Link href="/contact" className="display flex items-baseline gap-4 border-b border-line py-4 text-5xl text-alert">
            <span className="label text-faint">08</span>Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

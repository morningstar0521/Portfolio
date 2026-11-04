import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="label text-ash">
          <span className="text-paper">The case files of Shubh Ghiya</span>
          <span aria-hidden> · </span>
          Built with curiosity and evidence
          <span aria-hidden> · </span>
          {/* shortcut: year is static because prerendered pages cannot call new Date(); bump yearly */}
          2026
        </p>
        <ul className="label flex flex-wrap gap-x-6 gap-y-3 text-paper-muted">
          <li>
            <a className="link-underline hover:text-paper" href={profile.github} rel="me">
              GitHub
            </a>
          </li>
          <li>
            <a className="link-underline hover:text-paper" href={profile.linkedin} rel="me">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link-underline hover:text-paper" href={`mailto:${profile.email}`}>
              Email
            </a>
          </li>
          <li>
            <Link className="link-underline hover:text-paper" href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

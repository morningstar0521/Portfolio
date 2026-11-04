import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { CopyButton } from "@/components/copy-button";
import { Thumbprint } from "@/components/thumbprint";
import { ArrowRight, Download, External } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact · Case 08: Red John",
  description: "Contact Shubh Ghiya about software engineering internships, full-time roles, collaboration or freelance work.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mail = `mailto:${profile.email}?subject=${encodeURIComponent("Hello Shubh")}`;
  return (
    <section
      aria-labelledby="rj-title"
      className="night relative isolate min-h-[calc(100svh-64px)] overflow-hidden bg-ground bg-[radial-gradient(70%_60%_at_75%_45%,rgba(165,30,50,.45),transparent_70%),radial-gradient(60%_50%_at_10%_100%,rgba(165,30,50,.18),transparent_70%)]"
    >
      <Thumbprint id="tp-contact" className="pointer-events-none absolute top-[46%] right-[-38%] -z-10 h-[62%] -translate-y-1/2 rotate-[-10deg] opacity-35 md:right-[-14%] md:opacity-45 lg:right-[-1%] lg:h-[74%] lg:opacity-60" />

      <div className="wrap relative grid min-h-[calc(100svh-64px)] items-center py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="label enter text-alert">Case 08 · The last file</p>
          <h1 id="rj-title" className="display enter mt-6 whitespace-nowrap text-[clamp(68px,12vw,184px)] text-fg" style={{ "--i": 1 } as React.CSSProperties}>
            Red John.
          </h1>
          <p className="enter mt-6 max-w-[26ch] text-[clamp(22px,2.6vw,34px)] leading-snug text-fg" style={{ "--i": 2 } as React.CSSProperties}>
            The question is no longer who. It&apos;s what we build next.
          </p>
          <p className="hand enter mt-4 -rotate-1 text-[clamp(22px,2vw,28px)] text-amber" style={{ "--i": 2 } as React.CSSProperties}>
            The lights are off. That&apos;s how you know it&apos;s the last file.
          </p>
          <p className="enter mt-6 max-w-[52ch] text-[17px] leading-relaxed text-muted" style={{ "--i": 3 } as React.CSSProperties}>
            {profile.seeking} Also open to project collaboration and freelance work. Email is the fastest way to reach me.
          </p>

          <div className="enter mt-12 border-t border-crimson/50 pt-8" style={{ "--i": 4 } as React.CSSProperties}>
            <p className="label mb-3 !text-[11px] text-muted">Email</p>
            <a href={mail} className="block text-[clamp(26px,4.2vw,54px)] font-semibold tracking-tight break-all text-fg hover:text-alert">
              {profile.email}
            </a>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={mail} className="btn btn-fg">
                Write the message <ArrowRight />
              </a>
              <CopyButton text={profile.email} label="Copy email" className="[&>code]:sr-only" />
            </div>
          </div>

          <ul className="enter mt-12 grid gap-px border border-crimson/40 bg-crimson/40 sm:grid-cols-3" style={{ "--i": 5 } as React.CSSProperties}>
            <li className="bg-sunk">
              <a href={profile.linkedin} rel="me" className="group flex min-h-24 flex-col justify-between p-5 hover:bg-card">
                <span className="label !text-[11px] text-muted">LinkedIn</span>
                <span className="mt-3 inline-flex items-center gap-2 text-fg group-hover:text-alert">
                  /in/{profile.linkedinHandle} <External />
                </span>
              </a>
            </li>
            <li className="bg-sunk">
              <a href={profile.github} rel="me" className="group flex min-h-24 flex-col justify-between p-5 hover:bg-card">
                <span className="label !text-[11px] text-muted">GitHub</span>
                <span className="mt-3 inline-flex items-center gap-2 text-fg group-hover:text-alert">
                  @{profile.githubHandle} <External />
                </span>
              </a>
            </li>
            <li className="flex min-h-24 flex-col justify-between bg-sunk p-5">
              <span className="label !text-[11px] text-muted">Resume · one page</span>
              <span className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                <a href={profile.resumePdf} target="_blank" rel="noopener" className="inline-flex min-h-8 items-center gap-2 text-fg hover:text-alert">
                  Preview <External />
                </a>
                <a href={profile.resumePdf} download="Shubh-Ghiya-SDE-Resume.pdf" className="inline-flex min-h-8 items-center gap-2 text-fg hover:text-alert">
                  Download <Download />
                </a>
              </span>
            </li>
          </ul>

          <p className="label mt-14 !text-[11px] text-muted">
            You found the final clue. Now make contact.{" "}
            <Link href="/case-files" className="link-underline ml-2 text-fg">
              Or reopen the files
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

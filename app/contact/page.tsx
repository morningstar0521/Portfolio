import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { CopyButton } from "@/components/copy-button";
import { Fingerprint } from "@/components/fingerprint";
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
      className="relative isolate min-h-[calc(100svh-64px)] overflow-hidden bg-[#140709] bg-[radial-gradient(70%_60%_at_75%_45%,rgba(165,30,50,.45),transparent_70%),radial-gradient(60%_50%_at_10%_100%,rgba(165,30,50,.18),transparent_70%)]"
    >
      <Fingerprint className="pointer-events-none absolute top-1/2 right-[-12%] -z-10 h-[115%] -translate-y-1/2 text-crimson-bright opacity-45 md:right-[-4%] md:h-[120%] lg:right-[4%]" />

      <div className="wrap relative grid min-h-[calc(100svh-64px)] items-center py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="label enter text-signal">Case 08 · The last file</p>
          <h1 id="rj-title" className="display enter mt-6 text-[clamp(72px,16vw,240px)] text-paper" style={{ "--i": 1 } as React.CSSProperties}>
            Red John.
          </h1>
          <p className="enter mt-6 max-w-[26ch] text-[clamp(22px,2.6vw,34px)] leading-snug text-paper" style={{ "--i": 2 } as React.CSSProperties}>
            The question is no longer who. It&apos;s what we build next.
          </p>
          <p className="enter mt-6 max-w-[52ch] text-[17px] leading-relaxed text-paper-muted" style={{ "--i": 3 } as React.CSSProperties}>
            {profile.seeking} Also open to project collaboration and freelance work. Email is the fastest way to reach me.
          </p>

          <div className="enter mt-12 border-t border-crimson/50 pt-8" style={{ "--i": 4 } as React.CSSProperties}>
            <p className="label mb-3 !text-[11px] text-paper-muted">Email</p>
            <a href={mail} className="block text-[clamp(26px,4.2vw,54px)] font-semibold tracking-tight break-all text-paper hover:text-signal">
              {profile.email}
            </a>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={mail} className="btn btn-paper">
                Write the message <ArrowRight />
              </a>
              <CopyButton text={profile.email} label="Copy email" className="[&>code]:sr-only" />
            </div>
          </div>

          <ul className="enter mt-12 grid gap-px border border-crimson/40 bg-crimson/40 sm:grid-cols-3" style={{ "--i": 5 } as React.CSSProperties}>
            <li className="bg-[#170a0c]">
              <a href={profile.linkedin} rel="me" className="group flex min-h-24 flex-col justify-between p-5 hover:bg-[#21090d]">
                <span className="label !text-[11px] text-paper-muted">LinkedIn</span>
                <span className="mt-3 inline-flex items-center gap-2 text-paper group-hover:text-signal">
                  /in/{profile.linkedinHandle} <External />
                </span>
              </a>
            </li>
            <li className="bg-[#170a0c]">
              <a href={profile.github} rel="me" className="group flex min-h-24 flex-col justify-between p-5 hover:bg-[#21090d]">
                <span className="label !text-[11px] text-paper-muted">GitHub</span>
                <span className="mt-3 inline-flex items-center gap-2 text-paper group-hover:text-signal">
                  @{profile.githubHandle} <External />
                </span>
              </a>
            </li>
            <li className="bg-[#170a0c]">
              <a href={profile.resumePdf} download className="group flex min-h-24 flex-col justify-between p-5 hover:bg-[#21090d]">
                <span className="label !text-[11px] text-paper-muted">Resume</span>
                <span className="mt-3 inline-flex items-center gap-2 text-paper group-hover:text-signal">
                  Download PDF <Download />
                </span>
              </a>
            </li>
          </ul>

          <p className="label mt-14 !text-[11px] text-paper-muted">
            You found the final clue. Now make contact.{" "}
            <Link href="/case-files" className="link-underline ml-2 text-paper">
              Or reopen the files
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

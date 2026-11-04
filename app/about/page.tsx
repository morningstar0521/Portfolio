import type { Metadata } from "next";
import Link from "next/link";
import { awards, certifications, education, experience, leadership, portrait, profile } from "@/content/profile";
import { PinnedPhoto } from "@/components/case-study/pinned-photo";
import { ArrowRight, External } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description: "Shubh Ghiya: dual-degree student at IIT Madras and UIT RGPV, full-stack developer at Nakhrali Luxury, building backends, developer tools and ML systems.",
  alternates: { canonical: "/about" },
};

const focus = [
  ["Backend systems", "Payments, idempotency, queues, concurrency and the database guarantees under them."],
  ["Full-stack products", "Shipping and operating real products, from React to Nginx."],
  ["Developer tooling", "Tools that check software instead of trusting it."],
  ["Machine learning", "Honest evaluation: strong baselines, no leakage, labelled metrics."],
  ["Data and NLP", "Feature engineering and model blending on messy text."],
  ["Deployment and operations", "VPS, Docker, CI/CD, TLS and recovering when things break."],
];

export default function AboutPage() {
  return (
    <div className="wrap py-16 md:py-24">
      <header className="grid gap-8 border-b border-line pb-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label enter text-alert">Subject profile</p>
          <h1 className="display enter mt-4 text-[clamp(64px,10vw,160px)]" style={{ "--i": 1 } as React.CSSProperties}>
            Behind the evidence
          </h1>

          {/* Shubh's own line, in his words */}
          <figure className="enter mt-12 max-w-[620px] border-l-2 border-crimson pl-6 md:mt-16" style={{ "--i": 2 } as React.CSSProperties}>
            <blockquote className="display text-[clamp(28px,3vw,44px)] leading-[1.12] text-fg italic">
              <p>Curious enough to question the obvious. Stubborn enough to find the truth.</p>
            </blockquote>
            <figcaption className="hand mt-4 text-[clamp(20px,1.8vw,26px)] text-amber">Shubh Ghiya</figcaption>
          </figure>

          {/* Subject file: the facts a recruiter scans for */}
          <div className="enter mt-12 max-w-xl border border-line bg-card px-6 py-5 md:mt-14" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="label mb-3 border-b border-line pb-3 !text-[10px] text-faint">Subject file</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 text-[15px]">
            {[
              ["Based in", profile.location],
              ["Studying", "IIT Madras (B.S. Data Science) + UIT RGPV (B.Tech CSE), graduating 2027"],
              ["Focus", "Backend · full-stack · ML systems"],
              ["Status", "Open to SDE internships 2026 · full-time 2027"],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="label py-1.5 !text-[11px] text-faint">{k}</dt>
                <dd className={`py-1.5 ${k === "Status" ? "text-success" : "text-fg"}`}>{v}</dd>
              </div>
            ))}
            <dt className="label py-1.5 !text-[11px] text-faint">Contact</dt>
            <dd className="flex flex-wrap gap-x-4 py-1.5">
              <a href={`mailto:${profile.email}`} className="link-underline text-fg">
                Email
              </a>
              <a href={profile.linkedin} rel="me" className="link-underline text-fg">
                LinkedIn
              </a>
              <a href={profile.github} rel="me" className="link-underline text-fg">
                GitHub
              </a>
            </dd>
            </dl>
          </div>
        </div>
        <div className="enter md:col-span-5 md:pt-6" style={{ "--i": 2 } as React.CSSProperties}>
          <PinnedPhoto shot={portrait} priority sizes="(min-width: 768px) 300px, 70vw" className="mb-10 w-[min(300px,70vw)] -rotate-2" />
          <p className="text-[clamp(19px,1.8vw,23px)] leading-relaxed text-fg">
            I&apos;m the sole developer of a live e-commerce platform, and I like problems where being slightly wrong is
            expensive.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">{profile.positioning}</p>
        </div>
      </header>

      {/* Timeline: a plain list that reads correctly with or without motion */}
      <section aria-labelledby="timeline" className="grid gap-10 border-b border-line py-16 md:grid-cols-12">
        <h2 id="timeline" className="display text-[clamp(40px,5vw,72px)] md:col-span-4">
          Timeline
        </h2>
        <ol className="relative border-l border-line pl-8 md:col-span-8">
          {[...experience.map((e) => ({ when: e.period, what: e.title, where: e.org, note: e.note, kind: "Work" })),
            ...education.map((e) => ({ when: e.period, what: e.degree, where: e.school, note: e.grade, kind: "Education" }))].map((t) => (
            <li key={t.what + t.when} className="reveal relative pb-10 last:pb-0">
              <span aria-hidden className={`absolute top-2 -left-[37px] h-2.5 w-2.5 ${t.kind === "Work" ? "bg-crimson-bright" : "border border-amber bg-ground"}`} />
              <p className="label !text-[11px] text-faint">
                {t.when} · <span className={t.kind === "Work" ? "text-alert" : "text-amber"}>{t.kind}</span>
              </p>
              <h3 className="mt-2 text-[21px] font-semibold text-fg">{t.what}</h3>
              <p className="text-[16px] text-muted">{t.where}</p>
              <p className="mt-2 text-[15px] text-faint">{t.note}</p>
              {t.kind === "Work" && t.when.startsWith("Aug") && (
                <Link href="/case-files/nakhrali" className="label link-underline mt-3 inline-flex min-h-11 items-center gap-2 !text-[11px] text-fg">
                  Open Case 01 <ArrowRight />
                </Link>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="focus" className="grid gap-10 border-b border-line py-16 md:grid-cols-12">
        <h2 id="focus" className="display text-[clamp(40px,5vw,72px)] md:col-span-4">
          Areas of focus
        </h2>
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 md:col-span-8">
          {focus.map(([t, d]) => (
            <li key={t} className="bg-ground p-6">
              <h3 className="text-[18px] font-semibold text-fg">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="record" className="grid gap-10 py-16 md:grid-cols-12">
        <h2 id="record" className="display text-[clamp(40px,5vw,72px)] md:col-span-4">
          On the record
        </h2>
        <div className="grid gap-12 md:col-span-8 lg:grid-cols-2">
          <div>
            <h3 className="label text-amber">Awards</h3>
            <ul className="mt-4 border-t border-line">
              {awards.map((a) => (
                <li key={a.title} className="border-b border-line py-4">
                  <p className="display text-3xl">{a.title}</p>
                  <p className="text-[14px] text-muted">
                    {a.detail} · {a.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label text-amber">Leadership</h3>
            <ul className="mt-4 border-t border-line">
              {leadership.map((l) => (
                <li key={l.title} className="border-b border-line py-4">
                  <p className="text-[17px] font-semibold text-fg">{l.title}</p>
                  <p className="text-[14px] text-muted">
                    {l.detail} · {l.period}
                  </p>
                </li>
              ))}
            </ul>
            <h3 className="label mt-10 text-amber">Certifications</h3>
            <ul className="mt-4 space-y-2 text-[14px] text-muted">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 border-t border-line pt-10">
        <a href={profile.resumePdf} target="_blank" rel="noopener" className="btn btn-fg">
          Resume <ArrowRight />
        </a>
        <a href={profile.github} rel="me" className="btn btn-ghost">
          GitHub <External />
        </a>
        <a href={profile.linkedin} rel="me" className="btn btn-ghost">
          LinkedIn <External />
        </a>
        <Link href="/contact" className="btn btn-ghost">
          Contact
        </Link>
      </div>
    </div>
  );
}

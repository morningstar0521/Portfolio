import type { Metadata } from "next";
import { awards, education, leadership, profile } from "@/content/profile";
import { Download } from "@/components/icons";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Shubh Ghiya: software engineering, backend and full-stack.",
  alternates: { canonical: "/resume" },
};

// SWE / backend track (Resume Builder tracks.md, preset A). Every bullet is from the verified bullet banks.
const work = [
  "Shipped a live e-commerce platform end to end (86 REST routes, 23 controllers, 30 pages, PostgreSQL with 37 migrations), serving 100+ registered users and 100+ daily visitors, with 100+ orders processed.",
  "Eliminated price tampering and duplicate charges by recomputing every cart from database prices on the server, verifying Razorpay payments with HMAC-SHA256, and serialising each payment with a Postgres advisory lock, row locks and unique indexes.",
  "Built and shipped a promotions engine (combo pricing, buy-X-get-Y, free gifts, cart thresholds) that prices in paise and freezes each checkout into an immutable, idempotency-keyed snapshot that payment verification and refunds trust.",
  "Migrated the backend from Render to a Hostinger VPS behind Nginx, PM2 and Cloudflare (Full-strict TLS, firewall open only to Cloudflare IPs), with GitHub Actions auto-deploy and a post-deploy health check.",
  "Fixed 12 of 13 findings from a security audit, including forced-logout, duplicate-order, SSRF and email HTML-injection bugs.",
];

const projects = [
  {
    name: "Idempotent Event Processor",
    stack: "TypeScript, Node.js, PostgreSQL, Redis Streams, Docker, k6",
    href: `${profile.github}/Idempotent-Event-Processor`,
    bullets: [
      "Built a payment-event processor with zero lost events and zero duplicate effects across 6 Docker chaos scenarios, using a transactional outbox, Redis Streams consumer groups and database-enforced idempotency.",
      "Sustained 200 unique events/s for 90 s on 3 workers (18,000 of 18,000 processed) with 3.78 ms API p95 under duplicate-heavy k6 load, in local load tests.",
    ],
  },
  {
    name: "QuickPark · Best Project Award, IIT Madras",
    stack: "Flask, Vue 3, Celery, Redis, Docker Compose, AWS EC2",
    href: `${profile.github}/Quick-Park`,
    bullets: [
      "Built and deployed a Flask + Vue 3 parking platform on AWS EC2 with 36 JWT-secured REST endpoints, role-based access and a 4-service Docker Compose stack (Caddy HTTPS, Gunicorn, Celery, Redis).",
      "Eliminated double booking with atomic compare-and-set updates and 2 partial unique indexes; a parallel test passes 15 of 15 checks in the production container, where the old code created 40 bookings on 1 spot.",
    ],
  },
  {
    name: "README Intelligence",
    stack: "TypeScript, Next.js, pnpm monorepo, Vitest, Playwright",
    href: `${profile.github}/Readme-Intelligence`,
    bullets: [
      "Shipped a README analysis tool as a web app on Vercel, a published npm CLI (v0.1.4) and a reusable GitHub Action that fails pull requests only when they add new README contradictions.",
      "Measured extraction against 59 hand-labelled READMEs: 87.4% F1 on environment variables, 77.8% on commands, 69.8% on tech stack; 592 tests plus 10 Playwright end-to-end tests in CI.",
    ],
  },
];

const skillRows = [
  ["Languages", "TypeScript, JavaScript, Python, SQL"],
  ["Backend", "Node.js, Express, Flask, FastAPI, Celery, Zod"],
  ["Databases", "PostgreSQL, Redis, SQLite"],
  ["Frontend", "React, Next.js, Vue 3, Tailwind CSS"],
  ["DevOps / Cloud", "Docker Compose, GitHub Actions, Nginx, PM2, Cloudflare, AWS EC2, Vercel"],
  ["Testing", "Vitest, Playwright, pytest, k6"],
];

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-5 mb-2 border-b border-paper-ink/25 pb-1 text-[11px] font-bold tracking-[0.16em] uppercase">{children}</h2>;
}

export default function ResumePage() {
  return (
    <div className="wrap py-12 md:py-16 print:p-0">
      <div className="no-print mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label text-signal">Evidence file · Résumé</p>
          <h1 className="display mt-3 text-[clamp(56px,8vw,120px)]">The record</h1>
          <p className="mt-3 max-w-[56ch] text-[16px] text-paper-muted">
            Software engineering version. Every line matches a case file on this site.
          </p>
        </div>
        <a href={profile.resumePdf} download className="btn btn-primary self-start md:self-auto">
          Download PDF <Download />
        </a>
      </div>

      <article
        aria-label="Resume"
        className="paper mx-auto max-w-[860px] px-6 py-8 text-[13.5px] leading-[1.5] shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)] sm:px-12 sm:py-12 print:max-w-none print:bg-none print:p-0 print:text-[10.8px] print:leading-[1.42] print:shadow-none"
      >
        <header className="text-center">
          <p className="text-[30px] leading-none font-extrabold tracking-tight print:text-[22px]">{profile.name}</p>
          <p className="mt-2 text-paper-ink-muted">
            {profile.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href={profile.github}>github.com/{profile.githubHandle}</a> ·{" "}
            <a href={profile.linkedin}>linkedin.com/in/{profile.linkedinHandle}</a>
          </p>
        </header>

        <p className="mt-4">
          Software engineering-focused CS + Data Science dual-degree student (IIT Madras, RGPV, 2027) who has shipped a live
          e-commerce platform with 100+ users and orders, and builds reliable backends (Node.js, PostgreSQL, Redis).
        </p>

        <H>Education</H>
        {education.map((e) => (
          <div key={e.school} className="flex flex-wrap justify-between gap-x-4">
            <p>
              <b>{e.school}</b> · {e.degree} · {e.grade}
            </p>
            <p className="text-paper-ink-muted">{e.period}</p>
          </div>
        ))}

        <H>Experience</H>
        <div className="flex flex-wrap justify-between gap-x-4">
          <p>
            <b>Nakhrali Fashion (Nakhrali Luxury)</b> · nakhraliluxury.com
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-x-4">
          <p>Freelance Full Stack Developer</p>
          <p className="text-paper-ink-muted">Feb 2026 – Present</p>
        </div>
        <div className="flex flex-wrap justify-between gap-x-4">
          <p>Full Stack Developer Intern</p>
          <p className="text-paper-ink-muted">Aug 2025 – Jan 2026</p>
        </div>
        <ul className="mt-1 list-disc space-y-0.5 pl-5">
          {work.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <H>Projects</H>
        <div className="space-y-2">
          {projects.map((p) => (
            <div key={p.name}>
              <p>
                <b>{p.name}</b> · <span className="text-paper-ink-muted">{p.stack}</span> · <a href={p.href}>source</a>
              </p>
              <ul className="list-disc space-y-0.5 pl-5">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <H>Achievements &amp; leadership</H>
        <ul className="list-disc space-y-0.5 pl-5">
          {awards.slice(0, 2).map((a) => (
            <li key={a.title}>
              <b>{a.title}</b> · {a.detail} ({a.year})
            </li>
          ))}
          {leadership.map((l) => (
            <li key={l.title}>
              <b>{l.title}</b> · {l.detail} ({l.period})
            </li>
          ))}
        </ul>

        <H>Skills</H>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4">
          {skillRows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-bold">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </article>
    </div>
  );
}

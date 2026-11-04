import { Bars, Flow, Panel } from "./primitives";

function Nakhrali() {
  return (
    <div className="grid gap-5">
      <Panel
        title="Checkout integrity · how one payment becomes exactly one order"
        note="The browser can show a total; it can never set one. Everything after step 02 trusts the frozen snapshot."
      >
        <Flow
          label="Checkout flow"
          steps={[
            { title: "Cart from browser", sub: "Client totals are ignored" },
            { title: "Server recomputes", sub: "DB prices + promotions, in paise" },
            { title: "Snapshot frozen", sub: "Immutable, idempotency-keyed", accent: true },
            { title: "Razorpay payment", sub: "Customer pays" },
            { title: "HMAC-SHA256 verify", sub: "Signature checked server-side" },
            { title: "One order only", sub: "Advisory lock + row locks + unique index", accent: true },
          ]}
        />
      </Panel>
      <Panel title="Deployment topology · since the move off Render" note="GitHub Actions deploys on push and runs a post-deploy health check.">
        <Flow
          label="Request path"
          steps={[
            { title: "Visitor" },
            { title: "Cloudflare", sub: "Proxy, Full (strict) TLS, Turnstile" },
            { title: "Nginx · Hostinger VPS", sub: "Firewall open to Cloudflare IPs only", accent: true },
            { title: "PM2 → Express 5", sub: "86 route declarations" },
            { title: "PostgreSQL", sub: "Self-hosted, 37 migrations" },
          ]}
        />
      </Panel>
    </div>
  );
}

function EventProcessor() {
  return (
    <div className="grid gap-5">
      <Panel title="Delivery path · truth lives in PostgreSQL" note="Redis only delivers. If Redis is wiped, the sweeper rebuilds delivery from the outbox.">
        <Flow
          label="Event delivery"
          steps={[
            { title: "API receives event" },
            { title: "One transaction", sub: "State change + outbox row", accent: true },
            { title: "Redis Streams", sub: "Consumer groups" },
            { title: "Worker group × 3", sub: "Retries with full-jitter backoff" },
            { title: "Idempotent effect", sub: "Duplicates rejected by the database", accent: true },
          ]}
        />
      </Panel>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Reaper", "Reclaims events held by crashed workers or expired locks."],
          ["Sweeper", "Rebuilds delivery from PostgreSQL after complete Redis loss."],
          ["Dead-letter + replay", "Failed events park in a DLQ; only one concurrent replay can win."],
        ].map(([t, d]) => (
          <div key={t} className="border border-line bg-ink-soft p-5">
            <p className="label text-signal">Recovery</p>
            <p className="mt-2 text-[16px] font-semibold text-paper">{t}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-paper-muted">{d}</p>
          </div>
        ))}
      </div>
      <Panel title="Load test · local, 90 seconds, 3 workers">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="display text-[clamp(48px,6vw,88px)] leading-none">
            18,000 <span className="text-ash">/</span> 18,000
          </p>
          <p className="label pb-2 text-success">0 lost · 0 duplicated</p>
        </div>
        <div className="mt-4 h-3 w-full bg-crimson-bright" aria-hidden />
        <p className="mt-3 text-[13px] text-ash">200 unique events/s under duplicate-heavy k6 load · API p95 3.78 ms · local machine, not production.</p>
      </Panel>
    </div>
  );
}

function Readme() {
  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <Panel title="Pipeline · no repository code is executed">
          <Flow
            label="Analysis pipeline"
            steps={[
              { title: "Read README", sub: "Every claim keeps its source line" },
              { title: "Compare evidence", sub: "Manifests, lockfiles, CI, Docker" },
              { title: "Findings", sub: "Contradictions, with both sources" },
              { title: "PR check", sub: "Fails only on new contradictions", accent: true },
            ]}
          />
        </Panel>
      </div>
      <div className="lg:col-span-2">
        <Panel title="Extraction F1 · 59 hand-labelled READMEs" note="Offline evaluation against hand labels.">
          <Bars
            label="F1 by claim type"
            max={100}
            unit="%"
            bars={[
              { label: "Environment variables", value: 87.4, display: "87.4", accent: true },
              { label: "Commands", value: 77.8, display: "77.8" },
              { label: "Tech stack", value: 69.8, display: "69.8" },
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}

function MovieLens() {
  return (
    <div className="grid gap-5">
      <Panel title="Training and serving">
        <Flow
          label="Recommender pipeline"
          steps={[
            { title: "Chronological split", sub: "No future interactions in training", accent: true },
            { title: "Implicit ALS", sub: "12.28M positive interactions" },
            { title: "Rank + evaluate", sub: "NDCG@10 on 6,255 held-out users" },
            { title: "Serve", sub: "FastAPI + Streamlit, one Docker container" },
          ]}
        />
      </Panel>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="NDCG@10 · offline evaluation" note="128 factors scored lower than 64, so the smaller model shipped.">
          <Bars
            label="Higher is better"
            max={0.16}
            bars={[
              { label: "Bayesian popularity baseline", value: 0.09897, display: "0.0990" },
              { label: "ALS · 128 factors", value: 0.1487, display: "0.1487" },
              { label: "ALS · 64 factors (shipped)", value: 0.15108, display: "0.1511", accent: true },
            ]}
          />
        </Panel>
        <Panel title="Latency · local, warm, in-process benchmark" note="Apple M1 Pro, 500 calls. Not hosted or Hugging Face Space latency.">
          <div className="scroll-x">
            <table className="w-full min-w-[320px] text-left text-[14px]">
              <caption className="sr-only">Recommendation latency in milliseconds</caption>
              <thead className="label !text-[11px] text-ash">
                <tr className="border-b border-line">
                  <th className="py-2 font-normal">Request</th>
                  <th className="py-2 text-right font-normal">p50</th>
                  <th className="py-2 text-right font-normal">p95</th>
                  <th className="py-2 text-right font-normal">p99</th>
                </tr>
              </thead>
              <tbody className="font-mono text-paper">
                <tr className="border-b border-line">
                  <th className="py-3 font-sans font-normal text-paper-muted">Known user</th>
                  <td className="py-3 text-right">1.76 ms</td>
                  <td className="py-3 text-right">2.09 ms</td>
                  <td className="py-3 text-right">2.45 ms</td>
                </tr>
                <tr>
                  <th className="py-3 font-sans font-normal text-paper-muted">Cold-start fold-in</th>
                  <td className="py-3 text-right">3.56 ms</td>
                  <td className="py-3 text-right">11.05 ms</td>
                  <td className="py-3 text-right">11.34 ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function QuickPark() {
  return (
    <div className="grid gap-5">
      <Panel title="The race · same parallel test, before and after" note="Fixed with atomic compare-and-set updates and 2 partial unique indexes; the test runs inside the production container.">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="label text-signal">Before · spot P-01</p>
            <div className="mt-4 grid grid-cols-10 gap-1.5" role="img" aria-label="40 bookings created on one parking spot">
              {Array.from({ length: 40 }, (_, i) => (
                <span key={i} className="aspect-square bg-crimson-bright/80" />
              ))}
            </div>
            <p className="display mt-4 text-5xl">40 bookings</p>
            <p className="text-[14px] text-paper-muted">on one spot</p>
          </div>
          <div>
            <p className="label text-success">After · spot P-01</p>
            <div className="mt-4 grid grid-cols-10 gap-1.5" role="img" aria-label="One booking on the parking spot; all other requests refused">
              {Array.from({ length: 40 }, (_, i) => (
                <span key={i} className={`aspect-square ${i === 0 ? "bg-success" : "border border-line"}`} />
              ))}
            </div>
            <p className="display mt-4 text-5xl">1 booking</p>
            <p className="text-[14px] text-paper-muted">15 / 15 concurrency checks pass</p>
          </div>
        </div>
      </Panel>
      <Panel title="Deployment · 4 services in Docker Compose on AWS EC2">
        <Flow
          label="Service layout"
          steps={[
            { title: "Caddy", sub: "HTTPS reverse proxy" },
            { title: "Gunicorn · Flask", sub: "36 JWT-secured endpoints", accent: true },
            { title: "Redis", sub: "Broker + 30 s dashboard cache" },
            { title: "Celery + Beat", sub: "5 tasks, 2 scheduled jobs" },
          ]}
        />
      </Panel>
    </div>
  );
}

function CommentCategory() {
  // Text views and the three largest weights are from the notebook output (cells 94, 98).
  const models: [string, string?][] = [
    ["LogReg · pure character n-grams (2–5)", "0.260"],
    ["XGBoost", "0.254"],
    ["LogReg · word + char_wb bigrams", "0.232"],
    ["LogReg · word n-grams (1–3)"],
    ["LogReg · CountVectorizer"],
    ["LogReg · minimally cleaned TF-IDF"],
    ["LightGBM"],
    ["Random Forest"],
    ["LightGBM · numeric features only"],
  ];
  return (
    <div className="grid gap-5">
      <Panel title="The leaderboard · 2,343 entries">
        <div className="relative h-14 border border-line bg-ink" role="img" aria-label="Rank 5 out of 2,343, at the far left of the leaderboard">
          <div className="absolute inset-y-0 left-0 w-[0.6%] min-w-[6px] bg-crimson-bright" />
          <span className="label absolute top-1/2 left-4 -translate-y-1/2 text-paper">Rank 05</span>
          <span className="label absolute top-1/2 right-4 -translate-y-1/2 text-ash">Rank 2,343</span>
        </div>
        <p className="mt-3 text-[13px] text-ash">Top 0.21% · Kaggle competition, IIT Madras ML course · public score 0.84870.</p>
      </Panel>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Blend · 9 models, Nelder–Mead weights on 3-fold OOF" note="The three largest blend weights are shown. The top one went to the model that reads characters, not words.">
          <ul className="grid gap-1.5">
            {models.map(([m, w], i) => (
              <li
                key={m}
                className={`flex items-center justify-between gap-3 border px-3 py-2 text-[14px] ${i === 0 ? "border-crimson-bright bg-crimson/10 text-paper" : "border-line text-paper-muted"}`}
              >
                {m}
                {w && <span className="shrink-0 font-mono text-[13px]">w {w}</span>}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Scores" note="The gap between OOF accuracy and the public score is the lesson below. The exact competition metric is not stated here until confirmed.">
          <dl className="grid gap-4">
            {[
              ["Out-of-fold accuracy", "0.916", "Blend; best single model 0.910"],
              ["Out-of-fold macro F1", "0.829", "Closer to the public score"],
              ["Public leaderboard", "0.84870", "Rank 5 of 2,343"],
            ].map(([k, v, s]) => (
              <div key={k} className="flex items-end justify-between gap-4 border-b border-line pb-3">
                <div>
                  <dt className="text-[14px] text-paper-muted">{k}</dt>
                  <dd className="text-[12px] text-ash">{s}</dd>
                </div>
                <dd className="display text-4xl">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <p className="label mb-2 !text-[11px] text-ash">Smallest class · 2.8% of ~198K comments</p>
            <div className="flex h-3 w-full bg-panel" aria-hidden>
              <div className="h-full w-[2.8%] bg-crimson-bright" />
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function VentureLens() {
  const dims = [
    ["Market", 30],
    ["Feasibility", 25],
    ["Competition", 20],
    ["Risk", 15],
    ["Innovation", 10],
  ] as const;
  return (
    <div className="grid gap-5">
      <Panel title="Venture Score · 5 weighted dimensions">
        <div className="flex h-16 w-full" role="img" aria-label="Weights: market 30%, feasibility 25%, competition 20%, risk 15%, innovation 10%">
          {dims.map(([d, w], i) => (
            <div
              key={d}
              className="flex flex-col justify-end border-r border-ink px-2 pb-2"
              style={{ width: `${w}%`, background: `rgba(197,43,66,${0.95 - i * 0.17})` }}
            >
              <span className="font-mono text-[12px] text-paper">{w}%</span>
            </div>
          ))}
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[13px] text-paper-muted sm:grid-cols-5">
          {dims.map(([d, w]) => (
            <li key={d}>
              {d} <span className="text-ash">{w}%</span>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Scoring path" note="If both providers fail, a rule-based scorer still returns a score.">
          <Flow
            label="Scoring with fallback"
            steps={[
              { title: "Gemini 1.5 Flash ∥ Groq Llama 3.3 70B", sub: "Called in parallel" },
              { title: "Merge", sub: "One 0–100 Venture Score", accent: true },
              { title: "Rules fallback", sub: "When both APIs fail" },
            ]}
          />
        </Panel>
        <Panel title="The 70+ gate" note="Checked in the server action and the API route, not only in the interface.">
          <div className="flex items-center gap-4">
            <span className="display text-[72px] leading-none text-paper">70+</span>
            <span className="text-[15px] leading-snug text-paper-muted">
              unlocks team building, where a 3-tier engine (Gemini → Groq → rules) suggests founding roles and drops
              duplicates of roles already posted.
            </span>
          </div>
        </Panel>
      </div>
    </div>
  );
}

export const caseVisuals: Record<string, () => React.JSX.Element> = {
  nakhrali: Nakhrali,
  "idempotent-event-processor": EventProcessor,
  "readme-intelligence": Readme,
  movielens: MovieLens,
  quickpark: QuickPark,
  "comment-category-prediction": CommentCategory,
  venturelens: VentureLens,
};

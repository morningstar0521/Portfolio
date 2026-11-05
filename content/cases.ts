// Single source of truth for every case file. Facts come from Resume Builder/profile
// (verified or stated there) and the PRD's do-not-claim lists. Never add a number
// here that is not in those files.

export type Category = "BACKEND" | "FULL-STACK" | "MACHINE LEARNING" | "AI" | "DEVELOPER TOOLS";

/** What kind of proof a number is. Keeps a local benchmark from rendering as production. */
export type EvidenceKind =
  | "production"
  | "local-benchmark"
  | "offline-eval"
  | "competition"
  | "code-verified";

export const evidenceLabel: Record<EvidenceKind, string> = {
  production: "PRODUCTION",
  "local-benchmark": "LOCAL BENCHMARK",
  "offline-eval": "OFFLINE EVALUATION",
  competition: "COMPETITION RESULT",
  "code-verified": "CODE-VERIFIED",
};

export type Evidence = {
  value: string;
  label: string;
  kind: EvidenceKind;
  note?: string;
};

export type CaseLink = { label: string; href: string; kind: "live" | "source" };

/** Real screenshots in public/cases/<slug>/. width/height are the file's pixel size. */
export type Shot = { src: string; alt: string; caption: string; width: number; height: number };

export type CaseFile = {
  slug: string;
  number: string;
  title: string;
  name: string;
  classification: string;
  categories: Category[];
  status: "LIVE" | "LOCAL PROJECT" | "COMPETITION PROJECT";
  period: string;
  opening: string;
  /** Margin note in handwriting: editorial voice, never a claim. */
  note: string;
  summary: string;
  problem: string;
  role: string[];
  stack: string[];
  stackShort: string[];
  headline: Evidence;
  evidence: Evidence[];
  story: { title: string; tag?: string; points: string[] }[];
  lessons: string[];
  links: CaseLink[];
  cli?: string;
  caveat?: string;
  /** Pinned photo on the case cover (top right). */
  hero?: Shot;
  shots?: Shot[];
  lastVerified: string;
  /** Short "what could go wrong" lines for the index hover file; each restates the case's own problem text. */
  suspects: string[];
  award?: string;
};

const GH = "https://github.com/morningstar0521";

export const cases: CaseFile[] = [
  {
    slug: "nakhrali",
    number: "01",
    title: "The Commerce Operation",
    name: "Nakhrali Luxury",
    classification: "Professional experience · production e-commerce",
    categories: ["FULL-STACK", "BACKEND"],
    status: "LIVE",
    period: "Aug 2025 – Present",
    note: "Follow the money. Literally.",
    opening:
      "A live commerce system is never just a storefront. Every cart, payment, promotion and admin action has to agree on the truth.",
    summary:
      "Sole developer of a live e-commerce platform: checkout integrity, payments, promotions, deployment and operations.",
    problem:
      "A production store has to keep product prices, cart totals, promotions, orders and payment outcomes consistent, for customers and for the admins running the business. The client's browser cannot be trusted with any of it.",
    role: [
      "Full Stack Developer Intern · Aug 2025 – Jan 2026",
      "Freelance Full Stack Developer · Feb 2026 – Present",
      "Sole developer, working with one QA tester and one person overseeing the project.",
    ],
    stack: [
      "React 19", "Vite 7", "Tailwind CSS", "Node.js", "Express 5", "PostgreSQL (self-hosted Supabase)",
      "Zod", "Razorpay", "Cloudflare R2", "Cloudflare Turnstile", "Cloudflare proxy", "Brevo",
      "Hostinger VPS", "Ubuntu", "Nginx", "PM2", "GitHub Actions", "GA4", "Meta Pixel",
    ],
    stackShort: ["React 19", "Express 5", "PostgreSQL", "Razorpay", "Nginx + PM2"],
    suspects: ["Prices tampered with in the browser", "Cart totals and promotions drifting apart", "Orders out of step with payment outcomes"],
    headline: { value: "100+", label: "orders processed in production", kind: "production", note: "Self-reported, Oct 2026" },
    evidence: [
      { value: "100+", label: "registered users", kind: "production", note: "Self-reported, Oct 2026" },
      { value: "100+", label: "orders processed", kind: "production", note: "Self-reported, Oct 2026" },
      { value: "100+", label: "daily visitors", kind: "production", note: "Self-reported, Oct 2026" },
      { value: "~7,100", label: "people reached by Meta ad campaigns", kind: "production", note: "Ad reach, not active users" },
      { value: "86", label: "REST route declarations across 20 route files", kind: "code-verified" },
      { value: "37", label: "PostgreSQL migrations · 23 controllers · 30 pages", kind: "code-verified" },
      { value: "12 / 13", label: "findings fixed from the Oct 2026 security audit", kind: "code-verified", note: "One pricing finding still open" },
      { value: "~158", label: "tests in 25 files", kind: "code-verified", note: "3 search-visibility tests still fail" },
    ],
    story: [
      {
        title: "Checkout integrity",
        points: [
          "Every cart is recomputed on the server from database prices. A total sent by the browser is ignored.",
          "Razorpay payments are verified with HMAC-SHA256 before an order is trusted.",
          "Each payment is serialised with a PostgreSQL advisory lock, row locks and unique indexes, so a double click or a retried webhook cannot charge or create an order twice.",
        ],
      },
      {
        title: "Promotions engine",
        tag: "Freelance period · live in production",
        points: [
          "Combo pricing, buy-X-get-Y, free gifts and cart thresholds.",
          "All money is computed in paise, never floating-point rupees.",
          "Checkout freezes into an immutable, idempotency-keyed snapshot. Payment verification and refunds trust that snapshot, not a recalculation.",
        ],
      },
      {
        title: "Moving production",
        tag: "Freelance period",
        points: [
          "Migrated the backend from Render to a Hostinger VPS behind Nginx, PM2 and Cloudflare.",
          "Cloudflare runs Full (strict) TLS and the firewall only accepts Cloudflare IPs.",
          "GitHub Actions deploys on push and runs a post-deploy health check. (The workflow deploys; it does not run the test suite.)",
        ],
      },
      {
        title: "The incident",
        tag: "Freelance period",
        points: [
          "A database move silently dropped column defaults and the search trigger.",
          "Wrote an idempotent repair migration and backfilled order timestamps from Razorpay records.",
        ],
      },
      {
        title: "Security and search",
        points: [
          "Fixed 12 of 13 audit findings, including forced-logout, duplicate-order, SSRF and email HTML-injection bugs.",
          "Replaced LIKE table scans with PostgreSQL full-text search (tsvector + GIN index), and indexed admin date-range reports.",
          "Amazon / Flipkart product importer with SSRF protection: DNS check, IP pinning, redirect re-checks and a 5 MB cap.",
          "Bulk upload of up to 50 products per request, with a SAVEPOINT per product so one bad row cannot sink the batch.",
          "Consent-aware GA4 and Meta Pixel funnel tracking, route-level SEO metadata, JSON-LD and a sitemap.",
        ],
      },
    ],
    lessons: [
      "Never trust a number the client sends. Prices, totals and discounts are recomputed on the server every time.",
      "Freeze what you charge. An immutable checkout snapshot means payment verification and refunds agree with what the customer saw, even if a promotion changes a minute later.",
      "Infrastructure moves break quiet things. The migration kept the data but lost defaults and a trigger; repair scripts should be idempotent so they are safe to run twice.",
    ],
    links: [{ label: "Visit the live operation", href: "https://nakhraliluxury.com/", kind: "live" }],
    caveat: "The repository is private, so this file links to the live store only.",
    hero: { src: "/cases/nakhrali/home.webp", alt: "Nakhrali Luxury homepage with a necklace on a display bust", caption: "nakhraliluxury.com, live", width: 2000, height: 1136 },
    shots: [
      { src: "/cases/nakhrali/home.webp", alt: "Nakhrali Luxury homepage hero banner", caption: "Homepage of the live store.", width: 2000, height: 1136 },
      { src: "/cases/nakhrali/product.webp", alt: "Nakhrali product page for a layered necklace set with gallery, price and add to cart", caption: "Product page on the live store.", width: 2000, height: 1261 },
      { src: "/cases/nakhrali/cart.webp", alt: "Nakhrali shopping cart with order summary and recommendations", caption: "Cart. The total here is recomputed on the server at checkout; the browser never sets the price.", width: 2000, height: 1444 },
      { src: "/cases/nakhrali/checkout.webp", alt: "Nakhrali checkout with Razorpay online payment and partial cash-on-delivery options; personal details blurred", caption: "Checkout: Razorpay or partial COD with a ₹250 advance. Personal details blurred.", width: 2000, height: 1490 },
    ],
    lastVerified: "2026-10-30",
  },
  {
    slug: "idempotent-event-processor",
    number: "02",
    title: "The Duplicate That Never Happened",
    name: "Idempotent Event Processor",
    classification: "Backend · distributed systems",
    categories: ["BACKEND"],
    status: "LIVE",
    period: "2026",
    note: "Same event twice. Same answer once.",
    opening:
      "In payment systems, “probably delivered” is not good enough. The same event can arrive twice, arrive late, or arrive after a worker disappears.",
    summary:
      "A payment-event backend that loses nothing and duplicates nothing, even when workers crash or Redis is wiped.",
    problem:
      "Build a payment-event processor that protects against lost events and duplicate side effects when workers crash, locks expire, retries pile up or Redis disappears entirely.",
    role: ["Solo project."],
    stack: ["TypeScript", "Node.js 20", "Express 5", "PostgreSQL 16", "Redis 7 (Streams, consumer groups, Lua)", "Docker Compose", "k6", "Vitest", "GitHub Actions"],
    stackShort: ["TypeScript", "PostgreSQL 16", "Redis Streams", "Docker", "k6"],
    suspects: ["Workers crashing mid-event", "Expired locks and piled-up retries", "Redis disappearing entirely"],
    headline: { value: "18,000 / 18,000", label: "unique events processed in a 90 s load test", kind: "local-benchmark" },
    evidence: [
      { value: "0 lost · 0 duplicated", label: "across 6 Docker chaos scenarios", kind: "code-verified" },
      { value: "18,000 / 18,000", label: "events at 200 unique events/s for 90 s on 3 workers", kind: "local-benchmark" },
      { value: "3.78 ms", label: "API p95 under duplicate-heavy k6 load", kind: "local-benchmark" },
      { value: "10", label: "database + Redis invariants checked after every run", kind: "code-verified" },
      { value: "9 + 6", label: "in-process scenarios + Docker chaos scenarios", kind: "code-verified" },
    ],
    story: [
      {
        title: "Write once, publish reliably",
        points: [
          "A transactional outbox records the database change and the intent to publish in one transaction, so neither can happen without the other.",
          "Redis Streams consumer groups deliver events to workers.",
          "Idempotency is enforced by the database, not by hoping a worker remembers what it did.",
        ],
      },
      {
        title: "Recovery",
        points: [
          "A reaper reclaims work from crashed workers and expired locks.",
          "A sweeper rebuilds delivery from PostgreSQL when Redis is lost completely.",
          "Retries use exponential full-jitter backoff; failures go to a dead-letter queue, and replay is guarded so only one concurrent replay can win.",
        ],
      },
      {
        title: "Proof, not status codes",
        points: [
          "After every integration, chaos and load run, 10 invariants are checked against the database and Redis.",
          "A run passes only if the final state is correct, not just because every HTTP call returned 200.",
        ],
      },
    ],
    lessons: [
      "Redis is a delivery mechanism, not the source of truth. Keeping truth in PostgreSQL is what makes full Redis loss recoverable.",
      "Successful responses prove very little about a queue. Checking invariants on final state catches the duplicates and losses that a green load test hides.",
    ],
    links: [
      { label: "Interrogate the live API", href: "/case-files/idempotent-event-processor#interrogate", kind: "live" },
      { label: "Inspect the source", href: `${GH}/Idempotent-Event-Processor`, kind: "source" },
    ],
    caveat: "All throughput and latency numbers are local runs on one machine, not measurements of the hosted demo.",
    lastVerified: "2026-10-30",
  },
  {
    slug: "readme-intelligence",
    number: "03",
    title: "The README That Told the Truth",
    name: "README Intelligence",
    classification: "Developer tooling",
    categories: ["DEVELOPER TOOLS"],
    status: "LIVE",
    period: "2026",
    note: "The README lied. The lockfile didn't.",
    opening: "A README is a promise about a codebase. This tool checks whether the repository can actually keep it.",
    summary:
      "Extracts claims from a README and checks them against manifests, lockfiles, CI and Docker files. Web app, npm CLI and GitHub Action.",
    problem:
      "Documentation drifts. A README says one command, the package.json says another; it lists an environment variable the code never reads. README Intelligence extracts those claims and checks them against the repository's own evidence, without executing any repository code.",
    role: ["Solo project."],
    stack: ["TypeScript", "Next.js 14", "pnpm monorepo", "Zod", "Vitest", "Playwright", "GitHub Actions", "Vercel"],
    stackShort: ["TypeScript", "Next.js 14", "pnpm monorepo", "Vitest", "Playwright"],
    suspects: ["Commands the package.json contradicts", "Env variables the code never reads", "Docs drifting away from the repo"],
    headline: { value: "87.4%", label: "F1 on environment variables, 59 hand-labelled READMEs", kind: "offline-eval" },
    evidence: [
      { value: "87.4%", label: "F1 · environment variables", kind: "offline-eval", note: "59 hand-labelled READMEs" },
      { value: "77.8%", label: "F1 · commands", kind: "offline-eval", note: "59 hand-labelled READMEs" },
      { value: "69.8%", label: "F1 · tech stack", kind: "offline-eval", note: "59 hand-labelled READMEs" },
      { value: "592", label: "tests across 18 files", kind: "code-verified" },
      { value: "10", label: "Playwright end-to-end tests in CI", kind: "code-verified" },
      { value: "3", label: "ways to run it: web app, npm CLI (v0.1.4), GitHub Action", kind: "code-verified" },
    ],
    story: [
      {
        title: "Every claim has a source line",
        points: [
          "Each extracted value keeps a pointer to the exact README line it came from.",
          "Claims are compared with manifests, lockfiles, CI configuration and Docker files.",
          "Repository code is never executed during analysis.",
        ],
      },
      {
        title: "A gate that doesn't nag",
        points: [
          "The GitHub Action fails a pull request only when it adds a new README contradiction.",
          "Old, existing issues don't block unrelated changes, so teams can adopt it on a messy repository without turning it off on day one.",
        ],
      },
    ],
    lessons: [
      "Measure extraction against labelled data before trusting it. The F1 numbers show where the tool is strong (environment variables) and where it still misses (tech stack).",
      "A CI check that fails on pre-existing problems gets disabled. Failing only on new contradictions is what makes it usable.",
    ],
    links: [
      { label: "Open the web app", href: "https://readme-intelligence.vercel.app/", kind: "live" },
      { label: "View the source", href: `${GH}/Readme-Intelligence`, kind: "source" },
    ],
    cli: "npx readme-intel",
    caveat: "Rule-based analysis; no LLM is used. No usage or install numbers are claimed.",
    lastVerified: "2026-10-30",
  },
  {
    slug: "movielens",
    number: "04",
    title: "The Pattern Behind the Preference",
    name: "MovieLens Recommender",
    classification: "Machine learning · MLOps",
    categories: ["MACHINE LEARNING"],
    status: "LIVE",
    period: "Jul 2026 · revised Oct 2026",
    note: "Popular isn't the same as personal.",
    opening: "A recommendation is useful only when it beats a simple guess, and can explain why it made the choice.",
    summary:
      "Implicit-feedback ALS on MovieLens 25M, evaluated against a popularity baseline and deployed with FastAPI + Streamlit.",
    problem:
      "Build and deploy a recommender from implicit feedback, prove it beats a Bayesian popularity baseline without leaking the future into training, and serve both known users and brand-new ones.",
    role: ["Solo project (23 commits)."],
    stack: ["Python 3.11", "implicit (ALS)", "NumPy", "SciPy sparse", "pandas", "Parquet", "FastAPI", "Streamlit", "pytest", "GitHub Actions", "Docker", "Hugging Face Spaces", "MLflow (local) / JSONL run log"],
    stackShort: ["Python", "implicit ALS", "FastAPI", "Streamlit", "Docker"],
    suspects: ["The future leaking into training", "A popularity baseline that is hard to beat", "Brand-new users with no history"],
    headline: { value: "1.53×", label: "NDCG@10 over a Bayesian popularity baseline", kind: "offline-eval" },
    evidence: [
      { value: "0.09897 → 0.15108", label: "NDCG@10, baseline → ALS (1.53×)", kind: "offline-eval" },
      { value: "6,255", label: "held-out users, chronological split", kind: "offline-eval" },
      { value: "12.28M", label: "positive training interactions (ratings ≥ 3.5)", kind: "code-verified", note: "137,610 users × 24,337 items" },
      { value: "4 + 1", label: "ALS configurations compared against the baseline", kind: "offline-eval" },
      { value: "15", label: "pytest tests gating every push in CI", kind: "code-verified" },
    ],
    story: [
      {
        title: "No peeking at the future",
        points: [
          "Train and test are split chronologically, so the model never learns from interactions that happen after the ones it is tested on.",
          "Precision, Recall and NDCG@10 are measured on 6,255 held-out users.",
        ],
      },
      {
        title: "Bigger was worse",
        points: [
          "Four ALS configurations were compared with the popularity baseline.",
          "128 latent factors lowered NDCG@10 from 0.1511 to 0.1487, so the 64-factor model shipped.",
        ],
      },
      {
        title: "New users and explanations",
        points: [
          "Cold-start fold-in builds a vector for a brand-new user from a few picks, without retraining.",
          "“Because you liked X” explanations come from item-factor similarity.",
          "FastAPI and Streamlit run in one Docker container on Hugging Face Spaces.",
        ],
      },
    ],
    lessons: [
      "Beat a strong simple baseline first. A Bayesian popularity ranker is hard to beat on MovieLens; a 1.53× NDCG gain over it means something.",
      "More capacity is not automatically better. The 128-factor model overfit and lost NDCG, so the smaller one shipped.",
    ],
    hero: { src: "/cases/movielens/home.webp", alt: "MovieLens Recommender app with movie search and system panel showing ALS with 64 factors", caption: "Live on Hugging Face Spaces", width: 2000, height: 1130 },
    shots: [
      { src: "/cases/movielens/recommendations.webp", alt: "Top 10 recommendations, each with a 'because you liked' explanation", caption: "Top 10 picks, each explained by the movie you liked that led to it.", width: 2000, height: 1139 },
      { src: "/cases/movielens/search.webp", alt: "Searching titles and adding movies you like", caption: "Pick a few movies you like: the cold-start fold-in builds your taste vector without retraining.", width: 2000, height: 1134 },
      { src: "/cases/movielens/taste-profile.webp", alt: "Taste profile bar chart of genres from the picked movies", caption: "Taste profile built from your picks.", width: 2000, height: 1125 },
    ],
    links: [
      { label: "Try the recommender", href: "https://morningstar0521-movielens-recommender.hf.space", kind: "live" },
      { label: "View the source", href: `${GH}/movielens-recommender`, kind: "source" },
    ],
    lastVerified: "2026-10-30",
  },
  {
    slug: "quickpark",
    number: "05",
    title: "One Space. One Booking.",
    name: "QuickPark",
    classification: "Full-stack · backend · Best Project Award",
    award: "Best Project · IIT Madras",
    categories: ["FULL-STACK", "BACKEND"],
    status: "LIVE",
    period: "2025",
    note: "Two drivers, one spot. Only one gets it.",
    opening: "A parking spot cannot belong to two bookings at once. The system has to enforce that rule even when requests arrive together.",
    summary:
      "Flask + Vue 3 parking platform on AWS EC2 that stays correct under concurrent bookings. Best Project Award, IIT Madras.",
    problem:
      "A parking platform for users and administrators. The hard part is not the screens; it is preventing double booking when many requests hit the same spot at once, while also running scheduled jobs, analytics and a real deployment.",
    role: ["IIT Madras course project · Best Project Award (2025)."],
    stack: ["Python", "Flask", "SQLAlchemy", "SQLite", "Vue.js 3", "Celery + Beat", "Redis", "JWT", "ReportLab", "Docker Compose", "Caddy", "Gunicorn", "AWS EC2"],
    stackShort: ["Flask", "Vue 3", "Celery", "Redis", "AWS EC2"],
    suspects: ["Many requests racing for one spot", "Double bookings slipping through", "Scheduled jobs and analytics running alongside"],
    headline: { value: "40 → 1", label: "bookings on one spot under a parallel test, before and after the fix", kind: "code-verified" },
    evidence: [
      { value: "40 → 1", label: "bookings on one spot: old code vs fixed code under parallel load", kind: "code-verified" },
      { value: "15 / 15", label: "concurrency checks pass inside the production container", kind: "code-verified" },
      { value: "36", label: "JWT-secured REST endpoints with admin / user roles", kind: "code-verified" },
      { value: "4", label: "services in Docker Compose: Caddy, Gunicorn, Celery, Redis", kind: "code-verified" },
      { value: "5 + 2", label: "Celery tasks + scheduled jobs (email, PDF receipts, reports)", kind: "code-verified" },
      { value: "30 s", label: "Redis cache TTL on 4 dashboard endpoints", kind: "code-verified" },
    ],
    story: [
      {
        title: "The race",
        points: [
          "Under a parallel test, the original code created 40 bookings on a single spot.",
          "The fix uses atomic compare-and-set updates plus 2 partial unique indexes, so the database itself refuses a second active booking.",
          "SELECT … FOR UPDATE was not the answer: it is a no-op on SQLite.",
        ],
      },
      {
        title: "Work off the request path",
        points: [
          "Emails, PDF receipts and monthly reports run as 5 Celery tasks and 2 scheduled jobs.",
          "Four dashboard endpoints are cached in Redis with a 30-second TTL.",
          "30-day admin analytics (hourly bookings, revenue, occupancy) with CSV and server-side PDF export.",
        ],
      },
    ],
    lessons: [
      "Know what your database actually guarantees. Row locks that work on PostgreSQL silently do nothing on SQLite; constraints and atomic updates work on both.",
      "Write the failing concurrency test first. Seeing 40 bookings on one spot is what proved the bug and, later, the fix.",
    ],
    links: [
      { label: "Open QuickPark", href: "http://65-2-59-216.sslip.io/", kind: "live" },
      { label: "View the source", href: `${GH}/Quick-Park`, kind: "source" },
    ],
    caveat: "The live demo runs on an IP-based demo host (sslip.io) on AWS EC2.",
    hero: { src: "/cases/quickpark/home.webp", alt: "QuickPark landing page with a car in a parking garage", caption: "QuickPark on AWS EC2", width: 2000, height: 1125 },
    shots: [
      { src: "/cases/quickpark/spot-layout.webp", alt: "QuickPark lot view with 24 parking spots showing availability", caption: "Lot view: live spot availability, auto-assign or pick a spot.", width: 2000, height: 1143 },
      { src: "/cases/quickpark/admin-lots.webp", alt: "QuickPark admin table of parking lots with rates, occupancy and revenue", caption: "Admin: manage lots, rates and revenue (test data).", width: 2000, height: 1144 },
      { src: "/cases/quickpark/user-dashboard.webp", alt: "QuickPark user dashboard with active parking session and recent bookings", caption: "User dashboard with an active session (test account).", width: 2000, height: 1139 },
      { src: "/cases/quickpark/receipt.webp", alt: "QuickPark parking receipt with booking, location and time details", caption: "Booking receipt with PDF download.", width: 2000, height: 1146 },
    ],
    lastVerified: "2026-10-30",
  },
  {
    slug: "comment-category-prediction",
    number: "06",
    title: "2,343 Suspects",
    name: "Comment Category Prediction",
    classification: "Machine learning · NLP competition",
    categories: ["MACHINE LEARNING"],
    status: "COMPETITION PROJECT",
    period: "2026",
    note: "Misspellings are confessions.",
    opening: "Nearly two hundred thousand comments. Four imbalanced classes. The useful signal is often hiding in the way a word is misspelled.",
    summary: "Ranked 5th of 2,343 in an IIT Madras Kaggle competition with a 9-model blend over 198K comments.",
    problem:
      "Classify about 198,000 comments into four imbalanced categories, where the smallest class is only 2.8% of the data. Part of the IIT Madras ML course's Kaggle competition.",
    role: ["Solo project."],
    stack: ["Python", "scikit-learn (Pipeline, ColumnTransformer, TF-IDF, HalvingRandomSearchCV)", "XGBoost", "LightGBM", "SciPy", "pandas"],
    stackShort: ["scikit-learn", "LightGBM", "XGBoost", "TF-IDF", "SciPy"],
    suspects: ["~198,000 comments to sort", "Four imbalanced categories", "A smallest class of only 2.8%"],
    headline: { value: "5th / 2,343", label: "Kaggle competition, IIT Madras", kind: "competition" },
    evidence: [
      { value: "5th / 2,343", label: "final rank · public score 0.84870", kind: "competition" },
      { value: "0.916", label: "out-of-fold accuracy (3-fold)", kind: "offline-eval" },
      { value: "0.829", label: "out-of-fold macro F1", kind: "offline-eval" },
      { value: "+0.6 pts", label: "blend accuracy over the best single model (0.910)", kind: "offline-eval" },
      { value: "116", label: "engineered numeric features + 3 categorical", kind: "code-verified" },
      { value: "0.26", label: "highest blend weight: the character n-gram model", kind: "offline-eval" },
    ],
    story: [
      {
        title: "Nine witnesses",
        points: [
          "Five logistic regressions on different text views, plus LightGBM, XGBoost, Random Forest and a numeric-only LightGBM.",
          "Blend weights fitted with Nelder–Mead on 3-fold out-of-fold predictions.",
        ],
      },
      {
        title: "The misspelling clue",
        points: [
          "The character n-gram model earned the highest blend weight (0.26).",
          "Character n-grams still match when someone deliberately misspells a toxic word, which word-level features miss.",
        ],
      },
      {
        title: "No leakage",
        points: [
          "116 numeric features: toxicity, engagement, identity, time and length signals.",
          "All preprocessing lives inside scikit-learn Pipelines so validation folds never see training statistics.",
        ],
      },
    ],
    lessons: [
      "Tuning is not automatically a win. A tuned XGBoost (HalvingRandomSearchCV on a subset) scored 0.874, below the untuned model's 0.911.",
      "Optimise the metric you are judged on. Out-of-fold accuracy (0.916) sits well above the public score (0.849), while macro F1 (0.829) sits much closer to it.",
    ],
    links: [{ label: "View the experiment", href: `${GH}/Comment-Category-Prediction`, kind: "source" }],
    lastVerified: "2026-10-30",
  },
  {
    slug: "venturelens",
    number: "07",
    title: "The Startup Question",
    name: "VentureLens",
    classification: "AI · full-stack",
    categories: ["AI", "FULL-STACK"],
    status: "LIVE",
    period: "2026",
    note: "Two opinions. A third if both go quiet.",
    opening: "An idea is not a business plan. VentureLens turns an early concept into a structured set of assumptions that can be examined.",
    summary: "Two AI pipelines analyse a startup idea in parallel and combine into a weighted 0–100 Venture Score, with rule-based fallbacks.",
    problem:
      "An AI-assisted startup-validation platform: score an idea across weighted dimensions, then help the founder assemble a team, without the product breaking when a model provider is down.",
    role: ["Solo project (all 28 commits)."],
    stack: ["TypeScript", "Next.js 15 (App Router, Server Actions)", "React 19", "Tailwind CSS 4", "NextAuth v5", "Zod", "Neon PostgreSQL", "Google Gemini 2.5 Flash", "Groq (gpt-oss-120b, with model fallbacks)", "Vercel"],
    stackShort: ["Next.js 15", "TypeScript", "NextAuth v5", "Gemini + Groq", "PostgreSQL"],
    suspects: ["A model provider going down", "Sections a model fails to fill", "Duplicate roles in a founding team"],
    headline: { value: "2 pipelines + rules", label: "parallel AI analysis with rule-based fallbacks", kind: "code-verified" },
    evidence: [
      { value: "0–100", label: "Venture Score from two AI pipelines run in parallel (Gemini: market · Groq: competition, risk, feasibility)", kind: "code-verified" },
      { value: "5", label: "weighted dimensions: market, feasibility, competition, risk, innovation", kind: "code-verified" },
      { value: "3-tier", label: "fallback for team suggestions: Gemini → Groq → rules", kind: "code-verified" },
      { value: "70+", label: "score required to unlock team building, enforced on the server", kind: "code-verified" },
      { value: "3", label: "roles (founder, contributor, admin) in Edge middleware", kind: "code-verified" },
    ],
    story: [
      {
        title: "Two analysts, one score",
        points: [
          "Two pipelines run in parallel: Gemini 2.5 Flash analyses market potential (falling back to Groq), while Groq analyses competition, risk and feasibility.",
          "Groq tries gpt-oss-120b first and moves down a list of models if one fails, with a 20-second timeout per request.",
          "Weights: market 30%, feasibility 25%, competition 20%, risk 15%, innovation 10%.",
          "Model output is normalised field by field; anything missing or malformed is filled from a rule-based scorer, so a report always renders.",
        ],
      },
      {
        title: "Building the team",
        points: [
          "A team-composition engine suggests founding roles with a 3-tier fallback (Gemini, then Groq, then rules).",
          "Suggestions that duplicate roles already posted are removed.",
          "Team building unlocks only at a score of 70+, checked in both the server action and the API route.",
        ],
      },
      {
        title: "Access control",
        points: [
          "NextAuth v5 JWT sessions with founder, contributor and admin roles enforced in Edge middleware.",
          "Zod-validated server actions over 4 PostgreSQL tables (~8.8K lines of TypeScript).",
        ],
      },
    ],
    lessons: [
      "An LLM feature needs a non-LLM path. When both providers fail, the rule-based fallback keeps the product usable, even if the answer is simpler.",
      "A rule enforced only in the UI is a suggestion. The 70+ gate is checked on every server path that can create a team.",
    ],
    links: [
      { label: "Try VentureLens", href: "https://venturelens-beige.vercel.app/", kind: "live" },
      { label: "View the source", href: `${GH}/VentureLens`, kind: "source" },
    ],
    hero: { src: "/cases/venturelens/landing.webp", alt: "VentureLens landing page: turn your startup idea into a decision-ready venture report", caption: "venturelens, live on Vercel", width: 2000, height: 1139 },
    shots: [
      { src: "/cases/venturelens/score-report.webp", alt: "VentureLens report showing a Venture Score of 75 out of 100 with five dimension bars", caption: "Report for a sample idea (ClinicQ): 75/100 across five weighted dimensions.", width: 2000, height: 1127 },
      { src: "/cases/venturelens/market-competition.webp", alt: "Market potential, competition analysis, risk factors and feasibility sections of a VentureLens report", caption: "Market, competition, risk and feasibility. Figures are the AI's estimates for a sample idea.", width: 2000, height: 1135 },
      { src: "/cases/venturelens/team-builder.webp", alt: "AI-assisted team builder suggesting a Co-founder and CTO role with skills", caption: "Unlocked at 70+: AI-suggested founding roles, editable before posting.", width: 2000, height: 1132 },
    ],
    lastVerified: "2026-11-04",
  },
];

export const categories: Category[] = ["BACKEND", "FULL-STACK", "MACHINE LEARNING", "AI", "DEVELOPER TOOLS"];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

export function neighbours(slug: string) {
  const i = cases.findIndex((c) => c.slug === slug);
  return { prev: cases[i - 1], next: cases[i + 1] };
}

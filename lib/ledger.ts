// Server-only proxy helpers for the live Idempotent Event Processor demo.
// The API key stays on the server; the browser only talks to /api/ledger/*.

const BASE = process.env.LEDGER_API_URL;
const KEY = process.env.LEDGER_API_KEY;

export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const VISITOR = /^visitor_[a-z0-9]{6,16}$/;
export const KEY_RE = /^[A-Za-z0-9_.:-]{1,80}$/;

// shortcut: per-instance memory, resets on restart and is not shared across serverless instances;
// move to Redis/Upstash if the demo gets real traffic.
const hits = new Map<string, number[]>();
export function limited(req: Request, max = 40, windowMs = 60_000) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.delete(ip); // re-insert so Map order is least-recently-seen first
  hits.set(ip, recent);
  for (const oldest of hits.keys()) {
    if (hits.size <= 5000) break;
    hits.delete(oldest);
  }
  return recent.length > max;
}

export function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function forward(path: string, init: RequestInit = {}) {
  if (!BASE || !KEY) return json({ error: { code: "DEMO_OFFLINE", message: "The live demo is not configured." } }, 503);
  const started = performance.now();
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: { "X-API-Key": KEY, "Content-Type": "application/json", ...(init.headers ?? {}) },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const body = await res.json().catch(() => ({}));
    // Server-side time to the backend, so visitors see backend latency separately from their own network.
    return Response.json(body, {
      status: res.status,
      headers: { "Cache-Control": "no-store", "X-Upstream-Ms": (performance.now() - started).toFixed(1) },
    });
  } catch {
    return json({ error: { code: "DEMO_OFFLINE", message: "The live service did not answer. It may be asleep." } }, 503);
  }
}

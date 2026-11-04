import { forward, json, KEY_RE, limited, VISITOR } from "@/lib/ledger";

// Only the two event types the backend accepts, for a visitor's own sandbox merchant.
export async function POST(req: Request) {
  if (limited(req)) return json({ error: { code: "SLOW_DOWN", message: "Too many requests. Try again in a minute." } }, 429);
  const key = req.headers.get("idempotency-key") ?? "";
  const b = await req.json().catch(() => null);
  const p = b?.payload;
  const ok =
    KEY_RE.test(key) &&
    (b?.type === "payment.captured" || b?.type === "payout.requested") &&
    p && VISITOR.test(p.merchant_id) &&
    Number.isInteger(p.amount_minor) && p.amount_minor > 0 && p.amount_minor <= 1_000_000_000 &&
    p.currency === "INR" &&
    KEY_RE.test(b.type === "payment.captured" ? p.payment_id : p.payout_id);
  if (!ok) return json({ error: { code: "VALIDATION_ERROR", message: "This demo only sends small INR events for your sandbox merchant." } }, 400);

  const ref = b.type === "payment.captured" ? { payment_id: p.payment_id } : { payout_id: p.payout_id };
  const body = { type: b.type, payload: { merchant_id: p.merchant_id, amount_minor: p.amount_minor, currency: "INR", ...ref } };
  return forward("/v1/events", { method: "POST", headers: { "Idempotency-Key": `pf-${key}` }, body: JSON.stringify(body) });
}

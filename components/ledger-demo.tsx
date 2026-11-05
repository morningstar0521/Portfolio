"use client";

import { useEffect, useRef, useState } from "react";

// Live interrogation of the deployed Idempotent Event Processor, through /api/ledger/* (server proxy).
// Every number shown here comes from a real response; nothing is simulated.

type Entry = {
  id: number;
  label: string;
  status: number;
  ms: number;
  upstreamMs?: number;
  duplicate?: boolean;
  eventId?: string;
  eventStatus?: string;
  error?: string;
};
type Wallet = { balance_minor: number; ledger_entries: number; verified?: boolean; ledger_sum_minor?: number };

const rid = () => Math.random().toString(36).slice(2, 10);
const inr = (minor: number) => `₹${(minor / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

function merchantId() {
  try {
    const saved = localStorage.getItem("ledgerMerchant");
    if (saved && /^visitor_[a-z0-9]{6,16}$/.test(saved)) return saved;
    const id = `visitor_${rid()}`;
    localStorage.setItem("ledgerMerchant", id);
    return id;
  } catch {
    return `visitor_${rid()}`;
  }
}

export function LedgerDemo() {
  const [merchant, setMerchant] = useState<string>("");
  const [online, setOnline] = useState<"checking" | "up" | "down">("checking");
  const [amount, setAmount] = useState(500);
  const [last, setLast] = useState<{ key: string; paymentId: string; amount: number } | null>(null);
  const [log, setLog] = useState<Entry[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [busy, setBusy] = useState(false);
  const [verdict, setVerdict] = useState<string>("");
  const seq = useRef(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMerchant(merchantId());
    fetch("/api/ledger/ready")
      .then((r) => setOnline(r.ok ? "up" : "down"))
      .catch(() => setOnline("down"));
  }, []);

  async function refreshWallet(m = merchant) {
    const r = await fetch(`/api/ledger/wallets/${m}`);
    if (r.ok) setWallet(await r.json());
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (merchant) refreshWallet(merchant);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchant]);

  function patch(id: number, p: Partial<Entry>) {
    setLog((l) => l.map((e) => (e.id === id ? { ...e, ...p } : e)));
  }

  async function send(label: string, body: object, key: string): Promise<Entry> {
    const id = ++seq.current;
    const t0 = performance.now();
    let entry: Entry;
    try {
      const r = await fetch("/api/ledger/events", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": key },
        body: JSON.stringify(body),
      });
      const j = await r.json().catch(() => ({}));
      entry = {
        id,
        label,
        status: r.status,
        ms: Math.round(performance.now() - t0),
        upstreamMs: Number(r.headers.get("X-Upstream-Ms")) || undefined,
        duplicate: j.duplicate,
        eventId: j.event_id,
        eventStatus: j.status,
        error: j.error?.code,
      };
    } catch {
      entry = { id, label, status: 0, ms: Math.round(performance.now() - t0), error: "NETWORK" };
    }
    setLog((l) => [entry, ...l].slice(0, 30));
    return entry;
  }

  // Follow an event from "received" to its final state, then re-read the ledger.
  async function follow(entry: Entry): Promise<string | undefined> {
    if (!entry.eventId) return;
    let final: string | undefined;
    for (let i = 0; i < 30; i++) {
      const r = await fetch(`/api/ledger/events/${entry.eventId}`);
      if (r.ok) {
        const e = await r.json();
        patch(entry.id, { eventStatus: e.status });
        final = e.status;
        if (e.status === "processed" || e.status === "dead") break;
      }
      await new Promise((res) => setTimeout(res, 400));
    }
    await refreshWallet();
    return final;
  }

  const payment = (paymentId: string, amt: number) => ({
    type: "payment.captured",
    payload: { merchant_id: merchant, amount_minor: amt * 100, currency: "INR", payment_id: paymentId },
  });

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setVerdict("");
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  }

  const sendNew = () =>
    run(async () => {
      const key = rid();
      const paymentId = `pay_${rid()}`;
      setLast({ key, paymentId, amount });
      const e = await send(`New payment · ${inr(amount * 100)}`, payment(paymentId, amount), key);
      if (e.status === 202) setVerdict("Accepted. Watch the status move from received to processed.");
      await follow(e);
    });

  const sendAgain = () =>
    run(async () => {
      if (!last) return;
      const e = await send("Same key, same body", payment(last.paymentId, last.amount), last.key);
      setVerdict(
        e.duplicate ? "200 and duplicate: true. The API returned the stored event; the ledger did not move." : "",
      );
      await refreshWallet();
    });

  const sendTampered = () =>
    run(async () => {
      if (!last) return;
      const e = await send(`Same key, amount changed to ${inr((last.amount + 1) * 100)}`, payment(last.paymentId, last.amount + 1), last.key);
      setVerdict(e.status === 422 ? "422 IDEMPOTENCY_KEY_REUSED. A key can't be replayed with a different body." : "");
    });

  const burst = () =>
    run(async () => {
      const key = rid();
      const paymentId = `pay_${rid()}`;
      setLast({ key, paymentId, amount });
      const before = wallet?.ledger_entries ?? 0;
      const results = await Promise.all(
        Array.from({ length: 10 }, (_, i) => send(`Burst ${i + 1}/10 · same key`, payment(paymentId, amount), key)),
      );
      const created = results.filter((r) => r.status === 202);
      const dups = results.filter((r) => r.duplicate).length;
      if (created[0]) await follow(created[0]);
      const r = await fetch(`/api/ledger/wallets/${merchant}`);
      const w: Wallet | null = r.ok ? await r.json() : null;
      if (w) setWallet(w);
      setVerdict(
        `10 requests in parallel → ${created.length} created, ${dups} duplicates. Ledger entries ${before} → ${w?.ledger_entries ?? "?"}.`,
      );
    });

  const overdraw = () =>
    run(async () => {
      const amt = Math.round((wallet?.balance_minor ?? 0) / 100) + 1000;
      const e = await send(`Payout of ${inr(amt * 100)} (more than the balance)`, {
        type: "payout.requested",
        payload: { merchant_id: merchant, amount_minor: amt * 100, currency: "INR", payout_id: `po_${rid()}` },
      }, rid());
      const final = await follow(e);
      setVerdict(
        final === "dead"
          ? "Status: dead. A payout larger than the balance fails permanently and waits in the dead-letter queue. The balance didn't move."
          : `Final status: ${final ?? "unknown"}.`,
      );
    });

  const disabled = busy || online !== "up" || !merchant;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-12">
      {/* Controls */}
      <div className="min-w-0 border border-line bg-card p-5 md:p-6 lg:col-span-5">
        <div className="flex items-center justify-between gap-3">
          <p className="label !text-[11px] text-faint">Live service · AWS EC2</p>
          <span className={`label inline-flex items-center gap-2 !text-[11px] ${online === "up" ? "text-success" : online === "down" ? "text-crimson" : "text-faint"}`}>
            <span className={`h-2 w-2 rounded-full ${online === "up" ? "bg-success" : online === "down" ? "bg-crimson" : "bg-faint"}`} />
            {online === "up" ? "Ready" : online === "down" ? "Offline" : "Checking"}
          </span>
        </div>
        <p className="mt-3 text-[14px] text-muted">
          Your sandbox merchant: <code className="font-mono text-[13px] text-fg">{merchant || "…"}</code>
        </p>

        <label className="mt-5 block">
          <span className="label !text-[11px] text-faint">Payment amount (₹)</span>
          <input
            type="number"
            min={1}
            max={100000}
            value={amount}
            onChange={(e) => setAmount(Math.min(100000, Math.max(1, Math.floor(Number(e.target.value) || 1))))}
            className="mt-2 block min-h-11 w-full border border-line bg-ground px-3 font-mono text-[15px] text-fg"
          />
        </label>

        <div className="mt-5 grid gap-2">
          <Action n="1" onClick={sendNew} disabled={disabled} title="Send a payment" hint="New idempotency key → 202" primary />
          <Action n="2" onClick={sendAgain} disabled={disabled || !last} title="Send it again" hint="Same key, same body → 200, duplicate" />
          <Action n="3" onClick={sendTampered} disabled={disabled || !last} title="Change the amount, keep the key" hint="Same key, different body → 422" />
          <Action n="4" onClick={burst} disabled={disabled} title="Fire 10 copies at once" hint="Parallel duplicates → one effect" />
          <Action n="5" onClick={overdraw} disabled={disabled} title="Request a payout you can't afford" hint="Permanent failure → dead-letter queue" />
        </div>
        {online === "down" && (
          <p className="mt-4 text-[13px] text-crimson">
            The live service isn&apos;t answering right now. The source and recorded results are linked below.
          </p>
        )}
      </div>

      {/* Ledger + log */}
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-5 lg:col-span-7">
        <div className="manila p-5 md:p-6">
          <p className="label !text-[11px] text-tag-muted">Wallet · read back from PostgreSQL</p>
          <div className="mt-3 flex flex-wrap items-end gap-x-10 gap-y-3">
            <div>
              <p className="display text-[clamp(40px,4vw,60px)] leading-none text-tag-ink">{wallet ? inr(wallet.balance_minor) : "₹0.00"}</p>
              <p className="label mt-1 !text-[10px] text-tag-muted">Balance</p>
            </div>
            <div>
              <p className="display text-[clamp(40px,4vw,60px)] leading-none text-tag-ink">{wallet?.ledger_entries ?? 0}</p>
              <p className="label mt-1 !text-[10px] text-tag-muted">Ledger entries</p>
            </div>
            {wallet?.verified !== undefined && (
              <span className={`stamp -rotate-3 ${wallet.verified ? "text-success" : "text-crimson"}`}>
                {wallet.verified ? "Balance = sum of ledger" : "Mismatch"}
              </span>
            )}
          </div>
          <p aria-live="polite" className="hand mt-4 min-h-[1.2em] text-[22px] leading-snug text-crimson">
            {verdict}
          </p>
        </div>

        <div className="border border-line bg-card">
          <p className="label border-b border-line px-4 py-3 !text-[11px] text-faint">Interrogation log · newest first</p>
          <div className="scroll-x max-h-[340px] overflow-y-auto" tabIndex={0} role="region" aria-label="Interrogation log (scrollable)">
            <table className="w-full min-w-[560px] text-left text-[13px]">
              <thead className="label sticky top-0 bg-card !text-[10px] text-faint">
                <tr>
                  <th className="px-4 py-2 font-normal">Request</th>
                  <th className="px-2 py-2 font-normal">HTTP</th>
                  <th className="px-2 py-2 font-normal">Event</th>
                  <th className="px-2 py-2 text-right font-normal">Backend</th>
                  <th className="px-4 py-2 text-right font-normal">Round trip</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {log.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 font-sans text-muted">
                      No requests yet. Start with step 1.
                    </td>
                  </tr>
                )}
                {log.map((e) => (
                  <tr key={e.id} className="border-t border-line">
                    <td className="px-4 py-2 font-sans text-fg">{e.label}</td>
                    <td className={`px-2 py-2 ${e.status >= 400 || e.status === 0 ? "text-crimson" : e.duplicate ? "text-amber" : "text-success"}`}>
                      {e.status || "—"}
                      {e.duplicate ? " dup" : ""}
                      {e.error ? ` ${e.error}` : ""}
                    </td>
                    <td className="px-2 py-2 text-muted">{e.eventStatus ?? "—"}</td>
                    <td className="px-2 py-2 text-right text-muted">{e.upstreamMs ? `${e.upstreamMs.toFixed(0)} ms` : "—"}</td>
                    <td className="px-4 py-2 text-right text-muted">{e.ms} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-line px-4 py-2 text-[12px] text-faint">
            Backend = proxy to EC2 and back. Round trip = your browser to this site and back. Both include internet latency; they are not the local benchmark numbers above.
          </p>
        </div>
      </div>
    </div>
  );
}

function Action({ n, title, hint, onClick, disabled, primary }: { n: string; title: string; hint: string; onClick: () => void; disabled: boolean; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group flex min-h-14 items-center gap-4 border px-4 py-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${primary ? "border-[#9e1b2c] bg-[#9e1b2c] text-[#fbf6ea] hover:bg-[#b3253a]" : "border-line bg-ground hover:border-fg"}`}
    >
      <span className={`label !text-[11px] ${primary ? "text-[#fbf6ea]/80" : "text-faint"}`}>{n}</span>
      <span className="flex-1">
        <span className="block text-[15px] font-semibold">{title}</span>
        <span className={`block text-[12px] ${primary ? "text-[#fbf6ea]/85" : "text-muted"}`}>{hint}</span>
      </span>
    </button>
  );
}

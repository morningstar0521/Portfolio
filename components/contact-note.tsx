"use client";

import { useState } from "react";
import { web3formsKey } from "@/content/site";
import { profile } from "@/content/profile";
import { Thumbprint } from "./thumbprint";
import { ArrowRight } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

// A paper note left on the case board. Sends through Web3Forms straight from the browser.
export function ContactNote() {
  const [status, setStatus] = useState<Status>("idle");
  const [length, setLength] = useState(0);

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(form) });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      form.reset();
      setLength(0);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-1 w-full border-0 border-b border-tag-ink/30 bg-transparent px-0 py-2 text-[16px] text-tag-ink placeholder:text-tag-muted/70 focus:border-crimson focus:ring-0 focus:outline-none";

  return (
    <div className="manila relative rotate-[1.2deg] p-6 shadow-[0_40px_60px_-30px_rgba(0,0,0,.9)] md:p-8">
      <span aria-hidden className="absolute -top-2.5 left-1/2 block h-5 w-5 -translate-x-1/2 rounded-full bg-[#b3253a] shadow-[inset_-3px_-3px_4px_rgba(0,0,0,.35),0_4px_6px_rgba(0,0,0,.45)]" />

      {status === "sent" ? (
        <div role="status" className="relative py-10 text-center">
          <Thumbprint id="tp-note" drips={false} className="mx-auto h-28 w-auto rotate-[-8deg] opacity-90" />
          <p className="display mt-6 text-[clamp(32px,3vw,42px)] leading-none text-tag-ink">Note received.</p>
          <p className="hand mt-3 text-[24px] text-crimson">I&apos;ll find you. By email.</p>
          <button type="button" onClick={() => setStatus("idle")} className="label link-underline mt-8 inline-flex min-h-11 items-center !text-[11px] text-tag-ink">
            Leave another note
          </button>
        </div>
      ) : (
        <form onSubmit={send}>
          <p className="label flex justify-between !text-[10px] text-tag-muted">
            <span>Anonymous tip · Case 08</span>
            <span>To: Shubh Ghiya</span>
          </p>
          <h2 className="display mt-4 text-[clamp(34px,3.4vw,48px)] leading-none text-tag-ink">Leave a note.</h2>
          <p className="hand mt-1 text-[22px] text-crimson">I read every one.</p>

          <input type="hidden" name="access_key" value={web3formsKey} />
          <input type="hidden" name="subject" value="New note from the portfolio (Case 08)" />
          <input type="hidden" name="from_name" value="Shubh Ghiya · portfolio" />
          {/* Honeypot: people never see or tick it; bots that fill every field get dropped by Web3Forms. */}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="label !text-[10px] text-tag-muted">Your name</span>
              <input name="name" required maxLength={80} autoComplete="name" placeholder="Patrick Jane" className={field} />
            </label>
            <label className="block">
              <span className="label !text-[10px] text-tag-muted">Your email</span>
              <input type="email" name="email" required maxLength={120} autoComplete="email" placeholder="you@company.com" className={field} />
            </label>
          </div>
          <label className="mt-5 block">
            <span className="label flex justify-between !text-[10px] text-tag-muted">
              <span>The message</span>
              <span aria-hidden>{length}/1000</span>
            </span>
            <textarea
              name="message"
              required
              rows={4}
              maxLength={1000}
              placeholder="A role, a project, or just a hello."
              onChange={(e) => setLength(e.target.value.length)}
              className={`${field} resize-y leading-relaxed`}
            />
          </label>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:cursor-wait disabled:opacity-70">
              {status === "sending" ? "Sending…" : "Leave your calling card"} <ArrowRight />
            </button>
            <span className="label !text-[10px] text-tag-muted">Delivered by Web3Forms</span>
          </div>

          <p role="status" aria-live="polite" className="mt-4 text-[14px] text-crimson">
            {status === "error" && (
              <>
                The note didn&apos;t go through. Email me instead:{" "}
                <a href={`mailto:${profile.email}`} className="link-underline font-semibold">
                  {profile.email}
                </a>
              </>
            )}
          </p>
        </form>
      )}
    </div>
  );
}

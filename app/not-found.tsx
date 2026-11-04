import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[70svh] content-center py-24">
      <p className="label text-signal">Error 404 · No record</p>
      <h1 className="display mt-5 text-[clamp(64px,11vw,176px)]">This file does not exist.</h1>
      <p className="mt-6 text-[18px] text-paper-muted">The evidence led nowhere. Return to the archive.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/case-files" className="btn btn-primary">
          Open the case files <ArrowRight />
        </Link>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </section>
  );
}

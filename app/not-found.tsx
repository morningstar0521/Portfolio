import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Thumbprint } from "@/components/thumbprint";

export default function NotFound() {
  return (
    <section className="wrap relative grid min-h-[70svh] content-center overflow-hidden py-24">
      <Thumbprint id="tp-404" className="pointer-events-none absolute top-16 right-[4%] w-[clamp(110px,16vw,220px)] rotate-[12deg]" />
      <p className="label text-alert">Error 404 · No record</p>
      <h1 className="display mt-5 text-[clamp(64px,11vw,176px)]">This file does not exist.</h1>
      <p className="mt-6 text-[18px] text-muted">The evidence led nowhere. Return to the archive.</p>
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

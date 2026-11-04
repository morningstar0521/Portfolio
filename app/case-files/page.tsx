import type { Metadata } from "next";
import { CaseFilter } from "@/components/case-filter";

export const metadata: Metadata = {
  title: "The Case Archive",
  description:
    "Seven case files: production e-commerce, reliable backends, developer tooling, recommender systems, NLP and AI products by Shubh Ghiya.",
  alternates: { canonical: "/case-files" },
};

export default function CaseFilesPage() {
  return (
    <div className="wrap py-16 md:py-24">
      <header className="mb-12 grid gap-6 border-b border-line pb-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="label enter text-signal">Archive · 07 files</p>
          <h1 className="display enter mt-4 text-[clamp(64px,10vw,160px)]" style={{ "--i": 1 } as React.CSSProperties}>
            The case archive
          </h1>
        </div>
        <p className="enter text-[18px] leading-relaxed text-paper-muted md:col-span-4" style={{ "--i": 2 } as React.CSSProperties}>
          Seven files. Different problems. One habit: follow the evidence.
        </p>
      </header>
      <CaseFilter />
    </div>
  );
}

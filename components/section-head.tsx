export function SectionHead({ kicker, title, intro, id }: { kicker: string; title: string; intro?: string; id?: string }) {
  return (
    <header className="reveal mb-10 grid gap-4 md:mb-14 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className="label text-alert">{kicker}</p>
        <h2 id={id} className="display mt-3 text-[clamp(44px,6vw,88px)] text-fg">
          {title}
        </h2>
      </div>
      {intro && <p className="text-[17px] leading-relaxed text-muted md:col-span-5 md:pb-2">{intro}</p>}
    </header>
  );
}

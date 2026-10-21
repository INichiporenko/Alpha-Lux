import type { Dictionary } from "@/lib/dictionary";
import { Reveal } from "@/components/Reveal";

export function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative bg-navy py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">{dict.why.eyebrow}</p>
            <h2 className="font-display mt-4 max-w-xl text-5xl leading-tight text-ice md:text-6xl">
              {dict.why.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-lg text-base leading-8 text-mist">{dict.why.text}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 overflow-visible pt-2 md:grid-cols-2 xl:grid-cols-4">
          {dict.reasons.map((item, i) => (
            <Reveal key={item.num} delay={i * 90} dir={i % 2 === 0 ? "up" : "scale"}>
              <article className="card-3d h-full rounded-2xl border border-white/10 bg-panel p-7">
                <span className="font-display text-3xl text-blue-bright/80">{item.num}</span>
                <h3 className="mt-8 font-display text-2xl text-snow">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-haze">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 border-t border-line pt-16 md:mt-28 md:pt-20">
          <Reveal>
            <h3 className="font-display max-w-3xl text-4xl leading-tight text-ice md:text-5xl">
              {dict.advantages.title}
            </h3>
          </Reveal>
          <ul className="mt-12 grid list-none gap-x-12 gap-y-10 md:grid-cols-2">
            {dict.advantages.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={80 + i * 70}>
                  <div className="flex gap-4">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                    <div>
                      <h4 className="font-display text-2xl text-ice">{item.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-mist">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

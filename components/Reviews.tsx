import { company } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { localizedHref, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";

function Stars() {
  return (
    <div className="mt-5 flex gap-1.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-blue-bright">
          <path d="M10 1.6 12.4 7l5.9.5-4.5 3.8 1.4 5.7L10 13.8 4.8 17l1.4-5.7L1.7 7.5 7.6 7 10 1.6Z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { reviews } = dict;
  const sources = [
    { name: reviews.google, href: company.socials.google },
    { name: reviews.check24, href: company.socials.check24 },
  ];

  return (
    <section className="relative bg-navy py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-blue/15 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 border-b border-line pb-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">{reviews.eyebrow}</p>
            <h2
              className="mt-5 flex items-end gap-3 text-ice"
              aria-label={reviews.title}
            >
              <span className="font-display text-7xl leading-none md:text-8xl">{reviews.googleScore}</span>
              <span className="mb-2 text-xl text-mist md:mb-3 md:text-2xl">{reviews.ofFive}</span>
            </h2>
            <Stars />
            <p className="mt-4 text-[11px] tracking-[0.22em] uppercase text-mist">{reviews.totalCount}</p>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-xl text-lg leading-8 text-mist md:leading-9">{reviews.lead}</p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {sources.map((source) => (
                <a
                  key={source.name}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[12px] tracking-[0.22em] uppercase text-ice"
                >
                  {source.name}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <p className="mt-14 text-[11px] tracking-[0.32em] uppercase text-blue-bright">
          {reviews.highlightsEyebrow}
        </p>
        <div className="mt-4 grid md:grid-cols-2">
          {reviews.highlights.map((item, i) => (
            <Reveal
              key={item}
              delay={i * 80}
              className={`border-t border-line py-8 ${i % 2 === 1 ? "md:pl-12" : "md:pr-12"}`}
            >
              <p className="font-display text-5xl leading-none text-blue-bright/45" aria-hidden>
                “
              </p>
              <p className="mt-3 font-display text-2xl leading-snug text-ice md:text-[1.65rem]">{item}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-[12px] leading-6 text-mist/80">{reviews.disclaimer}</p>
        <Reveal className="mt-10">
          <Link
            href={localizedHref(lang, "/#contact")}
            className="btn-shine inline-flex min-h-12 items-center justify-center rounded-full bg-blue px-8 py-3 text-center text-[12px] tracking-[0.14em] uppercase text-white"
          >
            {reviews.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

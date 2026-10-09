import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ServicesSlideshow } from "@/components/ServicesSlideshow";
import type { Dictionary } from "@/lib/dictionary";
import { localizedHref, type Locale } from "@/lib/i18n";

export function ServicesPreview({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const preview = dict.services.filter((_, i) => [0, 1, 3, 6, 9, 11].includes(i));

  return (
    <section className="bg-ink pt-16 pb-8 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">
                {dict.servicesHome.eyebrow}
              </p>
              <h2 className="font-display mt-4 text-5xl leading-tight text-ice md:text-6xl">
                {dict.servicesHome.title}
              </h2>
              <p className="mt-6 max-w-md text-base leading-8 text-mist">{dict.servicesHome.text}</p>
            </Reveal>

            <div className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {preview.map((service, i) => (
                <Reveal key={service.title} delay={40 + i * 30}>
                  <div className="flex gap-3 border-t border-line py-4">
                    <span className="shrink-0 text-[11px] tracking-[0.2em] text-blue-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-ice/90">{service.title}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10" delay={80}>
              <Link
                href={localizedHref(lang, "/services")}
                className="btn-shine inline-flex h-12 items-center rounded-full bg-blue px-8 text-[12px] tracking-[0.22em] uppercase text-white"
              >
                {dict.servicesHome.cta}
              </Link>
            </Reveal>
          </div>

          <ServicesSlideshow alt={dict.servicesHome.title} />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { localizedHref, type Locale } from "@/lib/i18n";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="hero relative min-h-[100svh] bg-navy">
      <div className="hero-mask absolute inset-0 overflow-hidden">
        <Image
          src={images.heroMobile}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-[center_12%] desk:hidden"
          sizes="100vw"
        />
        <Image
          src={images.hero}
          alt={dict.hero.imageAlt}
          fill
          priority
          unoptimized
          className="hidden object-cover object-[center_58%] desk:block"
          sizes="100vw"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-navy from-0% via-navy/72 via-[30%] to-transparent desk:block" />
        <div className="absolute inset-x-0 top-0 hidden h-32 bg-gradient-to-b from-navy/30 to-transparent desk:block" />
      </div>

      <div className="hero-copy-wrap relative z-10">
        <div className="hero-copy-inner relative">
          <div aria-hidden className="hero-copy-haze pointer-events-none absolute -inset-x-8 -inset-y-7 desk:hidden" />
          <div className="relative flex flex-col items-start">
            <p className="hero-copy fade-up max-w-[36rem] text-[10px] leading-relaxed tracking-[0.08em] text-mist desk:text-[12px] desk:tracking-[0.12em]">
              {dict.hero.eyebrow}
            </p>
            <h1 className="hero-title fade-up delay-1 font-display mt-3 font-medium text-ice desk:mt-5">
              {dict.hero.title[0]}
              <br />
              {dict.hero.title[1]}
            </h1>
            <p className="hero-lead fade-up delay-2 mt-3.5 text-mist desk:mt-5">{dict.hero.text}</p>
            <div className="fade-up delay-3 mt-6 flex flex-col items-start gap-3 desk:mt-8 desk:flex-row desk:items-center desk:gap-7">
              <Link
                href={localizedHref(lang, "/#contact")}
                className="btn-shine inline-flex h-11 items-center rounded-full bg-blue px-5 text-[11px] tracking-[0.16em] uppercase text-snow desk:h-12 desk:px-7 desk:text-[12px] desk:tracking-[0.18em]"
              >
                {dict.hero.consult}
              </Link>
              <Link
                href={localizedHref(lang, "/projects")}
                className="link-underline text-[13px] tracking-[0.04em] text-ice hover:text-blue"
              >
                {dict.hero.projects}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

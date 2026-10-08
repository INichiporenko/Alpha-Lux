import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { localizedHref, type Locale } from "@/lib/i18n";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div className="hero-mask absolute inset-0">
        <div className="ken-burns absolute inset-0">
          <div className="absolute inset-0">
            <Image
              src={images.hero}
              alt={dict.hero.imageAlt}
              fill
              priority
              unoptimized
              quality={95}
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="hero-reveal-after absolute inset-0">
            <Image
              src={images.heroFinished}
              alt=""
              fill
              priority
              unoptimized
              quality={95}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/35 to-navy/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/45 via-navy/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full flex-col justify-end px-8 pb-20 pt-28 md:px-16 md:pb-24 lg:px-24">
        <p className="hero-copy fade-up text-[11px] tracking-[0.42em] uppercase text-blue-bright md:text-[clamp(11px,0.7vw,14px)]">
          {dict.hero.eyebrow}
        </p>
        <div className="line-grow mt-5 h-px w-24 bg-blue-bright/80" />
        <h1 className="hero-title fade-up delay-1 font-display mt-8 font-semibold text-ice">
          {dict.hero.title[0]}
          <br />
          {dict.hero.title[1]}
        </h1>
        <p className="hero-lead fade-up delay-2 mt-7 text-ice">
          {dict.hero.text}
        </p>
        <div className="fade-up delay-3 mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={localizedHref(lang, "/projects")}
            className="btn-shine inline-flex h-12 items-center rounded-full bg-blue px-7 text-[12px] tracking-[0.22em] uppercase text-white"
          >
            {dict.hero.projects}
          </Link>
          <Link
            href={localizedHref(lang, "/#contact")}
            className="inline-flex h-12 items-center rounded-full border border-ice/35 bg-navy/25 px-7 text-[12px] tracking-[0.22em] uppercase text-ice backdrop-blur-sm hover:border-blue-bright hover:text-blue-bright"
          >
            {dict.hero.consult}
          </Link>
        </div>
      </div>
    </section>
  );
}

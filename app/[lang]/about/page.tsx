import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OnSiteCarousel } from "@/components/OnSiteCarousel";
import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";
import { images } from "@/lib/data";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedHref } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div className="pt-28">
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 md:px-8 lg:grid-cols-2 lg:items-center">
          <div className="fade-up">
            <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">{dict.about.eyebrow}</p>
            <h1 className="font-display mt-4 text-5xl leading-tight text-ice md:text-7xl">
              {dict.about.title}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-mist">{dict.about.lead}</p>
          </div>
          <Reveal dir="clip" delay={120}>
            <div className="img-zoom relative aspect-[16/9] w-full overflow-hidden rounded-2xl md:aspect-[4/3]">
              <Image
                src={images.process}
                alt={dict.about.processAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="leistungen" className="scroll-mt-28 bg-ink py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal dir="left" className="h-full">
            <div className="img-zoom relative min-h-[420px] overflow-hidden rounded-2xl md:min-h-[520px] lg:h-full">
              <Image
                src={images.aboutActivity}
                alt={dict.about.siteAlt}
                fill
                className="object-cover object-[center_70%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-navy/15" />
            </div>
          </Reveal>

          <Reveal dir="right" delay={80}>
            <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">{dict.about.activity}</p>
            <h2 className="font-display mt-4 text-4xl text-ice md:text-6xl">{dict.about.activityTitle}</h2>
            <p className="mt-7 text-base leading-8 text-mist">{dict.about.p1}</p>
            <p className="mt-5 text-base leading-8 text-mist">{dict.about.p2}</p>
            <Link
              href={localizedHref(lang, "/services")}
              className="btn-shine mt-10 inline-flex h-12 items-center rounded-full bg-blue px-8 text-[12px] tracking-[0.22em] uppercase text-white"
            >
              {dict.servicesHome.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">{dict.about.how}</p>
            <h2 className="font-display mt-4 text-4xl text-ice md:text-6xl">{dict.about.howTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
            {dict.process.map((item, i) => (
              <Reveal key={item.step} delay={i * 60} className="bg-navy p-8">
                <p className="font-display text-3xl text-blue-bright">{item.step}</p>
                <h3 className="mt-5 font-display text-2xl text-ice">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">{dict.about.onSite}</p>
              <h2 className="font-display mt-4 text-4xl text-ice md:text-6xl">{dict.about.onSiteTitle}</h2>
            </Reveal>
            <Reveal delay={120}>
              <Link
                href={localizedHref(lang, "/projects")}
                className="link-underline text-[12px] tracking-[0.22em] uppercase text-ice"
              >
                {dict.gallery.all}
              </Link>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <OnSiteCarousel alt={dict.about.siteAlt} prevLabel={dict.about.prev} nextLabel={dict.about.next} />
          </Reveal>
          <Reveal className="mt-12">
            <Link
              href={localizedHref(lang, "/#contact")}
              className="btn-shine inline-flex h-12 items-center rounded-full bg-blue px-8 text-[12px] tracking-[0.22em] uppercase text-white"
            >
              {dict.about.start}
            </Link>
          </Reveal>
        </div>
      </section>

      <Reviews lang={lang} dict={dict} />
    </div>
  );
}

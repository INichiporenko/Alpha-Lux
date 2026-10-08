import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ServicesCatalog } from "@/components/ServicesCatalog";
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
    title: dict.servicesPage.metaTitle,
    description: dict.servicesPage.metaDescription,
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div className="pt-28">
      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="fade-up text-[11px] tracking-[0.42em] uppercase text-blue-bright">
          {dict.servicesPage.eyebrow}
        </p>
        <h1 className="fade-up delay-1 font-display mt-4 max-w-3xl text-5xl leading-tight text-ice md:text-7xl">
          {dict.servicesPage.title}
        </h1>
        <p className="fade-up delay-2 mt-6 max-w-2xl text-base leading-8 text-mist">
          {dict.servicesPage.text}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <ServicesCatalog dict={dict} />

        <Reveal className="mt-16">
          <Link
            href={localizedHref(lang, "/#contact")}
            className="btn-shine inline-flex h-12 items-center rounded-full bg-blue px-8 text-[12px] tracking-[0.22em] uppercase text-white"
          >
            {dict.nav.contactCta}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

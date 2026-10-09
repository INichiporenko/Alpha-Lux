import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Reveal } from "@/components/Reveal";
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
    title: dict.projectsPage.metaTitle,
    description: dict.projectsPage.metaDescription,
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div className="pt-28">
      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="fade-up text-[11px] tracking-[0.42em] uppercase text-blue-bright">
          {dict.projectsPage.eyebrow}
        </p>
        <h1 className="fade-up delay-1 font-display mt-4 max-w-3xl text-5xl leading-tight text-ice md:text-7xl">
          {dict.projectsPage.title}
        </h1>
        <p className="fade-up delay-2 mt-6 max-w-2xl text-base leading-8 text-mist">
          {dict.projectsPage.text}
        </p>
      </section>
      <ProjectShowcase dict={dict} />

      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">
              {dict.projectsPage.ctaEyebrow}
            </p>
            <h2 className="font-display mt-4 max-w-3xl text-4xl text-ice md:text-6xl">
              {dict.projectsPage.ctaTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-mist">{dict.projectsPage.ctaText}</p>
            <Link
              href={localizedHref(lang, "/#contact")}
              className="btn-shine mt-10 inline-flex h-12 items-center rounded-full bg-blue px-8 text-[12px] tracking-[0.22em] uppercase text-white"
            >
              {dict.projectsPage.cta}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

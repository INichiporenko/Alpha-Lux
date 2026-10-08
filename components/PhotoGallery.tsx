import Image from "next/image";
import Link from "next/link";
import { galleryLayout } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { localizedHref, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function PhotoGallery({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">
              {dict.gallery.eyebrow}
            </p>
            <h2 className="font-display mt-4 text-5xl text-ice md:text-6xl">{dict.gallery.title}</h2>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[280px_280px_auto]">
          {galleryLayout.map((item, i) => {
            const label = dict.galleryItems.find((entry) => entry.key === item.key)?.label ?? item.key;
            const span =
              item.span === "lg"
                ? "md:col-span-7 md:row-span-2 h-[280px] md:h-auto md:min-h-[580px]"
                : item.span === "md"
                  ? "md:col-span-6 h-[280px] md:h-[320px]"
                  : "md:col-span-5 h-[280px] md:h-[280px]";

            return (
              <Reveal key={item.key} className={span} delay={i * 80} dir="clip">
                <Link
                  href={localizedHref(lang, "/projects")}
                  className="img-zoom group relative block h-full overflow-hidden rounded-2xl"
                >
                  <Image
                    src={item.src}
                    alt={label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent opacity-80 transition group-hover:opacity-100" />
                  <div className="absolute bottom-6 left-6 translate-y-2 transition duration-500 group-hover:translate-y-0">
                    <p className="text-[11px] tracking-[0.32em] uppercase text-blue-bright">
                      {dict.gallery.object}
                    </p>
                    <p className="font-display mt-1 text-3xl text-ice">{label}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

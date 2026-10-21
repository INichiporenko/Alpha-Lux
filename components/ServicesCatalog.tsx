import Image from "next/image";
import { servicePhotos } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";

export function ServicesCatalog({ dict }: { dict: Dictionary }) {
  return (
    <div className="relative isolate mt-10">
      {dict.services.map((service, i) => {
        const textLeft = i % 2 === 0;
        const dark = i % 2 === 0;
        const photo = servicePhotos[i % servicePhotos.length];

        return (
          <article
            key={service.title}
            className={`service-stack ${dark ? "bg-ink" : "bg-navy"}`}
            style={{ zIndex: i + 1 }}
          >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
              <div className={textLeft ? "lg:order-1" : "lg:order-2"}>
                <span className="font-display text-2xl text-blue-bright/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  className={`mt-6 font-display text-3xl leading-tight md:text-4xl ${
                    dark ? "text-snow" : "text-ice"
                  }`}
                >
                  {service.title}
                </h2>
                <p
                  className={`mt-5 max-w-md text-base leading-8 ${
                    dark ? "text-haze" : "text-mist"
                  }`}
                >
                  {service.text}
                </p>
              </div>

              <div className={textLeft ? "lg:order-2" : "lg:order-1"}>
                <div className="img-zoom relative h-[260px] overflow-hidden rounded-2xl md:h-[380px]">
                  <Image
                    src={photo}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

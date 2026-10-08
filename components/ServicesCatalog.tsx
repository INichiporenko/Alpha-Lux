import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { servicePhotos } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";

export function ServicesCatalog({ dict }: { dict: Dictionary }) {
  return (
    <div className="mt-10 flex flex-col gap-16 overflow-x-clip md:gap-24">
      {dict.services.map((service, i) => {
        const textLeft = i % 2 === 0;
        const photo = servicePhotos[i % servicePhotos.length];

        return (
          <article
            key={service.title}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
          >
            <Reveal
              dir={textLeft ? "left" : "right"}
              delay={40}
              className={textLeft ? "lg:order-1" : "lg:order-2"}
            >
              <span className="font-display text-2xl text-blue-bright/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-6 font-display text-3xl leading-tight text-ice md:text-4xl">
                {service.title}
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-mist">{service.text}</p>
            </Reveal>

            <Reveal
              dir={textLeft ? "right" : "left"}
              delay={140}
              className={textLeft ? "lg:order-2" : "lg:order-1"}
            >
              <div className="img-zoom relative h-[260px] overflow-hidden rounded-2xl md:h-[380px]">
                <Image
                  src={photo}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-navy/15" />
              </div>
            </Reveal>
          </article>
        );
      })}
    </div>
  );
}

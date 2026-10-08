"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { servicesSlideshow } from "@/lib/data";

const INTERVAL_MS = 3000;

export function ServicesSlideshow({ alt }: { alt: string }) {
  const [{ current, previous }, setSlide] = useState({ current: 0, previous: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const id = window.setInterval(() => {
      setSlide(({ current }) => ({
        previous: current,
        current: (current + 1) % servicesSlideshow.length,
      }));
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-[420px] overflow-hidden rounded-2xl md:h-[560px]">
      {servicesSlideshow.map((src, i) => (
        <div
          key={src}
          className={`services-slide ${i === current ? "is-active" : i === previous ? "is-prev" : ""}`}
        >
          <Image
            src={src}
            alt={i === 0 ? alt : ""}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 46vw"
            priority={i === 0}
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-navy/50 via-transparent to-navy/20" />
    </div>
  );
}

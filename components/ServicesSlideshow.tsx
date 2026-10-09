"use client";

import { useEffect, useState } from "react";
import { servicesSlideshow } from "@/lib/data";

const INTERVAL_MS = 4000;

export function ServicesSlideshow({ alt }: { alt: string }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const slides = servicesSlideshow.filter((src) => !failed.includes(src));
  const src = slides[index] ?? slides[0];

  useEffect(() => {
    if (slides.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [slides.length]);

  if (!src) {
    return <div className="relative h-[420px] overflow-hidden rounded-2xl bg-panel md:h-[560px]" />;
  }

  return (
    <div
      className="relative h-[420px] overflow-hidden rounded-2xl md:h-[560px]"
      role="img"
      aria-label={alt}
    >
      <img
        key={src}
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => {
          setFailed((list) => (list.includes(src) ? list : [...list, src]));
          setIndex(0);
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-navy/20" />
    </div>
  );
}

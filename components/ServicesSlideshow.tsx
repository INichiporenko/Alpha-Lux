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
    return <div className="h-64 overflow-hidden rounded-2xl bg-panel md:h-[560px]" />;
  }

  return (
    <div className="overflow-hidden rounded-2xl" role="img" aria-label={alt}>
      <img
        key={src}
        src={src}
        alt=""
        className="block h-64 w-full object-cover md:h-[560px]"
        onError={() => {
          setFailed((list) => (list.includes(src) ? list : [...list, src]));
          setIndex(0);
        }}
      />
    </div>
  );
}

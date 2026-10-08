"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { onSitePhotos } from "@/lib/data";

const INTERVAL_MS = 3000;
const count = onSitePhotos.length;

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d={dir === "prev" ? "M14.5 5 8 12l6.5 7" : "M9.5 5 16 12l-6.5 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OnSiteCarousel({
  alt,
  prevLabel,
  nextLabel,
}: {
  alt: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const [{ current, previous }, setSlide] = useState({ current: 0, previous: 0 });
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);

  const go = useCallback((step: number) => {
    setSlide(({ current }) => ({
      previous: current,
      current: (current + step + count) % count,
    }));
    setCycle((n) => n + 1);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || paused) return;

    const id = window.setInterval(() => {
      setSlide(({ current }) => ({
        previous: current,
        current: (current + 1) % count,
      }));
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, cycle]);

  const arrowClass =
    "absolute top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ice/35 bg-navy/55 text-ice backdrop-blur-sm transition duration-300 hover:border-blue-bright hover:text-blue-bright md:h-12 md:w-12";

  return (
    <div className="w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-[2640/1173] w-full">
        {onSitePhotos.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 grid grid-cols-2 gap-2 md:gap-3 ${
              i === current ? "z-20 opacity-100" : i === previous ? "z-10 opacity-100" : "z-0 opacity-0"
            } transition-opacity duration-700 ease-out`}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={src}
                alt={i === current ? alt : ""}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 640px"
                priority={i === 0}
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover object-bottom"
                sizes="(max-width: 768px) 50vw, 640px"
                priority={i === 0}
              />
            </div>
          </div>
        ))}

        <button type="button" className={`${arrowClass} left-2 md:left-4`} aria-label={prevLabel} onClick={() => go(-1)}>
          <Chevron dir="prev" />
        </button>
        <button type="button" className={`${arrowClass} right-2 md:right-4`} aria-label={nextLabel} onClick={() => go(1)}>
          <Chevron dir="next" />
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2.5">
        {onSitePhotos.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`${i + 1}`}
            aria-current={i === current ? "true" : undefined}
            onClick={() => go(i - current)}
            className={`h-1.5 rounded-full transition ${
              i === current ? "w-6 bg-blue-bright" : "w-1.5 bg-ice/35 hover:bg-ice/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

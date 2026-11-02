"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { processPhotos } from "@/lib/data";

const INTERVAL_MS = 3000;
const SWIPE_PX = 48;
const count = processPhotos.length;

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

export function ProcessCarousel({
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
  const pointerX = useRef<number | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const go = useCallback((step: number) => {
    setSlide(({ current }) => ({
      previous: current,
      current: (current + step + count) % count,
    }));
    setCycle((n) => n + 1);
  }, []);

  const currentSlide = processPhotos[current];
  const currentIsVideo = "video" in currentSlide && currentSlide.video;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || paused || currentIsVideo) return;

    const id = window.setInterval(() => {
      setSlide(({ current }) => ({
        previous: current,
        current: (current + 1) % count,
      }));
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, cycle, currentIsVideo]);

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([index, node]) => {
      if (!node) return;
      if (Number(index) === current) {
        node.currentTime = 0;
        void node.play();
      } else {
        node.pause();
      }
    });
  }, [current]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    pointerX.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerX.current == null) return;
    const delta = event.clientX - pointerX.current;
    pointerX.current = null;
    if (Math.abs(delta) < SWIPE_PX) return;
    go(delta < 0 ? 1 : -1);
  };

  const arrowClass =
    "absolute top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/90 text-ice backdrop-blur-sm transition duration-300 hover:border-blue hover:text-blue md:h-12 md:w-12";

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        pointerX.current = null;
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[16/10]">
        {processPhotos.map((slide, i) => {
          const active = i === current;
          const visible = active || i === previous;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 ${
                active ? "z-20 opacity-100" : visible ? "z-10 opacity-100" : "z-0 opacity-0"
              } transition-opacity duration-700 ease-out`}
            >
              {"video" in slide && slide.video ? (
                <video
                  ref={(node) => {
                    videoRefs.current[i] = node;
                  }}
                  src={slide.src}
                  poster={slide.poster}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full bg-navy object-contain"
                  onEnded={() => {
                    if (i === current) go(1);
                  }}
                />
              ) : (
                <Image
                  src={slide.src}
                  alt={active ? alt : ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1280px"
                  priority={i === 0}
                />
              )}
            </div>
          );
        })}

        <button type="button" className={`${arrowClass} left-2 md:left-4`} aria-label={prevLabel} onClick={() => go(-1)}>
          <Chevron dir="prev" />
        </button>
        <button type="button" className={`${arrowClass} right-2 md:right-4`} aria-label={nextLabel} onClick={() => go(1)}>
          <Chevron dir="next" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {processPhotos.map((slide, i) => (
          <button
            key={`${slide.src}-dot`}
            type="button"
            aria-label={`${i + 1}`}
            aria-current={i === current ? "true" : undefined}
            onClick={() => go(i - current)}
            className={`h-1.5 rounded-full transition ${
              i === current ? "w-6 bg-blue" : "w-1.5 bg-ice/25 hover:bg-ice/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

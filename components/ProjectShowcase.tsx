"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { projectFilters, projects, type ProjectFilterId, type ProjectId } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { Reveal } from "@/components/Reveal";

function photosOf(project: (typeof projects)[number]) {
  const gallery: string[] = [...project.gallery];
  return gallery.includes(project.image) ? gallery : [project.image, ...gallery];
}

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

export function ProjectShowcase({ dict }: { dict: Dictionary }) {
  const [filter, setFilter] = useState<ProjectFilterId>("all");
  const [active, setActive] = useState<ProjectId | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const current = projects.find((p) => p.id === active);
  const photos = current ? photosOf(current) : [];
  const count = photos.length;

  const closeProject = useCallback(() => {
    setPhotoIndex(null);
    setActive(null);
  }, []);

  const goPhoto = useCallback(
    (step: number) => {
      setPhotoIndex((index) => {
        if (index === null || count === 0) return index;
        return (index + step + count) % count;
      });
    },
    [count],
  );

  useEffect(() => {
    if (!current) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [current]);

  useEffect(() => {
    if (!current) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (photoIndex !== null) setPhotoIndex(null);
        else closeProject();
        return;
      }
      if (photoIndex === null) return;
      if (event.key === "ArrowLeft") goPhoto(-1);
      if (event.key === "ArrowRight") goPhoto(1);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeProject, current, goPhoto, photoIndex]);

  const arrowClass =
    "absolute top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ice/35 bg-navy/55 text-ice backdrop-blur-sm transition hover:border-blue-bright hover:text-blue-bright";

  return (
    <section className="bg-navy pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-wrap gap-3">
          {projectFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`h-10 rounded-full border px-5 text-[11px] tracking-[0.2em] uppercase transition ${
                filter === item
                  ? "border-blue bg-blue text-white"
                  : "border-line text-mist hover:border-blue-bright hover:text-ice"
              }`}
            >
              {dict.filters[item]}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((project, i) => {
            const copy = dict.projects[project.id];
            return (
              <Reveal
                key={project.id}
                delay={i * 70}
                dir={i % 3 === 1 ? "scale" : "up"}
                className="h-full"
              >
                <button
                  type="button"
                  onClick={() => setActive(project.id)}
                  className="card-3d group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-panel text-left"
                >
                  <div className="img-zoom relative h-72 shrink-0">
                    <Image
                      src={project.image}
                      alt={copy.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full border border-ice/20 bg-navy/50 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-ice backdrop-blur">
                      {dict.filters[project.category]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display line-clamp-2 min-h-[2.5em] text-3xl leading-tight text-ice">
                      {copy.title}
                    </h3>
                    <p className="mt-4 line-clamp-2 min-h-12 text-sm leading-6 text-mist">{copy.text}</p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/80 p-4 backdrop-blur-md md:items-center"
          onClick={closeProject}
        >
          <article
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-line bg-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPhotoIndex(0)}
              className="relative block h-72 w-full md:h-96"
            >
              <Image
                src={current.image}
                alt={dict.projects[current.id].title}
                fill
                className="object-cover"
              />
            </button>
            <button
              type="button"
              onClick={closeProject}
              className="absolute right-5 top-5 z-10 rounded-full border border-ice/20 bg-navy/60 px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-ice"
            >
              {dict.projectsPage.close}
            </button>
            <div className="p-6 md:p-10">
              <p className="text-[11px] tracking-[0.22em] uppercase text-blue-bright">
                {dict.filters[current.category]}
              </p>
              <h3 className="font-display mt-3 text-4xl text-ice md:text-5xl">
                {dict.projects[current.id].title}
              </h3>
              <p className="mt-6 max-w-2xl text-base leading-8 text-ice/85">
                {dict.projects[current.id].text}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {photos.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setPhotoIndex(index)}
                    className="relative h-36 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="250px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}

      {current && photoIndex !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy p-4 md:p-10"
          onClick={() => setPhotoIndex(null)}
        >
          <button
            type="button"
            onClick={() => setPhotoIndex(null)}
            className="absolute right-5 top-5 z-50 rounded-full border border-ice/20 bg-navy/60 px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-ice"
          >
            {dict.projectsPage.close}
          </button>
          {count > 1 && (
            <>
              <button
                type="button"
                className={`${arrowClass} left-3 md:left-6`}
                aria-label={dict.about.prev}
                onClick={(event) => {
                  event.stopPropagation();
                  goPhoto(-1);
                }}
              >
                <Chevron dir="prev" />
              </button>
              <button
                type="button"
                className={`${arrowClass} right-3 md:right-6`}
                aria-label={dict.about.next}
                onClick={(event) => {
                  event.stopPropagation();
                  goPhoto(1);
                }}
              >
                <Chevron dir="next" />
              </button>
            </>
          )}
          <div
            className="relative z-10 flex h-[86vh] w-[92vw] max-w-6xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={photos[photoIndex]}
              src={photos[photoIndex]}
              alt={dict.projects[current.id].title}
              className="max-h-[86vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}

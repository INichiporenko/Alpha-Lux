"use client";

import { useEffect, useRef } from "react";

type Dir = "up" | "left" | "right" | "scale" | "clip";

export function Reveal({
  children,
  className = "",
  delay = 0,
  dir = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  dir?: Dir;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dirClass =
    dir === "left"
      ? "from-left"
      : dir === "right"
        ? "from-right"
        : dir === "scale"
          ? "from-scale"
          : dir === "clip"
            ? "clip"
            : "";

  return (
    <div
      ref={ref}
      className={`reveal ${dirClass} ${className}`}
      style={{ ["--delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

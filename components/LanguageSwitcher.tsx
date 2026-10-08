"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localeLabels, locales, stripLocale, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname();
  const rest = stripLocale(pathname);
  const suffix = rest === "/" ? "" : rest;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative z-[60]">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 leading-none text-[12px] tracking-[0.18em] uppercase text-ice hover:text-white"
      >
        <span>{localeLabels[lang]}</span>
        <svg
          viewBox="0 0 12 8"
          className={`h-2 w-2.5 fill-none stroke-current transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          <path d="M1 1.5 6 6.5 11 1.5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        role="listbox"
        aria-label={label}
        className={`absolute right-0 top-[calc(100%+10px)] min-w-[4.25rem] overflow-hidden rounded-xl border border-line bg-navy/95 py-1 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        {locales.map((item) => (
          <Link
            key={item}
            href={`/${item}${suffix}`}
            hrefLang={item}
            role="option"
            aria-selected={item === lang}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${item};path=/;max-age=31536000;samesite=lax`;
              setOpen(false);
            }}
            className={`block px-4 py-2.5 text-center text-[11px] tracking-[0.22em] uppercase transition ${
              item === lang ? "bg-blue/20 text-ice" : "text-mist hover:bg-panel hover:text-ice"
            }`}
          >
            {localeLabels[item]}
          </Link>
        ))}
      </div>
    </div>
  );
}

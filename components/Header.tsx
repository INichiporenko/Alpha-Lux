"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import type { Dictionary } from "@/lib/dictionary";
import { company } from "@/lib/data";
import { localizedHref, stripLocale, type Locale } from "@/lib/i18n";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");

  const nav = [
    { href: localizedHref(lang, "/services"), path: "/services", hash: "", label: dict.nav.services },
    { href: localizedHref(lang, "/about"), path: "/about", hash: "", label: dict.nav.about },
    { href: localizedHref(lang, "/projects"), path: "/projects", hash: "", label: dict.nav.projects },
  ];

  const currentPath = stripLocale(pathname);
  const isActive = (item: (typeof nav)[number]) => {
    if (currentPath !== item.path) return false;
    if (item.hash) return hash === item.hash;
    return true;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setHash(window.location.hash);
  }, [pathname]);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-navy/80 backdrop-blur-xl border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[84px] max-w-7xl items-center justify-between px-8 md:px-16 lg:px-24">
        <Logo size="header" href={localizedHref(lang, "/")} label={dict.logoHome} />

        <div className="hidden items-center lg:flex">
          <div className="flex items-center">
            <nav className="flex items-center gap-6 xl:gap-8">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setOpen(false);
                    setHash(item.hash);
                    if (!item.hash && item.path === currentPath && window.location.hash) {
                      window.history.replaceState(null, "", item.href);
                    }
                  }}
                  className={`link-underline leading-none text-[14px] tracking-[0.2em] uppercase ${
                    isActive(item) ? "is-active text-white" : "text-ice hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="ml-24 flex items-center gap-6 xl:ml-28 xl:gap-8">
              <LanguageSwitcher lang={lang} label={dict.header.language} />
              <a
                href={company.phoneHref}
                className="leading-none text-[12px] tracking-[0.18em] text-ice hover:text-white"
              >
                {company.phone}
              </a>
            </div>
          </div>
          <Link
            href={localizedHref(lang, "/#contact")}
            onClick={() => setHash("#contact")}
            className="btn-shine ml-8 inline-flex h-10 items-center rounded-full bg-blue px-6 text-[12px] tracking-[0.2em] uppercase text-white"
          >
            {dict.nav.contactCta}
          </Link>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSwitcher lang={lang} label={dict.header.language} />
          <button
            type="button"
            aria-label={open ? dict.header.closeMenu : dict.header.openMenu}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-6 bg-ice transition ${open ? "translate-y-[4px] rotate-45" : ""}`}
            />
            <span className={`h-px w-6 bg-ice transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-6 bg-ice transition ${open ? "-translate-y-[8px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-navy/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-8 px-8">
          {nav.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => {
                setOpen(false);
                setHash(item.hash);
                if (!item.hash && item.path === currentPath && window.location.hash) {
                  window.history.replaceState(null, "", item.href);
                }
              }}
              className="font-display text-5xl text-ice"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={localizedHref(lang, "/#contact")}
            onClick={() => {
              setOpen(false);
              setHash("#contact");
            }}
            className="mt-4 text-sm tracking-[0.3em] uppercase text-blue-bright"
          >
            {dict.nav.contactCta}
          </Link>
        </div>
      </div>
    </header>
  );
}

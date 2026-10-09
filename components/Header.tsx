"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import type { Dictionary } from "@/lib/dictionary";
import { company } from "@/lib/data";
import { localizedHref, stripLocale, type Locale } from "@/lib/i18n";

const CONTACT_SCROLL = "alphalux-contact";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const contactHref = localizedHref(lang, "/#contact");

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
    const onHash = () => {
      setHash(window.location.hash);
      setOpen(false);
    };
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

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function closeNav(item: { href: string; path: string; hash: string }) {
    setHash(item.hash);
    if (!item.hash && item.path === currentPath && window.location.hash) {
      window.history.replaceState(null, "", item.href);
    }
  }

  function scrollToContact() {
    document.body.style.overflow = "";
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToContact(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setOpen(false);
    setHash("#contact");

    if (currentPath === "/") {
      window.setTimeout(scrollToContact, 50);
      history.replaceState(null, "", contactHref);
      return;
    }

    sessionStorage.setItem(CONTACT_SCROLL, "1");
    router.push(localizedHref(lang, "/"));
  }

  useEffect(() => {
    if (currentPath !== "/") return;
    const fromMenu = sessionStorage.getItem(CONTACT_SCROLL) === "1";
    const fromHash = window.location.hash === "#contact";
    if (!fromMenu && !fromHash) return;
    sessionStorage.removeItem(CONTACT_SCROLL);
    const id = window.setTimeout(() => {
      scrollToContact();
      if (window.location.hash !== "#contact") {
        history.replaceState(null, "", contactHref);
      }
    }, 80);
    return () => window.clearTimeout(id);
  }, [contactHref, currentPath, pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 overflow-visible transition-all duration-500 ${
          open
            ? "border-b border-line bg-navy"
            : scrolled
              ? "border-b border-line bg-navy/80 backdrop-blur-xl"
              : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[84px] max-w-7xl items-center justify-between pl-5 pr-7 md:px-8 lg:px-10 xl:px-24">
          <Logo size="header" href={localizedHref(lang, "/")} label={dict.logoHome} />

          <div className="hidden items-center lg:flex lg:flex-nowrap">
            <div className="flex flex-nowrap items-center">
              <nav className="flex flex-nowrap items-center gap-4 xl:gap-8">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => closeNav(item)}
                    className={`link-underline whitespace-nowrap leading-none text-[11px] tracking-[0.14em] uppercase xl:text-[14px] xl:tracking-[0.2em] ${
                      isActive(item) ? "is-active text-white" : "text-ice hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="ml-6 flex flex-nowrap items-center gap-4 xl:ml-28 xl:gap-8">
                <LanguageSwitcher lang={lang} label={dict.header.language} />
                <a
                  href={company.phoneHref}
                  className="whitespace-nowrap leading-none text-[10px] tracking-[0.12em] text-ice hover:text-white xl:text-[12px] xl:tracking-[0.18em]"
                >
                  {company.phone}
                </a>
              </div>
            </div>
            <Link
              href={contactHref}
              onClick={goToContact}
              className="btn-shine ml-5 inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full bg-blue px-4 text-[10px] tracking-[0.16em] uppercase text-white xl:ml-8 xl:h-10 xl:px-6 xl:text-[12px] xl:tracking-[0.2em]"
            >
              {dict.nav.contactCta}
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-3 lg:hidden">
            <LanguageSwitcher lang={lang} label={dict.header.language} />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.header.closeMenu : dict.header.openMenu}
              className="relative z-50 flex h-11 w-11 shrink-0 items-center justify-center overflow-visible"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span
                  className={`absolute left-0 h-px w-full bg-ice transition duration-300 ${
                    open ? "top-[7px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-px w-full bg-ice transition duration-300 ${
                    open ? "scale-x-0 opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-ice transition duration-300 ${
                    open ? "top-[7px] -rotate-45" : "top-3.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden ${open ? "visible" : "invisible pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-navy transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          className={`relative flex h-dvh flex-col px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[108px] transition duration-500 md:px-8 ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="flex flex-1 flex-col justify-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => closeNav(item)}
                className={`font-display py-2 text-4xl leading-tight text-ice sm:text-5xl ${
                  isActive(item) ? "text-white" : "text-ice/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-5 border-t border-line pt-8">
            <Link
              href={contactHref}
              onClick={goToContact}
              className="btn-shine inline-flex h-12 w-fit items-center rounded-full bg-blue px-8 text-[12px] tracking-[0.2em] uppercase text-white"
            >
              {dict.nav.contactCta}
            </Link>
            <a
              href={company.phoneHref}
              className="text-[12px] tracking-[0.18em] text-mist hover:text-ice"
            >
              {company.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

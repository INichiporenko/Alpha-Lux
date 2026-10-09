import Link from "next/link";
import { Logo } from "@/components/Logo";
import { company } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { localizedHref, type Locale } from "@/lib/i18n";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const nav = [
    { href: localizedHref(lang, "/services"), label: dict.nav.services },
    { href: localizedHref(lang, "/about"), label: dict.nav.about },
    { href: localizedHref(lang, "/projects"), label: dict.nav.projects },
    { href: localizedHref(lang, "/#contact"), label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-16 md:grid-cols-4 md:gap-12 md:px-8">
        <div className="col-span-2 flex flex-col items-center text-center md:items-start md:text-left">
          <Logo size="footer" href={localizedHref(lang, "/")} label={dict.logoHome} />
          <p className="mt-4 max-w-sm text-sm leading-7 text-mist">{dict.footer.blurb}</p>
        </div>

        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.28em] uppercase text-blue-bright">{dict.footer.nav}</p>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-mist hover:text-ice">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 text-right md:text-left">
          <p className="text-[11px] tracking-[0.28em] uppercase text-blue-bright">
            {dict.nav.contact}
          </p>
          <ul className="mt-5 space-y-3 text-sm text-mist">
            <li>
              <a href={company.phoneHref} className="hover:text-ice">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="break-words [overflow-wrap:anywhere] hover:text-ice">
                {company.email}
              </a>
            </li>
            <li>
              <a href={company.socials.whatsapp} target="_blank" rel="noreferrer" className="hover:text-ice">
                {dict.contact.social.whatsapp}
              </a>
            </li>
            <li>
              <a href={company.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-ice">
                {dict.contact.social.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 py-6 text-center text-[11px] tracking-[0.16em] uppercase text-mist/70 md:flex-row md:items-stretch md:justify-between md:px-8 md:text-left">
          <span>© {new Date().getFullYear()} Alphalux</span>
          <span>{dict.footer.line}</span>
        </div>
      </div>
    </footer>
  );
}

export const locales = ["de", "en", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const localeLabels: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  uk: "UA",
};

export const hasLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

const localePrefix = new RegExp(`^/(${locales.join("|")})(?=/|$)`);

export function localizedHref(lang: Locale, href: string) {
  if (
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const [path, hash] = href.split("#");
  const suffix = path === "/" ? "" : path;
  const result = `/${lang}${suffix}`;
  return hash ? `${result}#${hash}` : result;
}

export function stripLocale(pathname: string) {
  return pathname.replace(localePrefix, "") || "/";
}

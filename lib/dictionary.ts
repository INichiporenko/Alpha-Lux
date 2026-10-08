import { de } from "@/dictionaries/de";
import { en } from "@/dictionaries/en";
import { uk } from "@/dictionaries/uk";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n";

export type Dictionary = typeof de;

export function getDictionary(locale: string): Dictionary {
  if (locale === "uk") return uk;
  if (locale === "en") return en;
  return de;
}

export function resolveLocale(locale: string): Locale {
  return hasLocale(locale) ? locale : defaultLocale;
}

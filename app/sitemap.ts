import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const siteUrl = "https://www.alphalux-innenausbau.de";
const paths = ["", "/services", "/projects", "/about"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: {
          de: `${siteUrl}/de${path}`,
          en: `${siteUrl}/en${path}`,
          uk: `${siteUrl}/uk${path}`,
          "x-default": `${siteUrl}/de${path}`,
        },
      },
    })),
  );
}

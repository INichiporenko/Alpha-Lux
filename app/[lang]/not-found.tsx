import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import { defaultLocale, localizedHref } from "@/lib/i18n";

export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">404</p>
      <h1 className="font-display mt-4 text-5xl text-ice md:text-7xl">{dict.notFound.title}</h1>
      <Link
        href={localizedHref(defaultLocale, "/")}
        className="mt-8 inline-flex h-12 items-center rounded-full border border-line px-7 text-[12px] tracking-[0.22em] uppercase text-ice hover:border-blue-bright"
      >
        {dict.notFound.home}
      </Link>
    </div>
  );
}

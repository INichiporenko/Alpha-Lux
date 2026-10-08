import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/data";

const sizes = {
  header: {
    wrap: "relative h-14 w-[94px] md:h-16 md:w-[107px]",
    width: 214,
    height: 128,
    src: company.logoHeader,
  },
  footer: { wrap: "relative h-28 w-[156px]", width: 312, height: 224, src: company.logo },
} as const;

export function Logo({
  size = "header",
  href = "/",
  className = "",
  label = "Alphalux",
}: {
  size?: keyof typeof sizes;
  href?: string | null;
  className?: string;
  label?: string;
}) {
  const s = sizes[size];
  const image = (
    <span className={`${s.wrap} ${className}`.trim()}>
      <Image
        src={s.src}
        alt="Alphalux"
        fill
        unoptimized
        className="object-contain"
        priority={size === "header"}
      />
    </span>
  );

  if (!href) return image;

  return (
    <Link href={href} className="inline-flex shrink-0" aria-label={label}>
      {image}
    </Link>
  );
}

import { Reveal } from "@/components/Reveal";

export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line bg-ink py-5">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center px-6">
            <span className="font-display text-2xl text-ice/90 md:text-3xl">{item}</span>
            <span className="ml-10 h-1.5 w-1.5 rounded-full bg-blue-bright/80" />
          </span>
        ))}
      </div>
    </div>
  );
}

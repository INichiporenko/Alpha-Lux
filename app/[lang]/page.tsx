import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ServicesPreview } from "@/components/ServicesPreview";
import { WhyUs } from "@/components/WhyUs";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <Marquee items={dict.marquee} />
      <WhyUs dict={dict} />
      <ServicesPreview lang={lang} dict={dict} />
      <PhotoGallery lang={lang} dict={dict} />
      <ContactForm dict={dict} />
    </>
  );
}

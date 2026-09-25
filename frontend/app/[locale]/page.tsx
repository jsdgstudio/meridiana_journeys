import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { getHomepageContent } from "@/hooks/useContent";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { TravelCards } from "@/components/sections/TravelCards";
import { InfoBar } from "@/components/sections/InfoBar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CallToAction } from "@/components/sections/CallToAction";
import { photoAttributionMetadata } from "@/lib/photo-attribution-metadata";

interface HomePageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = params;
  const content = getHomepageContent();
  const wildAttribution = content.travelCards.row2.find((card) => card.id === "wild-colombia")?.attribution;
  return {
    title:
      locale === "es"
        ? "Meridiana — Viajes Culturales por Colombia"
        : "Meridiana — Cultural Journeys through Colombia",
    description: content.hero.subheadline[locale],
    openGraph: {
      images: [{ url: content.hero.media.src }],
    },
    alternates: {
      canonical: `https://meridianajourneys.com/${locale}`,
    },
    other: wildAttribution
      ? photoAttributionMetadata(wildAttribution, locale, "wild-colombia-photo")
      : undefined,
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;
  const content = getHomepageContent();

  return (
    <>
      <Hero content={content.hero} locale={locale} />
      <AboutPreview content={content.aboutPreview} locale={locale} />
      <TravelCards content={content.travelCards} locale={locale} />
      <InfoBar content={content.infoBar} locale={locale} />
      <HowItWorks content={content.howItWorks} locale={locale} />
      <CallToAction content={content.cta} locale={locale} />
    </>
  );
}

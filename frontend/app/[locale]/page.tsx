import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { getHomepageContent } from "@/hooks/useContent";
import { getToursByIds } from "@/hooks/useTours";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedTours } from "@/components/sections/FeaturedTours";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CallToAction } from "@/components/sections/CallToAction";

interface HomePageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = params;
  const content = getHomepageContent();
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
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;
  const content = getHomepageContent();
  const featuredTours = getToursByIds(content.featuredTours.tourIds);

  return (
    <>
      <Hero content={content.hero} locale={locale} />
      <AboutPreview content={content.aboutPreview} locale={locale} />
      <FeaturedTours
        content={content.featuredTours}
        tours={featuredTours}
        locale={locale}
      />
      <HowItWorks content={content.howItWorks} locale={locale} />
      <CallToAction content={content.cta} locale={locale} />
    </>
  );
}

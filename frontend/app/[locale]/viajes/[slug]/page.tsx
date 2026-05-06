import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { getTourBySlug, getAllTours } from "@/hooks/useTours";
import { TourHero } from "@/components/tour/TourHero";
import { TourNarrative } from "@/components/tour/TourNarrative";
import { TourIncludes } from "@/components/tour/TourIncludes";
import { TourItinerary } from "@/components/tour/TourItinerary";
import { TourExperience } from "@/components/tour/TourExperience";
import { TourPricing } from "@/components/tour/TourPricing";

interface TourDetailPageProps {
  params: { locale: Locale; slug: string };
}

export function generateStaticParams() {
  const tours = getAllTours();
  const locales: Locale[] = ["es", "en"];
  return locales.flatMap((locale) =>
    tours.map((tour) => ({ locale, slug: tour.id }))
  );
}

export async function generateMetadata({
  params,
}: TourDetailPageProps): Promise<Metadata> {
  const tour = getTourBySlug(params.slug);
  if (!tour) return {};

  const seo = tour.seo[params.locale];
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [{ url: tour.hero.image }],
    },
  };
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const { locale, slug } = params;
  const tour = getTourBySlug(slug);

  if (!tour) notFound();

  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour!.title[locale],
    description: tour!.narrative.short[locale],
    image: tour!.hero.image,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: tour!.price.amount,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Meridiana" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
      />
      <TourHero tour={tour!} locale={locale} />
      <TourNarrative tour={tour!} locale={locale} />
      <TourIncludes tour={tour!} locale={locale} />
      <TourItinerary tour={tour!} locale={locale} />
      <TourExperience tour={tour!} locale={locale} />
      <TourPricing tour={tour!} locale={locale} />
    </>
  );
}

// types/tour.ts — Bilingual tour data model

export type Locale = "es" | "en";
export type LocaleString = { es: string; en: string };

export type TourCategory = "cultural" | "nature" | "culinary" | "historical" | "expedition";
export type TourTier = "entry" | "core" | "premium";
export type TourStatus = "published" | "draft";
export type Difficulty = "easy" | "moderate" | "challenging";
export type MealType = "breakfast" | "lunch" | "dinner";

export interface Tour {
  id: string;
  title: LocaleString;
  subtitle: LocaleString;
  category: TourCategory;
  tier: TourTier;
  status: TourStatus;

  duration: LocaleString;
  groupSize: LocaleString;
  route?: string[];
  price: TourPrice;
  location: TourLocation;
  difficulty: Difficulty;

  hero: TourHero;
  gallery?: string[];

  narrative: TourNarrative;

  includes: LocaleString[];
  excludes: LocaleString[];
  itinerary: ItineraryDay[];
  experience: ExperienceData;

  idealFor: LocaleString[];
  signatureExperiences: LocaleString[];

  relatedTours?: string[];

  preTrip?: PreTripInfo;

  seo: {
    es: TourSEOMeta;
    en: TourSEOMeta;
  };
}

export interface TourPrice {
  amount: number;
  currency: "USD";
  note?: LocaleString;
}

export interface TourLocation {
  country: string;
  region: string;
  city?: string;
  coordinates?: [number, number];
}

export interface TourHero {
  image: string;
  video?: string;
  alt: LocaleString;
  credit?: string;
}

export interface TourNarrative {
  short: LocaleString;
  long: LocaleString;
  pullQuote?: LocaleString;
}

export interface ItineraryDay {
  day: number;
  title: LocaleString;
  description: LocaleString;
  highlights: LocaleString[];
  meals?: MealType[];
  accommodation?: LocaleString;
}

export interface ExperienceData {
  culturalDepth: 1 | 2 | 3 | 4 | 5;
  physicalDemand: 1 | 2 | 3 | 4 | 5;
  comfort: 1 | 2 | 3 | 4 | 5;
  groupIntimacy: 1 | 2 | 3 | 4 | 5;
}

export interface PreTripInfo {
  packing?: LocaleString[];
  reading?: string[];
  preparation?: LocaleString;
}

export interface TourSEOMeta {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

// Utility: extract localized value
export function t(str: LocaleString, locale: Locale): string {
  return str[locale];
}

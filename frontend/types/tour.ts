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
  gallery?: GalleryItem[];

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

export interface TourPriceTier {
  label: LocaleString;   // e.g. "grupo de 2", "grupo de 4"
  amount: number;
}

export interface TourPrice {
  amount?: number;            // legacy single-amount support (optional)
  tiers?: TourPriceTier[];    // tiered pricing — preferred when present
  currency: "USD";
  note?: LocaleString;
  customQuote?: boolean;      // true when price is "Por confirmar"
  contextPhrase?: LocaleString;
}

export interface TourLocation {
  country: string;
  region: string;
  city?: string;
  coordinates?: [number, number];
}

export interface GalleryItem {
  src?: string;
  gradient?: string;
  place: LocaleString;
  tag: LocaleString;
}

export interface TourHero {
  image: string;
  video?: string;
  alt: LocaleString;
  credit?: string;
  objectPosition?: string;
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
  accommodation?: LocaleString | null;
}

export interface ExperienceData {
  duration?: LocaleString;
  departures?: LocaleString;
  groupSize?: LocaleString;
  pace?: LocaleString;
  language?: LocaleString;
  startPoint?: LocaleString;
  endPoint?: LocaleString;
  season?: LocaleString;
  physicalLevel?: LocaleString;
  culturalDepth: 1 | 2 | 3 | 4 | 5;
  physicalDemand: 1 | 2 | 3 | 4 | 5;
  comfort: 1 | 2 | 3 | 4 | 5;
  groupIntimacy: 1 | 2 | 3 | 4 | 5;
}

export interface PreTripInfo {
  kit?: LocaleString;
  virtualEvent?: LocaleString;
  addOns?: LocaleString[];
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

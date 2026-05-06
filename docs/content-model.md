# Content Model

## Bilingual Convention

All user-facing strings use the `LocaleString` pattern:
```typescript
type LocaleString = { es: string; en: string };
type Locale = "es" | "en";
```
Hooks receive the current locale and return the correct string. JSON files contain both languages inline.

---

## Core Entity: Tour

```typescript
type TourCategory = "cultural" | "nature" | "culinary" | "historical" | "expedition";
type TourTier = "entry" | "core" | "premium";

interface Tour {
  id: string;
  title: LocaleString;
  subtitle: LocaleString;
  category: TourCategory;
  tier: TourTier;
  status: "published" | "draft";

  duration: LocaleString;
  groupSize: LocaleString;
  route?: string[];
  price: { amount: number; currency: "USD"; note?: LocaleString };
  location: { country: string; region: string; city?: string; coordinates?: [number, number] };

  hero: { image: string; video?: string; alt: LocaleString; credit?: string };
  gallery?: string[];

  narrative: {
    short: LocaleString;
    long: LocaleString;
    pullQuote?: LocaleString;
  };

  includes: LocaleString[];
  excludes: LocaleString[];
  itinerary: ItineraryDay[];
  experience: ExperienceData;

  idealFor: LocaleString[];
  signatureExperiences: LocaleString[];
  difficulty: "easy" | "moderate" | "challenging";
  relatedTours?: string[];

  preTrip?: {
    packing?: LocaleString[];
    reading?: string[];
    preparation?: LocaleString;
  };

  seo: {
    es: { metaTitle: string; metaDescription: string; keywords: string[] };
    en: { metaTitle: string; metaDescription: string; keywords: string[] };
  };
}

interface ItineraryDay {
  day: number;
  title: LocaleString;
  description: LocaleString;
  highlights: LocaleString[];
  meals?: ("breakfast" | "lunch" | "dinner")[];
  accommodation?: LocaleString;
}

interface ExperienceData {
  culturalDepth: 1 | 2 | 3 | 4 | 5;
  physicalDemand: 1 | 2 | 3 | 4 | 5;
  comfort: 1 | 2 | 3 | 4 | 5;
  groupIntimacy: 1 | 2 | 3 | 4 | 5;
}
```

---

## Tour Catalog

| Tier    | Tour                         | Duration   | Slug                        |
|---------|------------------------------|------------|-----------------------------|
| Entry   | Classic Bogotá               | 2–3 days   | `classic-bogota`            |
| Core    | Classic Colombia Cafetero    | 10 days    | `classic-colombia-cafetero` |
| Core    | Classic Colombia Caribe      | 10 days    | `classic-colombia-caribe`   |
| Core    | Classic Colombia Full        | 13 days    | `classic-colombia-full`     |
| Premium | En Búsqueda del Dorado       | 8–9 days   | `en-busqueda-del-dorado`    |
| Premium | Macondo y el Realismo Mágico | 7–10 days  | `macondo-realismo-magico`   |
| Premium | Wild Colombia                | 14–21 days | `wild-colombia`             |

### Relationships:
- Classic Colombia variants share Bogotá as base segment
- Classic Colombia Full = Cafetero + Caribe combined
- `relatedTours` connects variants

---

## Content Separation Principle

| Layer      | Lives in               | Purpose            |
|-----------|------------------------|--------------------|
| Narrative  | `narrative.short/long` | Human storytelling |
| Structured | `includes`, `itinerary`| UI rendering       |
| Metadata   | `seo`, `category`      | SEO + filters      |

---

## File Naming

```
content/tours/classic-bogota.json
content/tours/classic-colombia-cafetero.json
content/tours/classic-colombia-caribe.json
content/tours/classic-colombia-full.json
content/tours/en-busqueda-del-dorado.json
content/tours/macondo-realismo-magico.json
content/tours/wild-colombia.json
content/pages/homepage.json
content/pages/about.json
content/pages/contact.json
content/i18n/es.json
content/i18n/en.json
```

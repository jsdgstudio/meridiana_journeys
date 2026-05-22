// types/content.ts — Bilingual page content models

import type { LocaleString } from "./tour";

export type SectionType =
  | "hero"
  | "value-proposition"
  | "featured-tours"
  | "how-it-works"
  | "testimonials"
  | "cta"
  | "editorial-block"
  | "gallery";

export type SectionTheme = "light" | "dark" | "alt";

// --- Homepage ---

export interface TravelCardItem {
  id: string;
  imageSrc: string;
  imageAlt: string;
  tone: "terracotta" | "gold" | "emerald";
  tourLabel: LocaleString;
  region: LocaleString;
  meta: LocaleString;
  title: LocaleString;
  titleEmphasis?: LocaleString;
  description: LocaleString;
}

export interface TravelCardsContent {
  eyebrow: LocaleString;
  headline: LocaleString;
  headerCta: LocaleString;
  ctaLearnMore: LocaleString;
  ctaBook: LocaleString;
  row1: TravelCardItem[];
  row2: TravelCardItem[];
}

export interface InfoBarContent {
  headline: LocaleString;
  subline: LocaleString;
}

export interface HomepageContent {
  id: "homepage";
  hero: HeroContent;
  aboutPreview: AboutPreviewContent;
  featuredTours: FeaturedToursContent;
  travelCards: TravelCardsContent;
  infoBar: InfoBarContent;
  howItWorks: HowItWorksContent;
  cta: CTAContent;
}

export interface HeroContent {
  headline: LocaleString;
  subheadline: LocaleString;
  media: {
    type: "image" | "video";
    src: string;
    alt: LocaleString;
    poster?: string;
  };
}

export interface AboutPreviewContent {
  label: LocaleString;
  headline: {
    line1: LocaleString;
    line2: LocaleString;
  };
  lead: LocaleString;
  editorial: {
    methodLabel: LocaleString;
    method: LocaleString;
    body1: LocaleString;
    body2: LocaleString;
  };
  pullQuote: LocaleString;
  pullQuoteHighlight: LocaleString;
  donde: {
    sectionLabel: LocaleString;
    intro: LocaleString;
    lines: LocaleString[];
  };
  closing: LocaleString;
  differentiator: {
    label: LocaleString;
    subtitle: LocaleString;
    textBase: LocaleString;
    textEmphasis: LocaleString;
    quote: LocaleString;
    signature: LocaleString;
  };
  cta: {
    text: LocaleString;
    href: string;
  };
  isotipo: string;
  logo: string;
}

export interface FeaturedToursContent {
  headline: LocaleString;
  tourIds: string[];
}

export interface HowItWorksContent {
  headline: LocaleString;
  steps: {
    number: number;
    title: LocaleString;
    description: LocaleString;
  }[];
}

export interface CTAContent {
  headline: LocaleString;
  description: LocaleString;
  buttonText: LocaleString;
  buttonHref: string;
}

// --- About ---

export interface TeamMember {
  name: string;
  role: LocaleString;
  photo: string | null;
  bio: LocaleString;
}

export interface AboutContent {
  id: "about";
  hero: HeroContent;
  story: {
    pullQuote: LocaleString;
    body: LocaleString; // HTML
  };
  team: {
    headline: LocaleString;
    members: TeamMember[];
  };
  cta: CTAContent;
}

// --- Contact ---

export interface ContactContent {
  id: "contact";
  headline: LocaleString;
  description: LocaleString;
  email: string;
  whatsapp: {
    number: string;
    label: LocaleString;
    href: string;
  };
  responseTime: LocaleString;
  reassurance: LocaleString;
}

// --- i18n UI Strings ---

export interface UIStrings {
  nav: Record<string, string>;
  hero: Record<string, string>;
  tours: Record<string, string>;
  experience: Record<string, string>;
  cta: Record<string, string>;
  contact: Record<string, string>;
  journal: Record<string, string>;
  about: Record<string, string>;
  footer: Record<string, string>;
  lang: Record<string, string>;
}

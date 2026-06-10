// types/journal.ts — Journal entry data model

import type { LocaleString } from "./tour";

export interface VisualImage {
  src: string;
  alt: LocaleString;
  caption: LocaleString;
}

export type JournalSectionType = "paragraph" | "heading" | "pullquote" | "imagebreak";

export interface JournalSection {
  type: JournalSectionType;
  content?: LocaleString;
  imageIndex?: number;
  imageCaption?: LocaleString;
}

export interface JournalEntry {
  slug: string;
  tourSlug: string;
  category: LocaleString;
  title: LocaleString;
  subtitle: LocaleString;
  pullQuote: LocaleString;
  heroImage: {
    src: string;
    alt: LocaleString;
  };
  body: JournalSection[];
  visualNotebook: VisualImage[];
  seo: {
    title: LocaleString;
    description: LocaleString;
    keywords: LocaleString;
  };
}

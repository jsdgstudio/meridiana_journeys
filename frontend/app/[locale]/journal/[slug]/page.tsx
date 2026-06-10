import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { getJournalEntries, getJournalEntry } from "@/lib/journal/entries";
import { JournalArticle } from "@/components/journal/JournalArticle";

interface JournalArticlePageProps {
  params: { locale: Locale; slug: string };
}

export function generateStaticParams() {
  const entries = getJournalEntries();
  const locales: Locale[] = ["es", "en"];
  return locales.flatMap((locale) =>
    entries.map((entry) => ({ locale, slug: entry.slug }))
  );
}

export async function generateMetadata({
  params,
}: JournalArticlePageProps): Promise<Metadata> {
  const entry = getJournalEntry(params.slug);
  if (!entry) return {};
  const { locale } = params;

  return {
    title: entry.seo.title[locale],
    description: entry.seo.description[locale],
    keywords: entry.seo.keywords[locale],
    openGraph: {
      title: entry.seo.title[locale],
      description: entry.seo.description[locale],
      images: [{ url: entry.heroImage.src }],
    },
  };
}

export default function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { locale, slug } = params;
  const entry = getJournalEntry(slug);

  if (!entry) notFound();

  return (
    <main className="bg-negro min-h-screen">
      <JournalArticle entry={entry!} locale={locale} />
    </main>
  );
}

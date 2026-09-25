import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { getJournalEntries } from "@/lib/journal/entries";
import { JournalHero } from "@/components/journal/JournalHero";
import { JournalGrid } from "@/components/journal/JournalGrid";
import journalContent from "@/content/pages/journal.json";

interface JournalPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: JournalPageProps): Promise<Metadata> {
  const { locale } = params;

  return {
    title:
      locale === "es"
        ? "Journal — El territorio que estamos leyendo"
        : "Journal — The territory we are reading",
    description:
      locale === "es"
        ? "Cinco ensayos literarios sobre Colombia: historia, naturaleza, literatura y gastronomía antes del viaje."
        : "Five literary essays on Colombia: history, nature, literature and gastronomy before the journey.",
    other: {
      "journal-photo-source": journalContent.hero.image.source.url,
      "journal-photo-provider": journalContent.hero.image.source.label,
      "journal-photo-license": "https://www.pexels.com/license/",
    },
  };
}

export default function JournalPage({ params }: JournalPageProps) {
  const { locale } = params;
  const entries = getJournalEntries();

  return (
    <main className="bg-negro min-h-screen">
      <JournalHero
        locale={locale}
        ui={{
          headline: journalContent.hero.headline[locale],
          subtitle: journalContent.hero.subtitle[locale],
        }}
        image={{
          src: journalContent.hero.image.src,
          alt: journalContent.hero.image.alt[locale],
        }}
      />
      <section className="bg-negro pb-24">
        <JournalGrid entries={entries} locale={locale} />
      </section>
    </main>
  );
}

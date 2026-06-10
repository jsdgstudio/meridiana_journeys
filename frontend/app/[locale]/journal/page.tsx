import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { getJournalEntries } from "@/lib/journal/entries";
import { JournalHero } from "@/components/journal/JournalHero";
import { JournalGrid } from "@/components/journal/JournalGrid";

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
        ? "Journal — El territorio que estamos leyendo | Meridiana"
        : "Journal — The territory we are reading | Meridiana",
    description:
      locale === "es"
        ? "Cinco ensayos literarios sobre Colombia: historia, naturaleza, literatura y gastronomía antes del viaje."
        : "Five literary essays on Colombia: history, nature, literature and gastronomy before the journey.",
  };
}

const ui = {
  es: {
    headline: "El territorio\nque estamos leyendo.",
    subtitle: "Cinco ensayos. Cinco maneras de entender Colombia antes de recorrerla.",
  },
  en: {
    headline: "The territory\nwe are reading.",
    subtitle: "Five essays. Five ways to understand Colombia before travelling through it.",
  },
};

export default function JournalPage({ params }: JournalPageProps) {
  const { locale } = params;
  const entries = getJournalEntries();

  return (
    <main className="bg-negro min-h-screen">
      <JournalHero locale={locale} ui={ui[locale]} />
      <section className="bg-negro pb-24">
        <JournalGrid entries={entries} locale={locale} />
      </section>
    </main>
  );
}

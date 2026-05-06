import type { Locale } from "@/types/tour";
import { getAllTours } from "@/hooks/useTours";
import { ToursGrid } from "@/components/tour/ToursGrid";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import esStrings from "@/content/i18n/es.json";
import enStrings from "@/content/i18n/en.json";

interface JourneysPageProps {
  params: { locale: Locale };
}

const uiStrings = { es: esStrings, en: enStrings };

const pageIntro = {
  es: "Siete itinerarios. Cada uno construido alrededor de una idea, no de una lista de atracciones. Desde tres días en Bogotá hasta tres semanas entre selva, páramo y litoral.",
  en: "Seven itineraries. Each one built around an idea, not a list of attractions. From three days in Bogotá to three weeks across jungle, páramo, and coastline.",
};

export default function JourneysPage({ params }: JourneysPageProps) {
  const { locale } = params;
  const tours = getAllTours();
  const ui = uiStrings[locale] ?? esStrings;

  return (
    <>
      {/* Page header */}
      <SectionWrapper theme="dark" className="pt-36 pb-20">
        <Container>
          <p className="label text-xs tracking-widest uppercase text-tumbaga mb-6">
            Meridiana
          </p>
          <Heading as="h1" className="text-marfil mb-6 max-w-xl">
            {ui.tours.pageTitle}
          </Heading>
          <p className="font-sans text-base lg:text-md leading-relaxed text-marfil/60 max-w-lg">
            {pageIntro[locale]}
          </p>
        </Container>
      </SectionWrapper>

      {/* Tours grid */}
      <SectionWrapper theme="page">
        <Container>
          <ToursGrid
            tours={tours}
            locale={locale}
            ui={{
              filterAll: ui.tours.filterAll,
              filterEntry: ui.tours.filterEntry,
              filterCore: ui.tours.filterCore,
              filterPremium: ui.tours.filterPremium,
            }}
          />
        </Container>
      </SectionWrapper>

      {/* Bottom CTA — custom journey */}
      <SectionWrapper theme="light">
        <Container size="narrow">
          <div className="text-center space-y-6">
            <div className="w-12 h-px bg-tumbaga mx-auto" />
            <Heading as="h3" className="text-negro">
              {ui.tours.customJourney}
            </Heading>
            <p className="font-sans text-sm leading-relaxed text-negro/55 max-w-sm mx-auto">
              {ui.tours.customJourneyText}
            </p>
            <Button href={`/${locale}/contacto`} variant="primary" size="md">
              {ui.cta.contactUs}
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}

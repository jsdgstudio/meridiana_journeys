import type { Locale } from "@/types/tour";
import { TravelCards } from "@/components/sections/TravelCards";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getHomepageContent } from "@/hooks/useContent";
import esStrings from "@/content/i18n/es.json";
import enStrings from "@/content/i18n/en.json";

interface JourneysPageProps {
  params: { locale: Locale };
}

const uiStrings = { es: esStrings, en: enStrings };

const pageIntro = {
  es: "Cinco itinerarios. Cada uno construido alrededor de una idea, no de una lista de atracciones. Desde tres días en Bogotá hasta tres semanas entre selva, páramo y litoral.",
  en: "Five itineraries. Each one built around an idea, not a list of attractions. From three days in Bogotá to three weeks across jungle, páramo, and coastline.",
};

const customJourneyHeading = {
  es: "¿Tienes en mente algo diferente?",
  en: "Have something different in mind?",
};

const customJourneyBody = {
  es: "Cada viaje Meridiana nace de una conversación. Cuéntanos qué te mueve y construimos algo que no existe todavía.",
  en: "Every Meridiana journey begins with a conversation. Tell us what moves you and we'll build something that doesn't exist yet.",
};

export default function JourneysPage({ params }: JourneysPageProps) {
  const { locale } = params;
  const ui = uiStrings[locale] ?? esStrings;
  const { travelCards } = getHomepageContent();

  return (
    <>
      {/*
        Hero + cards comparten un único campo visual: gradiente tumbaga que
        arranca con destello en la zona del encabezado y se funde en bronce
        oscuro al bajar hacia las cards.
      */}
      <div
        className="relative"
        style={{
          background: [
            /* destello: burst lumínico desde arriba-centro */
            "radial-gradient(ellipse 78% 38% at 52% 2%, oklch(80% 0.076 64 / 0.94) 0%, oklch(65% 0.072 66 / 0.65) 26%, oklch(56% 0.066 68 / 0) 54%)",
            /* glint: núcleo marfil en el epicentro */
            "radial-gradient(ellipse 28% 16% at 54% 0%, oklch(91% 0.014 52 / 0.44) 0%, oklch(91% 0.014 52 / 0) 100%)",
            /* base tumbaga más cálida y presente — oscurece tarde */
            "linear-gradient(180deg, oklch(38% 0.058 67) 0%, oklch(32% 0.052 68) 20%, oklch(22% 0.038 70) 42%, oklch(13% 0.020 74) 68%, oklch(8% 0.010 76) 100%)",
          ].join(", "),
        }}
      >
        {/* Encabezado de página */}
        <section className="relative w-full pt-36 pb-10" aria-label={ui.tours.pageTitle}>
          <Container>
            <div className="flex items-center gap-3 mb-6">
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "rgba(231,213,188,0.50)",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: "rgba(231,213,188,0.60)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                MERIDIANA · COLOMBIA
              </p>
            </div>

            <h1
              className="font-display font-light mb-6 max-w-xl"
              style={{
                fontSize: "clamp(3rem, 7vw, 5rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                color: "var(--marfil)",
              }}
            >
              {ui.tours.pageTitle}
            </h1>

            <p
              className="font-sans text-base leading-relaxed max-w-lg"
              style={{ color: "rgba(231,213,188,0.55)" }}
            >
              {pageIntro[locale]}
            </p>
          </Container>
        </section>

        {/* Cards en modo seamless: fondo transparente, sin header interno */}
        <TravelCards content={travelCards} locale={locale} theme="dark" seamless />
      </div>

      {/* Bottom CTA — tono editorial */}
      <section
        className="w-full py-24"
        style={{ background: "var(--negro)" }}
      >
        <Container size="narrow">
          <div className="text-center">
            {/* Separador decorativo superior */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <span
                aria-hidden="true"
                style={{ display: "block", width: "48px", height: "1px", background: "var(--tumbaga)" }}
              />
              <span
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.32em",
                  color: "var(--tumbaga)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                VIAJES A MEDIDA
              </span>
              <span
                aria-hidden="true"
                style={{ display: "block", width: "48px", height: "1px", background: "var(--tumbaga)" }}
              />
            </div>

            <h3
              className="font-display font-light mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
                color: "var(--marfil)",
              }}
            >
              {customJourneyHeading[locale]}
            </h3>

            <p
              className="font-sans text-sm leading-relaxed mb-10 max-w-sm mx-auto"
              style={{ color: "rgba(231,213,188,0.55)" }}
            >
              {customJourneyBody[locale]}
            </p>

            {/* Separador decorativo inferior */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <span
                aria-hidden="true"
                style={{ display: "block", width: "24px", height: "1px", background: "rgba(154,122,58,0.4)" }}
              />
              <span
                aria-hidden="true"
                style={{ display: "block", width: "4px", height: "4px", background: "var(--tumbaga)", transform: "rotate(45deg)" }}
              />
              <span
                aria-hidden="true"
                style={{ display: "block", width: "24px", height: "1px", background: "rgba(154,122,58,0.4)" }}
              />
            </div>

            <Button href={`/${locale}/contacto`} variant="primary" size="md">
              {ui.cta.contactUs}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

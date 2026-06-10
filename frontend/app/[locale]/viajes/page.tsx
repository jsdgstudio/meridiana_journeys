import type { Locale } from "@/types/tour";
import { TravelCards } from "@/components/sections/TravelCards";
import { JourneysHero } from "@/components/sections/JourneysHero";
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
            /* burst: croma bajada, glint ampliado amortigua el dorado */
            "radial-gradient(ellipse 80% 44% at 52% 1%, oklch(80% 0.10 63 / 0.82) 0%, oklch(66% 0.09 65 / 0.45) 32%, oklch(56% 0.06 67 / 0) 56%)",
            /* glint: más grande y más opaco — lava el epicentro con luz */
            "radial-gradient(ellipse 52% 30% at 54% 0%, oklch(93% 0.03 58 / 0.62) 0%, oklch(90% 0.03 58 / 0.18) 55%, oklch(90% 0.03 58 / 0) 100%)",
            /* base — tumbaga apagado, oscurece con gracia */
            "linear-gradient(180deg, oklch(45% 0.09 67) 0%, oklch(38% 0.075 68) 20%, oklch(26% 0.055 69) 42%, oklch(14% 0.024 72) 66%, oklch(9% 0.010 74) 100%)",
          ].join(", "),
        }}
      >
        {/* Hero cinematográfico con línea animada en marfil */}
        <JourneysHero locale={locale} pageIntro={pageIntro} />

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

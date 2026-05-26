"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainerSlow, fadeInUp, viewport } from "@/lib/animations";
import type { Tour, Locale } from "@/types/tour";

interface TourPricingProps {
  tour: Tour;
  locale: Locale;
}

const labels = {
  from:        { es: "Desde",                  en: "From"                    },
  pp:          { es: "por persona",             en: "per person"              },
  cta:         { es: "Solicitar itinerario",    en: "Request this itinerary"  },
  sub:         { es: "Te responderemos en menos de 48 horas.", en: "We'll respond within 48 hours." },
  customQuote: { es: "Por confirmar",           en: "Custom quote"            },
};

export function TourPricing({ tour, locale }: TourPricingProps) {
  const contactHref = `/${locale}/contacto`;
  const { price } = tour;
  const hasTiers = price.tiers && price.tiers.length > 0;
  const isCustom = price.customQuote === true;

  return (
    <section
      className="relative overflow-hidden w-full py-24 md:py-32"
      style={{ background: "var(--negro)" }}
    >
      {/* Subliminal hero image background */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.12 }}>
        <Image
          src={tour.hero.image}
          fill
          className="object-cover object-center"
          alt=""
          aria-hidden
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "var(--negro)", opacity: 0.6 }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Container size="narrow">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainerSlow}
            className="text-center space-y-8"
          >
            {/* Tumbaga rule */}
            <motion.div
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                visible: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              className="w-12 h-px bg-tumbaga mx-auto origin-left"
            />

            {/* Context phrase */}
            {price.contextPhrase && (
              <motion.p
                variants={fadeInUp}
                className="font-display font-light italic"
                style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(231,213,188,0.55)" }}
              >
                {price.contextPhrase[locale]}
              </motion.p>
            )}

            {/* Price */}
            {isCustom ? (
              <motion.div variants={fadeInUp} className="space-y-2">
                <p className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(231,213,188,0.40)" }}>
                  {labels.from[locale]}
                </p>
                <p
                  className="font-display font-light text-marfil italic"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  {labels.customQuote[locale]}
                </p>
              </motion.div>
            ) : hasTiers ? (
              <motion.div variants={fadeInUp} className="space-y-3">
                <p className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(231,213,188,0.40)" }}>
                  {labels.from[locale]}
                </p>
                <div className="space-y-2">
                  {price.tiers!.map((tier, i) => (
                    <div key={i} className="flex items-baseline justify-center gap-3">
                      <p
                        className="font-display font-light text-marfil"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
                      >
                        ${tier.amount.toLocaleString("en-US")}
                        <span style={{ fontSize: "1rem", marginLeft: "0.5rem", color: "rgba(231,213,188,0.40)" }}>USD</span>
                      </p>
                      <span className="font-sans text-xs italic" style={{ color: "rgba(231,213,188,0.50)" }}>
                        · {tier.label[locale]}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-sm" style={{ color: "rgba(231,213,188,0.40)" }}>{labels.pp[locale]}</p>
              </motion.div>
            ) : (
              <motion.div variants={fadeInUp} className="space-y-2">
                <p className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(231,213,188,0.40)" }}>
                  {labels.from[locale]}
                </p>
                <p
                  className="font-display font-light text-marfil"
                  style={{ fontSize: "clamp(3rem, 7vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  ${(price.amount ?? 0).toLocaleString("en-US")}
                  <span style={{ fontSize: "1.25rem", marginLeft: "0.5rem", color: "rgba(231,213,188,0.40)" }}>USD</span>
                </p>
                <p className="font-sans text-sm" style={{ color: "rgba(231,213,188,0.40)" }}>{labels.pp[locale]}</p>
              </motion.div>
            )}

            {/* Price note */}
            {price.note && (
              <motion.p
                variants={fadeInUp}
                className="font-sans text-sm leading-relaxed max-w-lg mx-auto"
                style={{ color: "rgba(231,213,188,0.55)" }}
              >
                {price.note[locale]}
              </motion.p>
            )}

            {/* Key includes reminder */}
            <motion.p
              variants={fadeInUp}
              className="font-sans text-sm max-w-xs mx-auto"
              style={{ color: "rgba(231,213,188,0.50)" }}
            >
              {tour.includes.slice(0, 3).map((inc) => inc[locale]).join(" · ")}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <Button href={contactHref} variant="primary" size="lg">
                {labels.cta[locale]}
              </Button>
              <p className="font-sans text-xs" style={{ color: "rgba(231,213,188,0.30)" }}>
                {labels.sub[locale]}
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}

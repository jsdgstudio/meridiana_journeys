"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainerSlow, fadeInUp, viewport } from "@/lib/animations";
import type { Tour, Locale } from "@/types/tour";

interface TourPricingProps {
  tour: Tour;
  locale: Locale;
}

const labels = {
  from:    { es: "Desde",                    en: "From"                     },
  pp:      { es: "por persona",              en: "per person"               },
  cta:     { es: "Solicitar itinerario",     en: "Request this itinerary"   },
  sub:     { es: "Te responderemos en menos de 48 horas.", en: "We'll respond within 48 hours." },
};

export function TourPricing({ tour, locale }: TourPricingProps) {
  const contactHref = `/${locale}/contacto`;

  return (
    <SectionWrapper theme="dark">
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

          {/* Price */}
          <motion.div variants={fadeInUp} className="space-y-2">
            <p className="label text-xs tracking-widest uppercase text-marfil/40">
              {labels.from[locale]}
            </p>
            <p className="font-display text-5xl font-light text-marfil leading-tight">
              ${tour.price.amount.toLocaleString()}
              <span className="text-xl ml-2 text-marfil/40">USD</span>
            </p>
            <p className="font-sans text-sm text-marfil/40">
              {tour.price.note ? tour.price.note[locale] : labels.pp[locale]}
            </p>
          </motion.div>

          {/* Key includes reminder */}
          <motion.p
            variants={fadeInUp}
            className="font-sans text-sm leading-relaxed text-marfil/50 max-w-xs mx-auto"
          >
            {tour.includes.slice(0, 3).map((inc) => inc[locale]).join(" · ")}
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <Button href={contactHref} variant="primary" size="lg">
              {labels.cta[locale]}
            </Button>
            <p className="font-sans text-xs text-marfil/30">
              {labels.sub[locale]}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

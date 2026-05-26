"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { fadeInUp, viewport } from "@/lib/animations";
import type { Tour, Locale } from "@/types/tour";

interface TourPreTripProps {
  tour: Tour;
  locale: Locale;
}

const labels = {
  eyebrow:     { es: "Antes de partir",  en: "Before you go"    },
  packing:     { es: "Qué llevar",       en: "What to pack"     },
  preparation: { es: "Preparación",      en: "Preparation"      },
};

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export function TourPreTrip({ tour, locale }: TourPreTripProps) {
  const { preTrip } = tour;
  if (!preTrip) return null;
  if (!preTrip.packing?.length && !preTrip.preparation) return null;

  return (
    <SectionWrapper theme="light">
      <Container>
        {/* Eyebrow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
          className="flex items-center gap-3 mb-12"
        >
          <span
            aria-hidden="true"
            style={{ display: "inline-block", width: "20px", height: "1px", background: "var(--tumbaga)", flexShrink: 0 }}
          />
          <p
            className="font-sans uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.32em", color: "var(--tumbaga)" }}
          >
            {labels.eyebrow[locale]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Packing list */}
          {preTrip.packing && preTrip.packing.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p
                className="font-sans uppercase mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.24em", color: "rgba(15,19,14,0.45)" }}
              >
                {labels.packing[locale]}
              </p>
              <ul className="space-y-4">
                {preTrip.packing.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-1 flex-shrink-0"
                      style={{ color: "var(--tumbaga)", fontSize: "11px" }}
                    >
                      ·
                    </span>
                    <span
                      className="font-sans text-sm leading-relaxed"
                      style={{ color: "rgba(15,19,14,0.70)" }}
                    >
                      {item[locale]}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Preparation text */}
          {preTrip.preparation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              <p
                className="font-sans uppercase mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.24em", color: "rgba(15,19,14,0.45)" }}
              >
                {labels.preparation[locale]}
              </p>
              <p
                className="font-display font-light italic leading-relaxed"
                style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                  color: "rgba(15,19,14,0.75)",
                }}
              >
                {preTrip.preparation[locale]}
              </p>
            </motion.div>
          )}
        </div>
      </Container>
    </SectionWrapper>
  );
}

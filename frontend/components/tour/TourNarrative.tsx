"use client";

import { motion } from "framer-motion";
import { RichText } from "@/components/ui/RichText";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { fadeInUp, viewport } from "@/lib/animations";
import type { Tour, Locale } from "@/types/tour";

interface TourNarrativeProps {
  tour: Tour;
  locale: Locale;
}

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export function TourNarrative({ tour, locale }: TourNarrativeProps) {
  const { narrative } = tour;

  return (
    <SectionWrapper theme="page">
      <Container size="narrow">
        {/* Long narrative with drop cap */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
        >
          <RichText
            html={narrative.long[locale]}
            className="tour-narrative prose-p:text-negro/80 prose-headings:text-negro"
          />
        </motion.div>

        {/* Pull quote — momento de respiración */}
        {narrative.pullQuote && (
          <motion.div
            className="w-full my-16 md:my-24 pl-8 md:pl-12"
            style={{ borderLeft: "2px solid var(--tumbaga)" }}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <p
              className="font-display font-light italic text-negro leading-[1.25]"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                letterSpacing: "-0.01em",
              }}
            >
              &ldquo;{narrative.pullQuote[locale]}&rdquo;
            </p>
          </motion.div>
        )}

      </Container>
    </SectionWrapper>
  );
}

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

export function TourNarrative({ tour, locale }: TourNarrativeProps) {
  const { narrative } = tour;

  return (
    <SectionWrapper theme="page">
      <Container size="narrow">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
        >
          <RichText
            html={narrative.long[locale]}
            className="prose-p:text-negro/80 prose-headings:text-negro"
          />
        </motion.div>

        {narrative.pullQuote && (
          <motion.blockquote
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mt-12 pt-10 border-t border-negro/10"
          >
            <div className="w-8 h-px bg-tumbaga mb-6" />
            <p className="font-display text-2xl font-light italic text-negro leading-snug">
              &ldquo;{narrative.pullQuote[locale]}&rdquo;
            </p>
          </motion.blockquote>
        )}
      </Container>
    </SectionWrapper>
  );
}

"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, viewport } from "@/lib/animations";
import type { Tour, Locale } from "@/types/tour";

interface TourIncludesProps {
  tour: Tour;
  locale: Locale;
}

const labels = {
  includes: { es: "Incluye", en: "Includes" },
  excludes: { es: "No incluye", en: "Not included" },
};

const itemVariant = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export function TourIncludes({ tour, locale }: TourIncludesProps) {
  return (
    <SectionWrapper theme="light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Includes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideInLeft}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-px bg-tumbaga" />
              <Heading as="h3" className="text-negro">
                {labels.includes[locale]}
              </Heading>
            </div>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={{ ...staggerContainer, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              className="space-y-4"
            >
              {tour.includes.map((item, i) => (
                <motion.li key={i} variants={itemVariant} className="flex items-start gap-3">
                  <span className="mt-1 text-tumbaga text-xs leading-none flex-shrink-0">✓</span>
                  <span className="font-sans text-sm leading-relaxed text-negro/70">
                    {item[locale]}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Excludes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideInRight}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-px bg-negro/20" />
              <Heading as="h3" className="text-negro/60">
                {labels.excludes[locale]}
              </Heading>
            </div>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={{ ...staggerContainer, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              className="space-y-4"
            >
              {tour.excludes.map((item, i) => (
                <motion.li key={i} variants={itemVariant} className="flex items-start gap-3">
                  <span className="mt-1 text-negro/30 text-xs leading-none flex-shrink-0">—</span>
                  <span className="font-sans text-sm leading-relaxed text-negro/45">
                    {item[locale]}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

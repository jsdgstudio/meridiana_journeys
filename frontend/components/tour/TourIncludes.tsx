"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { staggerContainer, slideInLeft, slideInRight, viewport } from "@/lib/animations";
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
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};

export function TourIncludes({ tour, locale }: TourIncludesProps) {
  return (
    <SectionWrapper theme="dark">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-0">
          {/* Includes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideInLeft}
            className="lg:pr-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-px" style={{ background: "var(--tumbaga)" }} />
              <h3
                className="font-display font-light"
                style={{ fontSize: "1.1rem", color: "var(--marfil)", letterSpacing: "0.02em" }}
              >
                {labels.includes[locale]}
              </h3>
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
                  <span className="mt-1 flex-shrink-0" style={{ color: "var(--tumbaga)", fontSize: "11px" }}>✓</span>
                  <span className="font-sans text-sm leading-relaxed" style={{ color: "rgba(231,213,188,0.75)" }}>
                    {item[locale]}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Vertical separator — desktop only */}
          <div
            className="hidden lg:block w-px self-stretch"
            style={{ background: "rgba(231,213,188,0.10)" }}
          />

          {/* Excludes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideInRight}
            className="lg:pl-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-px" style={{ background: "rgba(231,213,188,0.20)" }} />
              <h3
                className="font-display font-light"
                style={{ fontSize: "1.1rem", color: "rgba(231,213,188,0.45)", letterSpacing: "0.02em" }}
              >
                {labels.excludes[locale]}
              </h3>
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
                  <span className="mt-1 flex-shrink-0" style={{ color: "rgba(231,213,188,0.30)", fontSize: "11px" }}>—</span>
                  <span className="font-sans text-sm leading-relaxed" style={{ color: "rgba(231,213,188,0.40)" }}>
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

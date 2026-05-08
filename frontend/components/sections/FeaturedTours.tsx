"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { TourCard } from "@/components/tour/TourCard";
import type { FeaturedToursContent } from "@/types/content";
import type { Tour, Locale } from "@/types/tour";

interface FeaturedToursProps {
  content: FeaturedToursContent;
  tours: Tour[];
  locale: Locale;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 22 },
  },
};

export function FeaturedTours({ content, tours, locale }: FeaturedToursProps) {
  const [featured, ...rest] = tours;

  return (
    <SectionWrapper theme="light">
      <Container>
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 22 }}
          >
            <Heading as="h2" className="text-negro">
              {content.headline[locale]}
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.1 }}
          >
            <Button href={`/${locale}/viajes`} variant="ghost" size="sm">
              {locale === "es" ? "Ver todos los viajes →" : "View all journeys →"}
            </Button>
          </motion.div>
        </div>

        {/* Asymmetric grid — featured left (3fr), secondary right (2fr) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-start"
        >
          {/* Featured tour — tall portrait format */}
          {featured && (
            <motion.div variants={itemVariants}>
              <TourCard tour={featured} locale={locale} featured />
            </motion.div>
          )}

          {/* Secondary tours — stacked */}
          <div className="grid grid-cols-1 gap-8 lg:gap-10 lg:pt-10">
            {rest.map((tour) => (
              <motion.div key={tour.id} variants={itemVariants}>
                <TourCard tour={tour} locale={locale} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

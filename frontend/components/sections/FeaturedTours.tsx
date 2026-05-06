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

export function FeaturedTours({ content, tours, locale }: FeaturedToursProps) {
  return (
    <SectionWrapper theme="light">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Heading as="h2" className="text-negro">
              {content.headline[locale]}
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button href={`/${locale}/viajes`} variant="ghost" size="sm">
              {locale === "es" ? "Ver todos los viajes →" : "View all journeys →"}
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {tours.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <TourCard tour={tour} locale={locale} />
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

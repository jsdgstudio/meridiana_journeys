"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/types/tour";

interface JournalPageProps {
  params: { locale: Locale };
}

const labels = {
  eyebrow: { es: "Journal", en: "Journal" },
  headline: {
    es: "Historias que aún se están escribiendo",
    en: "Stories still being written",
  },
  body: {
    es: "Estamos preparando ensayos sobre cultura, memoria y lugar. Textos que merecen ser contados con la profundidad que exigen. Pronto.",
    en: "We are preparing essays on culture, memory, and place. Texts that deserve to be told with the depth they require. Soon.",
  },
  cta: {
    es: "Mientras tanto, explora los viajes",
    en: "In the meantime, explore the journeys",
  },
};

export default function JournalPage({ params }: JournalPageProps) {
  const { locale } = params;

  return (
    <SectionWrapper theme="dark" className="min-h-screen flex items-center">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center space-y-10 py-24"
        >
          {/* Eyebrow with rules */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-tumbaga" />
            <span className="label text-xs tracking-widest uppercase text-tumbaga">
              {labels.eyebrow[locale]}
            </span>
            <div className="w-8 h-px bg-tumbaga" />
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl lg:text-5xl font-light text-marfil leading-tight tracking-tight">
            {labels.headline[locale]}
          </h1>

          {/* Tumbaga rule */}
          <div className="w-16 h-px bg-tumbaga/40 mx-auto" />

          {/* Body */}
          <p className="font-sans text-base leading-relaxed text-marfil/45 max-w-sm mx-auto">
            {labels.body[locale]}
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="pt-2"
          >
            <Button
              href={`/${locale}/viajes`}
              variant="secondary"
              size="lg"
            >
              {labels.cta[locale]}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

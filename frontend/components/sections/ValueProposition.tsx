"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { ValuePropContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface ValuePropositionProps {
  content: ValuePropContent;
  locale: Locale;
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function ValueProposition({ content, locale }: ValuePropositionProps) {
  return (
    <SectionWrapper theme="verde">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 lg:mb-20"
        >
          <Heading as="h2" className="text-marfil max-w-lg">
            {content.headline[locale]}
          </Heading>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {content.pillars.map((pillar, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4 border-t border-marfil-20 pt-8"
            >
              <p className="label text-xs tracking-widest uppercase text-tumbaga">
                0{i + 1}
              </p>
              <Heading as="h3" className="text-marfil">
                {pillar.title[locale]}
              </Heading>
              <p className="font-sans text-sm leading-relaxed text-marfil/60">
                {pillar.description[locale]}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

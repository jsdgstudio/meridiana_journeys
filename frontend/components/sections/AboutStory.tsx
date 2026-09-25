"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";
import { fadeInUp, viewport } from "@/lib/animations";
import type { AboutContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface AboutStoryProps {
  content: AboutContent["story"];
  locale: Locale;
}

export function AboutStory({ content, locale }: AboutStoryProps) {
  return (
    <SectionWrapper theme="page">
      <Container size="narrow">
        {/* Opening statement, immediately below the hero image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
          className="mb-12"
        >
          <div className="w-6 h-px bg-tumbaga mb-8" />
          <h2
            className="font-display font-light leading-snug tracking-tight"
            style={{
              fontSize: "var(--text-xl)",
              color: "var(--negro)",
              lineHeight: "var(--leading-snug)",
            }}
          >
            {content.intro[locale]}
          </h2>
        </motion.div>

        {/* Body */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          <RichText
            html={content.body[locale]}
            className="prose-p:text-negro/85 prose-p:text-base"
          />
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

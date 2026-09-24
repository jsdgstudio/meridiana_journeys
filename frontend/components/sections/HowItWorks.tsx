"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import type { HowItWorksContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface HowItWorksProps {
  content: HowItWorksContent;
  locale: Locale;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const STAGGER_S = 0.16;

export function HowItWorks({ content, locale }: HowItWorksProps) {
  const reduceMotion = useReducedMotion();

  const boxVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * STAGGER_S, duration: 0.9, ease: EASE },
    }),
  };

  const barVariants = {
    hidden: { scaleX: reduceMotion ? 1 : 0 },
    visible: (i: number) => ({
      scaleX: 1,
      transition: { delay: i * STAGGER_S + 0.35, duration: 0.8, ease: EASE },
    }),
  };

  return (
    <SectionWrapper theme="light" className="py-24 lg:py-36">
      <Container>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-sans text-xs tracking-[0.18em] uppercase mb-10 lg:mb-14"
          style={{ color: "var(--tumbaga)" }}
        >
          {content.headline[locale]}
        </motion.p>

        {/* Steps as boxes */}
        <ol className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {content.steps.map((step, i) => (
            <motion.li
              key={step.number}
              custom={i}
              variants={boxVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={reduceMotion ? undefined : { y: -6, borderColor: "var(--terracota)" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex flex-col bg-blanco p-8 sm:p-10 lg:p-12"
              style={{ border: "1px solid var(--border-dark)" }}
            >
              {/* Terracota rule drawn on reveal */}
              <motion.span
                aria-hidden="true"
                custom={i}
                variants={barVariants}
                className="absolute left-0 top-0 h-[3px] w-full origin-left"
                style={{ background: "var(--terracota)" }}
              />

              <h3
                className="font-display font-light leading-tight text-negro mb-5 lg:mb-6"
                style={{ fontSize: "clamp(2.25rem, 1.9rem + 1.2vw, 2.75rem)" }}
              >
                {step.title[locale]}
              </h3>
              <p
                className="font-sans leading-relaxed"
                style={{
                  color: "var(--negro)",
                  opacity: 0.78,
                  fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.125rem)",
                }}
              >
                {step.description[locale]}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </SectionWrapper>
  );
}

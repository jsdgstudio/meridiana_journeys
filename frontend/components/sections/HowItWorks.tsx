"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { HowItWorksContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface HowItWorksProps {
  content: HowItWorksContent;
  locale: Locale;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 22 },
  },
};

export function HowItWorks({ content, locale }: HowItWorksProps) {
  return (
    <SectionWrapper theme="page">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 22 }}
          className="mb-16 lg:mb-20"
        >
          <Heading as="h2" className="text-negro">
            {content.headline[locale]}
          </Heading>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-0"
        >
          {content.steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative lg:pr-16 space-y-5"
            >
              {/* Step number */}
              <div className="flex items-start gap-6">
                <span
                  className="font-display text-4xl font-light leading-none select-none"
                  style={{ color: "var(--terracota)", opacity: 0.85 }}
                >
                  {String(step.number).padStart(2, "0")}
                </span>
                <div className="pt-3 flex-1 space-y-4">
                  <Heading as="h3" className="text-negro">
                    {step.title[locale]}
                  </Heading>
                  <p className="font-sans text-sm leading-relaxed text-negro/55">
                    {step.description[locale]}
                  </p>
                </div>
              </div>

              {/* Connector line (desktop only, not on last) */}
              {i < content.steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 right-0 w-8 h-px bg-negro/10" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

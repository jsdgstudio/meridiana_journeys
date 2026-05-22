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
              whileHover="hovered"
              initial="rest"
              animate="rest"
              className="relative lg:pr-16 space-y-5"
              style={{ willChange: "transform" }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Hover: subtle scale on the whole card */}
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hovered: { scale: 1.015 },
                }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="flex items-start gap-6">
                  {/* Step number — brightens on hover */}
                  <motion.span
                    variants={{
                      rest: { opacity: 0.85 },
                      hovered: { opacity: 1 },
                    }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="font-display text-4xl font-light leading-none select-none"
                    style={{ color: "var(--terracota)" }}
                  >
                    {String(step.number).padStart(2, "0")}
                  </motion.span>

                  <div className="pt-3 flex-1 space-y-4">
                    <Heading as="h3" className="text-negro">
                      {step.title[locale]}
                    </Heading>

                    {/* Description — lifts and becomes fully opaque on hover */}
                    <motion.p
                      variants={{
                        rest: { opacity: 0.7, y: 0 },
                        hovered: { opacity: 1, y: -2 },
                      }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="font-sans text-sm leading-relaxed text-negro/55"
                    >
                      {step.description[locale]}
                    </motion.p>
                  </div>
                </div>
              </motion.div>

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

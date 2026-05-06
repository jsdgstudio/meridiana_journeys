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

export function HowItWorks({ content, locale }: HowItWorksProps) {
  return (
    <SectionWrapper theme="page">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 lg:mb-20"
        >
          <Heading as="h2" className="text-negro">
            {content.headline[locale]}
          </Heading>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {content.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative lg:pr-16 space-y-5"
            >
              {/* Step number */}
              <div className="flex items-start gap-6">
                <span className="font-display text-5xl font-light text-negro/10 leading-none select-none">
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
        </div>
      </Container>
    </SectionWrapper>
  );
}

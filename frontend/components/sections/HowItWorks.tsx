"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import type { HowItWorksContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface HowItWorksProps {
  content: HowItWorksContent;
  locale: Locale;
}

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.14,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export function HowItWorks({ content, locale }: HowItWorksProps) {
  return (
    <SectionWrapper theme="light" className="py-24 lg:py-36">
      <Container>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-sans text-xs tracking-[0.18em] uppercase mb-10 lg:mb-14"
          style={{ color: "var(--tumbaga)" }}
        >
          {content.headline[locale]}
        </motion.p>

        {/* Top rule */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px w-full mb-0"
          style={{ background: "var(--tumbaga)", opacity: 0.35 }}
        />

        {/* Steps */}
        {content.steps.map((step, i) => (
          <motion.div
            key={step.number}
            custom={i}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Row */}
            <div className="py-10 lg:py-14">
              {/* Mobile: numeral + title in a row, description below */}
              <div className="flex gap-6 items-start lg:hidden mb-5">
                <span
                  className="font-display font-light leading-none select-none flex-shrink-0"
                  style={{ color: "var(--terracota)", fontSize: "2.25rem" }}
                >
                  {String(step.number).padStart(2, "0")}
                </span>
                <h3
                  className="font-display font-light leading-snug text-negro"
                  style={{ fontSize: "1.75rem", paddingTop: "0.25rem" }}
                >
                  {step.title[locale]}
                </h3>
              </div>
              <p
                className="font-sans leading-relaxed lg:hidden"
                style={{ color: "var(--negro)", opacity: 0.62, fontSize: "0.9rem", maxWidth: "54ch" }}
              >
                {step.description[locale]}
              </p>

              {/* Desktop: 3-column grid */}
              <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-8 items-start">
                <div className="col-span-1">
                  <span
                    className="font-display font-light leading-none select-none"
                    style={{ color: "var(--terracota)", fontSize: "3rem" }}
                  >
                    {String(step.number).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-3 pl-4">
                  <h3
                    className="font-display font-light leading-snug text-negro"
                    style={{ fontSize: "2.25rem" }}
                  >
                    {step.title[locale]}
                  </h3>
                </div>
                <div className="col-span-8">
                  <p
                    className="font-sans leading-relaxed"
                    style={{
                      color: "var(--negro)",
                      opacity: 0.62,
                      fontSize: "0.9375rem",
                      maxWidth: "58ch",
                    }}
                  >
                    {step.description[locale]}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1 + 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="h-px w-full"
              style={{ background: "var(--tumbaga)", opacity: 0.25 }}
            />
          </motion.div>
        ))}

        {/* Bottom accent — terracota dot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex items-center gap-3"
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: "var(--terracota)" }}
          />
          <span
            className="font-sans text-xs tracking-widest uppercase"
            style={{ color: "var(--tumbaga)", opacity: 0.7 }}
          >
            Meridiana
          </span>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

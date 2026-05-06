"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { AboutContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface AboutValuesProps {
  content: AboutContent["values"];
  locale: Locale;
}

export function AboutValues({ content, locale }: AboutValuesProps) {
  return (
    <SectionWrapper theme="verde">
      <Container>
        <div className="flex items-center gap-4 mb-16">
          <div className="w-6 h-px bg-tumbaga" />
          <Heading as="h2" className="text-marfil">
            {content.headline[locale]}
          </Heading>
        </div>

        <div className="border-t border-marfil/10">
          {content.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="border-b border-marfil/10 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16"
            >
              <div className="lg:col-span-1">
                <span className="font-display text-5xl font-light text-tumbaga/30 leading-none select-none block">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl font-light text-marfil mt-4 leading-snug">
                  {item.title[locale]}
                </h3>
              </div>
              <div className="lg:col-span-2 flex items-center">
                <p className="font-sans text-sm leading-relaxed text-marfil/55">
                  {item.description[locale]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

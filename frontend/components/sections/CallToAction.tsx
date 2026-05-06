"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import type { CTAContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface CallToActionProps {
  content: CTAContent;
  locale: Locale;
}

export function CallToAction({ content, locale }: CallToActionProps) {
  const href = `/${locale}${content.buttonHref}`;

  return (
    <SectionWrapper theme="dark">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center space-y-8"
        >
          {/* Tumbaga rule above */}
          <div className="w-12 h-px bg-tumbaga mx-auto" />

          <Heading as="h2" className="text-marfil">
            {content.headline[locale]}
          </Heading>

          <p className="font-sans text-base lg:text-md leading-relaxed text-marfil/60 max-w-md mx-auto">
            {content.description[locale]}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button href={href} variant="secondary" size="lg">
              {content.buttonText[locale]}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

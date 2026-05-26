"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import type { CTAContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface CallToActionProps {
  content: CTAContent;
  locale: Locale;
}

const WHATSAPP_NUMBER_DISPLAY = "+57 310 756 1974";

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function CallToAction({ content, locale }: CallToActionProps) {
  const isExternal = content.buttonHref.startsWith("http");

  return (
    <SectionWrapper theme="dark">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-sans text-xs tracking-[0.18em] uppercase mb-10"
            style={{ color: "var(--tumbaga)" }}
          >
            {locale === "es" ? "Contacto directo" : "Direct contact"}
          </motion.p>

          {/* Top rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-px mb-14"
            style={{ background: "var(--tumbaga)", opacity: 0.3 }}
          />

          {/* Headline */}
          <h2
            className="font-display font-light text-marfil mb-7"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {content.headline[locale]}
          </h2>

          {/* Description */}
          <p
            className="font-sans leading-relaxed mb-12 mx-auto"
            style={{ color: "var(--marfil)", opacity: 0.55, fontSize: "0.9375rem", maxWidth: "48ch" }}
          >
            {content.description[locale]}
          </p>

          {/* Phone number — typographic accent */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-sans font-light mb-10 tracking-wide"
            style={{ color: "var(--marfil)", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
          >
            {WHATSAPP_NUMBER_DISPLAY}
          </motion.p>

          {/* WhatsApp CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-block mb-10"
          >
            <motion.a
              href={content.buttonHref}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="inline-flex items-center gap-3 font-sans font-bold uppercase tracking-widest select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tumbaga"
              style={{
                background: "var(--terracota)",
                color: "var(--marfil)",
                padding: "1rem 2.25rem",
                fontSize: "0.8125rem",
                letterSpacing: "0.14em",
              }}
            >
              <WhatsAppIcon />
              {content.buttonText[locale]}
            </motion.a>
          </motion.div>

          {/* Reassurance */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-sans text-xs tracking-wide"
            style={{ color: "var(--marfil)", opacity: 0.35 }}
          >
            {locale === "es"
              ? "Respondemos en menos de 48 horas"
              : "We respond within 48 hours"}
          </motion.p>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

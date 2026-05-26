"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/types/tour";
import type { InfoBarContent } from "@/types/content";

interface InfoBarProps {
  content: InfoBarContent;
  locale: Locale;
}

export function InfoBar({ content, locale }: InfoBarProps) {
  return (
    <section
      style={{ backgroundColor: "var(--terracota)" }}
      className="relative py-24 md:py-36"
    >
      <div className="mx-auto max-w-3xl px-8 text-center flex flex-col items-center">

        {/* Línea vertical decorativa — arriba */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            width: 1,
            height: 72,
            backgroundColor: "var(--marfil)",
            opacity: 0.5,
            marginBottom: "var(--space-10)",
            transformOrigin: "top",
          }}
        />

        {/* Quote principal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.625rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.4,
            color: "var(--marfil)",
            marginBottom: "var(--space-8)",
          }}
        >
          {content.headline[locale]}
        </motion.p>

        {/* Atribución — small caps marfil */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.38 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--marfil)",
            opacity: 0.65,
            marginBottom: "var(--space-10)",
          }}
        >
          {content.signature?.[locale] ?? (locale === "es" ? "Meridiana · Curaduría cultural" : "Meridiana · Cultural Curation")}
        </motion.p>

        {/* Línea vertical decorativa — abajo */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          style={{
            width: 1,
            height: 72,
            backgroundColor: "var(--marfil)",
            opacity: 0.5,
            transformOrigin: "top",
          }}
        />
      </div>
    </section>
  );
}

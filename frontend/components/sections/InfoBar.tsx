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
      className="pt-12 pb-0"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.45,
            color: "var(--marfil)",
            marginBottom: "var(--space-4)",
          }}
        >
          {content.headline[locale]}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-base)",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "var(--marfil)",
          }}
        >
          {content.subline[locale]}
        </motion.p>
      </div>
      <div style={{ height: "6px", backgroundColor: "var(--negro)" }} />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/types/tour";

interface InfoBarContent {
  text: { es: string; en: string };
}

interface InfoBarProps {
  content: InfoBarContent;
  locale: Locale;
}

export function InfoBar({ content, locale }: InfoBarProps) {
  return (
    <section
      style={{ backgroundColor: "var(--terracota)", color: "var(--negro)" }}
      className="py-12"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.55,
            color: "var(--negro)",
          }}
        >
          {content.text[locale]}
        </motion.p>
      </div>
    </section>
  );
}

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
      className="relative overflow-hidden pt-12 pb-20"
    >
      {/* Bottom fade — dissolves into the TravelCards dark palette */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-20"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, var(--negro) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
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
    </section>
  );
}

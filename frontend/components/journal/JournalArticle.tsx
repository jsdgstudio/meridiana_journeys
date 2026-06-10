"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { JournalEntry } from "@/types/journal";
import type { Locale } from "@/types/tour";
import { ArticleHero } from "./ArticleHero";
import { ArticleBody } from "./ArticleBody";
import { VisualNotebook } from "./VisualNotebook";
import { JournalLightbox } from "./JournalLightbox";

interface JournalArticleProps {
  entry: JournalEntry;
  locale: Locale;
}

function calcReadingTime(entry: JournalEntry, locale: Locale): number {
  const chars = entry.body
    .filter((s) => s.type === "paragraph")
    .reduce((sum, s) => sum + (s.content?.[locale]?.length ?? 0), 0);
  return Math.max(1, Math.ceil(chars / 1200));
}

export function JournalArticle({ entry, locale }: JournalArticleProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const total = entry.visualNotebook.length;

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + total) % total)),
    [total]
  );
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % total)),
    [total]
  );

  const readingTime = calcReadingTime(entry, locale);
  const minutesLabel = locale === "es" ? "min de lectura" : "min read";
  const tourHref = `/${locale}/viajes/${entry.tourSlug}`;
  const tourLinkLabel = locale === "es" ? "Ver el viaje completo" : "See the full journey";
  const tourArrow = locale === "es"
    ? `${entry.title[locale]} →`
    : `${entry.title[locale]} →`;

  return (
    <>
      {/* Hero */}
      <ArticleHero entry={entry} locale={locale} />

      {/* Meta bar */}
      <div className="bg-negro">
        <div
          className="max-w-screen-xl mx-auto px-6 lg:px-12"
          style={{ borderTop: "1px solid var(--terracota)" }}
        >
          <div className="py-5 flex items-center justify-between">
            <span
              className="font-sans uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--terracota)" }}
            >
              {entry.category[locale]}
            </span>
            <span
              className="font-sans font-light text-marfil/40"
              style={{ fontSize: "13px" }}
            >
              {readingTime} {minutesLabel}
            </span>
          </div>
          <div className="w-full h-px bg-marfil/20" />
        </div>
      </div>

      {/* Article body */}
      <ArticleBody entry={entry} locale={locale} />

      {/* Visual notebook */}
      <VisualNotebook
        images={entry.visualNotebook}
        locale={locale}
        onImageClick={openLightbox}
      />

      {/* Tour CTA */}
      <section className="bg-negro pb-24 px-6 lg:px-12">
        <div
          className="max-w-screen-xl mx-auto pt-12"
          style={{ borderTop: "1px solid var(--terracota)" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display font-light text-marfil mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {tourLinkLabel}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              href={tourHref}
              className="font-sans text-sm tracking-wide hover:opacity-70 transition-opacity duration-200"
              style={{ color: "var(--terracota)", textDecoration: "none" }}
            >
              {tourArrow}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <JournalLightbox
        images={entry.visualNotebook}
        activeIndex={lightboxIndex}
        locale={locale}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  );
}

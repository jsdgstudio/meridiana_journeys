"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { JournalEntry, JournalSection } from "@/types/journal";
import type { Locale } from "@/types/tour";
import { fadeInUp, viewport } from "@/lib/animations";

interface ArticleBodyProps {
  entry: JournalEntry;
  locale: Locale;
}

// Shared column constraint for text elements
const columnClass = "max-w-[680px] mx-auto px-6 lg:px-0";

function SectionParagraph({ section, locale }: { section: JournalSection; locale: Locale }) {
  return (
    <motion.p
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`${columnClass} font-sans font-light text-marfil/90`}
      style={{ fontSize: "18px", lineHeight: 1.8 }}
    >
      {section.content![locale]}
    </motion.p>
  );
}

function SectionHeading({ section, locale }: { section: JournalSection; locale: Locale }) {
  return (
    <motion.h2
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`${columnClass} font-display font-light text-marfil`}
      style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
    >
      {section.content![locale]}
    </motion.h2>
  );
}

function SectionPullquote({ section, locale }: { section: JournalSection; locale: Locale }) {
  return (
    <motion.blockquote
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`${columnClass} font-display font-light italic text-marfil`}
      style={{
        fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
        borderLeft: "2px solid var(--terracota)",
        paddingLeft: "2rem",
        lineHeight: 1.45,
      }}
    >
      {section.content![locale]}
    </motion.blockquote>
  );
}

function SectionImageBreak({
  section,
  entry,
  locale,
}: {
  section: JournalSection;
  entry: JournalEntry;
  locale: Locale;
}) {
  const img = entry.visualNotebook[section.imageIndex!];
  if (!img) return null;

  const caption = section.imageCaption?.[locale] ?? img.caption[locale];

  return (
    <motion.figure
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="w-full max-w-[900px] mx-auto px-6 lg:px-0"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt[locale]}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>
      {caption && (
        <figcaption
          className="mt-3 text-right font-sans font-light italic"
          style={{ fontSize: "13px", color: "var(--tumbaga)" }}
        >
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

export function ArticleBody({ entry, locale }: ArticleBodyProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div
      className="bg-negro py-16 lg:py-24 flex flex-col"
      style={{ gap: "2.5rem" }}
    >
      {entry.body.map((section, i) => {
        const key = `${section.type}-${i}`;
        const props = { section, locale, entry };

        if (shouldReduce) {
          // Render without animation wrappers
          switch (section.type) {
            case "paragraph":
              return (
                <p
                  key={key}
                  className={`${columnClass} font-sans font-light text-marfil/90`}
                  style={{ fontSize: "18px", lineHeight: 1.8 }}
                >
                  {section.content![locale]}
                </p>
              );
            case "heading":
              return (
                <h2
                  key={key}
                  className={`${columnClass} font-display font-light text-marfil`}
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
                >
                  {section.content![locale]}
                </h2>
              );
            case "pullquote":
              return (
                <blockquote
                  key={key}
                  className={`${columnClass} font-display font-light italic text-marfil`}
                  style={{
                    fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                    borderLeft: "2px solid var(--terracota)",
                    paddingLeft: "2rem",
                    lineHeight: 1.45,
                  }}
                >
                  {section.content![locale]}
                </blockquote>
              );
            case "imagebreak": {
              const img = entry.visualNotebook[section.imageIndex!];
              if (!img) return null;
              const caption = section.imageCaption?.[locale] ?? img.caption[locale];
              return (
                <figure key={key} className="w-full max-w-[900px] mx-auto px-6 lg:px-0">
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image src={img.src} alt={img.alt[locale]} fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
                  </div>
                  {caption && (
                    <figcaption className="mt-3 text-right font-sans font-light italic" style={{ fontSize: "13px", color: "var(--tumbaga)" }}>
                      {caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
          }
        }

        switch (section.type) {
          case "paragraph":
            return <SectionParagraph key={key} {...props} />;
          case "heading":
            return <SectionHeading key={key} {...props} />;
          case "pullquote":
            return <SectionPullquote key={key} {...props} />;
          case "imagebreak":
            return <SectionImageBreak key={key} {...props} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

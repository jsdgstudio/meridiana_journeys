"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { JournalEntry, JournalSection } from "@/types/journal";
import type { Locale } from "@/types/tour";

export type CardSize = "large" | "medium" | "small";

interface JournalCardProps {
  entry: JournalEntry;
  locale: Locale;
  size: CardSize;
  entryNumber: number;
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function readingTime(body: JournalSection[], locale: Locale): number {
  const total = body
    .filter(s => s.type === "paragraph" && s.content)
    .reduce((sum, s) => sum + (s.content![locale].length), 0);
  return Math.max(1, Math.ceil(total / 1200));
}

const aspectRatio: Record<CardSize, string> = {
  large: "aspect-[3/4] md:aspect-[16/9]",
  medium: "aspect-[4/3]",
  small: "aspect-[4/3] md:aspect-square",
};

const titleSize: Record<CardSize, string> = {
  large: "text-3xl lg:text-4xl",
  medium: "text-2xl",
  small: "text-xl",
};

const quoteSize: Record<CardSize, string> = {
  large: "text-base",
  medium: "text-sm",
  small: "text-xs",
};

export function JournalCard({ entry, locale, size, entryNumber }: JournalCardProps) {
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const href = `/${locale}/journal/${entry.slug}`;
  const numeral = ROMAN[(entryNumber - 1) % ROMAN.length];
  const mins = readingTime(entry.body, locale);

  return (
    <Link
      href={href}
      className="block relative overflow-hidden bg-negro h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image layer — aspect-ratio on mobile/tablet, h-full on desktop grid rows */}
      <div className={`relative overflow-hidden ${aspectRatio[size]} lg:h-full lg:aspect-auto`}>
        <motion.div
          className="absolute inset-0"
          animate={shouldReduce ? undefined : { scale: hovered ? 1.015 : 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={entry.heroImage.src}
            alt={entry.heroImage.alt[locale]}
            fill
            className="object-cover"
            sizes={
              size === "large"
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
          />
        </motion.div>

        {/* Bottom gradient — text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--negro) 40%, transparent 100%)",
          }}
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
          {/* Roman numeral — literary essay marker */}
          <span
            className="block font-sans mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.18em", color: "rgba(231,213,188,0.22)" }}
          >
            {numeral}.
          </span>

          {/* Category + reading time */}
          <span className="label text-[10px] tracking-widest uppercase text-terracota mb-3 block">
            {entry.category[locale]}
            <span
              className="normal-case tracking-normal ml-2"
              style={{ color: "rgba(231,213,188,0.3)", letterSpacing: "0.02em" }}
            >
              · {mins} min
            </span>
          </span>

          {/* Divider */}
          <div className="w-8 h-px bg-marfil/30 mb-4" />

          {/* Title */}
          <h3
            className={`font-display font-light text-blanco leading-tight mb-3 ${titleSize[size]}`}
          >
            {entry.title[locale]}
          </h3>

          {/* Pull quote */}
          <p
            className={`font-sans font-light text-marfil/70 italic leading-snug mb-5 ${quoteSize[size]} ${
              size === "small" ? "line-clamp-2" : "line-clamp-3"
            }`}
          >
            {entry.pullQuote[locale]}
          </p>

          {/* CTA link — arrow slides on card hover */}
          <div className="flex items-center gap-1 overflow-hidden">
            <span className="font-sans text-xs tracking-wide text-terracota">
              {locale === "es" ? "Leer ensayo" : "Read essay"}
            </span>
            <motion.span
              className="text-terracota text-xs"
              animate={shouldReduce ? undefined : { x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </Link>
  );
}

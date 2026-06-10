"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { JournalEntry } from "@/types/journal";
import type { Locale } from "@/types/tour";

interface ArticleHeroProps {
  entry: JournalEntry;
  locale: Locale;
}

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export function ArticleHero({ entry, locale }: ArticleHeroProps) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const backLabel = locale === "es" ? "← Journal" : "← Journal";

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-end overflow-hidden"
    >
      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={entry.heroImage.src}
          alt={entry.heroImage.alt[locale]}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--negro) 40%, rgba(15,19,14,0.55) 70%, rgba(15,19,14,0.3) 100%)",
        }}
      />

      {/* Back link */}
      <div className="absolute top-24 left-0 right-0 z-20">
        <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16">
          <Link
            href={`/${locale}/journal`}
            className="font-sans text-xs tracking-wider uppercase transition-opacity duration-200 hover:opacity-100"
            style={{ color: "rgba(231,213,188,0.55)" }}
          >
            {backLabel}
          </Link>
        </div>
      </div>

      {/* Text */}
      <div className="relative z-20 mx-auto max-w-screen-xl w-full px-6 md:px-10 lg:px-16 pb-20">
        {/* Category */}
        <motion.span
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="block font-sans uppercase mb-5"
          style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--terracota)" }}
        >
          {entry.category[locale]}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="font-display font-light text-marfil max-w-3xl"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          {entry.title[locale]}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
          className="font-display font-light italic mt-5 max-w-xl"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)", color: "var(--marfil)" }}
        >
          {entry.subtitle[locale]}
        </motion.p>
      </div>

      {/* Scroll indicator — fades out on scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{ opacity: shouldReduce ? undefined : indicatorOpacity }}
      >
        <div className="relative w-px h-10 overflow-hidden">
          <div className="absolute inset-0 bg-marfil/15" />
          <motion.div
            className="absolute inset-x-0"
            style={{
              height: "200%",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(231,213,188,0.5) 50%, transparent 100%)",
            }}
            animate={shouldReduce ? undefined : { y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

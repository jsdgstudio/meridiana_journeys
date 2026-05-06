"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { HeroContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface HeroProps {
  content: HeroContent;
  locale: Locale;
}

export function Hero({ content, locale }: HeroProps) {
  const headline = content.headline[locale];
  const subheadline = content.subheadline[locale];
  const alt = content.media.alt[locale];

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.media.src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — bottom-heavy for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-negro/40 via-negro/50 to-negro/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="label text-xs tracking-widest uppercase text-tumbaga mb-6"
        >
          Meridiana
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-4xl lg:text-5xl font-light text-marfil leading-tight tracking-tight mb-8"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-sans text-base lg:text-md text-marfil/70 max-w-xl mx-auto leading-relaxed"
        >
          {subheadline}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-marfil/40"
        />
        <div className="w-1 h-1 rounded-full bg-marfil/40" />
      </motion.div>
    </section>
  );
}

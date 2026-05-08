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
    <section className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden">
      {/* Background media */}
      <div className="absolute inset-0 z-0">
        {/* Fallback image — visible antes de que el video cargue */}
        <Image
          src={content.media.src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Video de fondo en loop */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero-home.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay — top-to-bottom darkening */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,19,14,0.45) 0%, rgba(15,19,14,0.25) 35%, rgba(15,19,14,0.55) 70%, rgba(15,19,14,0.88) 100%)",
          }}
        />
      </div>

      {/* Content — left-aligned, anchored to bottom */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 lg:px-20 pb-24 lg:pb-32 pt-32 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 65, damping: 20, delay: 0.15 }}
          className="font-display text-3xl lg:text-4xl xl:text-5xl font-light text-marfil leading-tight tracking-tight mb-6"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 65, damping: 20, delay: 0.45 }}
          className="font-display italic text-xl font-light text-marfil/80 max-w-[28ch]"
        >
          {subheadline}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 20, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="relative w-px h-16 overflow-hidden">
          {/* Track */}
          <div className="absolute inset-0 bg-marfil/12" />
          {/* Gradient sweep — 200% tall, travels top→bottom, fades at both ends */}
          <motion.div
            className="absolute inset-x-0"
            style={{
              height: "200%",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(231,213,188,0.5) 50%, transparent 100%)",
            }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

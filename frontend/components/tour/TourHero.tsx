"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Tour, Locale } from "@/types/tour";
import { TOUR_IDENTITY, DEFAULT_IDENTITY } from "@/lib/tour-identity";

interface TourHeroProps {
  tour: Tour;
  locale: Locale;
}

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

const categoryLabel: Record<string, { es: string; en: string }> = {
  cultural:    { es: "Cultural",    en: "Cultural"    },
  nature:      { es: "Naturaleza",  en: "Nature"      },
  culinary:    { es: "Gastronomía", en: "Culinary"    },
  historical:  { es: "Histórico",   en: "Historical"  },
  expedition:  { es: "Expedición",  en: "Expedition"  },
};

export function TourHero({ tour, locale }: TourHeroProps) {
  const identity = TOUR_IDENTITY[tour.id] ?? DEFAULT_IDENTITY;
  const backLabel = locale === "es" ? "← Viajes" : "← Journeys";
  const scrollLabel = locale === "es" ? "Desplazar" : "Scroll";

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-end overflow-hidden">
      {/* Background: static image fallback → video loop */}
      <div className="absolute inset-0 z-0">
        <Image
          src={tour.hero.image}
          alt={tour.hero.alt[locale]}
          fill
          className="object-cover"
          style={{ objectPosition: tour.hero.objectPosition ?? "center 40%" }}
          priority
          sizes="100vw"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={tour.hero.video ?? "/video/tour-hero.mp4"} type="video/mp4" />
        </video>
      </div>

      {/* Per-tour overlay gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: identity.heroGradient }}
      />

      {/* Extra bottom darkening for legibility */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,19,14,0.42) 0%, rgba(15,19,14,0.18) 30%, rgba(15,19,14,0.52) 70%, rgba(15,19,14,0.90) 100%)",
        }}
      />

      {/* Back link */}
      <div className="absolute top-24 left-0 right-0 z-20">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
          <Link
            href={`/${locale}/viajes`}
            className="font-sans text-xs tracking-wider uppercase transition-colors duration-200"
            style={{ color: "rgba(231,213,188,0.55)" }}
          >
            {backLabel}
          </Link>
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-20 mx-auto max-w-screen-2xl w-full px-6 md:px-10 lg:px-16 pb-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="flex items-center gap-4 mb-5"
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "20px",
              height: "1px",
              background: identity.accent,
              flexShrink: 0,
            }}
          />
          <span
            className="font-sans uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.28em", color: identity.accent }}
          >
            {categoryLabel[tour.category]?.[locale] ?? tour.category}
          </span>
          <span style={{ color: "rgba(231,213,188,0.25)", fontSize: "10px" }}>·</span>
          <span
            className="font-sans uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: "rgba(231,213,188,0.50)" }}
          >
            {tour.duration[locale]}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          className="font-display font-light text-marfil max-w-3xl"
          style={{
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
          }}
        >
          {tour.title[locale]}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="font-display font-light italic mt-4 max-w-xl"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", color: "var(--marfil)" }}
        >
          {tour.subtitle[locale]}
        </motion.p>

        {/* Metadata line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
          className="flex items-center gap-5 mt-8"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 1.0, ease: EASE }}
            className="origin-left"
            style={{ width: "32px", height: "1px", background: identity.accent }}
          />
          <span
            className="font-sans"
            style={{ fontSize: "11px", letterSpacing: "0.18em", color: "rgba(231,213,188,0.45)" }}
          >
            {tour.groupSize[locale]}
          </span>
          <span style={{ color: "rgba(231,213,188,0.20)", fontSize: "10px" }}>·</span>
          <span
            className="font-sans"
            style={{ fontSize: "11px", letterSpacing: "0.18em", color: "rgba(231,213,188,0.45)" }}
          >
            {tour.location.region}
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span
          className="font-sans uppercase"
          style={{ fontSize: "9px", letterSpacing: "0.32em", color: "rgba(231,213,188,0.35)" }}
        >
          {scrollLabel}
        </span>
        <div className="relative w-px h-10 overflow-hidden">
          <div className="absolute inset-0 bg-marfil/15" />
          <motion.div
            className="absolute inset-x-0"
            style={{
              height: "200%",
              background: "linear-gradient(to bottom, transparent 0%, rgba(231,213,188,0.5) 50%, transparent 100%)",
            }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

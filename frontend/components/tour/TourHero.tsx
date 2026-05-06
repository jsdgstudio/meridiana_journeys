"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Tour, Locale } from "@/types/tour";

interface TourHeroProps {
  tour: Tour;
  locale: Locale;
}

const categoryLabel: Record<string, { es: string; en: string }> = {
  cultural:    { es: "Cultural",    en: "Cultural"    },
  nature:      { es: "Naturaleza",  en: "Nature"      },
  culinary:    { es: "Gastronomía", en: "Culinary"    },
  historical:  { es: "Histórico",   en: "Historical"  },
  expedition:  { es: "Expedición",  en: "Expedition"  },
};

export function TourHero({ tour, locale }: TourHeroProps) {
  const backLabel = locale === "es" ? "← Viajes" : "← Journeys";

  return (
    <section className="relative w-full h-[70vh] min-h-[520px] flex flex-col justify-end overflow-hidden">
      {/* Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={tour.hero.image}
          alt={tour.hero.alt[locale]}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/85 via-negro/40 to-negro/20" />
      </div>

      {/* Back link */}
      <div className="absolute top-24 left-0 right-0 z-10">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
          <Link
            href={`/${locale}/viajes`}
            className="font-sans text-xs tracking-wider text-marfil/60 hover:text-marfil transition-colors duration-200 uppercase"
          >
            {backLabel}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-screen-2xl w-full px-6 md:px-10 lg:px-16 pb-14">
        {/* Category + Duration */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-4 mb-5"
        >
          <span className="label text-xs tracking-widest uppercase text-tumbaga">
            {categoryLabel[tour.category]?.[locale] ?? tour.category}
          </span>
          <span className="text-marfil/30 text-xs">·</span>
          <span className="label text-xs tracking-widest uppercase text-marfil/50">
            {tour.duration[locale]}
          </span>
          <span className="text-marfil/30 text-xs">·</span>
          <span className="label text-xs tracking-widest uppercase text-marfil/50">
            {tour.groupSize[locale]}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-4xl lg:text-5xl font-light text-marfil leading-tight tracking-tight mb-3 max-w-3xl"
        >
          {tour.title[locale]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-xl lg:text-2xl italic font-light text-marfil/60"
        >
          {tour.subtitle[locale]}
        </motion.p>
      </div>
    </section>
  );
}

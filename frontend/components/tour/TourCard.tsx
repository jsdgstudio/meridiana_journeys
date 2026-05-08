"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Tour, Locale } from "@/types/tour";

interface TourCardProps {
  tour: Tour;
  locale: Locale;
  featured?: boolean;
}

const tierColors: Record<Tour["tier"], string> = {
  entry: "text-tumbaga",
  core: "text-terracota",
  premium: "text-marfil",
};

const tierBg: Record<Tour["tier"], string> = {
  entry: "bg-negro",
  core: "bg-verde",
  premium: "bg-negro",
};

const tierLabel: Record<Tour["tier"], { es: string; en: string }> = {
  entry: { es: "Entrada", en: "Entry" },
  core: { es: "Core", en: "Core" },
  premium: { es: "Premium", en: "Premium" },
};

export function TourCard({ tour, locale, featured = false }: TourCardProps) {
  const href = `/${locale}/viajes/${tour.id}`;

  return (
    <motion.article
      whileHover={{ y: featured ? -6 : -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="group"
    >
      <Link href={href} className="block">
        {/* Image */}
        <div
          className={`relative overflow-hidden bg-verde mb-5 ${
            featured ? "aspect-[3/4]" : "aspect-[4/3]"
          }`}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 120, damping: 26 }}
          >
            <Image
              src={tour.hero.image}
              alt={tour.hero.alt[locale]}
              fill
              className="object-cover"
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 60vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
            />
          </motion.div>

          {/* Tier badge */}
          <div
            className={`absolute top-0 left-0 px-3 py-1.5 ${tierBg[tour.tier]}`}
          >
            <span
              className={`label text-xs tracking-widest uppercase ${tierColors[tour.tier]}`}
            >
              {tierLabel[tour.tier][locale]}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-negro/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Metadata row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="label text-xs tracking-widest uppercase text-negro/40">
            {tour.duration[locale]}
          </span>
          <span className="text-negro/20 text-xs">·</span>
          <span className="label text-xs tracking-widest uppercase text-negro/40">
            {tour.groupSize[locale]}
          </span>
        </div>

        {/* Title + subtitle */}
        <h3
          className={`font-display font-normal text-negro leading-snug mb-1 group-hover:opacity-70 transition-opacity duration-200 ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
          {tour.title[locale]}
        </h3>
        <p className="font-display text-base italic text-negro/50 mb-3">
          {tour.subtitle[locale]}
        </p>

        {/* Route pills */}
        {tour.route && tour.route.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {tour.route.map((city, i) => (
              <span key={city} className="flex items-center gap-1.5">
                <span className="font-sans text-xs text-negro/50 border border-negro/15 px-2 py-0.5">
                  {city}
                </span>
                {i < tour.route!.length - 1 && (
                  <span className="text-tumbaga text-xs">→</span>
                )}
              </span>
            ))}
          </div>
        )}

        {/* Short narrative */}
        <p
          className={`font-sans text-sm leading-relaxed text-negro/55 mb-4 ${
            featured ? "" : "line-clamp-3"
          }`}
        >
          {tour.narrative.short[locale]}
        </p>

        {/* Price */}
        <p className="font-sans text-sm text-negro/40">
          {locale === "es" ? "Desde" : "From"}{" "}
          <span className="text-negro/70 font-medium">
            ${tour.price.amount.toLocaleString('en-US')} USD
          </span>
          {tour.price.note && (
            <span className="text-xs ml-1">/ {tour.price.note[locale]}</span>
          )}
        </p>
      </Link>
    </motion.article>
  );
}

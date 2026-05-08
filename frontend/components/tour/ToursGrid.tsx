"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TourCard } from "./TourCard";
import type { Tour, Locale, TourTier } from "@/types/tour";

type FilterTier = "all" | TourTier;

interface ToursGridProps {
  tours: Tour[];
  locale: Locale;
  ui: {
    filterAll: string;
    filterEntry: string;
    filterCore: string;
    filterPremium: string;
  };
}

const FILTERS: { key: FilterTier; labelKey: keyof ToursGridProps["ui"] }[] = [
  { key: "all", labelKey: "filterAll" },
  { key: "entry", labelKey: "filterEntry" },
  { key: "core", labelKey: "filterCore" },
  { key: "premium", labelKey: "filterPremium" },
];

export function ToursGrid({ tours, locale, ui }: ToursGridProps) {
  const [active, setActive] = useState<FilterTier>("all");

  const filtered =
    active === "all" ? tours : tours.filter((t) => t.tier === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {FILTERS.map(({ key, labelKey }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              aria-pressed={isActive}
              className={[
                "label text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200",
                isActive
                  ? "bg-negro text-marfil border-negro"
                  : "bg-transparent text-negro/50 border-negro/20 hover:border-negro/50 hover:text-negro",
              ].join(" ")}
            >
              {ui[labelKey]}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((tour, i) => (
            <motion.div
              key={tour.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <TourCard tour={tour} locale={locale} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-sans text-sm text-negro/40 py-16 text-center"
        >
          {locale === "es" ? "No hay viajes disponibles." : "No journeys available."}
        </motion.p>
      )}
    </div>
  );
}

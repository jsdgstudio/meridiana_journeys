"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { TOUR_IDENTITY, DEFAULT_IDENTITY } from "@/lib/tour-identity";
import type { Tour, Locale } from "@/types/tour";

interface TourItineraryProps {
  tour: Tour;
  locale: Locale;
}

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

const mealIcons: Record<string, string> = {
  breakfast: "☀",
  lunch: "◑",
  dinner: "☾",
};

const mealLabels: Record<string, { es: string; en: string }> = {
  breakfast: { es: "Desayuno", en: "Breakfast" },
  lunch:     { es: "Almuerzo", en: "Lunch"      },
  dinner:    { es: "Cena",     en: "Dinner"     },
};

const sectionLabels = {
  title:   { es: "Itinerario",    en: "Itinerary"     },
  day:     { es: "Día",           en: "Day"           },
  meals:   { es: "Comidas",       en: "Meals"         },
  stay:    { es: "Alojamiento",   en: "Accommodation" },
};

export function TourItinerary({ tour, locale }: TourItineraryProps) {
  const [openDay, setOpenDay] = useState<number | null>(0);
  const identity = TOUR_IDENTITY[tour.id] ?? DEFAULT_IDENTITY;

  return (
    <SectionWrapper theme="page">
      <Container>
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-px bg-tumbaga" />
          <Heading as="h2" className="text-negro">
            {sectionLabels.title[locale]}
          </Heading>
        </div>

        <div
          className="space-y-0"
          style={{ borderTop: "1px solid rgba(15,19,14,0.08)" }}
        >
          {tour.itinerary.map((day, i) => {
            const isOpen = openDay === i;

            return (
              <div key={day.day}>
                {/* Accent separator between days */}
                {i > 0 && (
                  <div
                    className="h-px w-full"
                    style={{
                      background: `linear-gradient(to right, ${identity.accent}, transparent 80%)`,
                      opacity: 0.35,
                    }}
                  />
                )}

                {/* Header */}
                <button
                  onClick={() => setOpenDay(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  style={{ position: "relative" }}
                >
                  {/* Ghost day number — decorative background */}
                  <span
                    aria-hidden="true"
                    className="absolute right-10 top-1/2 -translate-y-1/2 font-display font-light select-none pointer-events-none"
                    style={{
                      fontSize: "clamp(5rem, 12vw, 9rem)",
                      lineHeight: 1,
                      color: "rgba(15,19,14,0.04)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {String(day.day).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-6 relative z-10">
                    <span className="font-display text-3xl font-light leading-none select-none w-10 text-right flex-shrink-0" style={{ color: "rgba(15,19,14,0.15)" }}>
                      {String(day.day).padStart(2, "0")}
                    </span>
                    <div>
                      <p
                        className="font-sans uppercase mb-1"
                        style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(15,19,14,0.35)" }}
                      >
                        {sectionLabels.day[locale]} {day.day}
                      </p>
                      <h3 className="font-display text-2xl font-normal text-negro group-hover:opacity-70 transition-opacity duration-200">
                        {day.title[locale]}
                      </h3>
                    </div>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="text-negro/30 text-xl flex-shrink-0 leading-none relative z-10"
                  >
                    +
                  </motion.span>
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pl-16 pb-8 space-y-6">
                        <p className="font-sans text-base leading-relaxed" style={{ color: "rgba(15,19,14,0.72)" }}>
                          {day.description[locale]}
                        </p>

                        {day.highlights.length > 0 && (
                          <ul className="space-y-2.5">
                            {day.highlights.map((h, j) => (
                              <li key={j} className="flex items-start gap-3">
                                <span className="text-sm mt-0.5 flex-shrink-0" style={{ color: identity.accent }}>→</span>
                                <span className="font-sans text-sm leading-relaxed" style={{ color: "rgba(15,19,14,0.72)" }}>
                                  {h[locale]}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="flex flex-wrap gap-8 pt-2">
                          {day.meals && day.meals.length > 0 && (
                            <div className="space-y-2">
                              <p className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(15,19,14,0.45)" }}>
                                {sectionLabels.meals[locale]}
                              </p>
                              <div className="flex gap-2.5 flex-wrap">
                                {day.meals.map((m) => (
                                  <span
                                    key={m}
                                    className="font-sans text-sm border px-3 py-1"
                                    style={{ color: "rgba(15,19,14,0.65)", borderColor: "rgba(15,19,14,0.18)" }}
                                  >
                                    {mealIcons[m]} {mealLabels[m]?.[locale]}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {day.accommodation && (
                            <div className="space-y-2">
                              <p className="font-sans uppercase" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(15,19,14,0.45)" }}>
                                {sectionLabels.stay[locale]}
                              </p>
                              <p className="font-sans text-sm" style={{ color: "rgba(15,19,14,0.65)" }}>
                                {day.accommodation[locale]}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}

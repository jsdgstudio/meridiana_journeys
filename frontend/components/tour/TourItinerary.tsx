"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { Tour, Locale } from "@/types/tour";

interface TourItineraryProps {
  tour: Tour;
  locale: Locale;
}

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
  title:   { es: "Itinerario",       en: "Itinerary"        },
  day:     { es: "Día",              en: "Day"              },
  meals:   { es: "Comidas",          en: "Meals"            },
  stay:    { es: "Alojamiento",      en: "Accommodation"    },
};

export function TourItinerary({ tour, locale }: TourItineraryProps) {
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <SectionWrapper theme="page">
      <Container>
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-px bg-tumbaga" />
          <Heading as="h2" className="text-negro">
            {sectionLabels.title[locale]}
          </Heading>
        </div>

        <div className="space-y-0 border-t border-negro/10">
          {tour.itinerary.map((day, i) => {
            const isOpen = openDay === i;

            return (
              <div key={day.day} className="border-b border-negro/10">
                {/* Header — always visible */}
                <button
                  onClick={() => setOpenDay(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-display text-3xl font-light text-negro/15 leading-none select-none w-10 text-right flex-shrink-0">
                      {String(day.day).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="label text-xs tracking-widest uppercase text-negro/35 mb-1">
                        {sectionLabels.day[locale]} {day.day}
                      </p>
                      <h3 className="font-display text-xl font-normal text-negro group-hover:opacity-70 transition-opacity duration-200">
                        {day.title[locale]}
                      </h3>
                    </div>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-negro/30 text-xl flex-shrink-0 leading-none"
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
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-16 pb-8 space-y-6">
                        {/* Description */}
                        <p className="font-sans text-sm leading-relaxed text-negro/65">
                          {day.description[locale]}
                        </p>

                        {/* Highlights */}
                        {day.highlights.length > 0 && (
                          <ul className="space-y-2">
                            {day.highlights.map((h, j) => (
                              <li key={j} className="flex items-start gap-3">
                                <span className="text-tumbaga text-xs mt-1 flex-shrink-0">→</span>
                                <span className="font-sans text-sm text-negro/60">
                                  {h[locale]}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Meals + accommodation row */}
                        <div className="flex flex-wrap gap-6 pt-2">
                          {day.meals && day.meals.length > 0 && (
                            <div className="space-y-1">
                              <p className="label text-xs tracking-widest uppercase text-negro/30">
                                {sectionLabels.meals[locale]}
                              </p>
                              <div className="flex gap-2">
                                {day.meals.map((m) => (
                                  <span
                                    key={m}
                                    title={mealLabels[m]?.[locale]}
                                    className="font-sans text-xs text-negro/50 border border-negro/15 px-2 py-0.5"
                                  >
                                    {mealIcons[m]} {mealLabels[m]?.[locale]}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {day.accommodation && (
                            <div className="space-y-1">
                              <p className="label text-xs tracking-widest uppercase text-negro/30">
                                {sectionLabels.stay[locale]}
                              </p>
                              <p className="font-sans text-xs text-negro/50">
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

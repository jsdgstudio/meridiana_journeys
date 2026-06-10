"use client";

import { motion, useReducedMotion } from "framer-motion";
import { JournalCard, type CardSize } from "./JournalCard";
import type { JournalEntry } from "@/types/journal";
import type { Locale } from "@/types/tour";
import { staggerContainerSlow, fadeInUp, viewport } from "@/lib/animations";

interface JournalGridProps {
  entries: JournalEntry[];
  locale: Locale;
}

// 4-column desktop grid: row1 = 3+1, row2 = 1+2+1 — no orphans
const LAYOUT: { colSpan: string; size: CardSize }[] = [
  { colSpan: "md:col-span-2 lg:col-span-3", size: "large" },   // classic-bogota — dominant
  { colSpan: "md:col-span-1 lg:col-span-1", size: "medium" },  // classic-colombia
  { colSpan: "md:col-span-1 lg:col-span-1", size: "small" },   // en-busqueda-del-dorado
  { colSpan: "md:col-span-2 lg:col-span-2", size: "medium" },  // macondo — wide in row 2
  { colSpan: "md:col-span-2 lg:col-span-1", size: "small" },   // wild-colombia
];

export function JournalGrid({ entries, locale }: JournalGridProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduce ? undefined : staggerContainerSlow}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 lg:[grid-template-rows:55vh_38vh]"
    >
      {entries.map((entry, i) => {
        const layout = LAYOUT[i] ?? { colSpan: "lg:col-span-1", size: "medium" as CardSize };

        return (
          <motion.div
            key={entry.slug}
            variants={shouldReduce ? undefined : fadeInUp}
            className={`${layout.colSpan} lg:h-full`}
          >
            <JournalCard entry={entry} locale={locale} size={layout.size} entryNumber={i + 1} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

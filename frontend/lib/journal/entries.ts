import type { JournalEntry } from "@/types/journal";

import classicBogota from "@/content/journal/classic-bogota.json";
import classicColombia from "@/content/journal/classic-colombia.json";
import enBusquedaDelDorado from "@/content/journal/en-busqueda-del-dorado.json";
import macondoRealismoMagico from "@/content/journal/macondo-realismo-magico.json";
import wildColombia from "@/content/journal/wild-colombia.json";

// Fixed editorial order — not alphabetical, not chronological
const ALL_ENTRIES: JournalEntry[] = [
  classicBogota,
  classicColombia,
  enBusquedaDelDorado,
  macondoRealismoMagico,
  wildColombia,
] as JournalEntry[];

export function getJournalEntries(): JournalEntry[] {
  return ALL_ENTRIES;
}

export function getJournalEntry(slug: string): JournalEntry | undefined {
  return ALL_ENTRIES.find((e) => e.slug === slug);
}

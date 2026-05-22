import type { Tour, Locale } from "@/types/tour";

import classicBogota from "@/content/tours/classic-bogota.json";
import classicColombia from "@/content/tours/classic-colombia.json";
import dorado from "@/content/tours/en-busqueda-del-dorado.json";
import macondo from "@/content/tours/macondo-realismo-magico.json";
import wildColombia from "@/content/tours/wild-colombia.json";

const ALL_TOURS: Tour[] = [
  classicBogota,
  classicColombia,
  dorado,
  macondo,
  wildColombia,
] as Tour[];

export function getAllTours(): Tour[] {
  return ALL_TOURS.filter((t) => t.status === "published");
}

export function getTourBySlug(slug: string): Tour | undefined {
  return ALL_TOURS.find((t) => t.id === slug);
}

export function getToursByIds(ids: string[]): Tour[] {
  return ids
    .map((id) => ALL_TOURS.find((t) => t.id === id))
    .filter((t): t is Tour => t !== undefined);
}

export function getToursByTier(tier: Tour["tier"]): Tour[] {
  return getAllTours().filter((t) => t.tier === tier);
}

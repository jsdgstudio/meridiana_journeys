export const TOUR_IDENTITY: Record<string, {
  accent: string;
  heroGradient: string;
  sectionTint: string;
  narrativeTheme: "page" | "light" | "dark";
}> = {
  "classic-bogota": {
    accent: "var(--terracota)",
    heroGradient: "linear-gradient(to top, rgba(12,6,3,0.92) 0%, rgba(80,30,10,0.38) 50%, rgba(0,0,0,0.18) 100%)",
    sectionTint: "rgba(204,117,74,0.04)",
    narrativeTheme: "page",
  },
  "classic-colombia": {
    accent: "var(--tumbaga)",
    heroGradient: "linear-gradient(to top, rgba(5,12,8,0.94) 0%, rgba(15,40,24,0.42) 50%, rgba(0,0,0,0.15) 100%)",
    sectionTint: "rgba(26,46,36,0.05)",
    narrativeTheme: "page",
  },
  "en-busqueda-del-dorado": {
    accent: "var(--tumbaga)",
    heroGradient: "linear-gradient(to top, rgba(8,5,2,0.96) 0%, rgba(60,44,10,0.50) 50%, rgba(0,0,0,0.20) 100%)",
    sectionTint: "rgba(154,122,58,0.06)",
    narrativeTheme: "page",
  },
  "macondo-realismo-magico": {
    accent: "var(--terracota)",
    heroGradient: "linear-gradient(to top, rgba(12,5,2,0.92) 0%, rgba(90,40,15,0.40) 50%, rgba(0,0,0,0.16) 100%)",
    sectionTint: "rgba(204,117,74,0.04)",
    narrativeTheme: "page",
  },
  "wild-colombia": {
    accent: "var(--verde)",
    heroGradient: "linear-gradient(to top, rgba(3,8,4,0.97) 0%, rgba(8,24,12,0.55) 50%, rgba(0,0,0,0.20) 100%)",
    sectionTint: "rgba(15,19,14,0.06)",
    narrativeTheme: "page",
  },
};

export const DEFAULT_IDENTITY = TOUR_IDENTITY["classic-bogota"];

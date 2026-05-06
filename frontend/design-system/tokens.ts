export const colors = {
  negro: "#0F130E",
  verde: "#1A2E24",
  terracota: "#CC754A",
  tumbaga: "#9A7A3A",
  marfil: "#E7D5BC",
  blanco: "#F8F4EE",

  negro80: "rgba(15, 19, 14, 0.80)",
  negro60: "rgba(15, 19, 14, 0.60)",
  negro40: "rgba(15, 19, 14, 0.40)",
  negro20: "rgba(15, 19, 14, 0.20)",

  marfil80: "rgba(231, 213, 188, 0.80)",
  marfil40: "rgba(231, 213, 188, 0.40)",
  marfil20: "rgba(231, 213, 188, 0.20)",

  tumbaga80: "rgba(154, 122, 58, 0.80)",
  tumbaga40: "rgba(154, 122, 58, 0.40)",

  bgPrimary: "#0F130E",
  bgSecondary: "#1A2E24",
  bgLight: "#E7D5BC",
  bgPage: "#F8F4EE",
  bgOverlay: "rgba(15, 19, 14, 0.65)",

  fgOnDark: "#E7D5BC",
  fgOnDarkMuted: "rgba(231, 213, 188, 0.65)",
  fgOnLight: "#0F130E",
  fgOnLightMuted: "rgba(15, 19, 14, 0.55)",

  accentPrimary: "#9A7A3A",
  accentSecondary: "#CC754A",

  borderLight: "rgba(231, 213, 188, 0.30)",
  borderDark: "rgba(15, 19, 14, 0.20)",
  borderAccent: "rgba(154, 122, 58, 0.45)",
} as const;

export const typography = {
  fontDisplay: "'Cormorant Garamond', 'Palatino Linotype', Georgia, serif",
  fontSans: "'General Sans', system-ui, sans-serif",

  textXs: "0.75rem",
  textSm: "0.875rem",
  textBase: "1rem",
  textMd: "1.125rem",
  textLg: "1.5rem",
  textXl: "2rem",
  text2xl: "2.5rem",
  text3xl: "3.5rem",
  text4xl: "5rem",
  text5xl: "7.5rem",

  weightLight: 300,
  weightRegular: 400,
  weightMedium: 500,
  weightBold: 700,

  leadingTight: 1.1,
  leadingSnug: 1.25,
  leadingNormal: 1.45,
  leadingRelaxed: 1.65,

  trackingTight: "-0.02em",
  trackingNormal: "0em",
  trackingWide: "0.05em",
  trackingWider: "0.12em",
  trackingWidest: "0.18em",
} as const;

export const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
  40: "160px",
} as const;

export const shadows = {
  none: "none",
  float: "0 2px 24px rgba(15, 19, 14, 0.18)",
  modal: "0 8px 48px rgba(15, 19, 14, 0.32)",
} as const;

export const easing = {
  brand: [0.25, 0.1, 0.25, 1] as const,
  out: [0.0, 0.0, 0.2, 1] as const,
  in: [0.4, 0.0, 1, 1] as const,
} as const;

export const duration = {
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  xslow: 0.9,
} as const;

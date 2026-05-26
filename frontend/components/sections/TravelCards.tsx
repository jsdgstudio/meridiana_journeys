"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { TravelCardsContent, TravelCardItem } from "@/types/content";
import type { Locale } from "@/types/tour";

// ── Meridiana isotipo SVG path ───────────────────────────────
const ISOTIPO_PATH =
  "M247.47,256.47c26.44,1.07,56.44,3.24,87.92,7.27l.66.08c2.71.35,5.44.71,8.17,1.09,4,.56,8.06,1.19,11.93,2a14.19,14.19,0,0,0,4.52.27A13.06,13.06,0,0,0,362,267a10.16,10.16,0,0,0,1.34-.4,11.35,11.35,0,0,0,1.34-.61c.22-.12.44-.25.65-.39a10.84,10.84,0,0,0,2.5-2.25,8.85,8.85,0,0,0,.57-.76c1.87-2.64,3.28-6.68,3.7-12.75q.12-1.83.12-3.9h0c0-.13,0-.25,0-.37v-.37h0c0-.7,0-1.37-.08-2-.77-13.63-6-17.84-10.65-18.8-.22-.05-.44-.09-.67-.12a11.59,11.59,0,0,0-1.3-.11c-.42,0-.83,0-1.23,0a16.12,16.12,0,0,0-2.64.39c-1.92.47-3.88.88-5.86,1.26s-4,.73-6,1.06a1024.42,1024.42,0,0,1-111.49,11.61,4.13,4.13,0,0,1-.79,0,4.07,4.07,0,0,1-3.36-5,3.9,3.9,0,0,1,2.2-2.67c4.9-2.34,10.15-4.79,15.71-7.31a825.41,825.41,0,0,1,87-33.81c3.12-1,6.25-1.95,9.35-2.69a9.6,9.6,0,0,0,6.48-4.75,10.1,10.1,0,0,0,1-4.34,19.35,19.35,0,0,0-1-6.29,38.07,38.07,0,0,0-2.19-5.46h0l-.14-.26c0-.09-.08-.18-.13-.27h0c-2.54-5-5.06-7.95-7.44-9.65a10.26,10.26,0,0,0-3.42-1.67,8.41,8.41,0,0,0-1.28-.23,8.69,8.69,0,0,0-4.86.95c-.3.15-.58.3-.84.46a11.94,11.94,0,0,0-1.37,1c-2.46,2-5.1,3.94-7.79,5.82a846.85,846.85,0,0,1-99.58,59.34,4.34,4.34,0,0,1-1.37.43,3.65,3.65,0,0,1-.66,0,4.12,4.12,0,0,1-3.48-2.37,3.92,3.92,0,0,1,.25-3.83c5.86-9.38,12.95-20.32,21.13-32.23,10.9-15.87,23.75-33.47,38.25-51.44q5.43-6.74,11.18-13.52c2.12-2.51,4.28-5,6.51-7.22.26-.26.54-.57.82-.91s.37-.48.55-.75.18-.26.27-.41A10.37,10.37,0,0,0,294,108a8.93,8.93,0,0,0,.5-1.59,8.84,8.84,0,0,0-.86-5.9c-.13-.25-.26-.5-.41-.75a16,16,0,0,0-1.69-2.34,31.89,31.89,0,0,0-7.24-6h0l-.26-.15-.25-.16h0a34.3,34.3,0,0,0-7.51-3.51l-1.05-.3a17.85,17.85,0,0,0-1.95-.37,10.15,10.15,0,0,0-5.9.78,9.77,9.77,0,0,0-4.74,5.76q-.78,2.25-1.68,4.52c-.59,1.51-1.22,3-1.87,4.53q-1.89,4.41-3.8,8.73t-3.87,8.56c-12.95,28.24-26.62,53.47-38.33,73.54-1.17,2-2.32,4-3.45,5.86q-3.39,5.7-6.49,10.75l-.7,1.14a5.34,5.34,0,0,1-9.89-2.87c.13-14.81.61-32.62,1.82-52.37,1.16-19,3-100.92,5.8-122.55.4-3.09.83-6.2,1.27-9.32s.92-6,1.51-8.88c.08-.42.15-.84.23-1.25.06-.25.11-.52.15-.8C204,8.84,203.17.69,187.78,0h-.92l-.46,0h-.58l-.46,0h-.93c-15.38.65-16.17,8.8-15.51,13.06,0,.28.09.55.14.8.09.41.16.83.24,1.25.59,2.9,1.08,5.87,1.51,8.88s.87,6.23,1.27,9.32c2.81,21.63,4.64,103.54,5.8,122.55,1.21,19.75,1.69,37.56,1.81,52.37a5.34,5.34,0,0,1-9.88,2.87c-.23-.38-.47-.76-.71-1.14-2-3.36-4.22-6.95-6.48-10.75-1.13-1.9-2.28-3.86-3.45-5.86-11.71-20.07-25.38-45.3-38.33-73.54q-1.95-4.23-3.87-8.56t-3.8-8.73c-.65-1.51-1.28-3-1.87-4.53s-1.16-3-1.68-4.52a9.75,9.75,0,0,0-4.75-5.76A10.12,10.12,0,0,0,99,87a17.85,17.85,0,0,0-2,.37l-1,.3a34.3,34.3,0,0,0-7.51,3.51h0l-.25.16-.26.15h0a32,32,0,0,0-7.23,6A16,16,0,0,0,79,99.76c-.15.25-.28.5-.41.75a8.5,8.5,0,0,0-.36,7.49,10.37,10.37,0,0,0,.71,1.37c.09.15.18.28.27.41s.37.52.55.75.56.65.81.91c2.24,2.27,4.4,4.71,6.52,7.22q5.75,6.78,11.18,13.52c14.5,18,27.35,35.57,38.25,51.44,8.18,11.91,15.27,22.85,21.13,32.23a3.92,3.92,0,0,1,.25,3.83,4.12,4.12,0,0,1-3.48,2.37,3.8,3.8,0,0,1-.67,0,4.37,4.37,0,0,1-1.36-.43,846.85,846.85,0,0,1-99.58-59.34c-2.69-1.88-5.33-3.81-7.79-5.82a11.94,11.94,0,0,0-1.37-1c-.26-.16-.54-.31-.84-.46a8.71,8.71,0,0,0-4.87-.95,8.51,8.51,0,0,0-1.27.23A10.39,10.39,0,0,0,33.28,156c-2.37,1.7-4.9,4.69-7.43,9.65h0c-.05.09-.09.18-.13.27l-.14.26h0a39.43,39.43,0,0,0-2.2,5.46,19.58,19.58,0,0,0-1,6.29,10.1,10.1,0,0,0,1,4.34A9.6,9.6,0,0,0,29.89,187c3.1.74,6.23,1.68,9.35,2.69a824.31,824.31,0,0,1,86.94,33.81c5.57,2.52,10.82,5,15.72,7.31a3.9,3.9,0,0,1,2.2,2.67,4.07,4.07,0,0,1-3.36,5,4.13,4.13,0,0,1-.79,0A1024.42,1024.42,0,0,1,28.46,226.85q-3-.49-6-1.06c-2-.38-3.94-.79-5.87-1.26a16.16,16.16,0,0,0-2.63-.39c-.4,0-.81,0-1.24,0a12,12,0,0,0-1.3.11q-.33,0-.66.12c-4.7,1-9.89,5.17-10.66,18.8,0,.64-.06,1.31-.08,2H0v.37c0,.12,0,.24,0,.37H0q0,2.07.12,3.9c.42,6.07,1.83,10.11,3.69,12.75.19.27.38.52.58.76a11,11,0,0,0,2.49,2.25l.66.39a10.66,10.66,0,0,0,1.34.61,10.16,10.16,0,0,0,1.34.4,13.06,13.06,0,0,0,1.32.23,14.19,14.19,0,0,0,4.52-.27c3.87-.83,7.88-1.46,11.93-2q4.09-.57,8.17-1.09l.66-.08A1039.06,1039.06,0,0,1,147,255.8l.8,0h0c.25,0,.5,0,.75,0A24.44,24.44,0,0,1,173,280.19a25,25,0,0,1-.24,3.26h0c-.14,1-.27,2-.42,3.05-.43,3.06-.92,6.1-1.55,9a9.55,9.55,0,0,0,1.08,7.25,5.09,5.09,0,0,0,.34.47c1.81,2.36,5.41,4.32,12.26,4.6l.75,0H187l.75,0c6.85-.28,10.45-2.24,12.26-4.6.12-.15.23-.31.34-.47a9.55,9.55,0,0,0,1.08-7.25c-.63-2.92-1.12-6-1.55-9-.15-1-.28-2-.42-3.05h0a25,25,0,0,1-.24-3.26,24.44,24.44,0,0,1,24.42-24.46c.25,0,.5,0,.75,0h0l.81,0c7.08.14,14.52.36,22.26.67";

// ── Per-tour visual personality ──────────────────────────────
const CARD_THEMES: Record<string, {
  scrimColor: string;
  accentColor: string;
  overlayGradient: string;
}> = {
  "classic-bogota": {
    scrimColor: "rgba(204,117,74,0.18)",
    accentColor: "var(--terracota)",
    overlayGradient: "linear-gradient(to top, rgba(15,9,5,0.92) 0%, rgba(100,40,10,0.35) 55%, transparent 100%)",
  },
  "classic-colombia": {
    scrimColor: "rgba(26,46,36,0.20)",
    accentColor: "var(--tumbaga)",
    overlayGradient: "linear-gradient(to top, rgba(8,18,12,0.93) 0%, rgba(20,45,28,0.38) 55%, transparent 100%)",
  },
  "en-busqueda-del-dorado": {
    scrimColor: "rgba(154,122,58,0.18)",
    accentColor: "var(--tumbaga)",
    overlayGradient: "linear-gradient(to top, rgba(10,7,2,0.95) 0%, rgba(80,60,15,0.45) 55%, transparent 100%)",
  },
  "macondo-realismo-magico": {
    scrimColor: "rgba(204,117,74,0.14)",
    accentColor: "var(--terracota)",
    overlayGradient: "linear-gradient(to top, rgba(15,8,4,0.90) 0%, rgba(120,60,30,0.30) 55%, transparent 100%)",
  },
  "wild-colombia": {
    scrimColor: "rgba(15,19,14,0.22)",
    accentColor: "var(--verde)",
    overlayGradient: "linear-gradient(to top, rgba(5,10,6,0.96) 0%, rgba(10,25,14,0.50) 55%, transparent 100%)",
  },
};

const DEFAULT_THEME = {
  scrimColor: "rgba(154,122,58,0.15)",
  accentColor: "var(--tumbaga)",
  overlayGradient: "linear-gradient(to top, rgba(10,8,4,0.92) 0%, rgba(40,30,10,0.38) 55%, transparent 100%)",
};

// ── Meridiana easing — peso editorial ───────────────────────
const MERIDIANA_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

// ── Arrow icon ───────────────────────────────────────────────
function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ── Individual card ──────────────────────────────────────────
function TravelCard({
  card,
  locale,
  ctaLearnMore,
  ctaBook,
}: {
  card: TravelCardItem;
  locale: Locale;
  ctaLearnMore: string;
  ctaBook: string;
}) {
  const tourHref = `/${locale}/viajes/${card.id}`;
  const contactHref = `/${locale}/contacto`;
  const theme = CARD_THEMES[card.id] ?? DEFAULT_THEME;

  const titleText = card.title[locale];
  const emphasis = card.titleEmphasis?.[locale];
  const titleNode = emphasis ? (
    <>
      {titleText.replace(emphasis, "").trimEnd()}
      {" "}
      <em className="italic" style={{ color: "var(--marfil)" }}>
        {emphasis}
      </em>
    </>
  ) : (
    titleText
  );

  return (
    <article
      className="tc-card group relative overflow-hidden cursor-pointer min-w-[80px]"
      style={{ color: "var(--marfil)", textShadow: "0 1px 14px rgba(0,0,0,0.35)", backgroundColor: "oklch(12% 0.018 75)" }}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.imageSrc}
        alt={card.imageAlt}
        data-tone={card.tone}
        className="tc-media absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          const img = e.currentTarget;
          img.classList.add("tc-failed");
          img.src =
            "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        }}
      />

      {/* Scrim base */}
      <div className="tc-scrim-base absolute inset-0 bg-black/35" />

      {/* Top gradient — legibilidad permanente */}
      <div className="tc-scrim-top" />

      {/* Per-card accent glow — sutil, no neon */}
      <div
        className="tc-accent-glow absolute inset-0 pointer-events-none"
        style={{ background: theme.scrimColor }}
      />

      {/* Hover scrim — overlay con personalidad por tour */}
      <div
        className="tc-scrim-hover absolute inset-0"
        style={{ background: theme.overlayGradient }}
      />

      {/* Meridiana isotipo badge */}
      <svg
        className="tc-isotipo"
        viewBox="0 0 372.22 307.88"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d={ISOTIPO_PATH} />
      </svg>

      {/* Card content */}
      <div className="tc-content absolute inset-0 p-4 md:p-8 flex flex-col justify-between">
        {/* Meta row */}
        <div className="tc-meta-row flex items-center justify-between">
          <span
            className="tc-tag inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] backdrop-blur"
          >
            {card.id === "wild-colombia" && (
              <span
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--tumbaga)" }}
              />
            )}
            {card.tourLabel[locale]}
          </span>
          <span className="tc-region text-[11px] uppercase">
            {card.region[locale]}
          </span>
        </div>

        {/* Bottom content */}
        <div>
          <div className="tc-collapse">
            {/* Meta tick — acento por tour */}
            <div className="tc-reveal flex items-center gap-2.5 mb-4">
              <span
                className="tc-meta-tick flex-shrink-0"
                style={{ background: theme.accentColor }}
              />
              <span
                className="text-[11px] uppercase tracking-[0.2em]"
                style={{ color: "rgba(231,213,188,0.7)" }}
              >
                {card.meta[locale]}
              </span>
            </div>
          </div>

          <h3
            className="tc-title font-display font-light mb-4"
            style={{
              color: "var(--marfil)",
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              fontWeight: 300,
            }}
          >
            {titleNode}
          </h3>

          <div className="tc-collapse">
            <p
              className="tc-reveal tc-reveal-d1 text-sm md:text-[15px] leading-relaxed mb-6 max-w-xl"
              style={{ color: "rgba(231,213,188,0.82)" }}
            >
              {card.description[locale]}
            </p>

            <div className="tc-reveal tc-reveal-d2 flex items-center gap-3 flex-wrap">
              <Link
                href={tourHref}
                className="tc-cta-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
              >
                {ctaLearnMore}
                <span className="tc-arrow">
                  <ArrowIcon size={14} />
                </span>
              </Link>
              <Link
                href={contactHref}
                className="tc-cta-secondary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm"
              >
                {ctaBook}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Framer Motion variants — Meridiana timing ────────────────
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: MERIDIANA_EASE },
  },
};

// ── Main component ───────────────────────────────────────────
interface TravelCardsProps {
  content: TravelCardsContent;
  locale: Locale;
  theme?: "dark" | "light";
  /** Transparent bg + no internal header — para uso en páginas con hero propio */
  seamless?: boolean;
}

export function TravelCards({ content, locale, theme = "dark", seamless = false }: TravelCardsProps) {
  const toursHref = `/${locale}/viajes`;
  const isLight = theme === "light";

  return (
    <section
      className="relative w-full"
      style={{
        background: seamless
          ? "transparent"
          : isLight
            ? "var(--blanco)"
            : "linear-gradient(to bottom, #0F130E 0%, #080808 100%)",
      }}
      aria-label={content.headline[locale]}
    >

      {/* Section header — only on dark (home), not in seamless mode */}
      {!isLight && !seamless && (
        <motion.header
          className="relative z-10 w-full px-6 md:px-12 pt-16 md:pt-24 pb-10 md:pb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: MERIDIANA_EASE }}
        >
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <div
                className="flex items-center gap-3 mb-4"
                style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.24em" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: "32px",
                    height: "1px",
                    background: "var(--tumbaga)",
                  }}
                />
                <span style={{ color: "var(--tumbaga)" }}>
                  {content.eyebrow[locale]}
                </span>
              </div>
              <h2
                className="font-display font-light"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.01em",
                  color: "var(--marfil)",
                }}
              >
                {content.headline[locale]}
              </h2>
            </div>
            <Link
              href={toursHref}
              className="tc-header-cta group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm tracking-wide"
            >
              {content.headerCta[locale]}
              <span className="tc-arrow">
                <ArrowIcon size={16} />
              </span>
            </Link>
          </div>
        </motion.header>
      )}

      {/* Cards rows */}
      {isLight && <div className="h-1.5" />}

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Row 1 — three cards */}
        <motion.div
          variants={rowVariants}
          className="tc-row flex w-full"
          style={{ height: "64vh", minHeight: "480px" }}
        >
          {content.row1.map((card) => (
            <TravelCard
              key={card.id}
              card={card}
              locale={locale}
              ctaLearnMore={content.ctaLearnMore[locale]}
              ctaBook={content.ctaBook[locale]}
            />
          ))}
        </motion.div>

        {/* Row 2 — two wide cards */}
        <motion.div
          variants={rowVariants}
          className="tc-row flex w-full"
          style={{ height: "52vh", minHeight: "420px" }}
        >
          {content.row2.map((card) => (
            <TravelCard
              key={card.id}
              card={card}
              locale={locale}
              ctaLearnMore={content.ctaLearnMore[locale]}
              ctaBook={content.ctaBook[locale]}
            />
          ))}
        </motion.div>
      </motion.div>


    </section>
  );
}

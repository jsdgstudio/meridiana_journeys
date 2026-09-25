"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Tour, GalleryItem, Locale } from "@/types/tour";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import styles from "./TourGallery.module.css";

interface TourGalleryProps {
  tour: Tour;
  locale: Locale;
}

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

const PATTERN_A_CLASSES = ["tga-1", "tga-2", "tga-3", "tga-4", "tga-5", "tga-6"];
const PATTERN_B_CLASSES = ["tgb-1", "tgb-2", "tgb-3", "tgb-4", "tgb-5", "tgb-6"];
const REMAINDER_CLASSES: Record<number, string[]> = {
  1: ["tgr-1"],
  2: ["tgr-2a", "tgr-2b"],
  3: ["tgr-3a", "tgr-3b", "tgr-3c"],
  4: ["tgr-4a", "tgr-4b", "tgr-4c", "tgr-4d"],
  5: ["tgr-5a", "tgr-5b", "tgr-5c", "tgr-5d", "tgr-5e"],
};

const GALLERY_COPY: Record<string, {
  label: { es: string; en: string };
  headlinePre: { es: string; en: string };
  headlineEm: { es: string; en: string };
  sub: { es: string; en: string };
}> = {
  "classic-bogota": {
    label: { es: "bogotá · cuaderno visual", en: "bogotá · visual notebook" },
    // DOCX párr. 151 — literal ES; EN working translation.
    headlinePre: {
      es: "El mundo precolombino, la ciudad colonial, la era republicana y la Bogotá contemporánea.",
      en: "The pre-Columbian world, the colonial city, the republican era and contemporary Bogotá.",
    },
    headlineEm: { es: "", en: "" },
    sub: {
      es: "",
      en: "",
    },
  },
  "classic-colombia": {
    label: { es: "colombia · cuaderno visual", en: "colombia · visual notebook" },
    headlinePre: { es: "El territorio que estamos ", en: "The territory we are " },
    headlineEm: { es: "recorriendo.", en: "traversing." },
    sub: {
      es: "De Medellín al Eje Cafetero: dos geografías que definen la identidad colombiana en sus formas más vivas.",
      en: "From Medellín to the Coffee Region: two geographies that define Colombian identity in its most vivid forms.",
    },
  },
  "macondo-realismo-magico": {
    label: { es: "caribe · cuaderno visual", en: "caribbean · visual notebook" },
    headlinePre: { es: "El territorio que estamos ", en: "The territory we are " },
    headlineEm: { es: "narrando.", en: "narrating." },
    sub: {
      es: "Cartagena, Getsemaní, el Caribe colombiano: el universo geográfico donde el realismo mágico dejó de ser metáfora.",
      en: "Cartagena, Getsemaní, the Colombian Caribbean: the geographic universe where magical realism ceased to be metaphor.",
    },
  },
  "wild-colombia": {
    label: { es: "colombia · expedición salvaje", en: "colombia · wild expedition" },
    headlinePre: { es: "El territorio que estamos ", en: "The territory we are " },
    headlineEm: { es: "explorando.", en: "exploring." },
    sub: {
      es: "Colombia es el segundo país más biodiverso del planeta. Esto es lo que espera más allá de las ciudades.",
      en: "Colombia is the second most biodiverse country on the planet. This is what awaits beyond the cities.",
    },
  },
  "en-busqueda-del-dorado": {
    label: { es: "colombia · expedición dorado", en: "colombia · el dorado expedition" },
    headlinePre: { es: "El territorio que estamos ", en: "The territory we are " },
    headlineEm: { es: "descubriendo.", en: "uncovering." },
    sub: {
      es: "La leyenda del Dorado no es un mito: es un mapa. Guatavita, el Museo del Oro, Zipaquirá — el rastro aurífero de los muiscas.",
      en: "The legend of El Dorado is not a myth: it is a map. Guatavita, the Gold Museum, Zipaquirá — the auriferous trail of the Muisca.",
    },
  },
};

export function TourGallery({ tour, locale }: TourGalleryProps) {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const shouldReduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useDialogFocus({
    isOpen: !!lightbox?.src,
    containerRef: dialogRef,
    initialFocusRef: closeRef,
    onClose: closeLightbox,
  });

  // Only real photos: gradient placeholders would render as empty blocks
  // now that captions no longer sit on top of the frames (DOCX párr. 159).
  const items = (tour.gallery ?? []).filter((item) => item.src);
  if (items.length === 0) return null;
  const copy = GALLERY_COPY[tour.id] ?? {
    label: { es: "cuaderno visual", en: "visual notebook" },
    headlinePre: { es: "El territorio que estamos ", en: "The territory we are " },
    headlineEm: { es: "viviendo.", en: "experiencing." },
    sub: { es: "", en: "" },
  };

  const fullGroups: GalleryItem[][] = [];
  for (let i = 0; i + 6 <= items.length; i += 6) {
    fullGroups.push(items.slice(i, i + 6));
  }
  const remainder = items.slice(fullGroups.length * 6);

  return (
    <>
      {/* Full-bleed: only the header keeps side padding; photos run edge to edge. */}
      <section style={{ background: "var(--negro)", paddingTop: "clamp(56px, 8vw, 112px)" }}>
        {/* Header */}
        <motion.div
          className="tg-header"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            marginBottom: "clamp(40px, 5vw, 64px)",
            paddingInline: "clamp(20px, 4vw, 40px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div>
            <p style={{
              fontSize: 10, fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "rgba(231,213,188,0.38)", marginBottom: 16,
            }}>
              {copy.label[locale]}
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)", lineHeight: 1.07,
              letterSpacing: "-0.015em", color: "var(--marfil)", maxWidth: 600,
            }}>
              {copy.headlinePre[locale]}
              {copy.headlineEm[locale] && (
                <em style={{ fontStyle: "italic", color: "var(--tumbaga-lt)" }}>
                  {copy.headlineEm[locale]}
                </em>
              )}
            </h2>
          </div>
          {copy.sub[locale] && (
            <p className="tg-header__sub">
              {copy.sub[locale]}
            </p>
          )}
        </motion.div>

        {/* Masonry grids */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {fullGroups.map((group, groupIdx) => {
            const classes = groupIdx % 2 === 0 ? PATTERN_A_CLASSES : PATTERN_B_CLASSES;
            return (
              <div key={groupIdx} className={`tg-grid ${styles.bleed}`}>
                {group.map((item, itemIdx) => (
                  <GalleryFrame
                    key={itemIdx}
                    item={item}
                    locale={locale}
                    className={classes[itemIdx]}
                    delay={(groupIdx * 6 + itemIdx) * 60}
                    onOpen={() => item.src && setLightbox(item)}
                  />
                ))}
              </div>
            );
          })}

          {remainder.length > 0 && remainder.length <= 5 && (
            <div className={`tg-grid ${styles.bleed}`}>
              {remainder.map((item, itemIdx) => (
                <GalleryFrame
                  key={itemIdx}
                  item={item}
                  locale={locale}
                  className={REMAINDER_CLASSES[remainder.length]?.[itemIdx] ?? "tgr-1"}
                  delay={(fullGroups.length * 6 + itemIdx) * 60}
                  onOpen={() => item.src && setLightbox(item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && lightbox.src && (
          <motion.div
            key="lightbox"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.place[locale]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={closeLightbox}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(15,19,14,0.96)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              cursor: "zoom-out",
              padding: "40px 24px 80px",
            }}
          >
            {/* Image */}
            <motion.div
              initial={shouldReduce ? { opacity: 0 } : { scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={shouldReduce ? { opacity: 0 } : { scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 1100,
                maxHeight: "80vh",
                aspectRatio: "16/10",
                flexShrink: 0,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                fill
                alt={lightbox.place[locale]}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
              style={{
                marginTop: 24,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 20,
                fontWeight: 400, fontStyle: "italic",
                color: "var(--marfil)", lineHeight: 1.1,
              }}>
                {lightbox.place[locale]}
              </span>
              <span style={{ color: "rgba(231,213,188,0.25)", fontSize: 12 }}>·</span>
              <span style={{
                fontSize: 9, fontWeight: 600, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "rgba(231,213,188,0.55)",
              }}>
                {lightbox.tag[locale]}
              </span>
            </motion.div>

            {/* Close */}
            <motion.button
              ref={closeRef}
              type="button"
              aria-label={locale === "es" ? "Cerrar" : "Close"}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tumbaga"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shouldReduce ? 0 : 0.5 }}
              style={{
                position: "absolute", top: 28, right: 36,
                fontSize: 9, fontWeight: 600, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(231,213,188,0.55)",
                cursor: "pointer", background: "none", border: 0, padding: 0,
              }}
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            >
              {locale === "es" ? "ESC · cerrar" : "ESC · close"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GalleryFrame({
  item, locale, className, delay, onOpen,
}: {
  item: GalleryItem;
  locale: Locale;
  className: string;
  delay: number;
  onOpen: () => void;
}) {
  const clickable = !!item.src;
  const openLabel = locale === "es"
    ? `Ampliar imagen: ${item.place[locale]}`
    : `Enlarge image: ${item.place[locale]}`;

  return (
    <motion.figure
      className={`tg-frame ${className} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tumbaga`}
      style={{ cursor: clickable ? "zoom-in" : "default" }}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? openLabel : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      } : undefined}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: delay / 1000, ease: EASE }}
      onClick={clickable ? onOpen : undefined}
    >
      {item.src ? (
        <motion.div
          style={{ position: "absolute", inset: 0 }}
          whileHover={{ scale: 1.045 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <Image
            src={item.src}
            fill
            className="object-cover"
            alt={item.place[locale]}
            style={{
              transition: "filter 500ms",
            }}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 60vw"
          />
        </motion.div>
      ) : item.gradient ? (
        <div style={{ position: "absolute", inset: 0, background: item.gradient }} />
      ) : null}

    </motion.figure>
  );
}

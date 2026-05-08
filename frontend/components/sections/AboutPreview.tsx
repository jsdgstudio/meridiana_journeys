"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { AboutPreviewContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface AboutPreviewProps {
  content: AboutPreviewContent;
  locale: Locale;
}

// ── SunMark ─────────────────────────────────────────────────
// Símbolo decorativo Meridiana — 9 radios desde un punto central
function SunMark({ stroke = "#9A7A3A", size = 24 }: { stroke?: string; size?: number }) {
  const cx = size * 0.5;
  const cy = size * 0.52;
  const r  = size * 0.36;
  const spokes = 9;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: spokes }, (_, i) => {
        const angle = -Math.PI + (Math.PI * i) / (spokes - 1);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(angle) * r}
            y2={cy + Math.sin(angle) * r}
            stroke={stroke}
            strokeWidth={size * 0.082}
            strokeLinecap="round"
          />
        );
      })}
      <line
        x1={cx} y1={cy}
        x2={cx} y2={cy - r * 1.15}
        stroke={stroke}
        strokeWidth={size * 0.095}
        strokeLinecap="round"
      />
      <ellipse
        cx={cx}
        cy={cy + size * 0.09}
        rx={size * 0.055}
        ry={size * 0.04}
        fill={stroke}
      />
    </svg>
  );
}

// ── Constantes de animación ──────────────────────────────────
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = (delay = 0, duration = 0.9) => ({
  initial:     { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true as const, margin: "-60px" },
  transition:  { duration, ease, delay },
});

const fadeIn = (delay = 0) => ({
  initial:     { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:    { once: true as const, margin: "-60px" },
  transition:  { duration: 0.9, ease, delay },
});

// ── WordReveal ───────────────────────────────────────────────
// Animación palabra por palabra con Framer Motion stagger
function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");

  return (
    <motion.span
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden:  { y: "110%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease } },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// ── Componente principal ─────────────────────────────────────
export function AboutPreview({ content, locale }: AboutPreviewProps) {
  const ctaHref = locale === "es" ? "/es/nosotros" : "/en/nosotros";

  // Divide la pull quote para resaltar la palabra clave en tumbaga
  const highlight = content.pullQuoteHighlight[locale];
  const [pqBefore, pqAfter] = content.pullQuote[locale].split(highlight);

  // Divide la cita del diferencial para colorear la segunda mitad
  const quoteParts = content.differentiator.quote[locale].split(", ");
  const quoteFirst = quoteParts[0] + ",";
  const quoteSecond = quoteParts.slice(1).join(", ");

  return (
    <section
      data-screen-label="Sobre Meridiana"
      className="relative overflow-hidden bg-negro text-marfil font-sans antialiased"
    >
      {/* Gradiente atmosférico */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(26,46,36,0.85) 0%, rgba(15,19,14,0) 60%), linear-gradient(180deg, #0F130E 0%, #14201A 50%, #0F130E 100%)",
        }}
      />

      {/* Línea superior */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-tumbaga/40"
        initial={{ width: 0 }}
        whileInView={{ width: 120 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
      />

      {/* ── INTRO ──────────────────────────────────────────── */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 pt-28 md:pt-40 pb-16 md:pb-24">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-16">

          {/* Columna izquierda: texto */}
          <div className="flex-1 min-w-0">

            {/* Label row */}
            <motion.div
              className="flex items-center gap-3 md:gap-4 mb-10 md:mb-14"
              {...fadeUp(0, 0.7)}
            >
              <SunMark stroke="#9A7A3A" size={18} />
              <span
                className="text-[10px] md:text-[11px] font-bold uppercase text-tumbaga"
                style={{ letterSpacing: "0.22em" }}
              >
                {content.label[locale]}
              </span>
              <motion.span
                aria-hidden="true"
                className="ml-2 h-px bg-marfil/20"
                initial={{ width: 0 }}
                whileInView={{ width: 180 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease, delay: 0.25 }}
              />
            </motion.div>

            {/* Titular con word reveal */}
            <h2
              className="font-display font-light text-marfil"
              style={{
                fontSize: "clamp(2.6rem, 6.2vw, 5.5rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.01em",
                maxWidth: "18ch",
              }}
            >
              <WordReveal text={content.headline.line1[locale]} delay={0.15} />
              <br />
              <em style={{ fontStyle: "italic", color: "#C8A96A", fontWeight: 300 }}>
                <WordReveal text={content.headline.line2[locale]} delay={0.65} />
              </em>
            </h2>

            {/* Párrafo introductorio */}
            <motion.p
              className="mt-10 md:mt-14 text-[15px] md:text-[17px] leading-[1.75] text-marfil/65"
              style={{ maxWidth: "540px" }}
              {...fadeUp(1.0)}
            >
              {content.lead[locale]}
            </motion.p>
          </div>

          {/* Columna derecha: logo oficial */}
          <motion.div
            className="flex-shrink-0 flex justify-center md:justify-end md:items-start md:pt-2"
            {...fadeUp(0.6, 1.1)}
          >
            <Image
              src={content.logo}
              alt="Meridiana"
              width={400}
              height={480}
              className="select-none"
              draggable={false}
              style={{
                width: "clamp(100px, 12vw, 172px)",
                height: "auto",
              }}
            />
          </motion.div>

        </div>
      </div>

      {/* ── CUERPO EDITORIAL (dos columnas) ────────────────── */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">

          {/* Columna método */}
          <div className="md:col-span-4">
            <motion.div
              className="text-[10px] md:text-[11px] font-bold uppercase text-marfil/35"
              style={{ letterSpacing: "0.22em" }}
              {...fadeUp(0, 0.7)}
            >
              {content.editorial.methodLabel[locale]}
            </motion.div>
            <motion.div
              className="mt-4 font-display font-light text-marfil"
              style={{
                fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
                lineHeight: 1.15,
              }}
              {...fadeUp(0.15)}
            >
              {content.editorial.method[locale]}
            </motion.div>
          </div>

          {/* Columna cuerpo */}
          <div className="md:col-span-8 md:pl-8 md:border-l md:border-marfil/[0.12]">
            <motion.p
              className="text-[15px] md:text-[17px] leading-[1.8] text-marfil/[0.72]"
              {...fadeUp(0.25)}
            >
              {content.editorial.body1[locale]}
            </motion.p>
            <motion.p
              className="mt-7 text-[15px] md:text-[17px] leading-[1.8] text-marfil/[0.72]"
              {...fadeUp(0.4)}
            >
              {content.editorial.body2[locale]}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── PULL QUOTE ─────────────────────────────────────── */}
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.div
          aria-hidden="true"
          className="mx-auto bg-tumbaga/55"
          style={{ width: "1px" }}
          initial={{ height: 0 }}
          whileInView={{ height: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
        />

        <motion.blockquote
          className="mt-10 md:mt-14 mx-auto text-center font-display font-light text-marfil"
          style={{
            fontStyle: "italic",
            fontSize: "clamp(2rem, 4.2vw, 3.6rem)",
            lineHeight: 1.18,
            maxWidth: "22ch",
          }}
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
        >
          {pqBefore}
          <span style={{ color: "#C8A96A" }}>{highlight}</span>
          {pqAfter}
        </motion.blockquote>

        <motion.div
          aria-hidden="true"
          className="mx-auto mt-10 md:mt-14 bg-tumbaga/55"
          style={{ width: "1px" }}
          initial={{ height: 0 }}
          whileInView={{ height: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
        />
      </div>

      {/* ── LISTA "DONDE" ───────────────────────────────────── */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 pb-20 md:pb-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">

          {/* Sticky label + intro */}
          <div className="md:col-span-5 md:sticky md:top-24">
            <motion.div
              className="text-[10px] md:text-[11px] font-bold uppercase text-tumbaga"
              style={{ letterSpacing: "0.22em" }}
              {...fadeUp(0, 0.7)}
            >
              {content.donde.sectionLabel[locale]}
            </motion.div>
            <motion.h3
              className="mt-5 font-display font-light text-marfil"
              style={{
                fontSize: "clamp(1.9rem, 3.4vw, 3rem)",
                lineHeight: 1.1,
              }}
              {...fadeUp(0.15)}
            >
              {content.donde.intro[locale].replace(
                locale === "es" ? " donde…" : " where…",
                ""
              )}
              <em style={{ fontStyle: "italic", color: "#C8A96A" }}>
                {locale === "es" ? " donde…" : " where…"}
              </em>
            </motion.h3>
          </div>

          {/* Lista numerada */}
          <ol className="md:col-span-7 space-y-0">
            {content.donde.lines.map((line, i) => (
              <motion.li
                key={i}
                className="flex items-baseline gap-5 md:gap-8 py-5 md:py-7 border-b border-marfil/[0.12]"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.14 }}
              >
                <span
                  className="text-tumbaga tabular-nums font-display"
                  style={{
                    fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                    fontStyle: "italic",
                    fontWeight: 300,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="flex-1 text-marfil/85 font-display"
                  style={{
                    fontSize: "clamp(1.25rem, 2vw, 1.7rem)",
                    fontWeight: 300,
                    lineHeight: 1.35,
                  }}
                >
                  {line[locale].charAt(0).toUpperCase() + line[locale].slice(1)}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── CIERRE + CTA ────────────────────────────────────── */}
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 pb-24 md:pb-40 text-center">
        <motion.p
          className="mx-auto text-marfil/[0.72] text-[15px] md:text-[17px] leading-[1.8]"
          style={{ maxWidth: "52ch" }}
          {...fadeUp(0)}
        >
          {content.closing[locale]}
        </motion.p>

        <motion.div {...fadeUp(0.25)}>
          <Link
            href={ctaHref}
            className="mt-10 inline-flex items-center gap-3 border border-tumbaga/55 px-8 py-3.5 text-[#C8A96A] hover:text-marfil hover:border-tumbaga transition-colors duration-300"
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {content.cta.text[locale]}
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>

      {/* ── DIFERENCIAL (slab claro) ────────────────────────── */}
      <div className="relative bg-marfil text-negro">
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-tumbaga/40" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">

            {/* Columna izquierda */}
            <div className="md:col-span-4">
              <motion.div
                className="text-[10px] md:text-[11px] font-bold uppercase text-tumbaga"
                style={{ letterSpacing: "0.22em" }}
                {...fadeUp(0, 0.7)}
              >
                {content.differentiator.label[locale]}
              </motion.div>
              <motion.div
                className="mt-4 font-display font-light text-negro/55"
                style={{
                  fontStyle: "italic",
                  fontSize: "clamp(1.1rem, 1.4vw, 1.25rem)",
                  lineHeight: 1.4,
                }}
                {...fadeUp(0.15, 0.8)}
              >
                {content.differentiator.subtitle[locale]}
              </motion.div>
            </div>

            {/* Columna derecha */}
            <div className="md:col-span-8">
              <motion.p
                className="font-display font-light text-negro"
                style={{
                  fontSize: "clamp(1.8rem, 3.4vw, 3rem)",
                  lineHeight: 1.18,
                }}
                {...fadeUp(0.2, 1.0)}
              >
                {content.differentiator.textBase[locale]}{" "}
                <em style={{ fontStyle: "italic" }}>
                  {content.differentiator.textEmphasis[locale]}
                </em>
              </motion.p>

              <motion.div
                className="mt-10 md:mt-14 pl-6 md:pl-8 border-l-2 border-tumbaga"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.0, ease, delay: 0.45 }}
              >
                <p
                  className="font-display font-light text-negro"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {quoteFirst}
                  <br className="hidden md:block" />
                  <span className="text-tumbaga"> {quoteSecond}</span>
                </p>
              </motion.div>

              {/* Firma */}
              <motion.div
                className="mt-12 md:mt-16 flex items-center gap-4 text-negro/55"
                {...fadeIn(0.7)}
              >
                <SunMark stroke="#9A7A3A" size={18} />
                <span
                  className="text-[10px] md:text-[11px] font-bold uppercase"
                  style={{ letterSpacing: "0.22em" }}
                >
                  {content.differentiator.signature[locale]}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";
import type { AboutPreviewContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface AboutPreviewProps {
  content: AboutPreviewContent;
  locale: Locale;
}

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = (delay = 0, duration = 0.9) => ({
  initial:     { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true as const, margin: "-60px" },
  transition:  { duration, ease, delay },
});

// ── SunMark ─────────────────────────────────────────────────
function SunMark({ stroke = "#9A7A3A", size = 24 }: { stroke?: string; size?: number }) {
  const cx = size * 0.5;
  const cy = size * 0.52;
  const r  = size * 0.36;
  const spokes = 9;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
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
      <line x1={cx} y1={cy} x2={cx} y2={cy - r * 1.15} stroke={stroke} strokeWidth={size * 0.095} strokeLinecap="round" />
      <ellipse cx={cx} cy={cy + size * 0.09} rx={size * 0.055} ry={size * 0.04} fill={stroke} />
    </svg>
  );
}

// ── WordReveal ───────────────────────────────────────────────
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
            {word}{i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// ── Componente principal ─────────────────────────────────────
export function AboutPreview({ content, locale }: AboutPreviewProps) {
  const ctaHref = locale === "es" ? "/es/sobre-meridiana" : "/en/sobre-meridiana";
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (video && video.duration && isFinite(video.duration)) {
      video.currentTime = progress * video.duration;
    }
  });

  const isotipoOpacity = useTransform(scrollYProgress, [0.28, 0.48], [0, 1]);
  const isotipoScale   = useTransform(scrollYProgress, [0.28, 0.48], [0.8, 1]);

  const highlight           = content.pullQuoteHighlight[locale];
  const [pqBefore, pqAfter] = content.pullQuote[locale].split(highlight);

  return (
    <section
      ref={sectionRef}
      data-screen-label="Sobre Meridiana"
      className="relative overflow-hidden bg-negro text-marfil font-sans antialiased"
    >
      {/* ── VIDEO fondo global — scroll-synced ───────────────── */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        >
          <source src="/fondo_redefinimos.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 25%, rgba(15,19,14,0.85) 72%, #0F130E 100%)",
              "linear-gradient(180deg, #0F130E 0%, transparent 12%, transparent 88%, #0F130E 100%)",
            ].join(", "),
          }}
        />
      </div>


      {/* ── INTRO ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-16 pt-20 md:pt-32 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-start">

          {/* Columna texto */}
          <div className="min-w-0">

              {/* Titular */}
            <h2
              className="font-display font-light text-marfil"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.6rem)",
                lineHeight: 1.03,
                letterSpacing: "-0.015em",
              }}
            >
              <WordReveal text={content.headline.line1[locale]} delay={0.15} />
              <br />
              <em style={{ fontStyle: "italic", color: "#C8A96A", fontWeight: 300 }}>
                <WordReveal text={content.headline.line2[locale]} delay={0.65} />
              </em>
            </h2>

            {/* Regla divisoria */}
            <motion.div
              aria-hidden="true"
              className="mt-10 md:mt-14 mb-10 md:mb-12 h-px bg-tumbaga/20"
              style={{ maxWidth: "500px" }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease, delay: 0.85 }}
            />

            {/* Texto editorial */}
            <div className="flex flex-col gap-5" style={{ maxWidth: "560px" }}>
              <motion.p
                className="text-[15px] md:text-[16px] leading-[1.85] text-marfil/85"
                {...fadeUp(1.0)}
              >
                {content.lead[locale]}
              </motion.p>
              <motion.p
                className="text-[14px] md:text-[15px] leading-[1.9] text-marfil/60"
                {...fadeUp(1.12)}
              >
                {content.editorial.body1[locale]}
              </motion.p>
              <motion.p
                className="text-[14px] md:text-[15px] leading-[1.9] text-marfil/60"
                {...fadeUp(1.24)}
              >
                {content.editorial.body2[locale]}
              </motion.p>
            </div>
          </div>

          {/* Columna logo — solo desktop */}
          <motion.div
            className="hidden md:flex flex-col items-center gap-6 pt-2"
            {...fadeUp(0.5, 1.1)}
          >
            <div
              aria-hidden="true"
              className="w-px bg-tumbaga/20"
              style={{ height: "clamp(48px, 5vw, 72px)" }}
            />
            <Image
              src={content.logo}
              alt="Meridiana"
              width={400}
              height={480}
              className="select-none opacity-85"
              draggable={false}
              style={{ width: "clamp(88px, 9vw, 140px)", height: "auto" }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── ZONA VIDEO: línea superior + isotipo + pull quote + línea inferior ── */}
      <div className="relative z-10 overflow-hidden">

        {/* Video autoplay exclusivo de esta zona */}
        <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-22"
          >
            <source src="/fondo_redefinimos.mp4" type="video/mp4" />
          </video>
          {/* Capa de oscurecimiento — z-index explícito para sobrevivir compositing de Framer Motion */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(15,19,14,0.80)", zIndex: 1 }}
          />
          {/* Fade de bordes: absorbe media línea superior e inferior */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 2,
              background:
                "linear-gradient(180deg, #0F130E 0%, rgba(15,19,14,0.1) 14%, transparent 30%, transparent 70%, rgba(15,19,14,0.1) 86%, #0F130E 100%)",
            }}
          />
        </div>

        {/* Línea decorativa superior — mitad dentro del video */}
        <div className="relative z-10 flex justify-center">
          <motion.div
            aria-hidden="true"
            className="bg-tumbaga/55"
            style={{ width: "1px" }}
            initial={{ height: 0 }}
            whileInView={{ height: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease }}
          />
        </div>

        {/* Isotipo */}
        <div className="relative z-10 flex justify-center py-10 md:py-14">
          <motion.div style={{ opacity: isotipoOpacity, scale: isotipoScale }}>
            <Image
              src={content.isotipo}
              alt="Meridiana"
              width={88}
              height={88}
              className="select-none"
              draggable={false}
              style={{
                width: "clamp(60px, 6vw, 88px)",
                height: "auto",
                filter:
                  "brightness(0) saturate(100%) invert(49%) sepia(38%) saturate(502%) hue-rotate(6deg) brightness(88%) contrast(88%)",
              }}
            />
          </motion.div>
        </div>

        {/* Pull quote */}
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 py-2 md:py-4">
          <motion.blockquote
            className="mx-auto text-center font-display font-light text-marfil"
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
        </div>

        {/* Línea decorativa inferior — mitad dentro del video */}
        <div className="relative z-10 flex justify-center">
          <motion.div
            aria-hidden="true"
            className="bg-tumbaga/55"
            style={{ width: "1px" }}
            initial={{ height: 0 }}
            whileInView={{ height: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease, delay: 0.3 }}
          />
        </div>
      </div>

      {/* ── CIERRE + CTA ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-24 md:pb-40 text-center">
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
    </section>
  );
}

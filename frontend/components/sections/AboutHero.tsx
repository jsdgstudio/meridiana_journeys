"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import type { HeroContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface AboutHeroProps {
  content: HeroContent;
  locale: Locale;
}

const ease = [0.16, 1, 0.3, 1] as const;
const CONTRACT = 0.18;
const LINE_STYLE = {
  height: "1px",
  backgroundColor: "rgba(154, 122, 58, 0.5)",
  transformOrigin: "center",
} as const;

export function AboutHero({ content, locale }: AboutHeroProps) {
  const shouldReduce = useReducedMotion();
  const lineControls = useAnimation();
  const [lineReady, setLineReady] = useState(false);
  const cancelRef = useRef(false);

  const words = content.headline[locale].split(" ");
  const line1 = words[0];
  const line2 = words.slice(1).join(" ");
  const subheadline = content.subheadline[locale];
  const eyebrow = locale === "es" ? "Sobre Meridiana" : "About Meridiana";

  // Entry sequence: appear full → contract slowly toward center
  useEffect(() => {
    cancelRef.current = false;

    if (shouldReduce) {
      lineControls.set({ opacity: 1, scaleX: CONTRACT });
      setLineReady(true);
      return;
    }

    const run = async () => {
      await lineControls.start({
        opacity: 1,
        scaleX: 1,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
      });
      if (cancelRef.current) return;
      await lineControls.start({
        scaleX: CONTRACT,
        transition: { duration: 2.2, ease: [0.45, 0, 0.15, 1] },
      });
      if (!cancelRef.current) setLineReady(true);
    };

    run();
    return () => { cancelRef.current = true; };
  }, [lineControls, shouldReduce]);

  const handleMouseEnter = () => {
    if (!lineReady || shouldReduce) return;
    lineControls.start({
      scaleX: 1,
      transition: { duration: 1.0, ease: [0.4, 0, 0.2, 1] },
    });
  };

  const handleMouseLeave = () => {
    if (!lineReady || shouldReduce) return;
    lineControls.start({
      scaleX: CONTRACT,
      transition: { duration: 1.9, ease: [0.45, 0, 0.15, 1] },
    });
  };

  return (
    <section
      className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background media */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.media.src}
          alt={content.media.alt[locale]}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/sobre_meridiana_BG_hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient — preserva proporciones del video */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to top,    var(--negro) 0%, rgba(15,19,14,0.0) 38%)",
              "linear-gradient(to bottom, rgba(15,19,14,0.55) 0%, rgba(15,19,14,0.0) 28%)",
              "linear-gradient(to right,  rgba(15,19,14,0.30) 0%, rgba(15,19,14,0.0) 35%)",
              "linear-gradient(to left,   rgba(15,19,14,0.20) 0%, rgba(15,19,14,0.0) 30%)",
            ].join(", "),
          }}
        />
      </div>

      {/* Content block — anchored to bottom */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-10 lg:px-16 pb-20 lg:pb-28 pt-32">

        {/* Mobile — static contracted line */}
        <div
          className="lg:hidden w-full mb-8"
          style={{ ...LINE_STYLE, transform: `scaleX(${CONTRACT})` }}
        />

        {/* Desktop — animated line */}
        <motion.div
          animate={lineControls}
          initial={{ opacity: 0, scaleX: 0 }}
          className="hidden lg:block w-full mb-10"
          style={LINE_STYLE}
        />

        {/* Two-column grid: headline (3fr) | body (2fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-8 lg:gap-x-20 lg:items-end">

          {/* Left — eyebrow + headline */}
          <div className="lg:col-span-3">
            <motion.span
              initial={shouldReduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="block font-sans uppercase mb-5"
              style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--tumbaga)" }}
            >
              {eyebrow}
            </motion.span>

            <motion.h1
              initial={shouldReduce ? false : { opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.42, ease }}
              className="font-display font-light leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(4.5rem, 9.5vw, 9rem)" }}
            >
              <span className="block" style={{ color: "var(--marfil)" }}>{line1}</span>
              <span
                className="block"
                style={{ color: "var(--marfil)", opacity: 0.42, paddingLeft: "0.1em" }}
              >
                {line2}.
              </span>
            </motion.h1>
          </div>

          {/* Right — body paragraph */}
          <motion.div
            className="lg:col-span-2 lg:pb-1"
            initial={shouldReduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease }}
          >
            <p
              className="font-sans font-light leading-relaxed"
              style={{
                fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                color: "rgba(231, 213, 188, 0.68)",
                maxWidth: "46ch",
              }}
            >
              {subheadline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="relative w-px h-14 overflow-hidden">
          <div className="absolute inset-0 bg-marfil/12" />
          <motion.div
            className="absolute inset-x-0"
            style={{
              height: "200%",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(231,213,188,0.45) 50%, transparent 100%)",
            }}
            animate={shouldReduce ? undefined : { y: ["-100%", "100%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

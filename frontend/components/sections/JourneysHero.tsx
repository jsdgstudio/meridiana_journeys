"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import type { Locale } from "@/types/tour";

interface JourneysHeroProps {
  locale: Locale;
  pageIntro: { es: string; en: string };
}

const ease = [0.16, 1, 0.3, 1] as const;
const CONTRACT = 0.18;

// Marfil 50% — deliberadamente distinto del tumbaga de /sobre-meridiana
const LINE_STYLE = {
  height: "1px",
  backgroundColor: "rgba(231, 213, 188, 0.5)",
  transformOrigin: "center",
} as const;

const HEADLINE: Record<Locale, string> = {
  es: "Viajes",
  en: "Journeys",
};

const EYEBROW: Record<Locale, string> = {
  es: "Meridiana · Colombia",
  en: "Meridiana · Colombia",
};

export function JourneysHero({ locale, pageIntro }: JourneysHeroProps) {
  const shouldReduce = useReducedMotion();
  const lineControls = useAnimation();
  const [lineReady, setLineReady] = useState(false);
  const cancelRef = useRef(false);

  const title = HEADLINE[locale];

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
    lineControls.start({ scaleX: 1, transition: { duration: 1.0, ease: [0.4, 0, 0.2, 1] } });
  };

  const handleMouseLeave = () => {
    if (!lineReady || shouldReduce) return;
    lineControls.start({ scaleX: CONTRACT, transition: { duration: 1.9, ease: [0.45, 0, 0.15, 1] } });
  };

  return (
    <section
      className="relative w-full flex flex-col overflow-hidden"
      style={{ minHeight: "88dvh" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Content — anchored to bottom */}
      <div className="relative flex-1 flex flex-col justify-end px-6 md:px-10 lg:px-16 pb-16 lg:pb-24 pt-36">

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

        {/* Two-column grid: headline (3fr) | description (2fr) */}
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
              {EYEBROW[locale]}
            </motion.span>

            <motion.h1
              initial={shouldReduce ? false : { opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.42, ease }}
              className="font-display font-light leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(5.5rem, 13vw, 11.5rem)", color: "var(--marfil)" }}
            >
              {title}
            </motion.h1>
          </div>

          {/* Right — description */}
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
              {pageIntro[locale]}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
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

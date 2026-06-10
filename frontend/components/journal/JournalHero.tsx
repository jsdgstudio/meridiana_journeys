"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import type { Locale } from "@/types/tour";

interface JournalHeroProps {
  locale: Locale;
  ui: {
    headline: string;
    subtitle: string;
  };
}

const ease = [0.16, 1, 0.3, 1] as const;
const CONTRACT = 0.18;
const LINE_STYLE = {
  height: "1px",
  backgroundColor: "rgba(154, 122, 58, 0.5)",
  transformOrigin: "center",
} as const;

const DATELINE: Record<Locale, string> = {
  es: "Colombia, América Latina",
  en: "Colombia, Latin America",
};

export function JournalHero({ locale, ui }: JournalHeroProps) {
  const shouldReduce = useReducedMotion();
  const lineControls = useAnimation();
  const [lineReady, setLineReady] = useState(false);
  const cancelRef = useRef(false);

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
      className="bg-negro pt-32 pb-16 px-6 lg:px-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Mobile — static contracted line */}
        <div
          className="lg:hidden w-full mb-8"
          style={{ ...LINE_STYLE, transform: `scaleX(${CONTRACT})` }}
        />

        {/* Desktop — animated contracting line */}
        <motion.div
          animate={lineControls}
          initial={{ opacity: 0, scaleX: 0 }}
          className="hidden lg:block w-full mb-10"
          style={LINE_STYLE}
        />

        {/* Headline */}
        <motion.h1
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-display font-light text-marfil leading-none tracking-tight mb-8 whitespace-pre-line"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          {ui.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="font-sans font-light text-marfil/70 text-lg max-w-xl mb-12"
        >
          {ui.subtitle}
        </motion.p>

        {/* Dateline — geographic provenance, literary device */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          className="flex justify-end"
        >
          <span
            className="font-sans uppercase"
            style={{ fontSize: "9px", letterSpacing: "0.18em", color: "rgba(231,213,188,0.2)" }}
          >
            {DATELINE[locale]}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

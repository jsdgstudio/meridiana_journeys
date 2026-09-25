"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import type { AboutContent } from "@/types/content";
import type { Locale } from "@/types/tour";

interface AboutHeroProps {
  content: AboutContent["hero"];
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

        {/* Main title remains over the image; the editorial text begins below it. */}
        <div>
          <motion.h1
              initial={shouldReduce ? false : { opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.42, ease }}
              className="font-display font-light leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 9.5vw, 9rem)" }}
            >
              <span className="block" style={{ color: "var(--marfil)" }}>{line1}</span>
              <span
                className="block"
                style={{ color: "var(--marfil)", paddingLeft: "0.1em" }}
              >
                {line2}
              </span>
          </motion.h1>
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

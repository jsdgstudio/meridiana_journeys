"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { VisualImage } from "@/types/journal";
import type { Locale } from "@/types/tour";
import { viewport } from "@/lib/animations";

interface VisualNotebookProps {
  images: VisualImage[];
  locale: Locale;
  onImageClick: (index: number) => void;
}

export function VisualNotebook({ images, locale, onImageClick }: VisualNotebookProps) {
  const shouldReduce = useReducedMotion();
  const label = locale === "es" ? "Cuaderno visual completo" : "Full visual notebook";

  return (
    <section className="bg-negro py-16 lg:py-24 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <span
            className="block font-sans uppercase mb-4"
            style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--terracota)" }}
          >
            {label}
          </span>
          <div className="w-full h-px" style={{ borderTop: "1px solid var(--terracota)" }} />
        </div>

        {/* Masonry grid — CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-2">
          {images.map((img, i) => (
            <motion.div
              key={img.src + i}
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{
                duration: 0.5,
                delay: shouldReduce ? 0 : (i % 3) * 0.07,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ breakInside: "avoid", marginBottom: "8px", display: "inline-block", width: "100%" }}
            >
              <motion.button
                onClick={() => onImageClick(i)}
                className="block w-full relative overflow-hidden cursor-pointer"
                whileHover={shouldReduce ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                aria-label={img.alt[locale]}
              >
                <Image
                  src={img.src}
                  alt={img.alt[locale]}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.button>
              <p
                className="mt-1.5 font-sans font-light italic"
                style={{ fontSize: "12px", color: "var(--tumbaga)" }}
              >
                {img.caption[locale]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

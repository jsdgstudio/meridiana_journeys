"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { VisualImage } from "@/types/journal";
import type { Locale } from "@/types/tour";
import { useDialogFocus } from "@/hooks/useDialogFocus";

interface JournalLightboxProps {
  images: VisualImage[];
  activeIndex: number | null;
  locale: Locale;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function JournalLightbox({
  images,
  activeIndex,
  locale,
  onClose,
  onPrev,
  onNext,
}: JournalLightboxProps) {
  const shouldReduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isOpen = activeIndex !== null;
  const img = activeIndex !== null ? images[activeIndex] : null;

  useDialogFocus({ isOpen, containerRef, initialFocusRef: closeRef, onClose });

  // Arrow keys browse the notebook; Escape and Tab are handled by useDialogFocus.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onPrev, onNext]);

  return (
    <AnimatePresence>
      {isOpen && img && (
        <motion.div
          key="lightbox-overlay"
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(15,19,14,0.96)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={img.alt[locale]}
          ref={containerRef}
        >
          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-6 right-6 font-sans text-marfil/50 hover:text-marfil transition-colors text-sm tracking-widest uppercase z-10"
            aria-label={locale === "es" ? "Cerrar" : "Close"}
            tabIndex={0}
          >
            ✕
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 lg:left-8 font-sans text-2xl text-marfil/50 hover:text-marfil transition-colors z-10 p-4"
              aria-label={locale === "es" ? "Anterior" : "Previous"}
              tabIndex={0}
            >
              ←
            </button>
          )}

          {/* Image + caption */}
          <motion.div
            key={activeIndex}
            initial={shouldReduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduce ? undefined : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex flex-col items-center max-w-5xl w-full px-16 lg:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ maxHeight: "75vh" }}>
              <Image
                src={img.src}
                alt={img.alt[locale]}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                style={{ maxHeight: "75vh" }}
              />
            </div>
            <p
              aria-live="polite"
              className="mt-4 font-sans font-light italic text-center"
              style={{ fontSize: "13px", color: "var(--tumbaga)" }}
            >
              {img.caption[locale]}
            </p>
            {/* Counter */}
            <p
              className="mt-2 font-sans text-marfil/30"
              style={{ fontSize: "11px", letterSpacing: "0.15em" }}
            >
              {(activeIndex! + 1)} / {images.length}
            </p>
          </motion.div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 lg:right-8 font-sans text-2xl text-marfil/50 hover:text-marfil transition-colors z-10 p-4"
              aria-label={locale === "es" ? "Siguiente" : "Next"}
              tabIndex={0}
            >
              →
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

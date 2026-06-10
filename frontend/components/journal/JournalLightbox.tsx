"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { VisualImage } from "@/types/journal";
import type { Locale } from "@/types/tour";

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

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Focus trap: move focus to close button when opened
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Trap focus inside dialog
  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !containerRef.current) return;
    const focusable = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  };

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
          onKeyDown={handleTabKey}
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

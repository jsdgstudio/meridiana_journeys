"use client";

import { useRef, useEffect } from "react";
import { useInView, useAnimation, type AnimationControls } from "framer-motion";

interface UseScrollRevealOptions {
  once?: boolean;
  margin?: string;
}

interface UseScrollRevealReturn {
  ref: React.RefObject<HTMLElement | null>;
  controls: AnimationControls;
  isInView: boolean;
}

export function useScrollReveal({
  once = true,
  margin = "-80px",
}: UseScrollRevealOptions = {}): UseScrollRevealReturn {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  // framer-motion's MarginType is a branded string — cast needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once, margin: margin as any });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return { ref, controls, isInView };
}

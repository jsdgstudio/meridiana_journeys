"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-terracota text-marfil border border-terracota hover:opacity-90",
  secondary:
    "bg-transparent text-tumbaga border border-tumbaga hover:bg-tumbaga hover:text-negro",
  ghost:
    "bg-transparent text-current border-transparent hover:opacity-70",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm tracking-wider",
  md: "px-6 py-3 text-sm tracking-wider",
  lg: "px-8 py-4 text-base tracking-wider",
};

const baseStyles =
  "inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest rounded-none transition-colors duration-200 select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tumbaga";

function useMagnetic(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 18 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 14);
    rawY.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * 7);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { ref, x, y, onMouseMove, onMouseLeave };
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const isMagnetic = variant === "primary" || variant === "secondary";
  const magnetic = useMagnetic(isMagnetic);
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <motion.div
        ref={magnetic.ref}
        style={{ x: magnetic.x, y: magnetic.y }}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        className="inline-flex"
      >
        <motion.div
          whileTap={{ scale: 0.97, y: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="inline-flex"
        >
          <Link href={href} className={classes}>
            {children}
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={magnetic.ref}
      style={{ x: magnetic.x, y: magnetic.y }}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      className="inline-flex"
    >
      <motion.button
        whileTap={{ scale: 0.97, y: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

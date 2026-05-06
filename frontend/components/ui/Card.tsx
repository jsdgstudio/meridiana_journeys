"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  image: string;
  alt: string;
  href?: string;
  aspectRatio?: "4/3" | "3/2" | "16/9" | "1/1";
  children: React.ReactNode;
  className?: string;
}

const aspectStyles: Record<NonNullable<CardProps["aspectRatio"]>, string> = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
};

function CardInner({
  image,
  alt,
  aspectRatio = "4/3",
  children,
  className = "",
}: Omit<CardProps, "href">) {
  return (
    <div className={`group rounded-none overflow-hidden bg-negro ${className}`}>
      <div className={`relative ${aspectStyles[aspectRatio]} overflow-hidden`}>
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export function Card({ href, ...props }: CardProps) {
  if (href) {
    return (
      <motion.div
        whileHover={{ boxShadow: "0 2px 24px rgba(15, 19, 14, 0.18)" }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Link href={href} className="block">
          <CardInner {...props} />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ boxShadow: "0 2px 24px rgba(15, 19, 14, 0.18)" }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <CardInner {...props} />
    </motion.div>
  );
}

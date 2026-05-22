"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { viewport } from "@/lib/animations";
import type { AboutContent, TeamMember } from "@/types/content";
import type { Locale } from "@/types/tour";

interface TeamCardsProps {
  content: AboutContent["team"];
  locale: Locale;
}

interface TeamCardProps {
  member: TeamMember;
  locale: Locale;
  index: number;
}

function TeamCard({ member, locale, index }: TeamCardProps) {
  const [open, setOpen] = useState(false);
  const bioLines = member.bio[locale].split("\n\n");
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 20,
        delay: index * 0.12,
      }}
      className="flex flex-col overflow-hidden"
      style={{
        background: "var(--gradient-card)",
        borderLeft: "2px solid rgba(154,122,58,0.35)",
      }}
    >
      {/* ── Header — siempre visible ─────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="text-left w-full p-8 lg:p-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tumbaga"
        aria-expanded={open}
      >
        {/* Número decorativo */}
        <span
          aria-hidden
          className="font-display font-light select-none block mb-6"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 5rem)",
            lineHeight: 1,
            color: "rgba(154,122,58,0.12)",
            letterSpacing: "-0.03em",
          }}
        >
          0{index + 1}
        </span>

        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center"
              style={{
                border: "1px solid rgba(231,213,188,0.15)",
                background: "rgba(26,46,36,0.8)",
              }}
            >
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span
                  className="font-display font-light"
                  style={{ fontSize: "var(--text-md)", color: "var(--tumbaga)" }}
                >
                  {initials}
                </span>
              )}
            </div>

            <div>
              <h3
                className="font-display font-light leading-snug"
                style={{ fontSize: "var(--text-lg)", color: "var(--marfil)" }}
              >
                {member.name}
              </h3>
              <p
                className="font-sans mt-1 uppercase tracking-widest"
                style={{ fontSize: "0.7rem", color: "var(--tumbaga)" }}
              >
                {member.role[locale]}
              </p>
            </div>
          </div>

          {/* Chevron */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex-shrink-0 mt-1"
            style={{ color: open ? "var(--terracota)" : "rgba(154,122,58,0.5)" }}
            aria-hidden
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 7l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </div>
      </button>

      {/* ── Bio — fondo terracota ─────────────────────────────── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="bio"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 22 }}
            style={{ overflow: "hidden" }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              style={{ background: "var(--terracota)" }}
            >
              {/* Label */}
              <div
                className="px-8 lg:px-10 pt-7 pb-2 flex items-center gap-3"
                style={{ borderTop: "1px solid rgba(154,122,58,0.4)" }}
              >
                <div className="h-px flex-1" style={{ background: "rgba(154,122,58,0.5)" }} />
                <span
                  className="font-sans uppercase tracking-widest flex-shrink-0"
                  style={{ fontSize: "0.65rem", color: "var(--tumbaga)" }}
                >
                  {locale === "es" ? "Trayectoria" : "Background"}
                </span>
                <div className="h-px flex-1" style={{ background: "rgba(154,122,58,0.5)" }} />
              </div>

              {/* Párrafos */}
              <div className="px-8 lg:px-10 pb-9 pt-5 space-y-4">
                {bioLines.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-sans leading-relaxed"
                    style={{
                      fontSize: i === 0 ? "var(--text-sm)" : "var(--text-sm)",
                      color: i === 0 ? "rgba(247,244,238,0.90)" : "rgba(247,244,238,0.72)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function TeamCards({ content, locale }: TeamCardsProps) {
  return (
    <SectionWrapper theme="dark">
      <Container>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="flex items-center gap-4 mb-14"
        >
          <div className="w-6 h-px" style={{ background: "var(--tumbaga)" }} />
          <span
            className="font-sans uppercase tracking-widest"
            style={{ fontSize: "0.65rem", color: "var(--tumbaga)" }}
          >
            {content.headline[locale]}
          </span>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {content.members.map((member, i) => (
            <TeamCard key={member.name} member={member} locale={locale} index={i} />
          ))}
        </div>

        {/* Hint desktop */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:block mt-5 font-sans"
          style={{
            fontSize: "0.65rem",
            color: "rgba(231,213,188,0.20)",
            letterSpacing: "0.08em",
          }}
        >
          {locale === "es"
            ? "Pasa el cursor sobre cada tarjeta para leer la bio completa"
            : "Hover each card to read the full bio"}
        </motion.p>
      </Container>
    </SectionWrapper>
  );
}

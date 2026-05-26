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

/* ── ease-out-quint ────────────────────────────────────────── */
const easeOutQuint: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, delay: index * 0.10, ease: easeOutQuint }}
      className="flex flex-col overflow-hidden"
      style={{
        background: "var(--gradient-card)",
        border: "1px solid rgba(231,213,188,0.08)",
      }}
    >
      {/* ── Cabecera ─────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="text-left w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tumbaga"
        style={{ padding: "2.5rem 2.5rem 2rem" }}
        aria-expanded={open}
      >
        {/* Ordinal */}
        <span
          aria-hidden
          className="font-display font-light select-none block"
          style={{
            fontSize: "clamp(3rem, 7vw, 4.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "rgba(154,122,58,0.10)",
            marginBottom: "1.5rem",
          }}
        >
          0{index + 1}
        </span>

        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                width: "clamp(88px, 10vw, 123px)",
                height: "clamp(88px, 10vw, 123px)",
                border: "1px solid rgba(231,213,188,0.12)",
                background: "rgba(26,46,36,0.70)",
              }}
            >
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={123}
                  height={123}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span
                  className="font-display font-light select-none"
                  style={{ fontSize: "var(--text-xl)", color: "var(--tumbaga)" }}
                >
                  {initials}
                </span>
              )}
            </div>

            <div>
              <h3
                className="font-display font-light"
                style={{
                  fontSize: "var(--text-lg)",
                  lineHeight: "var(--leading-snug)",
                  color: "var(--marfil)",
                }}
              >
                {member.name}
              </h3>
              <p
                className="font-sans uppercase tracking-widest mt-1"
                style={{ fontSize: "0.68rem", color: "var(--tumbaga)" }}
              >
                {member.role[locale]}
              </p>
            </div>
          </div>

          {/* Indicador */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: easeOutQuint }}
            aria-hidden
            style={{
              flexShrink: 0,
              marginTop: 4,
              color: open ? "rgba(154,122,58,0.80)" : "rgba(154,122,58,0.35)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 6l4.5 4.5L12.5 6"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </div>
      </button>

      {/* ── Bio — negro, marfil, tumbaga ─────────────────────── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="bio"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: easeOutQuint },
              opacity: { duration: 0.28, ease: "easeOut" },
            }}
            style={{ overflow: "hidden" }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div
              style={{
                background: "var(--negro)",
                borderTop: "1px solid rgba(154,122,58,0.18)",
                padding: "2rem 2.5rem 2.75rem",
              }}
            >
              {/* Etiqueta */}
              <p
                className="font-sans uppercase tracking-widest"
                style={{
                  fontSize: "0.62rem",
                  color: "rgba(154,122,58,0.65)",
                  marginBottom: "1.25rem",
                }}
              >
                {locale === "es" ? "Trayectoria" : "Background"}
              </p>

              {/* Párrafos */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {bioLines.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-sans"
                    style={{
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-relaxed)",
                      color:
                        i === 0
                          ? "rgba(231,213,188,0.80)"
                          : "rgba(231,213,188,0.52)",
                      maxWidth: "62ch",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
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
        {/* Etiqueta de sección */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: easeOutQuint }}
          className="flex items-center gap-4"
          style={{ marginBottom: "3.5rem" }}
        >
          <div
            style={{ width: 24, height: 1, background: "var(--tumbaga)", flexShrink: 0 }}
          />
          <span
            className="font-sans uppercase tracking-widest"
            style={{ fontSize: "0.62rem", color: "var(--tumbaga)" }}
          >
            {content.headline[locale]}
          </span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {content.members.map((member, i) => (
            <TeamCard key={member.name} member={member} locale={locale} index={i} />
          ))}
        </div>

        {/* Instrucción — solo desktop */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hidden lg:block font-sans"
          style={{
            marginTop: "1.25rem",
            fontSize: "0.62rem",
            letterSpacing: "0.07em",
            color: "rgba(231,213,188,0.18)",
          }}
        >
          {locale === "es"
            ? "Pasa el cursor para leer la trayectoria completa"
            : "Hover to read the full background"}
        </motion.p>
      </Container>
    </SectionWrapper>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { viewport } from "@/lib/animations";
import type { AboutContent, TeamMember } from "@/types/content";
import type { Locale } from "@/types/tour";

interface TeamCardsProps {
  content: AboutContent["team"];
  locale: Locale;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Profile({
  member,
  locale,
  index,
}: {
  member: TeamMember;
  locale: Locale;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const bioLines = member.bio[locale].split("\n\n");
  const photoRight = index % 2 === 1;

  const expandLabel = locale === "es" ? "Ver trayectoria completa" : "Read full background";
  const collapseLabel = locale === "es" ? "Cerrar" : "Close";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, delay: index * 0.14, ease }}
      className={`grid grid-cols-1 lg:items-start gap-8 lg:gap-20 ${
        photoRight ? "lg:grid-cols-[1fr_220px]" : "lg:grid-cols-[220px_1fr]"
      }`}
    >
      {/* ── Photo ──────────────────────────────────────────────────── */}
      <div className={`flex justify-center lg:block ${photoRight ? "lg:order-2" : ""}`}>
        <div
          className="relative overflow-hidden"
          style={{
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            border: "1px solid rgba(154,122,58,0.32)",
            flexShrink: 0,
          }}
        >
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="220px"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "rgba(26,46,36,0.70)" }}
            >
              <span className="font-display font-light text-tumbaga text-3xl">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Texto ──────────────────────────────────────────────────── */}
      <div className={photoRight ? "lg:order-1" : ""}>
        {/* Línea tumbaga */}
        <div
          className="mb-7 w-full"
          style={{ height: "1px", background: "rgba(154,122,58,0.30)" }}
        />

        {/* Nombre — centrado en móvil */}
        <h3
          className="font-display font-light text-marfil leading-none tracking-tight mb-3 text-center lg:text-left"
          style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)" }}
        >
          {member.name}
        </h3>

        {/* Rol — centrado en móvil */}
        <p
          className="font-sans uppercase mb-8 text-center lg:text-left"
          style={{
            fontSize: "10px",
            letterSpacing: "0.20em",
            color: "var(--tumbaga)",
          }}
        >
          {member.role[locale]}
        </p>

        {/* Primer párrafo — siempre visible */}
        <p
          className="font-sans font-light leading-relaxed mb-5"
          style={{
            fontSize: "clamp(0.875rem, 1.05vw, 0.9375rem)",
            color: "rgba(231,213,188,0.72)",
            maxWidth: "60ch",
            width: "100%",
          }}
        >
          {bioLines[0]}
        </p>

        {/* Párrafos adicionales — expand por click */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="extra"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                height: { duration: 0.52, ease },
                opacity: { duration: 0.32, ease: "easeOut" },
              }}
              style={{ overflow: "hidden" }}
            >
              <div className="flex flex-col gap-4 pb-5">
                {bioLines.slice(1).map((p, i) => (
                  <p
                    key={i}
                    className="font-sans font-light leading-relaxed"
                    style={{
                      fontSize: "clamp(0.875rem, 1.05vw, 0.9375rem)",
                      color: "rgba(231,213,188,0.52)",
                      maxWidth: "60ch",
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle */}
        {bioLines.length > 1 && (
          <motion.button
            onClick={() => setExpanded((v) => !v)}
            className="font-sans text-left"
            whileHover={{ color: "rgba(154,122,58,0.90)" }}
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "rgba(154,122,58,0.50)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {expanded ? collapseLabel : expandLabel}
            <motion.span
              animate={{ x: expanded ? 0 : [0, 3, 0] }}
              transition={
                expanded
                  ? {}
                  : { duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }
              }
              style={{ display: "inline-block" }}
            >
              →
            </motion.span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export function TeamCards({ content, locale }: TeamCardsProps) {
  return (
    <section
      className="w-full py-24 lg:py-36 text-marfil"
      style={{
        background: `
          radial-gradient(ellipse 90% 90% at 8% 50%, rgba(154,122,58,0.13) 0%, transparent 52%),
          radial-gradient(ellipse 70% 70% at 92% 50%, rgba(154,122,58,0.08) 0%, transparent 48%),
          #0F130E
        `,
      }}
    >
      <Container>
        {/* Cabecera de sección */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-4 mb-16 lg:mb-24"
        >
          <div
            style={{ width: 18, height: 1, background: "rgba(154,122,58,0.55)", flexShrink: 0 }}
          />
          <span
            className="font-sans uppercase tracking-widest"
            style={{ fontSize: "10px", color: "rgba(154,122,58,0.65)" }}
          >
            {content.headline[locale]}
          </span>
        </motion.div>

        {/* Perfiles */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {content.members.map((member, i) => (
            <div key={member.name}>
              <Profile member={member} locale={locale} index={i} />

              {/* Separador entre perfiles */}
              {i < content.members.length - 1 && (
                <div
                  className="mt-20 lg:mt-28 w-full"
                  style={{ height: "1px", background: "rgba(154,122,58,0.10)" }}
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

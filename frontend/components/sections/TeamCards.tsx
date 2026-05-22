"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { fadeInUp, viewport } from "@/lib/animations";
import type { AboutContent, TeamMember } from "@/types/content";
import type { Locale } from "@/types/tour";

interface TeamCardsProps {
  content: AboutContent["team"];
  locale: Locale;
}

interface TeamCardProps {
  member: TeamMember;
  locale: Locale;
}

function TeamCard({ member, locale }: TeamCardProps) {
  const [open, setOpen] = useState(false);

  const bioLines = member.bio[locale].split("\n\n");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeInUp}
      className="flex flex-col"
      style={{ background: "var(--gradient-card)" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
    >
      {/* Card header — always visible */}
      <div className="p-8 flex flex-col gap-6 cursor-pointer select-none">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden border border-marfil/20 flex-shrink-0 bg-verde/60">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span
                className="font-display text-xl font-light"
                style={{ color: "var(--tumbaga)" }}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {/* Name + role + expand indicator */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3
              className="font-display font-light leading-snug"
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--marfil)",
              }}
            >
              {member.name}
            </h3>
            <p
              className="font-sans mt-1"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--tumbaga)",
                letterSpacing: "0.06em",
              }}
            >
              {member.role[locale]}
            </p>
          </div>

          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-shrink-0 mb-1"
            style={{ color: "var(--tumbaga)" }}
            aria-hidden
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 6l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </div>
      </div>

      {/* Bio — expandable */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="bio"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-8 pb-8 space-y-4 border-t"
              style={{ borderColor: "var(--border-light)", paddingTop: "1.5rem" }}
            >
              {bioLines.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-sans leading-relaxed"
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "rgba(231,213,188,0.60)",
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function TeamCards({ content, locale }: TeamCardsProps) {
  return (
    <SectionWrapper theme="dark">
      <Container>
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-6 h-px" style={{ background: "var(--tumbaga)" }} />
          <span
            className="font-sans uppercase"
            style={{
              fontSize: "var(--text-xs)",
              letterSpacing: "0.12em",
              color: "var(--tumbaga)",
            }}
          >
            {content.headline[locale]}
          </span>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {content.members.map((member) => (
            <TeamCard key={member.name} member={member} locale={locale} />
          ))}
        </div>

        {/* Hover hint — desktop only */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8, delay: 0.5 } },
          }}
          className="hidden lg:block mt-6 font-sans"
          style={{
            fontSize: "var(--text-xs)",
            color: "rgba(231,213,188,0.25)",
            letterSpacing: "0.06em",
          }}
        >
          {locale === "es" ? "Pasa el cursor para leer la bio completa" : "Hover to read the full bio"}
        </motion.p>
      </Container>
    </SectionWrapper>
  );
}

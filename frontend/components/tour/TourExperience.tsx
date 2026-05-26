"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import type { Tour, Locale, ExperienceData } from "@/types/tour";

interface TourExperienceProps {
  tour: Tour;
  locale: Locale;
}

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

const metricLabels = {
  culturalDepth:  { es: "Profundidad cultural", en: "Cultural depth"   },
  physicalDemand: { es: "Exigencia física",      en: "Physical demand"  },
  comfort:        { es: "Confort",               en: "Comfort"          },
  groupIntimacy:  { es: "Intimidad del grupo",   en: "Group intimacy"   },
};

const factLabels = {
  duration:      { es: "Duración",         en: "Duration"       },
  departures:    { es: "Salidas",          en: "Departures"     },
  groupSize:     { es: "Tamaño",           en: "Group size"     },
  pace:          { es: "Ritmo",            en: "Pace"           },
  language:      { es: "Idioma",           en: "Language"       },
  startPoint:    { es: "Punto de inicio",  en: "Start point"    },
  endPoint:      { es: "Punto de cierre",  en: "End point"      },
  season:        { es: "Temporada",        en: "Season"         },
  physicalLevel: { es: "Nivel físico",     en: "Physical level" },
};

const sectionLabels = {
  title:     { es: "La experiencia",           en: "The experience"        },
  signature: { es: "Experiencias distintivas", en: "Signature experiences" },
  idealFor:  { es: "Ideal para",               en: "Ideal for"             },
};

type RatingKey = "culturalDepth" | "physicalDemand" | "comfort" | "groupIntimacy";
type FactKey =
  | "duration" | "departures" | "groupSize" | "pace"
  | "language" | "startPoint" | "endPoint" | "season" | "physicalLevel";

interface MetricBarProps {
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
}

function MetricBar({ label, value }: MetricBarProps) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        {/* Label: sentence case, weight 300, no uppercase */}
        <span
          className="font-sans"
          style={{
            fontSize: "14px",
            fontWeight: 300,
            color: "rgba(231,213,188,0.75)",
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </span>
        {/* Number: Cormorant weight 400, legible without being heavy */}
        <div className="flex items-baseline gap-0.5">
          <span
            className="font-display"
            style={{ fontSize: "2rem", lineHeight: 1, fontWeight: 400, color: "var(--tumbaga)" }}
          >
            {value}
          </span>
          <span
            className="font-display"
            style={{ fontSize: "0.9rem", fontWeight: 300, color: "rgba(154,122,58,0.45)", lineHeight: 1 }}
          >
            /5
          </span>
        </div>
      </div>

      {/* Bar track */}
      <div className="relative" style={{ height: "3px", background: "rgba(231,213,188,0.08)" }}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
          className="absolute inset-y-0 left-0 origin-left"
          style={{ width: `${(value / 5) * 100}%`, background: "var(--tumbaga)" }}
        />
        {[1, 2, 3, 4].map((tick) => (
          <div
            key={tick}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${(tick / 5) * 100}%`, background: "rgba(231,213,188,0.07)" }}
          />
        ))}
      </div>
    </div>
  );
}

export function TourExperience({ tour, locale }: TourExperienceProps) {
  const { experience, signatureExperiences, idealFor } = tour;

  const metrics: { key: RatingKey; label: string }[] = [
    { key: "culturalDepth",  label: metricLabels.culturalDepth[locale]  },
    { key: "physicalDemand", label: metricLabels.physicalDemand[locale] },
    { key: "comfort",        label: metricLabels.comfort[locale]        },
    { key: "groupIntimacy",  label: metricLabels.groupIntimacy[locale]  },
  ];

  const factOrder: FactKey[] = [
    "duration", "departures", "groupSize", "pace", "language",
    "startPoint", "endPoint", "season", "physicalLevel",
  ];

  const facts = factOrder
    .map((key) => {
      const value = experience[key as keyof ExperienceData] as
        | { es: string; en: string }
        | undefined;
      return value ? { key, label: factLabels[key][locale], value: value[locale] } : null;
    })
    .filter((f): f is { key: FactKey; label: string; value: string } => f !== null);

  return (
    <SectionWrapper theme="verde">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left: metrics + facts ─────────────────────────── */}
          <div className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-10"
              >
                <div className="w-6 h-px" style={{ background: "var(--tumbaga)" }} />
                <h2
                  className="font-display font-light leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--marfil)" }}
                >
                  {sectionLabels.title[locale]}
                </h2>
              </motion.div>

              <div className="space-y-8">
                {metrics.map(({ key, label }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                  >
                    <MetricBar label={label} value={experience[key]} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Facts table
                · dt: sentence case, weight 300, marfil 50% — secondary without uppercase
                · dd: 15px weight 300-400, marfil 88%
                · Mobile: block stack. sm+: 2-col grid
            */}
            {facts.length > 0 && (
              <motion.dl
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="pt-6 border-t"
                style={{ borderColor: "rgba(231,213,188,0.10)" }}
              >
                {facts.map((f, i) => (
                  <motion.div
                    key={f.key}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="py-3.5 border-b sm:grid sm:grid-cols-[150px_1fr] sm:gap-6"
                    style={{ borderColor: "rgba(231,213,188,0.07)" }}
                  >
                    <dt
                      className="font-sans mb-0.5 sm:mb-0 sm:pt-px"
                      style={{
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "rgba(231,213,188,0.50)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {f.label}
                    </dt>
                    <dd
                      className="font-sans leading-snug"
                      style={{
                        fontSize: "15px",
                        fontWeight: 300,
                        color: "rgba(231,213,188,0.90)",
                      }}
                    >
                      {f.value}
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>
            )}
          </div>

          {/* ── Right: signature + idealFor ───────────────────── */}
          <div
            className="space-y-12 lg:pl-10 lg:border-l"
            style={{ borderColor: "rgba(231,213,188,0.07)" }}
          >
            {/* Signature experiences
                · eyebrow: Cormorant italic — más editorial que sans-uppercase
                · text: 16px weight 300, marfil 88%, leading 1.5
                · accent: thin 2px line in tour identity color
            */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-display font-light italic mb-7"
                style={{
                  fontSize: "1.1rem",
                  color: "rgba(231,213,188,0.55)",
                  letterSpacing: "0.01em",
                }}
              >
                {sectionLabels.signature[locale]}
              </motion.p>

              <ul className="space-y-5">
                {signatureExperiences.map((exp, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="flex items-start gap-4"
                  >
                    <span
                      className="flex-shrink-0"
                      style={{
                        display: "block",
                        width: "2px",
                        height: "18px",
                        marginTop: "3px",
                        background: "var(--tumbaga)",
                        opacity: 0.70,
                      }}
                    />
                    <span
                      className="font-sans"
                      style={{
                        fontSize: "16px",
                        fontWeight: 300,
                        lineHeight: 1.55,
                        color: "rgba(231,213,188,0.88)",
                      }}
                    >
                      {exp[locale]}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tags "Ideal para"
                · eyebrow: Cormorant italic (same as signature eyebrow)
                · tags: no uppercase, weight 300, marfil 72% text
                · border: tumbaga 28% — warm gold, not orange
                · hover: tumbaga border strengthens to 60%
            */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p
                className="font-display font-light italic mb-5"
                style={{
                  fontSize: "1.1rem",
                  color: "rgba(231,213,188,0.55)",
                  letterSpacing: "0.01em",
                }}
              >
                {sectionLabels.idealFor[locale]}
              </p>

              <div className="flex flex-wrap gap-2">
                {idealFor.map((tag, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ borderColor: "rgba(154,122,58,0.60)" }}
                    transition={{ duration: 0.2 }}
                    className="font-sans px-3 py-1.5 border"
                    style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      letterSpacing: "0.02em",
                      color: "rgba(231,213,188,0.72)",
                      borderColor: "rgba(154,122,58,0.28)",
                    }}
                  >
                    {tag[locale]}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </Container>
    </SectionWrapper>
  );
}

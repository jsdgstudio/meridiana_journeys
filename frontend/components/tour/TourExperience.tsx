"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { Tour, Locale } from "@/types/tour";

interface TourExperienceProps {
  tour: Tour;
  locale: Locale;
}

const metricLabels = {
  culturalDepth:    { es: "Profundidad cultural",  en: "Cultural depth"    },
  physicalDemand:   { es: "Exigencia física",       en: "Physical demand"   },
  comfort:          { es: "Confort",                en: "Comfort"           },
  groupIntimacy:    { es: "Intimidad del grupo",    en: "Group intimacy"    },
};

const sectionLabels = {
  title:      { es: "La experiencia",            en: "The experience"        },
  signature:  { es: "Experiencias distintivas",  en: "Signature experiences" },
  idealFor:   { es: "Ideal para",                en: "Ideal for"             },
};

interface MetricBarProps {
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
}

function MetricBar({ label, value }: MetricBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="font-sans text-sm text-negro/60">{label}</span>
        <span className="font-display text-lg font-light text-negro/30">
          {value}/5
        </span>
      </div>
      <div className="h-px bg-negro/10 relative overflow-visible">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ width: `${(value / 5) * 100}%` }}
          className="absolute top-0 left-0 h-px bg-tumbaga origin-left"
        />
        {/* Tick marks */}
        <div className="absolute top-0 left-0 right-0 flex justify-between">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`w-px h-2 -mt-0.5 ${
                n <= value ? "bg-tumbaga" : "bg-negro/15"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TourExperience({ tour, locale }: TourExperienceProps) {
  const { experience, signatureExperiences, idealFor } = tour;

  const metrics: { key: keyof typeof experience; label: string }[] = [
    { key: "culturalDepth",  label: metricLabels.culturalDepth[locale]  },
    { key: "physicalDemand", label: metricLabels.physicalDemand[locale] },
    { key: "comfort",        label: metricLabels.comfort[locale]        },
    { key: "groupIntimacy",  label: metricLabels.groupIntimacy[locale]  },
  ];

  return (
    <SectionWrapper theme="verde">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — metrics */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-6 h-px bg-tumbaga" />
              <Heading as="h2" className="text-marfil">
                {sectionLabels.title[locale]}
              </Heading>
            </div>

            <div className="space-y-8">
              {metrics.map(({ key, label }) => (
                <MetricBar
                  key={key}
                  label={label}
                  value={experience[key]}
                />
              ))}
            </div>
          </div>

          {/* Right — signature + idealFor */}
          <div className="space-y-12">
            {/* Signature experiences */}
            <div>
              <p className="label text-xs tracking-widest uppercase text-tumbaga mb-6">
                {sectionLabels.signature[locale]}
              </p>
              <ul className="space-y-4">
                {signatureExperiences.map((exp, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-tumbaga text-xs mt-1 flex-shrink-0">—</span>
                    <span className="font-sans text-sm leading-relaxed text-marfil/70">
                      {exp[locale]}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Ideal for */}
            <div>
              <p className="label text-xs tracking-widest uppercase text-tumbaga mb-4">
                {sectionLabels.idealFor[locale]}
              </p>
              <div className="flex flex-wrap gap-2">
                {idealFor.map((tag, i) => (
                  <span
                    key={i}
                    className="font-sans text-xs text-marfil/60 border border-marfil-20 px-3 py-1.5"
                  >
                    {tag[locale]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

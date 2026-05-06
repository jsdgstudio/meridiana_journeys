import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { getAboutContent } from "@/hooks/useContent";
import { Hero } from "@/components/sections/Hero";
import { AboutStory } from "@/components/sections/AboutStory";
import { AboutValues } from "@/components/sections/AboutValues";
import { CallToAction } from "@/components/sections/CallToAction";

interface AboutPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = params;
  return {
    title:
      locale === "es"
        ? "Nosotros — Meridiana"
        : "About — Meridiana",
    description:
      locale === "es"
        ? "Meridiana nació de una pregunta: ¿qué significa viajar de verdad? Somos una empresa pequeña a propósito."
        : "Meridiana was born from a question: what does it mean to travel, truly? We are a small company by design.",
  };
}

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = params;
  const content = getAboutContent();

  return (
    <>
      <Hero content={content.hero} locale={locale} />
      <AboutStory content={content.story} locale={locale} />
      <AboutValues content={content.values} locale={locale} />
      <CallToAction content={content.cta} locale={locale} />
    </>
  );
}

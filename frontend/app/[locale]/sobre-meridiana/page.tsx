import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { getAboutContent } from "@/hooks/useContent";
import { Hero } from "@/components/sections/Hero";
import { AboutStory } from "@/components/sections/AboutStory";
import { TeamCards } from "@/components/sections/TeamCards";
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
        ? "Sobre Meridiana — Meridiana"
        : "About Meridiana — Meridiana",
    description:
      locale === "es"
        ? "Somos una agencia de viajes culturales hechos a la medida que conecta a viajeros conscientes con la esencia de una Colombia auténtica, biodiversa y excepcionalmente creativa."
        : "We are a bespoke cultural travel agency that connects conscious travellers with the essence of an authentic, biodiverse, and exceptionally creative Colombia.",
  };
}

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = params;
  const content = getAboutContent();

  return (
    <>
      <Hero content={content.hero} locale={locale} />
      <AboutStory content={content.story} locale={locale} />
      <TeamCards content={content.team} locale={locale} />
      <CallToAction content={content.cta} locale={locale} />
    </>
  );
}

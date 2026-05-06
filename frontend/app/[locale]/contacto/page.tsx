import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { getContactContent } from "@/hooks/useContent";
import { getAllTours } from "@/hooks/useTours";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ContactForm } from "@/components/sections/ContactForm";

interface ContactPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = params;
  return {
    title:
      locale === "es"
        ? "Contacto — Meridiana"
        : "Contact — Meridiana",
    description:
      locale === "es"
        ? "Comencemos una conversación. No hay compromiso en preguntar."
        : "Let's begin a conversation. There's no commitment in asking.",
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = params;
  const content = getContactContent();
  const tours = getAllTours().map((t) => ({ id: t.id, title: t.title }));

  return (
    <>
      {/* Page header */}
      <SectionWrapper theme="dark" className="pt-36 pb-20">
        <Container size="narrow">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-tumbaga" />
            <span className="label text-xs tracking-widest uppercase text-tumbaga">
              Meridiana
            </span>
          </div>
          <Heading as="h1" className="text-marfil mb-6">
            {content.headline[locale]}
          </Heading>
          <p className="font-sans text-base leading-relaxed text-marfil/55 max-w-md">
            {content.description[locale]}
          </p>
        </Container>
      </SectionWrapper>

      {/* Form + contact info */}
      <SectionWrapper theme="page">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

            {/* Form — 3/5 width */}
            <div className="lg:col-span-3">
              <ContactForm content={content} tours={tours} locale={locale} />
            </div>

            {/* Contact info — 2/5 width */}
            <div className="lg:col-span-2 space-y-10 lg:pt-0">
              {/* Divider on mobile */}
              <div className="w-12 h-px bg-tumbaga lg:hidden" />

              <div className="space-y-8">
                {/* Email */}
                <div className="space-y-2">
                  <p className="label text-xs tracking-widest uppercase text-negro/35">
                    {locale === "es" ? "Correo" : "Email"}
                  </p>
                  <a
                    href={`mailto:${content.email}`}
                    className="font-sans text-sm text-negro hover:opacity-60 transition-opacity duration-200"
                  >
                    {content.email}
                  </a>
                </div>

                {/* Response time */}
                <div className="space-y-2">
                  <p className="label text-xs tracking-widest uppercase text-negro/35">
                    {locale === "es" ? "Tiempo de respuesta" : "Response time"}
                  </p>
                  <p className="font-sans text-sm text-negro/70">
                    {content.responseTime[locale]}
                  </p>
                </div>

                {/* Reassurance */}
                <div className="border-t border-negro/10 pt-8">
                  <p className="font-sans text-sm leading-relaxed text-negro/50 italic">
                    {content.reassurance[locale]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}

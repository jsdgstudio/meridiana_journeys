import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { getContactContent } from "@/hooks/useContent";
import { ContactHero } from "@/components/sections/ContactHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/ui/Container";
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

  return (
    <>
      <ContactHero
        headline={content.headline}
        description={content.description}
        locale={locale}
      />

      {/* Form + contact info */}
      <SectionWrapper theme="page">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

            {/* Form — 3/5 width */}
            <div className="lg:col-span-3">
              <ContactForm content={content} locale={locale} />
            </div>

            {/* Contact info — 2/5 width */}
            <div className="lg:col-span-2 space-y-10 lg:pt-1">
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

                {/* WhatsApp */}
                <div className="space-y-2">
                  <p className="label text-xs tracking-widest uppercase text-negro/35">
                    {content.whatsapp.label[locale]}
                  </p>
                  <a
                    href={content.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-sans text-sm text-negro hover:opacity-60 transition-opacity duration-200 group"
                  >
                    {/* WhatsApp icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="text-negro/50 group-hover:text-negro transition-colors duration-200 shrink-0"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {content.whatsapp.number}
                  </a>
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

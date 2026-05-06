import type { Metadata } from "next";
import type { Locale } from "@/types/tour";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Providers } from "@/components/layout/Providers";
import esStrings from "@/content/i18n/es.json";
import enStrings from "@/content/i18n/en.json";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

const uiStrings = { es: esStrings, en: enStrings };

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Meridiana",
  url: "https://meridianajourneys.com",
  description:
    "Experiencias de viaje cultural por Colombia y América Latina. Narrativa antes que logística.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hola@meridianajourneys.com",
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
  },
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://meridianajourneys.com/${params.locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const ui = uiStrings[params.locale] ?? esStrings;
  const skipLabel = params.locale === "es" ? "Ir al contenido" : "Skip to content";

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        {/* JSON-LD Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Skip-to-content — accessible, hidden until focused */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-negro focus:text-marfil focus:text-sm focus:font-sans focus:uppercase focus:tracking-widest focus:outline focus:outline-2 focus:outline-tumbaga"
        >
          {skipLabel}
        </a>

        <Providers>
          <Navbar locale={params.locale} ui={ui} />
          <PageWrapper>{children}</PageWrapper>
          <Footer locale={params.locale} ui={ui} />
        </Providers>
      </body>
    </html>
  );
}

import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  locale: string;
  ui: {
    nav: Record<string, string>;
    footer: Record<string, string>;
  };
}

export function Footer({ locale, ui }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = ui.footer.copyright.replace("{year}", String(year));

  const navLinks = [
    { label: ui.nav.journeys, href: `/${locale}/viajes` },
    { label: ui.nav.journal, href: `/${locale}/journal` },
    { label: ui.nav.about, href: `/${locale}/sobre-meridiana` },
    { label: ui.nav.contact, href: `/${locale}/contacto` },
  ];

  return (
    <footer className="bg-negro text-marfil">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">

          {/* Col 1 — Brand */}
          <div className="space-y-6">
            <Link
              href={`/${locale}`}
              className="hover:opacity-70 transition-opacity duration-200 inline-flex items-center"
            >
              <Image
                src="/images/logo_meridiana_marfil.svg"
                alt="Meridiana"
                width={160}
                height={36}
                className="h-9 w-auto"
              />
            </Link>
            <p className="font-sans text-sm leading-relaxed opacity-60 max-w-xs">
              {ui.footer.tagline}
            </p>
            <p className="font-sans text-xs leading-relaxed opacity-40 max-w-xs">
              Colombia &amp; América Latina
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div className="space-y-6">
            <p className="label text-xs tracking-widest uppercase opacity-40">
              {ui.footer.navigation}
            </p>
            <nav className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <div key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity duration-200"
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </nav>
            <div className="pt-4 border-t border-marfil-20 space-y-3">
              <p className="label text-xs tracking-widest uppercase opacity-40">
                {ui.footer.legal}
              </p>
              <div>
                <Link
                  href={`/${locale}/privacidad`}
                  className="font-sans text-xs opacity-40 hover:opacity-70 transition-opacity duration-200"
                >
                  {ui.footer.privacy}
                </Link>
              </div>
              <div>
                <Link
                  href={`/${locale}/terminos`}
                  className="font-sans text-xs opacity-40 hover:opacity-70 transition-opacity duration-200"
                >
                  {ui.footer.terms}
                </Link>
              </div>
            </div>
          </div>

          {/* Col 3 — Contact */}
          <div className="space-y-6">
            <p className="label text-xs tracking-widest uppercase opacity-40">
              {ui.footer.contact}
            </p>
            <div className="space-y-4">
              <a
                href="mailto:info@meridianajourneys.com"
                className="block font-sans text-sm opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                info@meridianajourneys.com
              </a>
              <div className="space-y-1">
                <p className="font-sans text-xs opacity-40">Bogotá, Colombia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-marfil-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-sans text-xs opacity-30">{copyright}</p>
          <p className="font-sans text-xs opacity-30 italic font-display">
            {ui.footer.madeWith} · @somosttestudio
          </p>
        </div>
      </div>
    </footer>
  );
}

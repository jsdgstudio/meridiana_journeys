"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  locale: string;
  ui: {
    nav: Record<string, string>;
    lang: Record<string, string>;
  };
}

interface NavLink {
  label: string;
  href: string;
}

export function Navbar({ locale, ui }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: ui.nav.about, href: `/${locale}/sobre-meridiana` },
    { label: ui.nav.journeys, href: `/${locale}/viajes` },
    { label: ui.nav.journal, href: `/${locale}/journal` },
    { label: ui.nav.contact, href: `/${locale}/contacto` },
  ];

  const otherLocale = locale === "es" ? "en" : "es";
  const localePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Background layer — opacity-only transition, no color flash */}
        <motion.div
          className="absolute inset-0 bg-blanco/95 backdrop-blur-sm border-b border-negro/10"
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        />

        <div className="relative mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="transition-opacity duration-200 hover:opacity-70 flex items-center"
            >
              <Image
                src="/images/logo_meridiana_marfil.svg"
                alt="Meridiana"
                width={140}
                height={32}
                priority
                style={
                  scrolled
                    ? {
                        filter:
                          "brightness(0) saturate(100%) invert(49%) sepia(38%) saturate(502%) hue-rotate(6deg) brightness(88%) contrast(88%)",
                      }
                    : undefined
                }
                className="h-7 lg:h-8 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "font-normal text-xs tracking-widest uppercase transition-all duration-200 relative group",
                    scrolled ? "text-negro" : "text-marfil",
                    isActive(href) ? "opacity-100" : "opacity-60 hover:opacity-100",
                  ].join(" ")}
                >
                  {label}
                  {isActive(href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className={[
                        "absolute -bottom-1 left-0 right-0 h-px",
                        scrolled ? "bg-terracota" : "bg-tumbaga",
                      ].join(" ")}
                    />
                  )}
                </Link>
              ))}

              {/* Lang toggle */}
              <Link
                href={localePath}
                className={[
                  "font-normal text-xs tracking-widest uppercase transition-opacity duration-200 opacity-40 hover:opacity-80 border-l pl-6",
                  scrolled ? "text-negro border-negro-20" : "text-marfil border-marfil-20",
                ].join(" ")}
              >
                {ui.lang.switch}
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={[
                "lg:hidden flex flex-col justify-center gap-1.5 w-10 h-10 -mr-2 transition-opacity duration-200 hover:opacity-70",
                scrolled ? "text-negro" : "text-marfil",
              ].join(" ")}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-current origin-center transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block h-px w-6 bg-current"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-current origin-center transition-all"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-negro flex flex-col justify-center items-center"
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={[
                      "font-display text-3xl font-light text-marfil transition-opacity duration-200",
                      isActive(href) ? "opacity-100" : "opacity-50 hover:opacity-100",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6 border-t border-marfil-20 pt-6"
              >
                <Link
                  href={localePath}
                  onClick={() => setMenuOpen(false)}
                  className="label text-xs tracking-widest text-marfil opacity-40 hover:opacity-80 uppercase"
                >
                  {ui.lang.switch}
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

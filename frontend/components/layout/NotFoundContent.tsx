"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import esStrings from "@/content/i18n/es.json";
import enStrings from "@/content/i18n/en.json";

type Locale = "es" | "en";

export function NotFoundContent() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const pathLocale = window.location.pathname.split("/")[1];
    const nextLocale: Locale = pathLocale === "en" ? "en" : "es";
    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
    if (nextLocale === "en") document.title = "Page not found — Meridiana";
  }, []);

  const copy = locale === "en" ? enStrings.notFound : esStrings.notFound;

  return (
    <main className="min-h-screen bg-negro flex items-center justify-center px-6">
      <div className="text-center max-w-md space-y-8">
        <div className="w-12 h-px bg-tumbaga mx-auto" />
        <p className="font-display text-8xl font-light text-marfil/10 leading-none select-none" aria-hidden="true">
          404
        </p>
        <div className="space-y-3">
          <h1 className="font-display text-2xl font-light text-marfil leading-snug">
            {copy.title}
          </h1>
          <p className="font-sans text-sm leading-relaxed text-marfil/40">
            {copy.description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            href={`/${locale}`}
            className="font-sans text-sm uppercase tracking-widest text-tumbaga border border-tumbaga px-6 py-3 hover:bg-tumbaga hover:text-negro"
          >
            {copy.home}
          </Link>
          <Link
            href={`/${locale}/viajes`}
            className="font-sans text-sm uppercase tracking-widest text-marfil/50 hover:text-marfil px-6 py-3"
          >
            {copy.journeys}
          </Link>
        </div>
      </div>
    </main>
  );
}

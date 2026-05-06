import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada — Meridiana",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-negro flex items-center justify-center px-6">
      <div className="text-center max-w-md space-y-8">
        {/* Rule */}
        <div className="w-12 h-px bg-tumbaga mx-auto" />

        {/* Number */}
        <p className="font-display text-8xl font-light text-marfil/10 leading-none select-none">
          404
        </p>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="font-display text-2xl font-light text-marfil leading-snug">
            Esta página no existe
          </h1>
          <p className="font-sans text-sm leading-relaxed text-marfil/40">
            La dirección que buscas no corresponde a ningún contenido de Meridiana.
            Puede que haya cambiado o que nunca haya existido.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            href="/es"
            className="font-sans text-sm uppercase tracking-widest text-tumbaga border border-tumbaga px-6 py-3 hover:bg-tumbaga hover:text-negro transition-colors duration-200"
          >
            Volver al inicio
          </Link>
          <Link
            href="/es/viajes"
            className="font-sans text-sm uppercase tracking-widest text-marfil/50 hover:text-marfil transition-colors duration-200 px-6 py-3"
          >
            Ver viajes
          </Link>
        </div>
      </div>
    </main>
  );
}

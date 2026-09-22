import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

export const metadata: Metadata = {
  title: { absolute: "Página no encontrada — Meridiana" },
  robots: { index: false, follow: false },
};

// Unknown routes bypass [locale]/layout.tsx, which normally owns the document shell.
export default function NotFound() {
  return (
    <html lang="es">
      <body className="antialiased">
        <NotFoundContent />
      </body>
    </html>
  );
}

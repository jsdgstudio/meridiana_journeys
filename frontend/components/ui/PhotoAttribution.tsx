import type { Locale, PhotoAttribution as PhotoAttributionData } from "@/types/tour";

interface PhotoAttributionProps {
  attribution: PhotoAttributionData;
  locale: Locale;
  tone?: "dark" | "light";
  className?: string;
}

export function PhotoAttribution({ attribution, locale, tone = "dark", className = "" }: PhotoAttributionProps) {
  const linkClass = `underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tumbaga ${tone === "dark" ? "hover:text-marfil" : "hover:text-negro"}`;
  const textClass = tone === "dark" ? "text-marfil/75" : "text-negro/70";

  return (
    <span className={`font-sans text-[11px] leading-relaxed tracking-wide ${textClass} ${className}`}>
      <a className={linkClass} href={attribution.creditUrl} target="_blank" rel="noopener noreferrer">
        {attribution.credit[locale]}
      </a>
      <span aria-hidden="true"> · </span>
      <a className={linkClass} href={attribution.sourceUrl} target="_blank" rel="noopener noreferrer">
        {attribution.sourceLabel}
      </a>
      <span aria-hidden="true"> · </span>
      <a className={linkClass} href={attribution.licenseUrl} target="_blank" rel="noopener noreferrer">
        {attribution.license}
      </a>
      <span> · {attribution.changes[locale]}</span>
    </span>
  );
}

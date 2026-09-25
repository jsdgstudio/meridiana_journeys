import type { Locale, PhotoAttribution } from "@/types/tour";

export function photoAttributionMetadata(
  attribution: PhotoAttribution,
  locale: Locale,
  prefix: string,
): Record<string, string> {
  return {
    [`${prefix}-credit`]: attribution.credit[locale],
    [`${prefix}-credit-url`]: attribution.creditUrl,
    [`${prefix}-source`]: attribution.sourceUrl,
    [`${prefix}-source-label`]: attribution.sourceLabel,
    [`${prefix}-license`]: attribution.license,
    [`${prefix}-license-url`]: attribution.licenseUrl,
    [`${prefix}-changes`]: attribution.changes[locale],
  };
}

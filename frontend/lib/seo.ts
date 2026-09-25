/**
 * The root layout's <title> template ("%s | Meridiana") already appends the
 * brand name to every page title. Content files still carry a hardcoded
 * "Meridiana" suffix inherited from earlier drafts, which produces duplicate
 * titles like "Classic Bogotá | Meridiana | Meridiana" (MER-014A).
 *
 * This strips a known trailing brand suffix before a title is passed to the
 * `title` metadata field (which gets templated), while leaving the original,
 * fully-branded string intact for `openGraph.title` / `twitter.title`, which
 * Next.js does not template and which benefit from showing the brand on
 * social shares.
 */
const BRAND_SUFFIXES = [
  " | Meridiana Journal",
  " | Journal Meridiana",
  " | Meridiana",
  " — Meridiana",
];

export function stripBrandSuffix(title: string): string {
  for (const suffix of BRAND_SUFFIXES) {
    if (title.endsWith(suffix)) {
      return title.slice(0, -suffix.length);
    }
  }
  return title;
}

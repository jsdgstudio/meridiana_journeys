# Task 05: Tours Grid

## Objective
Build the `/journeys` page with tour cards grid and sample tour JSON data.

## Prerequisites
- Tasks 01–04 complete
- Read: `docs/content-model.md`

## Tour Data (ALREADY CREATED)

All 7 tour JSONs already exist in `content/tours/`:
- `classic-bogota.json` (entry)
- `classic-colombia-cafetero.json` (core)
- `classic-colombia-caribe.json` (core)
- `classic-colombia-full.json` (core)
- `en-busqueda-del-dorado.json` (premium)
- `macondo-realismo-magico.json` (premium)
- `wild-colombia.json` (premium)

All are bilingual (`LocaleString` pattern). No placeholder content needed.

## Components to Build

### 1. `components/tour/TourCard.tsx`
- Hero image with aspect ratio 4:3
- Tier badge (entry / core / premium — subtle, uppercase, tracked)
- Category label (small, uppercase, tracked)
- Title (Cormorant Garamond) — uses `tour.title[locale]`
- `narrative.short[locale]` text
- Duration + group size metadata (localized)
- Price line
- Route pills for multi-city tours (e.g. "Bogotá → Medellín → Cartagena")
- Hover: image zoom + shadow lift (Framer Motion)
- Entire card is clickable → `/{locale}/viajes|journeys/[slug]`

### 2. `app/[locale]/(journeys)/page.tsx`
- Page header (editorial headline + brief intro, from i18n)
- Tier filter (All / Entry / Core / Premium) — tabs or pills
- Tour cards in responsive grid (3 / 2 / 1 cols)
- Bottom CTA: custom journey inquiry (localized)

## Hook: `hooks/useTours.ts`
```typescript
export function getAllTours(): Tour[] { ... }
export function getTourBySlug(slug: string): Tour | undefined { ... }
export function getToursByCategory(category: TourCategory): Tour[] { ... }
```

## Files Created
- `components/tour/TourCard.tsx`
- `hooks/useTours.ts`
- `app/[locale]/(journeys)/page.tsx`

## Acceptance Criteria
- [ ] Grid displays all 7 published tours
- [ ] Tier filter works (All / Entry / Core / Premium)
- [ ] Cards show image, title, short narrative, metadata — all localized
- [ ] Multi-city tours show route pills
- [ ] Hover animation is smooth and editorial
- [ ] Links navigate to correct `/{locale}/viajes|journeys/[slug]`
- [ ] Responsive layout works on all breakpoints

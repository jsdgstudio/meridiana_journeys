# Task 06: Tour Detail Page

## Objective
Build the individual tour page at `/journeys/[slug]` — the most content-rich page on the site.

## Prerequisites
- Tasks 01–05 complete
- Read: `docs/experience-engine.md` (Tour Detail flow), `docs/copy-rules.md`

## Page Flow (Experience Engine)
```
TourHero → TourNarrative → TourIncludes → TourItinerary → TourExperience → TourPricing → CTA
```

## Components to Build

### 1. `components/tour/TourHero.tsx`
- Full-width image, 70vh height
- Title + subtitle overlaid on gradient
- Category badge + duration metadata
- Back link to `/journeys`

### 2. `components/tour/TourNarrative.tsx`
- Narrow container (`--container-narrow`)
- Renders `narrative.long` via RichText
- Optional pull quote styled as editorial callout
- Generous line-height (1.75), reading-optimized

### 3. `components/tour/TourIncludes.tsx`
- Two-column layout: includes (left) + excludes (right)
- Checkmark / X icons
- Clean, scannable but not clinical

### 4. `components/tour/TourItinerary.tsx`
- Day-by-day accordion or vertical timeline
- Each day: number, title, description, highlights, meals
- Expandable/collapsible (Framer Motion `AnimatePresence`)

### 5. `components/tour/TourExperience.tsx`
- Visual bars or radial indicators for:
  - Cultural Depth, Physical Demand, Comfort, Group Intimacy (1–5 scale)
- Signature experiences list
- `idealFor` tags

### 6. `components/tour/TourPricing.tsx`
- Clear price display
- Price note (per person, etc.)
- What's included reminder (brief)
- CTA button: "Request This Itinerary"

### 7. `app/journeys/[slug]/page.tsx`
- Dynamic route: reads slug param
- Fetches tour via `getTourBySlug(slug)`
- 404 if not found
- Composes all Tour components
- SEO metadata from `tour.seo`

## Files Created
- `components/tour/TourHero.tsx`
- `components/tour/TourNarrative.tsx`
- `components/tour/TourIncludes.tsx`
- `components/tour/TourItinerary.tsx`
- `components/tour/TourExperience.tsx`
- `components/tour/TourPricing.tsx`
- `app/journeys/[slug]/page.tsx`

## Acceptance Criteria
- [ ] Dynamic routing works for all tour slugs
- [ ] Full Experience Engine flow renders in order
- [ ] Narrative long-form is beautifully typeset
- [ ] Itinerary is expandable/collapsible
- [ ] Experience metrics are visual (not just numbers)
- [ ] 404 page for invalid slugs
- [ ] SEO meta tags render correctly

# Task 04: Homepage

## Objective
Build all homepage sections following the Experience Engine flow.

## Prerequisites
- Tasks 01–03 complete
- Read: `docs/experience-engine.md`, `docs/copy-rules.md`
- Create: `content/pages/homepage.json` with section content

## Content File: `content/pages/homepage.json`

Create this JSON with placeholder editorial content (flag with `// TODO` comments in code). Structure:

```json
{
  "id": "homepage",
  "hero": {
    "headline": "Travel as Cultural Understanding",
    "subheadline": "Curated journeys through Colombia and Latin America",
    "media": { "type": "image", "src": "/images/hero-home.jpg", "alt": "..." }
  },
  "valueProp": {
    "headline": "Not Tourism. Cultural Immersion.",
    "pillars": [
      { "title": "Narrative-Driven", "description": "..." },
      { "title": "Culturally Deep", "description": "..." },
      { "title": "Intimate Scale", "description": "..." }
    ]
  },
  "featuredTours": {
    "headline": "Curated Journeys",
    "tourIds": ["classic-bogota", "classic-colombia-cafetero", "en-busqueda-del-dorado"]
  },
  "howItWorks": {
    "headline": "How It Works",
    "steps": [
      { "number": 1, "title": "Explore", "description": "..." },
      { "number": 2, "title": "Connect", "description": "..." },
      { "number": 3, "title": "Journey", "description": "..." }
    ]
  },
  "cta": {
    "headline": "Begin Your Journey",
    "description": "...",
    "buttonText": "Explore Journeys",
    "buttonHref": "/journeys"
  }
}
```

## Sections to Build

### 1. `components/sections/Hero.tsx`
- Full-viewport height, image/video background
- Centered headline + subheadline over overlay
- Scroll indicator at bottom (animated chevron)
- No CTA button in hero

### 2. `components/sections/ValueProposition.tsx`
- Three pillars in a row (cards or columns)
- Editorial headline above
- Alt background theme

### 3. `components/sections/FeaturedTours.tsx`
- Uses `useTours` hook to get tours by ID
- Renders TourCard components (build in Task 05)
- 3-column grid (desktop), responsive

### 4. `components/sections/HowItWorks.tsx`
- Three numbered steps
- Clean, minimal design
- Optional: connecting line between steps

### 5. `components/sections/CallToAction.tsx`
- Dark background section
- Headline + description + primary button
- Generous whitespace

### 6. `app/page.tsx` (Homepage)
- Imports and composes all sections
- Loads content from `homepage.json` via `useContent` hook

## Hook: `hooks/useContent.ts`
```typescript
export function getHomepageContent(): HomepageContent {
  // Import and return homepage.json
}
```

## Files Created
- `content/pages/homepage.json`
- `components/sections/Hero.tsx`
- `components/sections/ValueProposition.tsx`
- `components/sections/FeaturedTours.tsx`
- `components/sections/HowItWorks.tsx`
- `components/sections/CallToAction.tsx`
- `hooks/useContent.ts`
- Updated: `app/page.tsx`

## Acceptance Criteria
- [ ] Homepage renders all 5 sections in order
- [ ] Content comes from JSON, not hardcoded
- [ ] Hero fills viewport with overlay text
- [ ] Responsive on all breakpoints
- [ ] Editorial tone in all copy (even placeholder)

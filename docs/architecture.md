# Architecture Decisions

## Framework: Next.js App Router

Why App Router over Pages:
- Server Components by default (performance)
- Nested layouts (consistent shell across pages)
- Route groups for organizational clarity
- Built-in loading/error states per route
- Future-proof for RSC streaming

## Styling: Tailwind CSS

- Utility-first matches component-based architecture
- Design tokens via `tailwind.config.ts` extend
- No runtime CSS-in-JS overhead
- Responsive design built-in

## Animation: Framer Motion

- Declarative API matches React mental model
- Layout animations for page transitions
- Scroll-triggered animations for editorial pacing
- `AnimatePresence` for exit animations

## Content Layer: Local JSON → Supabase

### Phase 1 (Current):
- Tour data in `content/tours/*.json`
- Page content in `content/pages/*.json`
- Accessed via custom hooks (`useTours`, `useContent`)
- No build step for content changes (just edit JSON)
- All content is bilingual (ES/EN) within the same JSON files

### Phase 2 (Future):
- Supabase as headless CMS
- Same hooks, different data source
- Stripe for payment processing
- Resend for transactional email

## Internationalization (i18n)

### Strategy: Middleware + Route Prefix
```
/es/viajes/classic-bogota     ← Spanish
/en/journeys/classic-bogota   ← English
```

### Implementation:
- Next.js middleware detects locale from: URL → cookie → browser `Accept-Language`
- Route structure: `app/[locale]/(pages)/...`
- All content JSON uses `{ es: "...", en: "..." }` pattern
- Language toggle in Navbar persists choice to cookie
- Default locale: `es` (primary market is Latin America)
- Supported locales: `["es", "en"]`

### Route Map (bilingual):
| ES                        | EN                         | Page              |
|---------------------------|----------------------------|-------------------|
| `/es`                     | `/en`                      | Homepage          |
| `/es/nosotros`            | `/en/about`                | About             |
| `/es/viajes`              | `/en/journeys`             | Tours grid        |
| `/es/viajes/[slug]`       | `/en/journeys/[slug]`      | Tour detail       |
| `/es/journal`             | `/en/journal`              | Journal           |
| `/es/contacto`            | `/en/contact`              | Contact           |

### Translation Files:
- `content/i18n/es.json` — Spanish UI strings (nav, buttons, labels, footer)
- `content/i18n/en.json` — English UI strings
- Tour/page content is bilingual inline (not in translation files)

## Tour Product Architecture

### Three Tiers:
```
ENTRY:    Classic Bogotá (2–3 days)
CORE:     Classic Colombia × 3 variants (10–13 days)
PREMIUM:  Dorado / Macondo / Wild (7–21 days)
```

### Tour Relationships:
- Classic Colombia has 3 modular variants sharing base segments
- Bogotá content appears in Classic Colombia variants (as Day 1–3)
- Pricing scales with tier: Entry → Core → Premium
- Homepage features 1 from each tier

## Component Hierarchy

```
Page (app/*)
  └── Layout (layout/*)
       └── Section (sections/* or tour/*)
            └── UI (ui/*)
```

### Rules:
- Sections are full-width marketing blocks
- UI components are context-agnostic primitives
- Tour components are domain-specific (but reusable across tour pages)
- Layout components appear on every page

## TypeScript Strategy

- Strict mode enabled
- All content types defined in `types/`
- No `any` — use `unknown` + type guards when needed
- Props interfaces co-located with components
- Content types shared between JSON schema and components

## Image Strategy

- Next.js `<Image>` for all images
- WebP format preferred
- Placeholder blur for loading states
- Hero images: 1920x1080 minimum
- Card images: 800x600 minimum
- All images in `public/images/` with descriptive names

## Performance Targets

- Lighthouse: 90+ on all metrics
- LCP < 2.5s
- CLS < 0.1
- FID < 100ms

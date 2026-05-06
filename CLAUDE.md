# MERIDIANA — CLAUDE CODE CONTEXT

## What is this project?

Meridiana is a **premium cultural travel platform** — editorial-driven, cinematic, closer to a cultural publication with booking capability than a travel agency. Focused on Colombia and Latin America.

**Core positioning:** Travel as cultural understanding. Curated, not commercial. Narrative over logistics.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS 3.4+
- **Animation:** Framer Motion
- **Language:** TypeScript (strict)
- **Deployment:** Vercel
- **Content:** Local JSON (Phase 1) → Supabase (Phase 2)
- **Typography:** Cormorant Garamond (headings) + General Sans Variable (body)

---

## Project Structure

```
meridiana/
├── CLAUDE.md              ← YOU ARE HERE — read this first
├── docs/                  ← Strategy, specs, content rules
│   ├── architecture.md    ← Tech decisions + patterns
│   ├── content-model.md   ← Data schema for tours/pages
│   ├── design-tokens.md   ← Colors, spacing, typography
│   ├── experience-engine.md ← UX flow logic
│   └── copy-rules.md      ← Editorial tone + constraints
├── tasks/                 ← Ordered execution queue for GSD
│   ├── 01-setup.md
│   ├── 02-design-system.md
│   ├── 03-layout-shell.md
│   ├── 04-homepage.md
│   ├── 05-tours-grid.md
│   ├── 06-tour-detail.md
│   ├── 07-about-journal.md
│   ├── 08-contact-cta.md
│   ├── 09-animations.md
│   └── 10-polish-deploy.md
├── frontend/
│   ├── app/               ← Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── [locale]/      ← Bilingual routing (es/en)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx       ← Homepage
│   │   │   ├── (about)/       ← nosotros | about
│   │   │   ├── (journeys)/    ← viajes | journeys
│   │   │   │   ├── page.tsx   ← Tours grid
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx ← Tour detail
│   │   │   ├── journal/
│   │   │   └── (contact)/     ← contacto | contact
│   │   └── middleware.ts  ← Locale detection + redirect
│   ├── components/
│   │   ├── ui/            ← Button, Card, Grid, RichText
│   │   ├── sections/      ← Hero, ValueProp, HowItWorks, CTA
│   │   ├── tour/          ← TourCard, TourHero, TourNarrative...
│   │   └── layout/        ← Navbar, Footer, PageWrapper, LangToggle
│   ├── content/           ← JSON data files
│   │   ├── tours/         ← One JSON per tour (7 tours, bilingual)
│   │   ├── pages/         ← Homepage, about, etc.
│   │   └── i18n/          ← es.json, en.json (UI strings)
│   ├── design-system/     ← Tokens, theme config
│   ├── hooks/             ← useTours, useContent
│   ├── lib/               ← Utilities, helpers
│   ├── types/             ← TypeScript interfaces
│   └── public/
│       ├── fonts/         ← .woff2 files
│       ├── images/
│       └── video/
```

---

## Execution Rules

### ALWAYS:
- Read the relevant `tasks/XX-*.md` file before starting any work
- Preserve narrative tone in all content — literary, dense, never generic
- Use TypeScript strict mode
- Follow the component hierarchy: sections → ui → primitives
- Keep content in JSON, never hardcode copy in components
- Use Framer Motion for all animations (not CSS transitions)
- Use design tokens from `design-system/` — never hardcode colors/spacing

### NEVER:
- Use generic tourism language ("discover paradise", "hidden gems")
- Skip reading task context before executing
- Install packages not in the approved stack
- Use `pages/` directory (App Router only)
- Hardcode responsive breakpoints (use Tailwind's system)
- Add placeholder content without flagging it as `// TODO: Replace`

---

## Content Rules (CRITICAL)

This is an editorial product. The tone is:
- **Literary** — reflective, dense, intentional prose
- **Cinematic** — visual pacing, not bullet-point tourism
- **Intellectual** — assumes a curious, cultured reader
- **Anti-cliché** — no "off the beaten path", no "experience the magic"

Tour naming convention:
- ❌ "Bogotá Tour"
- ✅ "Classic Bogotá — Five Centuries in Three Days"

---

## Data Flow

```
JSON files (content/) → hooks (useTours/useContent) → locale filter → components → UI
```

All content JSON uses `LocaleString = { es: string, en: string }`.
Hooks receive the current locale and return the correct language string.
UI strings (buttons, labels, nav) come from `content/i18n/{locale}.json`.

Each tour JSON follows the schema in `docs/content-model.md`.
Each page JSON follows the schema in `content/pages/`.

---

## Bilingual Routing

```
/es/viajes/classic-bogota      ← Spanish
/en/journeys/classic-bogota    ← English
```

Default locale: `es`. Toggle in Navbar switches and persists via cookie.

---

## Design System

**CSS file:** `design-system/globals.css` — contains ALL tokens, @font-face declarations, and base styles. This is the source of truth.

**Palette:** negro (#0F130E) + verde (#1A2E24) + terracota (#CC754A) + tumbaga (#9A7A3A) + marfil (#E7D5BC) + blanco (#F8F4EE). Full semantic mapping in `docs/design-tokens.md`.

**Typography:** Cormorant Garamond (headings, weight 300 light) + General Sans (body/UI). Headings are NEVER bold — always light weight.

**Aesthetic:** Sharp edges (radius-none default), dark-dominant, editorial. Not a SaaS product. Not a travel agency. A cultural publication.

---

## Tour Catalog (7 tours)

| Tier    | Slug                          | Duration   |
|---------|-------------------------------|------------|
| Entry   | `classic-bogota`              | 2–3 days   |
| Core    | `classic-colombia-cafetero`   | 10 days    |
| Core    | `classic-colombia-caribe`     | 10 days    |
| Core    | `classic-colombia-full`       | 13 days    |
| Premium | `en-busqueda-del-dorado`      | 8–9 days   |
| Premium | `macondo-realismo-magico`     | 7–10 days  |
| Premium | `wild-colombia`               | 14–21 days |

All tour JSONs live in `content/tours/` and are bilingual.

---

## UX Flow (Experience Engine)

Every page guides the user through:
1. **Emotion** → Hero (video/image + editorial statement)
2. **Understanding** → Narrative (long-form storytelling)
3. **Trust** → Detail (includes, itinerary, structure)
4. **Desire** → Experience (sensory, cultural depth)
5. **Action** → CTA (inquiry-based, never hard-sell)

**Conversion = inquiry, not purchase.** CTAs lead to contact/request forms.

---

## GSD Workflow

Tasks in `tasks/` are numbered and ordered. Each task:
1. Has clear acceptance criteria
2. Lists files to create/modify
3. References relevant docs
4. Is self-contained (can be executed independently)

**Start with task 01. Do not skip ahead.**

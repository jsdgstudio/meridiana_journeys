# Task 02: Design System

## Objective
Build the reusable UI primitives that every page depends on.

## Prerequisites
- Task 01 complete
- Read: `docs/design-tokens.md`, `docs/copy-rules.md`

## Components to Build

### 1. `components/ui/Button.tsx`
Variants: `primary` (terracota bg, marfil text), `secondary` (outlined, tumbaga border), `ghost` (text only)
Sizes: `sm`, `md`, `lg`
Props: `href?` (renders as `<Link>`), `onClick?`, `children`, `variant`, `size`
Hover: subtle scale + opacity shift via Framer Motion
**Sharp edges** — no border-radius (uses `--radius-none`)

### 2. `components/ui/Container.tsx`
Props: `size?: "default" | "narrow" | "wide"`, `children`, `className?`
Maps to max-widths from design tokens.

### 3. `components/ui/SectionWrapper.tsx`
Standardizes vertical spacing between sections.
Props: `theme?: "dark" | "verde" | "light" | "page"`, `children`, `className?`
Maps to: `--bg-primary`, `--bg-secondary`, `--bg-light`, `--bg-page`
Auto-switches text color: `--fg-on-dark` for dark/verde, `--fg-on-light` for light/page

### 4. `components/ui/Heading.tsx`
Props: `as: "h1" | "h2" | "h3" | "h4"`, `size?: string`, `children`
Uses `--font-display` (Cormorant Garamond).
**Weight 300 (light) for h1/h2, weight 400 for h3/h4.** Headings are never bold.

### 5. `components/ui/Text.tsx`
Props: `size?: "lg" | "base" | "sm" | "caption"`, `children`, `className?`
Uses `--font-sans` (General Sans) for all body sizes.

### 6. `components/ui/RichText.tsx`
Renders HTML string (from narrative.long) with proper typography.
Uses `@tailwindcss/typography` prose classes.
Scoped to Meridiana's font and color tokens.

### 7. `components/ui/Card.tsx`
Generic card shell: image + content area.
Props: `image`, `alt`, `children`, `href?`, `aspectRatio?`
**Sharp edges** — no border-radius.
Hover: `--shadow-float` + subtle image zoom.

## Design System Index
Create `design-system/tokens.ts` exporting color, spacing, and typography constants for programmatic access.

## Files Created
- `components/ui/Button.tsx`
- `components/ui/Container.tsx`
- `components/ui/SectionWrapper.tsx`
- `components/ui/Heading.tsx`
- `components/ui/Text.tsx`
- `components/ui/RichText.tsx`
- `components/ui/Card.tsx`
- `design-system/tokens.ts`

## Acceptance Criteria
- [ ] Each component renders correctly in isolation
- [ ] Button links navigate properly
- [ ] RichText renders HTML without XSS risk (use dangerouslySetInnerHTML with sanitization note)
- [ ] Dark/light/alt section themes work
- [ ] Typography matches design tokens

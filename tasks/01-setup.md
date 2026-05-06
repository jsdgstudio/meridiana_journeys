# Task 01: Project Setup

## Objective
Initialize the Next.js project with all dependencies, configuration files, and base structure.

## Prerequisites
- Node.js 18+
- Read: `CLAUDE.md`, `docs/architecture.md`, `docs/design-tokens.md`

## Steps

### 1. Initialize Next.js
```bash
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

### 2. Install Dependencies
```bash
cd frontend
npm install framer-motion
npm install -D @tailwindcss/typography
```

### 3. Configure Tailwind
Extend `tailwind.config.ts` with design tokens from `docs/design-tokens.md`:
- Custom colors: negro, verde, terracota, tumbaga, marfil, blanco (+ opacity variants)
- Semantic colors: bg-primary, fg-on-dark, accent-primary, etc.
- Typography scale (text-xs through text-5xl)
- Custom fonts: `--font-display` (Cormorant Garamond), `--font-sans` (General Sans)
- Spacing scale (space-1 through space-40)
- Sharp border radius (`--radius-none` as default)
- Custom shadows (shadow-float, shadow-modal)
- Custom easing (ease-brand)

### 4. Add Fonts

**Cormorant Garamond** (display/headings):
- Load via Google Fonts `@import` in CSS (already in `design-system/globals.css`)
- Weights: 300, 400, 500, 600, 700 + all italics
- CSS variable: `--font-display`

**General Sans** (body/UI):
- Self-hosted variable TTF files in `public/fonts/`
- `GeneralSans-Variable.ttf` (weights 200–700, normal) — ALL weights in one file
- `GeneralSans-VariableItalic.ttf` (weights 200–700, italic)
- `@font-face` declarations already in `design-system/globals.css`
- CSS variable: `--font-sans`
- ✓ All font files present and ready

### 5. Set Up Global Styles
Copy `design-system/globals.css` into `app/globals.css` (or import it).
This file already contains:
- All CSS custom properties (colors, typography, spacing, transitions)
- All `@font-face` declarations
- Semantic element styles (h1–h4, p, .label, .caption, .display, blockquote)
- Base styles (selection color, smooth scrolling, antialiasing)
- Tailwind import placeholders (uncomment during init)

### 6. Create Base Layout
In `app/layout.tsx`:
- HTML lang="en"
- Font classes applied to body
- Metadata (title, description, OG tags)
- Placeholder for Navbar + Footer

### 7. Create Type Definitions
Copy interfaces from `docs/content-model.md` into:
- `types/tour.ts`
- `types/content.ts`

### 8. Create Folder Structure
Ensure all directories from `CLAUDE.md` structure exist with `.gitkeep` or `index.ts` barrel files.

## Files Created
- `frontend/tailwind.config.ts`
- `frontend/app/globals.css`
- `frontend/app/layout.tsx`
- `frontend/types/tour.ts`
- `frontend/types/content.ts`

## Acceptance Criteria
- [ ] `npm run dev` starts without errors
- [ ] Custom fonts load correctly
- [ ] Tailwind custom colors work (test with a colored div)
- [ ] TypeScript compiles with no errors
- [ ] All directories exist

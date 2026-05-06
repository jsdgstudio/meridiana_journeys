# Task 03: Layout Shell

## Objective
Build the persistent Navbar and Footer that wrap every page.

## Prerequisites
- Task 02 complete
- Read: `docs/experience-engine.md` (Navigation section)

## Components to Build

### 1. `components/layout/Navbar.tsx`
- Logo (left): Meridiana wordmark or SVG
- Nav links (right): Journeys, Journal, About, Contact
- Behavior:
  - Transparent background on page load (hero visible behind)
  - Solid background (`--bg-page` / blanco) after scrolling past hero
  - Transition: smooth opacity/backdrop-blur change
- Mobile: hamburger menu → full-screen overlay with Framer Motion
- Active link indicator (subtle underline or color)
- Use `usePathname()` for active state

### 2. `components/layout/Footer.tsx`
- Three columns (desktop), stacked (mobile):
  - Brand: logo + tagline + brief description
  - Navigation: same links as navbar + legal links
  - Contact: email, social links, location
- Bottom bar: copyright + "Designed with intention"
- Dark theme (`--bg-primary` / negro)
- Generous padding, editorial spacing

### 3. `components/layout/PageWrapper.tsx`
- Wraps page content between Navbar and Footer
- Handles page-level Framer Motion transitions (fade-in)
- Sets min-height to push footer to bottom

### 4. Update `app/layout.tsx`
- Import and render Navbar + Footer
- Wrap `{children}` in PageWrapper

## Files Created
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/layout/PageWrapper.tsx`
- Updated: `app/layout.tsx`

## Acceptance Criteria
- [ ] Navbar is transparent over hero, solid on scroll
- [ ] Mobile menu opens/closes smoothly
- [ ] Footer is dark themed, three-column layout
- [ ] Active nav link is visually indicated
- [ ] Page transitions work on navigation
- [ ] Footer sits at bottom even on short-content pages

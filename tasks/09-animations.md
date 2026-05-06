# Task 09: Animations & Motion

## Objective
Add Framer Motion animations across the site for editorial pacing.

## Prerequisites
- Tasks 01–08 complete
- Read: `docs/experience-engine.md` (Pacing + Scrolling sections)

## Animation System

### 1. Create `lib/animations.ts`
Shared animation variants:

```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const fadeIn = { ... };
export const staggerContainer = { ... };
export const scaleIn = { ... };
export const slideInLeft = { ... };
export const slideInRight = { ... };
```

### 2. Create `hooks/useScrollReveal.ts`
Custom hook using `useInView` from Framer Motion.
Returns `{ ref, controls, isInView }` for triggering animations on scroll.

### 3. Apply to Sections
Every section gets a scroll-triggered fade-in reveal:
- Hero: content fades in on load (not scroll)
- ValueProposition: staggered children
- FeaturedTours: cards stagger in
- HowItWorks: steps appear sequentially
- Tour sections: each reveals as it enters viewport

### 4. Micro-interactions
- Buttons: subtle scale on hover (1.02)
- Cards: lift + image zoom on hover
- Navbar: smooth background transition
- Links: underline animation on hover
- Itinerary: accordion expand/collapse

### 5. Page Transitions
- Fade between pages using `AnimatePresence` in layout
- Keep transitions fast (300–400ms)
- No blocking: content should start visible quickly

## Performance Rules
- Use `will-change` sparingly
- Prefer `transform` and `opacity` (GPU-accelerated)
- No animations on elements below the fold on initial load
- Respect `prefers-reduced-motion`

## Files Created
- `lib/animations.ts`
- `hooks/useScrollReveal.ts`
- Updated: all section and card components

## Acceptance Criteria
- [ ] Every section animates in on scroll
- [ ] Animations feel editorial, not flashy
- [ ] Performance: no layout shifts, no jank
- [ ] `prefers-reduced-motion` is respected
- [ ] Page transitions work between routes

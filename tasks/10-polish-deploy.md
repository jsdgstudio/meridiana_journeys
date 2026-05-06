# Task 10: Polish & Deploy

## Objective
Final quality pass, SEO, accessibility, and Vercel deployment.

## Prerequisites
- Tasks 01–09 complete

## SEO Checklist

### 1. Metadata
- [ ] Every page has unique `<title>` and `<meta description>`
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] Use Next.js `metadata` export in each page

### 2. Structured Data
- [ ] JSON-LD for Organization (site-wide)
- [ ] JSON-LD for TourProduct on each tour page (schema.org/TravelAction or Product)

### 3. Technical SEO
- [ ] `robots.txt` in `public/`
- [ ] `sitemap.xml` (static for Phase 1)
- [ ] Favicon + apple-touch-icon in `public/`
- [ ] 404 page (`app/not-found.tsx`) — editorial, not generic

## Accessibility Checklist
- [ ] All images have descriptive `alt` text
- [ ] Color contrast passes WCAG AA (check ink on paper)
- [ ] Focus states visible on all interactive elements
- [ ] Form labels and ARIA attributes
- [ ] Skip-to-content link
- [ ] Semantic HTML (nav, main, section, article, footer)
- [ ] Keyboard navigation works throughout

## Performance Checklist
- [ ] Images: Next.js `<Image>` with proper sizing and priority flags
- [ ] Fonts: `font-display: swap`, preload critical fonts
- [ ] No unused dependencies
- [ ] Bundle size check: `npm run build` and review output
- [ ] Lighthouse: target 90+ on all metrics

## Visual Polish
- [ ] Consistent spacing across all pages
- [ ] Typography hierarchy looks correct at all breakpoints
- [ ] Dark sections have proper contrast
- [ ] Hover states on all interactive elements
- [ ] Loading states (skeleton or fade) for images
- [ ] Scroll behavior is smooth and consistent

## Deployment
1. Push to GitHub repository
2. Connect to Vercel
3. Configure:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output: `.next`
4. Set custom domain: `meridianajourneys.com`
5. Enable Vercel Analytics (optional)

## Files Created
- `public/robots.txt`
- `public/sitemap.xml`
- `public/favicon.ico` (placeholder)
- `app/not-found.tsx`
- Updated: metadata in all pages

## Acceptance Criteria
- [ ] Lighthouse 90+ on Performance, Accessibility, SEO, Best Practices
- [ ] All pages render correctly on Chrome, Safari, Firefox
- [ ] Mobile responsive on iPhone SE through iPad Pro
- [ ] No console errors or warnings
- [ ] `npm run build` completes with zero errors
- [ ] Deployed and accessible at Vercel preview URL

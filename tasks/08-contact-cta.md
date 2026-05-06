# Task 08: Contact & CTA System

## Objective
Build the `/contact` page and finalize CTA patterns across the site.

## Contact Page (`app/contact/page.tsx`)

### Sections:
1. **Header** — "Begin Your Journey" or similar editorial statement
2. **Form** — Inquiry form (Phase 1: mailto or simple form, Phase 2: Resend integration)
   - Name
   - Email
   - Journey of interest (dropdown with tour titles + "Custom Journey")
   - Travel dates (flexible text field, not rigid date picker)
   - Message / special interests
   - Submit button: "Send Inquiry"
3. **Contact Info** — Email, response time expectation
4. **Reassurance** — Brief note: no commitment, just a conversation

### Form behavior (Phase 1):
- Client-side validation
- On submit: show success message (no backend yet)
- Add `// TODO: Connect to Resend API` comments

### Content file: `content/pages/contact.json`

## CTA System Audit
Review all CTA components across the site and ensure:
- Consistent button styles
- Warm, invitational copy (per copy-rules.md)
- Correct href destinations
- Mobile-friendly touch targets

## Files Created
- `content/pages/contact.json`
- `app/contact/page.tsx`
- Review/update all CTA instances

## Acceptance Criteria
- [ ] Contact form renders with all fields
- [ ] Client-side validation works
- [ ] Success state displays on submit
- [ ] Form is accessible (labels, focus states, ARIA)
- [ ] All CTAs across site reviewed and consistent

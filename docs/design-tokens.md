# Design Tokens

> Canonical reference. Matches the CSS design system file exactly.
> When in doubt, this file wins over any other reference.

---

## Typography

### Font Stack
- **Display / Headings:** `'Cormorant Garamond', 'Palatino Linotype', Georgia, serif`
  - Loaded via Google Fonts: weights 300, 400, 500, 600, 700 + italics
  - CSS variable: `--font-display`
- **Body / UI:** `'General Sans', system-ui, sans-serif`
  - Self-hosted OTF files in `public/fonts/`
  - Weights: 200 (Extralight), 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold) + italics
  - CSS variable: `--font-sans`

### Font Files — General Sans (Variable)
```
public/fonts/
├── GeneralSans-Variable.ttf          (200–700, normal) ✓
├── GeneralSans-VariableItalic.ttf    (200–700, italic) ✓
├── GeneralSans-Bold.otf              (700, static fallback) ✓
└── GeneralSans-BoldItalic.otf        (700i, static fallback) ✓
```

Using variable fonts: 2 files cover ALL weights (200–700) instead of 14 static files. Much better for performance.

Source: https://www.fontshare.com/fonts/general-sans

### Type Scale
```
--text-xs:    0.75rem    / 12px   — micro labels
--text-sm:    0.875rem   / 14px   — captions, footnotes
--text-base:  1rem       / 16px   — body
--text-md:    1.125rem   / 18px   — large body
--text-lg:    1.5rem     / 24px   — subheadings
--text-xl:    2rem       / 32px   — section intro
--text-2xl:   2.5rem     / 40px   — section title
--text-3xl:   3.5rem     / 56px   — headline
--text-4xl:   5rem       / 80px   — hero title
--text-5xl:   7.5rem     / 120px  — display
```

### Line Heights
```
--leading-tight:    1.1     — display, hero
--leading-snug:     1.25    — headings
--leading-normal:   1.45    — UI, compact body
--leading-relaxed:  1.65    — body text, editorial reading
```

### Letter Spacing
```
--tracking-tight:   -0.02em   — hero, display, h1, h2
--tracking-normal:   0em      — body
--tracking-wide:     0.05em   — captions
--tracking-wider:    0.12em   — labels
--tracking-widest:   0.18em   — uppercase labels, micro
```

### Weights
```
--weight-light:    300    — display headings (primary heading weight)
--weight-regular:  400    — body, h3, h4
--weight-medium:   500    — emphasis
--weight-bold:     700    — labels, strong
```

### Semantic Type Styles

| Style       | Font           | Size       | Weight | Leading  | Tracking | Notes                    |
|-------------|----------------|------------|--------|----------|----------|--------------------------|
| `.display`  | --font-display | --text-5xl | 300    | tight    | tight    | Italic. Hero mega-text   |
| `h1`        | --font-display | --text-4xl | 300    | tight    | tight    | Hero titles              |
| `h2`        | --font-display | --text-3xl | 300    | tight    | tight    | Section headlines        |
| `h3`        | --font-display | --text-2xl | 400    | snug     | —        | Sub-sections             |
| `h4`        | --font-display | --text-xl  | 400    | snug     | —        | Card titles              |
| `p / .body` | --font-sans    | --text-base| 400    | relaxed  | —        | Default body             |
| `.body-lg`  | --font-sans    | --text-md  | 400    | relaxed  | —        | Lead paragraphs          |
| `.label`    | --font-sans    | --text-sm  | 700    | —        | widest   | Uppercase. Tier badges   |
| `.caption`  | --font-sans    | --text-xs  | 400    | —        | wide     | Opacity 0.65             |
| `blockquote`| --font-display | --text-2xl | 300    | snug     | —        | Italic. Pull quotes      |

**Key rule:** Headings are weight 300 (light), never bold. This is core to the editorial aesthetic.

---

## Color Palette

### Brand Colors
```
--negro:      #0F130E    — Negro territorio (deep forest black)
--verde:      #1A2E24    — Verde profundo (jungle depth)
--terracota:  #CC754A    — Terracota urbano (earth + architecture)
--tumbaga:    #9A7A3A    — Tumbaga (pre-Columbian gold alloy)
--marfil:     #E7D5BC    — Marfil editorial (parchment / ivory)
--blanco:     #F8F4EE    — Blanco (warm near-white)
```

### Opacity Variants
```
--negro-80:   rgba(15, 19, 14, 0.80)
--negro-60:   rgba(15, 19, 14, 0.60)
--negro-40:   rgba(15, 19, 14, 0.40)
--negro-20:   rgba(15, 19, 14, 0.20)

--marfil-80:  rgba(231, 213, 188, 0.80)
--marfil-40:  rgba(231, 213, 188, 0.40)
--marfil-20:  rgba(231, 213, 188, 0.20)

--tumbaga-80: rgba(154, 122, 58, 0.80)
--tumbaga-40: rgba(154, 122, 58, 0.40)
```

### Semantic Colors
```
/* Backgrounds */
--bg-primary:        var(--negro)        — Main dark bg
--bg-secondary:      var(--verde)        — Secondary dark surface
--bg-light:          var(--marfil)       — Light editorial sections
--bg-page:           var(--blanco)       — Page-level bg (warm white)
--bg-overlay:        rgba(15,19,14,0.65) — Hero video/image overlay

/* Text */
--fg-on-dark:        var(--marfil)                — Primary text on dark
--fg-on-dark-muted:  rgba(231,213,188,0.65)       — Secondary text on dark
--fg-on-light:       var(--negro)                 — Primary text on light
--fg-on-light-muted: rgba(15,19,14,0.55)          — Secondary text on light

/* Accents */
--accent-primary:    var(--tumbaga)      — Gold accent (symbolic, cultural)
--accent-secondary:  var(--terracota)    — CTA, interactive highlights
--accent-subtle:     var(--tumbaga-40)   — Subtle backgrounds

/* Borders */
--border-light:      rgba(231,213,188,0.30)  — Borders on dark sections
--border-dark:       rgba(15,19,14,0.20)     — Borders on light sections
--border-accent:     rgba(154,122,58,0.45)   — Gold accent borders
```

### Section Theme Rules
- **Hero / CTA / Footer:** `--bg-primary` (negro) + `--fg-on-dark` (marfil)
- **Narrative / editorial:** `--bg-page` (blanco) or `--bg-light` (marfil) + `--fg-on-light`
- **Alternate sections:** `--bg-secondary` (verde) for depth variation
- **Cards on light bg:** blanco surface with `--shadow-float`
- **Terracota** is reserved for interactive elements — one focal point per viewport max
- **Tumbaga** appears only in symbolic/cultural contexts (accent, not primary)

---

## Spacing Scale
```
--space-1:    4px
--space-2:    8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
--space-32: 128px
--space-40: 160px
```

---

## Border Radius
```
--radius-none:  0px       — Primary. Sharp architectural edges.
--radius-sm:    2px       — Rare. Only for inner micro elements.
--radius-pill:  9999px    — Tags/badges only if needed.
```

**Rule:** Meridiana uses sharp edges by default. No rounded corners on cards, sections, or buttons unless explicitly tagged as pill/badge.

---

## Shadows
```
--shadow-none:   none
--shadow-float:  0 2px 24px rgba(15, 19, 14, 0.18)   — Cards, elevated elements
--shadow-modal:  0 8px 48px rgba(15, 19, 14, 0.32)    — Modals, overlays
```

---

## Transitions
```
--ease-brand:    cubic-bezier(0.25, 0.1, 0.25, 1)    — Default brand easing
--ease-out:      cubic-bezier(0.0, 0.0, 0.2, 1)
--ease-in:       cubic-bezier(0.4, 0.0, 1, 1)
--duration-fast:   200ms
--duration-base:   350ms
--duration-slow:   600ms
--duration-xslow:  900ms   — Section reveals, hero animations
```

---

## Links
- Color: `inherit` (matches parent)
- No underline by default
- Hover: `opacity: 0.72`
- Transition: `--duration-fast` with `--ease-brand`

---

## Image Treatment
- Hero: full-bleed with `--bg-overlay` gradient from bottom
- Cards: sharp edges (`--radius-none`), `--shadow-float` on hover
- Aspect ratios: Hero 16:9, Cards 4:3, Gallery 3:2

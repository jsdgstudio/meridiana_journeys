# Task 11: Parche Homepage — Actualización Visual y de Contenido

## Tipo
Parche de actualización post-build. Se ejecuta después de que las tareas 01–06 estén completas (homepage y tours grid funcionales).

## Objetivo
Elevar la homepage con cuatro cambios: sistema de degradados en cards/secciones, nuevo copy del hero, reemplazo de la sección ValueProposition por una sección "Sobre Meridiana" con isotipo, y mejora de contraste en How It Works.

## Prerequisites
- Tasks 01–06 completadas
- Homepage renderizando correctamente
- Archivo `meridiana_isotipo.svg` en `public/images/` (solicitar al usuario si no existe)

---

## Etapa A: Sistema de Degradados

### Qué hacer
Integrar degradados sutiles al design system para cards y transiciones entre secciones. Estos degradados usan exclusivamente la paleta existente — no introducen colores nuevos.

### Tokens a agregar en `design-system/globals.css`
```css
:root {
  /* ── Gradient tokens ── */

  /* Cards: sutil, desde negro hacia verde — da profundidad sin romper la paleta */
  --gradient-card:        linear-gradient(160deg, var(--negro) 0%, var(--verde) 100%);
  --gradient-card-hover:  linear-gradient(160deg, var(--verde) 0%, rgba(154, 122, 58, 0.15) 100%);

  /* Secciones: transición vertical entre fondos oscuros */
  --gradient-section:     linear-gradient(180deg, var(--negro) 0%, var(--verde) 100%);
  --gradient-section-inv: linear-gradient(180deg, var(--verde) 0%, var(--negro) 100%);

  /* Hero overlay: profundiza el overlay sobre video/imagen */
  --gradient-hero:        linear-gradient(180deg, transparent 0%, rgba(15, 19, 14, 0.4) 40%, rgba(15, 19, 14, 0.85) 100%);

  /* Acento: toque de tumbaga para hover states o bordes iluminados */
  --gradient-accent:      linear-gradient(135deg, var(--tumbaga) 0%, var(--terracota) 100%);

  /* Texto con degradado (para títulos especiales — usar con moderación) */
  --gradient-text:        linear-gradient(135deg, var(--marfil) 0%, var(--tumbaga) 100%);
}
```

### Dónde aplicar

| Elemento | Degradado | Notas |
|----------|-----------|-------|
| `Card.tsx` (default state) | `--gradient-card` | Fondo de las tour cards en grid |
| `Card.tsx` (hover) | `--gradient-card-hover` | Transición suave en hover |
| `SectionWrapper` theme="dark" | `--gradient-section` | Sustituye el fondo plano negro |
| `SectionWrapper` theme="verde" | `--gradient-section-inv` | Variante invertida |
| Hero overlay | `--gradient-hero` | Reemplaza `--bg-overlay` en el hero |
| CTA button (primary) | `--gradient-accent` | Opcional — solo si eleva el diseño |
| Títulos destacados | `--gradient-text` con `background-clip: text` | Solo en momentos clave, no en todo |

### Reglas de uso
- Los degradados son **sutiles** — no deben sentirse como un efecto sino como profundidad natural
- Nunca usar degradados en secciones de fondo claro (marfil/blanco)
- El ángulo predominante es 160°–180° (diagonal suave o vertical)
- Los degradados de card deben mantener legibilidad del texto sobre ellos
- Transición en hover: `transition: background 500ms var(--ease-brand)`

### Archivos a modificar
- `design-system/globals.css` → agregar tokens
- `components/ui/Card.tsx` → aplicar gradient-card
- `components/ui/SectionWrapper.tsx` → aplicar gradient-section en tema dark
- `components/sections/Hero.tsx` → aplicar gradient-hero como overlay
- `tailwind.config.ts` → extender con gradient utilities si es necesario

---

## Etapa B: Nuevo Copy del Hero

### Qué hacer
Reemplazar el headline y subheadline actuales del hero principal por:

### Nuevo contenido
```json
{
  "hero": {
    "headline": {
      "es": "Cada territorio colombiano lleva siglos contando su historia.",
      "en": "Every Colombian territory has been telling its story for centuries."
    },
    "subheadline": {
      "es": "Nosotros traducimos sus voces.",
      "en": "We translate their voices."
    }
  }
}
```

### Tratamiento tipográfico
- **Headline:** `--font-display` (Cormorant Garamond), `--text-4xl`, weight 300, `--leading-tight`
- **Subheadline:** `--font-display`, `--text-xl`, weight 300, italic
- El subheadline debe sentirse como un eco del headline — menor tamaño, más íntimo
- Separación vertical entre headline y subheadline: `--space-6` (24px)
- El overlay del hero usa `--gradient-hero` (de Etapa A)

### Archivos a modificar
- `content/pages/homepage.json` → actualizar hero.headline y hero.subheadline
- `components/sections/Hero.tsx` → verificar que el tratamiento tipográfico sea correcto

---

## Etapa C: Sección "Sobre Meridiana" (reemplaza ValueProposition)

### Qué hacer
Eliminar completamente la sección `ValueProposition` ("No Turismo. Comprensión Cultural.") y reemplazarla con una nueva sección `AboutPreview` que proyecte confianza, curaduría y la identidad de Meridiana.

### Diseño de la sección

```
┌──────────────────────────────────────────────────────────────────┐
│  Fondo: --gradient-section (negro → verde)                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │          [ meridiana_isotipo.svg ]                        │    │
│  │          (centrado, tamaño prominente,                    │    │
│  │           color: --marfil con opacity 0.9)                │    │
│  │                                                          │    │
│  │  ── SOBRE MERIDIANA ──                                   │    │
│  │  (label, --font-sans, uppercase, tracked, tumbaga)       │    │
│  │                                                          │    │
│  │  "Somos una agencia de viajes culturales..."             │    │
│  │  (contenido editorial, columna estrecha,                  │    │
│  │   --font-display para lead, --font-sans para body)       │    │
│  │                                                          │    │
│  │  Frase de cierre destacada:                              │    │
│  │  "Lo que nos diferencia no es solo lo que                │    │
│  │   mostramos, sino quién lo cuenta."                      │    │
│  │  (blockquote, --font-display italic, --text-2xl)         │    │
│  │                                                          │    │
│  │  [ Conoce nuestra historia → ]                           │    │
│  │  (link a /about, terracota)                              │    │
│  │                                                          │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Contenido bilingüe

```json
{
  "aboutPreview": {
    "label": { "es": "Sobre Meridiana", "en": "About Meridiana" },
    "lead": {
      "es": "Somos una agencia de viajes culturales hechos a la medida que conecta a viajeros conscientes con la esencia de una Colombia auténtica, biodiversa y excepcionalmente creativa.",
      "en": "We are a bespoke cultural travel agency connecting conscious travelers with the essence of an authentic, biodiverse, and exceptionally creative Colombia."
    },
    "body": {
      "es": "<p>Nuestras propuestas nacen desde la investigación y acercamientos con creadores, pensadores y comunidades, dando forma a rutas culturales únicas que transforman el viaje en un acto de comprensión cultural para mentes curiosas que valoran el arte, la historia y el respeto genuino por las comunidades que nos abren sus puertas.</p><p>Redefinimos la forma en que el mundo experimenta Colombia.</p><p>Como parte de nuestro compromiso fomentamos proyectos en las comunidades en donde operamos, con programas de preservación y traspaso de saberes, ayuda a productores locales e iniciativas de conservación.</p><p>Queremos mostrarte un país donde dialogan la memoria y la contemporaneidad. Donde cinco ecosistemas han dado forma a culturas anfibias. Donde la gastronomía cuenta historias de mestizaje y resistencia.</p><p>Donde la artesanía piensa el mundo en sus propias formas.</p><p>Si quieres ser parte de una experiencia cultural inolvidable, Meridiana te transporta al alma de Colombia.</p>",
      "en": "<p>Our proposals are born from research and close relationships with creators, thinkers, and communities, shaping unique cultural routes that transform travel into an act of cultural understanding for curious minds who value art, history, and genuine respect for the communities that open their doors to us.</p><p>We are redefining the way the world experiences Colombia.</p><p>As part of our commitment, we foster projects in the communities where we operate, with programs for knowledge preservation and transfer, support for local producers, and conservation initiatives.</p><p>We want to show you a country where memory and contemporaneity are in dialogue. Where five ecosystems have shaped amphibious cultures. Where gastronomy tells stories of mestizaje and resistance.</p><p>Where craft thinks the world in its own forms.</p><p>If you want to be part of an unforgettable cultural experience, Meridiana transports you to the soul of Colombia.</p>"
    },
    "differentiator": {
      "label": { "es": "Diferencial", "en": "What sets us apart" },
      "text": {
        "es": "Nuestros viajes nacen de una propuesta curatorial responsable y auténtica.",
        "en": "Our journeys are born from a responsible and authentic curatorial approach."
      },
      "quote": {
        "es": "Lo que nos diferencia no es solo lo que mostramos, sino quién lo cuenta.",
        "en": "What sets us apart is not just what we show, but who tells the story."
      }
    },
    "cta": {
      "text": { "es": "Conoce nuestra historia", "en": "Discover our story" },
      "href": "/about"
    },
    "isotipo": "/images/meridiana_isotipo.svg"
  }
}
```

### Tratamiento del isotipo
- **Posición:** centrado, arriba del label "Sobre Meridiana"
- **Tamaño:** ancho entre 80–120px (lo suficiente para ser emblemático sin dominar)
- **Color:** `--marfil` con `opacity: 0.9` (elegante, no agresivo)
- **Animación:** fade-in sutil al entrar en viewport (Framer Motion, 800ms)
- No agregar hover effects al isotipo — es simbólico, no interactivo

### Estructura del texto
1. **Lead paragraph** (primer párrafo) → `--font-display`, `--text-xl`, weight 300 — más literario
2. **Body paragraphs** → `--font-sans`, `--text-base`, `--leading-relaxed` — informativo, claro
3. **Quote de cierre** → `blockquote` style, `--font-display` italic, `--text-2xl`
4. **CTA** → link con flecha, color `--terracota`, no botón — es una invitación, no un push

### Container
- Contenido en `--container-narrow` (768px max) para lectura editorial
- Padding vertical generoso: `--space-32` (128px) arriba y abajo
- El isotipo puede estar fuera del container (centrado en el ancho total)

### Archivos a crear/modificar
- **Crear:** `components/sections/AboutPreview.tsx`
- **Modificar:** `content/pages/homepage.json` → reemplazar `valueProp` por `aboutPreview`
- **Modificar:** `app/[locale]/(pages)/page.tsx` → importar AboutPreview en lugar de ValueProposition
- **Eliminar:** `components/sections/ValueProposition.tsx` (o marcar como deprecated)
- **Requerir:** `public/images/meridiana_isotipo.svg` — solicitar al usuario si no existe

---

## Etapa D: Contraste en How It Works

### Qué hacer
Los números de los pasos (1, 2, 3) tienen poco contraste visual. Mejorarlos usando los colores de acento de la paleta.

### Cambios

```tsx
// Antes: números apagados, difíciles de distinguir
<span className="text-6xl opacity-20">1</span>

// Después: números con terracota, presencia visual clara
<span style={{
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-4xl)',
  fontWeight: 'var(--weight-light)',
  color: 'var(--terracota)',
  opacity: 0.85,
  lineHeight: 'var(--leading-tight)'
}}>
  01
</span>
```

### Especificaciones
- **Número:** `--font-display` (Cormorant Garamond), `--text-4xl` (80px), weight 300
- **Color:** `--terracota` (#CC754A) con opacity 0.85
- **Formato:** dos dígitos (`01`, `02`, `03`) — más editorial que `1`, `2`, `3`
- **Alternativa:** Si terracota se siente demasiado dominante, usar `--tumbaga` (#9A7A3A) con opacity 1.0
- El título del paso y la descripción mantienen sus estilos actuales
- Agregar un separador sutil (línea de 1px en `--border-light`) entre el número y el título

### Archivos a modificar
- `components/sections/HowItWorks.tsx`

---

## Orden de ejecución

```
Etapa A (Gradientes)  →  necesaria primero, las demás etapas la usan
Etapa B (Hero copy)   →  cambio rápido, independiente
Etapa C (AboutPreview)→  la más compleja, depende de Etapa A
Etapa D (HowItWorks)  →  cambio rápido, independiente
```

**Comando sugerido para Claude Code:**
```
Lee tasks/11-patch-homepage.md. Ejecuta Etapa A primero
(sistema de degradados), luego B, C y D en ese orden.
```

---

## Acceptance Criteria

- [ ] Degradados integrados en tokens y aplicados a cards, secciones dark, y hero
- [ ] Hero muestra el nuevo copy bilingüe con tratamiento tipográfico correcto
- [ ] Sección ValueProposition eliminada del homepage
- [ ] Nueva sección AboutPreview renderiza con isotipo, contenido editorial, y quote
- [ ] Isotipo SVG centrado, color marfil, con fade-in en scroll
- [ ] Números en How It Works usan terracota/tumbaga con formato 01/02/03
- [ ] Todo el contenido es bilingüe (ES/EN)
- [ ] Sin regresiones en el resto del sitio
- [ ] Los degradados no afectan la legibilidad del texto

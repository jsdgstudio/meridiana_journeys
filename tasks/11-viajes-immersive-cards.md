# Task 11: Viajes — Cards Inmersivas

> **Skills a orquestar:** `/impeccable` + `/design-taste-frontend`
> **Principio rector:** La imagen es el contenido. El texto emerge desde ella.

---

## Objetivo

Elevar la sección `/viajes` a una experiencia de publicación editorial cinematográfica. Cada tour propone una identidad visual propia que emerge al hover — la imagen domina el espacio, el texto aparece desde el silencio de la fotografía.

El sistema de acordeón flex-grow ya existe en `TravelCards.tsx`. Esta tarea lo perfecciona: reemplaza las imágenes placeholder, asigna un lenguaje visual por tour, y eleva la coreografía de animaciones con Framer Motion.

---

## Prerequisites

- Tasks 01–10 completadas
- Leer: `docs/design-tokens.md`, `docs/experience-engine.md`, `docs/copy-rules.md`
- Leer: `components/sections/TravelCards.tsx` (sistema de acordeón existente)
- Imágenes de tours disponibles en la carpeta del proyecto (rotuladas por tour)

---

## Mapa de Identidad Visual por Tour

Cada card tiene su propio tratamiento tonal y de imagen. No hay dos cards iguales.

| Tour | Slug | Tono Emocional | Color tratamiento | Región etiqueta |
|------|------|----------------|-------------------|-----------------|
| Classic Bogotá | `classic-bogota` | Urbano, histórico, terracota colonial | `--terracota` warm overlay | Cundinamarca |
| Classic Colombia | `classic-colombia` | Múltiple, verde cafetero + caribe | `--verde` gradient profundo | Andes · Caribe |
| En Búsqueda del Dorado | `en-busqueda-del-dorado` | Místico, dorado, obsesión imperial | `--tumbaga` golden veil | Bogotá · Mompox · Cartagena |
| Macondo y el Realismo Mágico | `macondo-realismo-magico` | Caribeño, literario, calor húmedo | marfil + terracota difuso | Aracataca · Cartagena |
| Wild Colombia | `wild-colombia` | Expedición, biodiversidad radical | negro profundo + verde oscuro | 5 Ecosistemas |

---

## Paso 1 — Imágenes de Tours

### Acción
Mover/copiar las imágenes rotuladas desde la carpeta de materiales al proyecto:

```
frontend/public/images/tours/
├── bogota-hero.jpg          ← tour: classic-bogota
├── colombia-hero.jpg        ← tour: classic-colombia
├── dorado-hero.jpg          ← tour: en-busqueda-del-dorado
├── macondo-hero.jpg         ← tour: macondo-realismo-magico
└── wild-hero.jpg            ← tour: wild-colombia
```

### Criterio de imagen para cada card
- **Aspecto mínimo:** 3:2 en alta resolución
- **Punto focal:** El sujeto principal debe estar en el tercio izquierdo o derecho (nunca centrado) para que cuando el acordeón comprime la card, algo icónico permanezca visible
- **Tono:** Las imágenes deben respetar el mapa emocional de cada tour (ver tabla arriba)

### Actualizar content JSON
En `content/pages/homepage.json`, dentro de `travelCards.row1` y `row2`, reemplazar el campo `imageSrc` de cada card con la ruta local:
```json
"imageSrc": "/images/tours/bogota-hero.jpg"
```

---

## Paso 2 — Upgrade de TravelCards.tsx

### Archivo: `components/sections/TravelCards.tsx`

#### 2.1 Per-card Color Personality

Agregar un objeto `cardTheme` que asigna a cada `card.id` un conjunto de valores de overlay:

```typescript
const CARD_THEMES: Record<string, {
  scrimColor: string;       // color base del scrim en hover
  accentColor: string;      // color del tick decorativo superior
  overlayGradient: string;  // gradient del scrim-hover (de bottom)
}> = {
  "classic-bogota": {
    scrimColor: "rgba(204,117,74,0.18)",        // terracota sutil
    accentColor: "var(--terracota)",
    overlayGradient: "linear-gradient(to top, rgba(15,9,5,0.92) 0%, rgba(100,40,10,0.35) 55%, transparent 100%)"
  },
  "classic-colombia": {
    scrimColor: "rgba(26,46,36,0.20)",           // verde profundo sutil
    accentColor: "var(--tumbaga)",
    overlayGradient: "linear-gradient(to top, rgba(8,18,12,0.93) 0%, rgba(20,45,28,0.38) 55%, transparent 100%)"
  },
  "en-busqueda-del-dorado": {
    scrimColor: "rgba(154,122,58,0.18)",         // tumbaga dorado sutil
    accentColor: "var(--tumbaga)",
    overlayGradient: "linear-gradient(to top, rgba(10,7,2,0.95) 0%, rgba(80,60,15,0.45) 55%, transparent 100%)"
  },
  "macondo-realismo-magico": {
    scrimColor: "rgba(204,117,74,0.14)",         // calor caribeño
    accentColor: "var(--terracota)",
    overlayGradient: "linear-gradient(to top, rgba(15,8,4,0.90) 0%, rgba(120,60,30,0.30) 55%, transparent 100%)"
  },
  "wild-colombia": {
    scrimColor: "rgba(15,19,14,0.22)",           // negro territorio
    accentColor: "var(--verde)",
    overlayGradient: "linear-gradient(to top, rgba(5,10,6,0.96) 0%, rgba(10,25,14,0.50) 55%, transparent 100%)"
  },
};
```

#### 2.2 Scrim Superior — Legibilidad siempre

El gradiente top-to-bottom permanente debe ser más sutil: `rgba(0,0,0,0.45) 0%` → transparente en `38%`. Esto da dramatismo fotográfico sin matar la imagen.

#### 2.3 Tipografía de Título — Mayor impacto

Reemplazar el `clamp(1.75rem, 2.8vw, 2.6rem)` actual por:

```typescript
fontSize: "clamp(2rem, 3.5vw, 3.2rem)"
lineHeight: 0.92
letterSpacing: "-0.02em"
fontWeight: 300  // Light — regla core del sistema
```

El título debe sentirse como un titular de revista, no como un label de producto.

#### 2.4 Animación del Acordeón — Curva Meridiana

La easing actual `[0.25, 0.1, 0.25, 1]` se reemplaza por la ease-brand del sistema:

```typescript
const MERIDIANA_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const MERIDIANA_DURATION = 580; // ms — entre --duration-slow y --duration-xslow
```

Esto crea la sensación de **peso editorial** — las cards respiran en lugar de chasquear.

#### 2.5 Entrada con Viewport Stagger

```typescript
// Framer Motion — entrada de sección
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: MERIDIANA_EASE },
  },
};
```

El blur sutil en la entrada refuerza el carácter cinematográfico — las cards llegan como fotogramas.

#### 2.6 Isotipo — Comportamiento refinado

El isotipo actual en hover se mueve +2px up y llega a opacity 0.85. Agregar también:
```
transform: "rotate(0deg) scale(1.08)"
```
…con un pequeño scale que lo "activa" sin ser estridente.

#### 2.7 Meta tick — Acento por tour

El tick dorado horizontal antes de la línea de metadatos (`2–3 días · 2–8 viajeros`) debe usar el color de acento del tema del tour:

```typescript
background: CARD_THEMES[card.id]?.accentColor ?? "var(--tumbaga)"
```

---

## Paso 3 — Viajes Page (`app/[locale]/viajes/page.tsx`)

### 3.1 Header Cinematográfico

Reemplazar el header plano actual por uno con gradiente terracota-negro y separador decorativo de tumbaga.

```
Background: linear-gradient(160deg, var(--negro) 0%, var(--verde) 60%, rgba(154,122,58,0.12) 100%)
```

Agregar:
- Eyebrow label: `"MERIDIANA · COLOMBIA"` con trazo horizontal en tumbaga
- `h1` en Cormorant Garamond Light, tamaño `--text-4xl`, color marfil
- Párrafo intro: `font-sans text-base`, color `rgba(231,213,188,0.60)`, max-w-lg

### 3.2 Transición Dark → Cards

La sección header debe fundirse visualmente en las TravelCards dark. Eliminar el `theme="light"` de la instancia del viajes page y pasar a `theme="dark"` para continuidad visual.

**Justificación de diseño:** En modo light (fondo blanco) las cards pierden profundidad. La sección Viajes es el catálogo de experiencias —merece el tratamiento oscuro completo como en homepage.

### 3.3 Bottom CTA — Tono editorial

El CTA final `"¿Tienes en mente algo diferente?"` debe reflejar el lenguaje de Meridiana:
- Eyebrow: `"VIAJES A MEDIDA"` en uppercase + tracking-widest
- Heading: Cormorant Garamond, frase más literaria (ver copy-rules.md)
- Separador decorativo tumbaga antes y después del bloque

---

## Paso 4 — CSS de TravelCards (`design-system/globals.css`)

Agregar los estilos de la sección `.tc-*` con soporte para las transiciones de flex sin `!important`.

Clave: las transiciones de `flex-grow` necesitan estar en el mismo bloque de CSS para evitar el layout flash en móvil. Verificar que la directiva `@media (max-width: 820px)` colapsa correctamente con las imágenes reales.

### Nuevo bloque CSS para per-card accent glow (sutil, no neon)

```css
.tc-card::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 600ms var(--ease-brand);
  pointer-events: none;
  z-index: 1;
}
.tc-card:hover::before {
  opacity: 1;
}
/* Aplicar vía inline style desde React para respetar el CARD_THEME */
```

---

## Paso 5 — Animación de Reveal del Texto

La secuencia de reveal al expandir una card debe orquestar en este orden:

1. **0ms** — imagen escala a 1.06, scrim-hover entra
2. **80ms** — línea de metadatos (`2–3 días · …`) sube y aparece
3. **160ms** — párrafo narrativo corto aparece
4. **260ms** — CTAs aparecen

Esta coreografía existe via `tc-reveal-d0/d1/d2` pero los delays se refinan para coincidir con la easing más lenta de Meridiana.

---

## Archivos a crear / modificar

| Archivo | Acción |
|---------|--------|
| `public/images/tours/bogota-hero.jpg` | CREAR — copiar imagen rotulada |
| `public/images/tours/colombia-hero.jpg` | CREAR — copiar imagen rotulada |
| `public/images/tours/dorado-hero.jpg` | CREAR — copiar imagen rotulada |
| `public/images/tours/macondo-hero.jpg` | CREAR — copiar imagen rotulada |
| `public/images/tours/wild-hero.jpg` | CREAR — copiar imagen rotulada |
| `content/pages/homepage.json` | MODIFICAR — actualizar `imageSrc` por ruta local en `travelCards` |
| `components/sections/TravelCards.tsx` | MODIFICAR — per-card themes, easing, tipografía, animaciones |
| `app/[locale]/viajes/page.tsx` | MODIFICAR — header cinematográfico, theme dark |
| `design-system/globals.css` | MODIFICAR — refinar `.tc-*`, agregar glow accent |

---

## Criterios de Aceptación

- [ ] Todas las cards muestran imágenes reales (no Unsplash ni fallback)
- [ ] Al hover sobre una card, **la imagen se convierte en el plano dominante** — ocupa el 100% del contenedor sin gradiente agresivo superior
- [ ] Cada tour tiene un overlay con tono propio al expandirse (no son intercambiables)
- [ ] El texto emerge desde la imagen con el stagger correcto: meta → párrafo → CTAs
- [ ] La easing del acordeón se siente pesada y cinematográfica (no snap-back)
- [ ] El isotipo Meridiana aparece en cada card como marca de agua sutil y se activa en hover
- [ ] La página `/viajes` en fondo oscuro muestra las cards como galería editorial
- [ ] El header de Viajes tiene el tratamiento tipográfico editorial correcto
- [ ] En mobile (< 820px) las cards se apilan y muestran imagen + texto sin hover dependency
- [ ] Cero placeholders: `// TODO:` ni imágenes externas en producción

---

## Notas de Estilo para /impeccable + /design-taste-frontend

Al ejecutar este task con las skills de diseño, respetar las siguientes invariantes del sistema Meridiana:

**NUNCA:**
- Radius en cards (siempre `border-radius: 0`)
- Tipografía bold en headings de cards (siempre `font-weight: 300`)
- Más de un elemento en color terracota por viewport
- Gradientes de overlay saturados que destruyan la lectura de la imagen
- Animaciones de bounce o spring sobre elementos de imagen

**SIEMPRE:**
- Las imágenes ocupan el 100% del contenedor (`object-cover`, `inset-0`)
- El scrim inferior (bottom→top) protege la legibilidad del texto **sin borrar la imagen**
- El isotipo Meridiana en cada card — identidad de marca en cada punto de contacto
- `font-family: Cormorant Garamond, weight: 300` para todos los h3/h4 de cards
- La línea de metadatos (duración, grupo, precio) en `font-sans text-[11px] uppercase tracking-[0.2em]`
- Tumbaga como acento gold en separadores y ticks decorativos

---

## Precedencia de referencia visual

1. `TRAVELCARDS/meridiana-travel-cards.html` — referencia HTML del sistema de acordeón
2. `TRAVELCARDS/uploads/CARDS_V2.txt` — copy aprobado para cada tour
3. `docs/design-tokens.md` — paleta y tipografía canónica
4. `docs/copy-rules.md` — tono editorial para CTAs y labels
5. `docs/experience-engine.md` — arquitectura emocional de la sección

---

*Task creado: 2026-05-25 | Skill workflow: `/impeccable` → `/design-taste-frontend` → review manual*

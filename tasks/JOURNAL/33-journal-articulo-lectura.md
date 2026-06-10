# TASK 33 — JOURNAL: ARTÍCULO INDIVIDUAL (LECTURA LARGA + CUADERNO VISUAL)

> Sección Journal · Paso 3 de 3 · Ejecutar con /GSD · /impeccable + /taste-skill
> Modelo sugerido: Opus (la página más compleja — integra dos modos: lectura y galería)
> Pre-requisitos: Tasks 31 y 32 completadas.

## Objetivo

La página de artículo `/[locale]/journal/[slug]` es el corazón de la sección. Es una pieza de lectura larga donde el texto literario del ensayo y las imágenes del cuaderno visual completo se integran en una sola experiencia editorial. Referencia estética: revistas de arquitectura y viaje de alta gama (Apartamento, Condé Nast Traveller editorial, Roads & Kingdoms), no un blog post con featured image.

---

## Anatomía de la página

### 1. Hero cinematográfico

```
┌──────────────────────────────────────────────────────┐
│                                                       │
│                  [imagen hero, 100vh]                 │
│                  [gradient desde abajo --negro 60%]   │
│                                                       │
│                                                       │
│  ← Journal                           [marfil pequeño]│
│                                                       │
│  CATEGORÍA · REGIÓN                  [terracota caps] │
│                                                       │
│  Título del ensayo                                    │
│  [Cormorant 300, 72-96px, blanco, max 2 líneas]      │
│                                                       │
│  Subtítulo en cursiva                                 │
│  [Cormorant 300 italic, 28px, marfil 80%]            │
│                                                       │
│  ▼ [scroll indicator — línea vertical animada]        │
└──────────────────────────────────────────────────────┘
```

- La imagen hero es el primer ítem de `visualNotebook` (o la `heroImage` dedicada).
- El scroll indicator: línea de 40px que hace loop hacia abajo, animada con Framer Motion `animate={{ y: [0, 12, 0] }}`, `transition: { repeat: Infinity, duration: 1.6 }`. Desaparece al hacer scroll (useScroll + opacity).
- **NO hay video en el hero del Journal** — imagen fija, sin distracciones para la lectura.
- `next/image` con `priority` y `fill` para el hero.

### 2. Barra de metadatos

Inmediatamente después del hero, antes del texto:

```
┌────────────────────────────────────────────────────┐
│  [línea 1px terracota full-width]                  │
│                                                    │
│  CATEGORÍA          DURACIÓN LECTURA               │
│  Historia · Andes   8 min de lectura               │
│                                                    │
│  [línea 1px marfil 20% full-width]                 │
└────────────────────────────────────────────────────┘
```

Calcular minutos de lectura: suma de caracteres de todas las secciones `paragraph` / 1200 (caracteres/minuto estándar lectura en español), redondeado hacia arriba.

### 3. Columna de lectura

**Principio /impeccable:** el texto nunca tiene más de 680px de ancho (`max-width: 680px; margin: 0 auto`). Los `imagebreak` salen de esa columna y se expanden al ancho completo (o wider, ~900px). Esto es la firma visual del artículo.

```
               680px columna de texto
┌──────────────────────────────────┐
│                                  │
│  Párrafo párrafo párrafo párrafo │
│  párrafo párrafo párrafo.        │
│                                  │
│  Párrafo párrafo párrafo párrafo │
│  párrafo.                        │
│                                  │
└──────────────────────────────────┘
         [imagen break — full-width o 900px]
┌──────────────────────────────────────────────────┐
│                                                  │
│     [imagen, aspect-ratio 16/9]                  │
│                                                  │
│  caption en cursiva, derecha      [tumbaga]      │
└──────────────────────────────────────────────────┘
               680px columna de texto
┌──────────────────────────────────┐
│                                  │
│  Heading en Cormorant            │
│  [300, 36px, marfil]             │
│                                  │
│  Párrafo párrafo párrafo         │
│                                  │
└──────────────────────────────────┘
```

### 4. Tipografía de lectura — /taste-skill

| Elemento | Fuente | Peso | Tamaño | Color |
|---|---|---|---|---|
| Párrafo | General Sans | 300 | 18px | `--marfil` 90% |
| Heading | Cormorant Garamond | 300 | 36px | `--marfil` |
| Pull quote | Cormorant Garamond | 300 italic | 28px | `--marfil` con border-left 2px `--terracota` |
| Caption imagen | General Sans | 300 | 13px | `--tumbaga` |
| Categoría | General Sans | 400 caps | 11px | `--terracota` letter-spacing 0.15em |

Line-height de lectura: `1.8` en párrafos (generoso, para lectura larga). Espaciado entre párrafos: `2.5rem`.

### 5. Pull quotes como interrupción visual

Cuando `type: 'pullquote'`:
```
┌──────────────────────────────────┐
│                                  │
│  ┃  "El cacique que se cubría    │  ← border-left 2px terracota
│     de oro y se sumergía en      │     padding-left: 2rem
│     el agua como ofrenda."       │     Cormorant 300 italic 28px
│                                  │
└──────────────────────────────────┘
```
- Se mantiene dentro de la columna de 680px.
- No hay comillas decorativas grandes (sería un cliché). Solo la línea de borde terracota y la cursiva.

### 6. Cuaderno visual completo (galería masonry al final)

Después del último párrafo del body, antes del CTA de tour:

```
┌──────────────────────────────────────────────────────┐
│  CUADERNO VISUAL COMPLETO          [label terracota] │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                       │
│  [masonry grid de todas las imágenes en               │
│   3 columnas desktop / 2 tablet / 1 mobile]          │
│                                                       │
│  Cada imagen:                                         │
│  - Sin border-radius                                  │
│  - Caption en tumbaga debajo                         │
│  - Hover: scale 1.02, Framer Motion                  │
│  - Click: lightbox (ver paso siguiente)              │
└──────────────────────────────────────────────────────┘
```

**Lightbox:** al hacer click en una imagen del cuaderno visual se abre un overlay:
- Fondo `--negro` con opacity 0.96.
- La imagen en su máxima dimensión posible, centrada.
- Caption visible debajo.
- Botones `←` / `→` para navegar (teclado también: ArrowLeft/Right, Escape para cerrar).
- Framer Motion para la entrada/salida (fade + scale leve).
- Accesibilidad: `role="dialog"`, `aria-label`, focus trap, `aria-live` para caption.

Implementar lightbox como componente local `JournalLightbox.tsx` sin librería externa (para mantener control sobre animaciones y estética).

### 7. CTA de tour al final

```
┌──────────────────────────────────────────────────────┐
│  [línea 1px terracota]                               │
│                                                       │
│  Ver el viaje completo                               │
│  [Cormorant 300, 32px]                               │
│                                                       │
│  Classic Bogotá →                                    │
│  [General Sans, terracota, link sin botón]           │
└──────────────────────────────────────────────────────┘
```

- Link a `/[locale]/viajes/[tourSlug]`.
- NO es un botón con background. Es un link tipográfico, coherente con el tono literario de la página.

---

## Implementación

### `app/[locale]/journal/[slug]/page.tsx`

```tsx
import { getJournalEntry } from '@/lib/journal/entries';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // Retornar los 5 slugs × 2 locales = 10 páginas estáticas
}

export async function generateMetadata({ params }) {
  const entry = await getJournalEntry(params.slug);
  if (!entry) return {};
  const locale = params.locale as 'es' | 'en';
  return {
    title: entry.seo.title[locale],
    description: entry.seo.description[locale],
  };
}

export default async function JournalArticlePage({ params }) {
  const entry = await getJournalEntry(params.slug);
  if (!entry) notFound();
  const locale = params.locale as 'es' | 'en';
  return <JournalArticle entry={entry} locale={locale} />;
}
```

### `components/journal/JournalArticle.tsx`

Client component (necesita estado para el lightbox). Estructura:
1. `<JournalHero>` — imagen, metadatos, scroll indicator
2. `<MetaBar>` — categoría + minutos de lectura
3. `<ArticleBody>` — renderizar `entry.body` según type
4. `<VisualNotebook>` — grid masonry completo
5. `<JournalLightbox>` — overlay (hidden por defecto, state-driven)
6. `<TourCTA>` — link al tour

### `components/journal/ArticleBody.tsx`

Renderizador de secciones: switch sobre `section.type`:
- `paragraph`: `<p>` con clase de tipografía de lectura.
- `heading`: `<h2>` Cormorant 300.
- `pullquote`: `<blockquote>` con border-left terracota.
- `imagebreak`: `<figure>` full-width con `<JournalImage>` + `<figcaption>`.

### `components/journal/VisualNotebook.tsx`

CSS columns masonry: `columns: 3; column-gap: 8px` (desktop). Cada imagen: `break-inside: avoid; margin-bottom: 8px`. Hover y click → lightbox.

### `components/journal/JournalLightbox.tsx`

Estado interno: `activeIndex: number | null`. `useEffect` para capturar keydown. Framer Motion `AnimatePresence` para fade in/out.

---

## Animaciones de scroll /impeccable

Usar `motion.div` con `initial={{ opacity: 0, y: 20 }}` y `whileInView={{ opacity: 1, y: 0 }}` en:
- Cada sección del body (párrafos y headings).
- Las imágenes del `imagebreak`.
- El grid del cuaderno visual (stagger entre imágenes: `transition: { delay: i * 0.05 }`).

Siempre con `viewport={{ once: true }}` — la animación ocurre una sola vez por sesión.

---

## Criterios de aceptación

- [ ] Las 10 páginas (5 entradas × 2 locales) generan estáticamente sin errores.
- [ ] Columna de texto de 680px máximo, `imagebreak` más anchos. Verificar en DevTools.
- [ ] Pull quotes con border-left terracota, sin comillas decorativas.
- [ ] Lightbox funciona con mouse (click) y teclado (←/→/Escape), focus trap activo.
- [ ] Minutos de lectura calculados y correctos (aprox. ±1 min).
- [ ] CTA al tour al final, sin botón con background.
- [ ] `prefers-reduced-motion`: todas las animaciones Framer Motion respetan el hook `useReducedMotion`.
- [ ] Scroll suave en la página — sin saltos en la carga de imágenes (usar `next/image` con `sizes` apropiados).
- [ ] Mobile: columna de texto al 90% del viewport, cuaderno visual en 1 columna, lightbox funcional con swipe (si hay tiempo — puede ser v2).

## Archivos afectados
`app/[locale]/journal/[slug]/page.tsx` · `components/journal/JournalArticle.tsx` · `components/journal/JournalHero.tsx` · `components/journal/ArticleBody.tsx` · `components/journal/VisualNotebook.tsx` · `components/journal/JournalLightbox.tsx` · `components/journal/TourCTA.tsx` · `lib/journal/entries.ts` (extender con `getJournalEntry`)

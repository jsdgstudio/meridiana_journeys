# TASK 32 — JOURNAL: ÍNDICE EDITORIAL (MASONRY GRID)

> Sección Journal · Paso 2 de 3 · Ejecutar con /GSD · /impeccable + /taste-skill
> Modelo sugerido: Sonnet
> Pre-requisito: Task 31 completada (JSON de contenido listos).

## Objetivo

Rediseñar la página `/[locale]/journal` como un índice editorial con grid masonry, usando el design system de Meridiana y referenciando la estructura visual de `/viajes`. No es una lista de cards iguales — es una composición de pesos distintos, donde cada entrada tiene una personalidad tipográfica y una jerarquía diferente.

---

## Referencia de diseño: qué existe en /viajes

- Cards con imagen completa + metadatos (número de tour, región, duración) + título Cormorant 300 + párrafo + dos CTAs.
- Fondo `--negro` con `gradient-card` sobre imágenes.
- Borde `--terracota` en el primer card como acento.
- Sin border-radius en ningún elemento.
- Hover: ligero scale + overlay más oscuro, Framer Motion.

El Journal conserva esta ADN pero lo lleva hacia algo más editorial y más lento. **Menos CTA comercial, más invitación a leer.**

---

## Diseño del índice

### Hero de la sección

```
┌──────────────────────────────────────────────────────┐
│  MERIDIANA · JOURNAL                [label terracota]│
│                                                       │
│  El territorio                                        │
│  que estamos leyendo.              [Cormorant 300     │
│                                     muy grande,       │
│                                     peso ligero]      │
│                                                       │
│  Cinco ensayos. Cinco maneras de entender             │
│  Colombia antes de recorrerla.      [General Sans]    │
│                                                       │
│  ━━━━━━━━━━━━━━━━━ [línea delgada terracota] ━━━━━━  │
└──────────────────────────────────────────────────────┘
```

- Fondo `--negro`.
- Título: Cormorant Garamond 300, ~96px desktop / 56px mobile, NO bold.
- Subtítulo: General Sans 300, ~18px, color `--marfil` con opacidad 70%.
- La línea divisora (`border-top: 1px solid var(--terracota)`) separa el hero del grid.
- Framer Motion: fade + ligero translateY en el título al cargar (mismo easing `ease-brand`).

### Grid masonry

**Principio /impeccable:** el grid NO es una rejilla de 3 columnas iguales. Es una composición asimétrica donde el peso editorial de cada entrada determina su tamaño.

Layout desktop (≥1024px):
```
┌──────────────────────┬──────────────┐
│                      │              │
│   ENTRY 01           │  ENTRY 02    │
│   [imagen grande,    │  [imagen     │
│    2/3 del ancho]    │   estándar]  │
│                      │              │
│   Classic Bogotá     │ Classic      │
│   [título grande]    │  Colombia    │
│                      │              │
├────────┬─────────────┴──────┬───────┤
│        │                   │       │
│ENTRY 03│   ENTRY 04        │ E 05  │
│[peq]   │   [medio-grande]  │[peq]  │
│        │                   │       │
└────────┴───────────────────┴───────┘
```

Implementar con CSS Grid + `grid-row` span explícito:
- Entry 01 (Classic Bogotá): `grid-column: span 2`, imagen hero tall (aspect-ratio 3/4).
- Entry 02 (Classic Colombia): `grid-column: span 1`, aspect-ratio 4/3.
- Entry 03 (El Dorado): `grid-column: span 1`, aspect-ratio 1/1 (cuadrado).
- Entry 04 (Macondo): `grid-column: span 2`, landscape cinematográfico (16/9).
- Entry 05 (Wild Colombia): `grid-column: span 1`, portrait vertical.

Mobile: columna única, todas las cards en secuencia.
Tablet (768–1023px): 2 columnas, simplificado.

### Anatomy de cada card

```
┌─────────────────────────────────┐
│ [imagen, object-fit cover]      │
│ [gradient-card sobre imagen]    │
│                                 │
│ CATEGORÍA · REGIÓN    [pequeño] │
│ ━━━ [línea 1px marfil 30%]      │
│                                 │
│ Título del ensayo               │
│ [Cormorant 300, blanco]         │
│                                 │
│ Pull quote en cursiva           │
│ [General Sans 300, marfil 70%]  │
│                                 │
│ Leer ensayo →     [terracota]   │
└─────────────────────────────────┘
```

**Reglas /taste-skill:**
- El pull quote de la card (1–2 líneas) viene del campo `pullQuote` del JSON — no repetir el subtítulo.
- "Leer ensayo →" no es un botón. Es texto-link con `text-decoration: none`, color `--terracota`, sin borde, sin background. La flecha se desplaza 4px a la derecha en hover con Framer Motion.
- Sin etiquetas "Ver más" genéricas.
- NO mostrar número de tour. El Journal no enumera — presenta.
- La imagen de fondo debe tener un gradient-card que permita leer el texto sin una capa oscura excesiva. Usar: `linear-gradient(to top, var(--negro) 40%, transparent 100%)`.

### Hover

- Framer Motion `whileHover`: `scale: 1.015` en la imagen (no en el card entero), `transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }`.
- El texto no se mueve — solo la imagen hace scale hacia adentro.
- La flecha del CTA desliza 4px a la derecha.

---

## Implementación

### `app/[locale]/journal/page.tsx`

```tsx
// Server component
import { getJournalEntries } from '@/lib/journal/entries';

export default async function JournalPage({ params }: { params: { locale: string } }) {
  const entries = await getJournalEntries();
  const locale = params.locale as 'es' | 'en';
  // render JournalHero + JournalGrid
}
```

### `lib/journal/entries.ts`

```ts
import journalData from '@/content/journal'; // barrel export de los 5 JSON
// Exportar getJournalEntries(), getJournalEntry(slug)
// Orden fijo: classic-bogota, classic-colombia, en-busqueda-del-dorado, macondo-realismo-magico, wild-colombia
```

### `components/journal/JournalGrid.tsx`

- Recibe `entries[]` y `locale`.
- CSS Grid con las proporciones definidas arriba.
- Cada card es `<Link href={/${locale}/journal/${entry.slug}}>` — toda la card es clicable.

### `components/journal/JournalCard.tsx`

Props: `entry`, `locale`, `size: 'large' | 'medium' | 'small'`. El size determina el aspect-ratio y el tamaño tipográfico.

---

## Metadatos SEO

```tsx
export async function generateMetadata({ params }) {
  return {
    title: locale === 'es'
      ? 'Journal — El territorio que estamos leyendo | Meridiana'
      : 'Journal — The territory we are reading | Meridiana',
    description: locale === 'es'
      ? 'Cinco ensayos literarios sobre Colombia: historia, naturaleza, literatura y gastronomía antes del viaje.'
      : 'Five literary essays on Colombia: history, nature, literature and gastronomy before the journey.',
  };
}
```

---

## Criterios de aceptación

- [ ] `/es/journal` y `/en/journal` renderizan sin errores.
- [ ] Grid asimétrico visible en desktop: Entry 01 y 04 claramente más anchos.
- [ ] Pull quotes visibles y distintos del subtítulo del tour.
- [ ] Hover: solo la imagen escala, el texto no.
- [ ] Mobile: columna única legible, imágenes bien recortadas.
- [ ] Idioma: todos los textos en el locale correcto.
- [ ] Transición de entrada (fade + translateY) funciona con `prefers-reduced-motion` respetado (Framer Motion `useReducedMotion`).
- [ ] Sin border-radius en ningún elemento del grid.

## Archivos afectados
`app/[locale]/journal/page.tsx` · `lib/journal/entries.ts` · `components/journal/JournalGrid.tsx` · `components/journal/JournalCard.tsx` · `app/[locale]/journal/layout.tsx` (si aplica)

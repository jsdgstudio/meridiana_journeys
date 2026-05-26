# Task 12: Tour Detail — Rediseño Inmersivo de Fichas

> **Skills a orquestar:** `/impeccable` + `/design-taste-frontend`
> **Principio rector:** Cada ficha es una publicación. La fotografía no ilustra el texto — el texto habita la fotografía.

---

## Contexto de estado actual

Los 6 componentes de ficha existen y funcionan. El problema no es funcional — es editorial. La arquitectura está bien; la escala está mal.

| Componente | Estado actual | Problema principal |
|---|---|---|
| `TourHero` | 70vh, gradient bottom, texto abajo | Demasiado pequeño. Sin entrada cinematográfica. |
| `TourNarrative` | Blanco, prose narrow, pull quote | Sin jerarquía visual de apertura. Drop cap ausente. |
| `TourIncludes` | Dos columnas, luz, checkmarks básicos | Igual a cualquier tour SaaS. Sin carácter. |
| `TourItinerary` | Acordeón numérico, funcional | Números de día invisibles. Sin sentido de geografía. |
| `TourExperience` | Verde, barras tumbaga, tabla | Métricas frías. No conectan con la emoción del tour. |
| `TourPricing` | Oscuro, centrado, precio + CTA | Sin clímax visual. El precio aparece igual para todos. |

**Falta:** Componente de galería de imágenes. Sección PreTrip.

---

## Tours con imágenes disponibles (3)

El plan diferencia entre tours con imagen completa y tours con imagen parcial.

```
tours con hero + galería:
  classic-bogota          → hero + bogota-01/02/03
  en-busqueda-del-dorado  → hero + dorado-01/02
  macondo-realismo-magico → hero + macondo-01/02/...

tours pendientes de imagen:
  classic-colombia        → hero pendiente
  wild-colombia           → hero pendiente
```

Los tours sin imagen reciben un tratamiento fallback de fondo texturizado con gradiente de color hasta que lleguen las fotos. La arquitectura del componente no cambia.

---

## Identidad Visual por Tour

Cada ficha tiene su propio token de color dominante que tiñe levemente las secciones de transición. No es un tema completo — es un acento que impregna.

```typescript
// lib/tour-identity.ts  (archivo nuevo)
export const TOUR_IDENTITY: Record<string, {
  accent: string;          // CSS var o hex
  heroGradient: string;    // gradient del overlay hero
  sectionTint: string;     // rgba sutil para secciones intermedias
  narrativeTheme: "page" | "light" | "dark";
}> = {
  "classic-bogota": {
    accent: "var(--terracota)",
    heroGradient: "linear-gradient(to top, rgba(12,6,3,0.92) 0%, rgba(80,30,10,0.38) 50%, rgba(0,0,0,0.18) 100%)",
    sectionTint: "rgba(204,117,74,0.04)",
    narrativeTheme: "page",
  },
  "classic-colombia": {
    accent: "var(--tumbaga)",
    heroGradient: "linear-gradient(to top, rgba(5,12,8,0.94) 0%, rgba(15,40,24,0.42) 50%, rgba(0,0,0,0.15) 100%)",
    sectionTint: "rgba(26,46,36,0.05)",
    narrativeTheme: "page",
  },
  "en-busqueda-del-dorado": {
    accent: "var(--tumbaga)",
    heroGradient: "linear-gradient(to top, rgba(8,5,2,0.96) 0%, rgba(60,44,10,0.50) 50%, rgba(0,0,0,0.20) 100%)",
    sectionTint: "rgba(154,122,58,0.06)",
    narrativeTheme: "page",
  },
  "macondo-realismo-magico": {
    accent: "var(--terracota)",
    heroGradient: "linear-gradient(to top, rgba(12,5,2,0.92) 0%, rgba(90,40,15,0.40) 50%, rgba(0,0,0,0.16) 100%)",
    sectionTint: "rgba(204,117,74,0.04)",
    narrativeTheme: "page",
  },
  "wild-colombia": {
    accent: "var(--verde)",
    heroGradient: "linear-gradient(to top, rgba(3,8,4,0.97) 0%, rgba(8,24,12,0.55) 50%, rgba(0,0,0,0.20) 100%)",
    sectionTint: "rgba(15,19,14,0.06)",
    narrativeTheme: "page",
  },
};
```

Este objeto se importa en `TourHero`, `TourNarrative` y `TourPricing` para personalizar el gradiente sin romper los tokens del sistema.

---

## Paso 1 — Imágenes

### Estructura en `/public/images/tours/`

```
hero images (una por tour):
  bogota-hero.jpg
  colombia-full-hero.jpg
  dorado-hero.jpg
  macondo-hero.jpg
  wild-hero.jpg

gallery images (múltiples por tour):
  bogota-01.jpg, bogota-02.jpg, bogota-03.jpg
  dorado-01.jpg, dorado-02.jpg
  macondo-01.jpg, macondo-02.jpg, macondo-03.jpg
  (wild y colombia cuando lleguen)
```

### Criterios fotográficos para cada ficha

Cada imagen de hero tiene un **punto de anclaje** para el parallax. Esto va como metadato en el JSON del tour:

```json
"hero": {
  "image": "/images/tours/bogota-hero.jpg",
  "objectPosition": "center 30%",
  ...
}
```

Valores recomendados por tour según composición fotográfica típica:
- Bogotá (ciudad, horizonte): `"center 35%"`
- Dorado (arquitectura colonial): `"center 40%"`
- Macondo (costa, calor): `"center 50%"`
- Wild Colombia (naturaleza, dosel): `"center 25%"`

Agregar campo `objectPosition?: string` al tipo `Tour["hero"]` en `types/tour.ts`.

---

## Paso 2 — TourHero.tsx → Versión Cinematográfica

### Del 70vh actual → 100vh con Ken Burns

```tsx
// La imagen no es estática: hace un zoom lento desde scale(1.0) a scale(1.06)
// sobre 12 segundos. Crea profundidad sin movimiento percibido.
<motion.div
  className="absolute inset-0"
  initial={{ scale: 1.0 }}
  animate={{ scale: 1.06 }}
  transition={{ duration: 12, ease: "linear" }}
>
  <Image
    src={tour.hero.image}
    fill
    className="object-cover"
    style={{ objectPosition: tour.hero.objectPosition ?? "center 40%" }}
    priority
  />
</motion.div>
```

### Gradient de overlay — personalizado por tour

Reemplazar el gradiente fijo `from-negro/85` por el del `TOUR_IDENTITY`:

```tsx
const identity = TOUR_IDENTITY[tour.id] ?? TOUR_IDENTITY["classic-bogota"];
// ...
<div style={{ background: identity.heroGradient }} className="absolute inset-0" />
```

### Entrada del texto — secuencia en 4 actos

| Tiempo | Elemento | Animación |
|--------|----------|-----------|
| 0ms | Imagen ya visible (pre-rendered) | Ken Burns empieza |
| 200ms | Eyebrow / categoría | `opacity 0→1`, `y 16→0`, `filter blur(6px)→0` |
| 450ms | Título h1 | `opacity 0→1`, `y 24→0`, sin blur |
| 700ms | Subtítulo cursiva | `opacity 0→0.6`, `y 12→0` |
| 1000ms | Línea de metadata | `opacity 0→1`, `scaleX 0→1` (separador) |
| 1400ms | Flecha scroll-down | pulso lento, `translateY` loop |

**Easing para todos:** `[0.65, 0, 0.35, 1]` — la curva Meridiana.

### Back link — refinamiento

El link `← Viajes` actual desaparece en scroll. Agregar `position: fixed` en mobile → `position: absolute` en desktop, con `backdrop-blur` al hacer scroll (usar `useScroll` de Framer Motion).

### Scroll indicator

```tsx
// Línea vertical animada en bottom-center del hero
<motion.div
  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.8, duration: 0.8 }}
>
  <span className="label text-[10px] uppercase tracking-widest text-marfil/40">
    {locale === "es" ? "Desplazar" : "Scroll"}
  </span>
  <motion.div
    className="w-px h-10 bg-marfil/30 origin-top"
    animate={{ scaleY: [0, 1, 0] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
  />
</motion.div>
```

---

## Paso 3 — TourGallery.tsx (componente nuevo)

Nuevo componente que se inserta **entre TourNarrative y TourIncludes** en la página.

### Comportamiento

- Strip horizontal full-width de las imágenes de `tour.gallery`
- Las imágenes tienen aspect ratio fijo `3:2` con altura `55vh`
- En desktop: todas visibles con overflow horizontal (`overflow-x: auto`, scroll suave)
- En mobile: swipe nativo (mismo overflow)
- Entrada: cada imagen revela con stagger desde el viewport left

```tsx
// Estructura base
<section className="w-full overflow-hidden py-1.5">
  <motion.div
    className="flex gap-1.5"
    style={{ width: "max-content" }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
  >
    {tour.gallery?.map((src, i) => (
      <motion.div
        key={i}
        className="relative flex-shrink-0 overflow-hidden"
        style={{ width: "clamp(280px, 38vw, 560px)", height: "55vh" }}
        variants={{
          hidden: { opacity: 0, x: 40 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }
        }}
      >
        <Image src={src} fill className="object-cover" alt={`${tour.title[locale]} — ${i + 1}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-negro/20" />
      </motion.div>
    ))}
  </motion.div>
</section>
```

**Si `tour.gallery` está vacío o undefined:** el componente no renderiza nada (`return null`). Cero fallback visible.

---

## Paso 4 — TourNarrative.tsx → Editorial Profundo

### Drop cap en el primer párrafo

El primer párrafo del narrative largo debe abrir con una letra capital de 3 líneas. Se implementa con CSS puro, no con un componente especial:

```css
/* En globals.css */
.tour-narrative > p:first-of-type::first-letter {
  font-family: var(--font-display);
  font-size: 5.5rem;
  font-weight: 300;
  line-height: 0.82;
  float: left;
  margin-right: 0.08em;
  margin-top: 0.04em;
  color: var(--tumbaga);
}
```

Agregar clase `tour-narrative` al wrapper del `RichText` en `TourNarrative`.

### Pull quote — Momento de respiración

El pull quote debe ser un **momento de página completa** — no un aside sino una pausa.

```tsx
// Reemplazar el blockquote actual por:
<motion.div
  className="w-full my-16 md:my-24 border-l-2 pl-8 md:pl-12"
  style={{ borderColor: "var(--tumbaga)" }}
  initial={{ opacity: 0, x: -24 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
>
  <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light italic text-negro leading-[1.25]"
     style={{ letterSpacing: "-0.01em" }}>
    &ldquo;{narrative.pullQuote[locale]}&rdquo;
  </p>
</motion.div>
```

### Separador de sección — Isotipo como pivote

Agregar al final de la sección Narrativa, antes de la galería, el isotipo como separador:

```tsx
<div className="flex items-center gap-6 my-12">
  <div className="flex-1 h-px bg-negro/10" />
  <svg viewBox="0 0 372 308" className="w-8 h-auto opacity-20 text-negro" fill="currentColor">
    <path d={MERIDIANA_ISO_PATH} />
  </svg>
  <div className="flex-1 h-px bg-negro/10" />
</div>
```

---

## Paso 5 — TourItinerary.tsx → Timeline Inmersivo

### Números de día — escala monumental

Los números actuales están en `text-3xl text-negro/15`. Deben ser enormes, fantasma, parte del layout:

```tsx
// Número de día como elemento decorativo gigante
<span
  className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-light select-none pointer-events-none"
  style={{
    fontSize: "clamp(5rem, 12vw, 9rem)",
    lineHeight: 1,
    color: "rgba(15,19,14,0.04)",
    letterSpacing: "-0.04em",
  }}
  aria-hidden="true"
>
  {String(day.day).padStart(2, "0")}
</span>
```

El día número visible (legible) permanece en su tamaño actual. El número fantasma es puramente decorativo.

### Separadores de día — color acento del tour

La línea `border-b border-negro/10` entre días se reemplaza por:

```tsx
<div className="h-px w-full" style={{ background: `linear-gradient(to right, var(--accent-tour), transparent 80%)` }} />
```

Donde `--accent-tour` es la variable que se pasa desde la página via `style={{ "--accent-tour": identity.accent }}`.

### Highlights de día — lectura editorial

Los highlights actuales con `→` en tumbaga son correctos. Agregar espaciado superior `mt-1` entre el dash y el texto, y cambiar `text-negro/60` por `text-negro/70` para mejor legibilidad.

### Accordeón expandido — transición más lenta

Cambiar `duration: 0.4` por `duration: 0.55` con easing `[0.65, 0, 0.35, 1]` para que la apertura se sienta editorial.

---

## Paso 6 — TourIncludes.tsx → Contraste Dramático

### Cambio de fondo: `light` → `dark`

`SectionWrapper theme="light"` → `theme="dark"`.

Justificación: el blanco consecutivo entre Narrativa (blanco) → Includes (blanco) crea un vacío editorial. El cambio a oscuro crea ritmo visual.

### Adaptación de colores al fondo oscuro

```tsx
// Includes (verde checkmark → tumbaga, texto marfil)
<span className="mt-1 flex-shrink-0" style={{ color: "var(--tumbaga)", fontSize: "11px" }}>✓</span>
<span className="font-sans text-sm leading-relaxed" style={{ color: "rgba(231,213,188,0.75)" }}>
  {item[locale]}
</span>

// Excludes (dash más sutil en marfil/30)
<span className="mt-1 flex-shrink-0" style={{ color: "rgba(231,213,188,0.30)", fontSize: "11px" }}>—</span>
<span className="font-sans text-sm leading-relaxed" style={{ color: "rgba(231,213,188,0.40)" }}>
  {item[locale]}
</span>
```

### Separador entre columnas

En desktop, agregar una línea vertical `1px` entre includes y excludes:
```tsx
<div className="hidden lg:block w-px self-stretch" style={{ background: "rgba(231,213,188,0.10)" }} />
```

---

## Paso 7 — TourExperience.tsx → Métricas con Carácter

Sin cambio de fondo (`verde` permanece). Los ajustes son tipográficos y de escala.

### MetricBar — valor numérico como elemento display

El `{value}/5` actual en `text-lg text-negro/30` no funciona sobre verde. Reemplazar:

```tsx
// Número grande flotando sobre la barra
<div className="flex justify-between items-baseline mb-3">
  <span className="font-sans text-sm" style={{ color: "rgba(231,213,188,0.65)" }}>{label}</span>
  <span
    className="font-display font-light"
    style={{ fontSize: "2rem", lineHeight: 1, color: "var(--tumbaga)", opacity: 0.9 }}
  >
    {value}
  </span>
</div>
<div className="h-px relative" style={{ background: "rgba(231,213,188,0.12)" }}>
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
    style={{ width: `${(value / 5) * 100}%`, background: "var(--tumbaga)" }}
    className="absolute top-0 left-0 h-px origin-left"
  />
</div>
```

### Tabla de hechos (facts) — tipografía más clara

`color: rgba(154,122,58,0.80)` → `color: var(--tumbaga)` para los labels.
`color: rgba(231,213,188,0.75)` → `color: rgba(231,213,188,0.85)` para los valores.

### Signature experiences — icono distinto por tour

Reemplazar el dash `—` genérico por el acento del tour. El color del bullet usa `identity.accent`:

```tsx
<span className="text-xs mt-1 flex-shrink-0" style={{ color: identity.accent }}>◆</span>
```

---

## Paso 8 — TourPricing.tsx → CTA Climático

### Imagen de fondo (opcional pero poderosa)

Si el tour tiene imagen hero, agregarla como fondo del bloque de pricing con opacidad muy baja:

```tsx
<section className="relative overflow-hidden" style={{ background: "var(--negro)" }}>
  {/* Imagen de fondo difuminada — presencia subliminal */}
  <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
    <Image src={tour.hero.image} fill className="object-cover object-center" alt="" aria-hidden />
    <div className="absolute inset-0" style={{ background: "var(--negro)", opacity: 0.6 }} />
  </div>
  {/* Contenido pricing sobre la imagen */}
  <div className="relative z-10">
    {/* ... precio + CTA ... */}
  </div>
</section>
```

### Precio — escala editorial

El `text-5xl` actual es correcto. Agregar letter-spacing negativo:

```tsx
className="font-display font-light text-marfil leading-tight"
style={{ fontSize: "clamp(3rem, 7vw, 5rem)", letterSpacing: "-0.03em" }}
```

### CTA — dimensión final

El Button actual es correcto. Agregar un texto de contexto emocional sobre el precio — una frase corta en Cormorant Garamond cursiva antes del precio, que varía por tour:

```json
// En cada tour.json → price.contextPhrase
"contextPhrase": {
  "es": "Un viaje que define la manera en que entenderás Colombia.",
  "en": "A journey that will redefine how you understand Colombia."
}
```

```tsx
{price.contextPhrase && (
  <motion.p
    variants={fadeInUp}
    className="font-display text-lg md:text-xl font-light italic"
    style={{ color: "rgba(231,213,188,0.55)" }}
  >
    {price.contextPhrase[locale]}
  </motion.p>
)}
```

---

## Paso 9 — TourPreTrip.tsx (componente nuevo)

La data `preTrip` existe en los JSONs pero no tiene componente. Se inserta entre `TourExperience` y `TourPricing`.

```tsx
// components/tour/TourPreTrip.tsx
// SectionWrapper theme="light"
// Dos columnas: packing list (izq) + preparation text (der)

// Packing — lista con bullets tumbaga
// Preparation — párrafo editorial en Cormorant Garamond
// Si preTrip es undefined → return null
```

La sección tiene eyebrow `"ANTES DE PARTIR"` / `"BEFORE YOU GO"` con tick tumbaga.

---

## Paso 10 — Página de Tour (`app/[locale]/viajes/[slug]/page.tsx`)

### Agregar TourGallery y TourPreTrip a la composición

```tsx
<TourHero tour={tour} locale={locale} />
<TourNarrative tour={tour} locale={locale} />
<TourGallery tour={tour} locale={locale} />          // NUEVO — post narrativa
<TourIncludes tour={tour} locale={locale} />
<TourItinerary tour={tour} locale={locale} />
<TourExperience tour={tour} locale={locale} />
<TourPreTrip tour={tour} locale={locale} />           // NUEVO — pre pricing
<TourPricing tour={tour} locale={locale} />
```

### Schema.org — actualizar con galería

```tsx
const tourSchema = {
  // ...existente...
  image: [
    tour.hero.image,
    ...(tour.gallery ?? []),
  ],
};
```

---

## Archivos a crear / modificar

| Archivo | Acción | Prioridad |
|---------|--------|-----------|
| `lib/tour-identity.ts` | CREAR — mapa de identidad visual por tour | Alta |
| `types/tour.ts` | MODIFICAR — agregar `hero.objectPosition?`, `price.contextPhrase?` | Alta |
| `public/images/tours/` | POBLAR — imágenes hero y galería de los 3 tours disponibles | Crítica |
| `content/tours/*.json` | MODIFICAR — `hero.objectPosition`, `price.contextPhrase` en 3 tours | Alta |
| `components/tour/TourHero.tsx` | MODIFICAR — 100vh, Ken Burns, secuencia de entrada, scroll indicator | Alta |
| `components/tour/TourGallery.tsx` | CREAR — strip horizontal, stagger reveal | Alta |
| `components/tour/TourNarrative.tsx` | MODIFICAR — drop cap, pull quote expandido, separador isotipo | Media |
| `components/tour/TourItinerary.tsx` | MODIFICAR — números monumento, separadores de acento, easing | Media |
| `components/tour/TourIncludes.tsx` | MODIFICAR — theme dark, colores marfil, separador columnas | Media |
| `components/tour/TourExperience.tsx` | MODIFICAR — MetricBar escala, facts legibilidad, bullets acento | Media |
| `components/tour/TourPricing.tsx` | MODIFICAR — imagen fondo subliminal, contextPhrase, letterSpacing | Media |
| `components/tour/TourPreTrip.tsx` | CREAR — packing + preparation, return null si vacío | Media |
| `components/tour/index.ts` | MODIFICAR — exportar TourGallery y TourPreTrip | Baja |
| `app/[locale]/viajes/[slug]/page.tsx` | MODIFICAR — agregar TourGallery y TourPreTrip, schema imagen[] | Alta |
| `design-system/globals.css` | MODIFICAR — agregar `.tour-narrative::first-letter` drop cap | Media |

---

## Criterios de Aceptación

### Hero
- [ ] La imagen ocupa 100vh sin recorte visible en ningún breakpoint
- [ ] Ken Burns activo: zoom lento apreciable después de 5 segundos
- [ ] El texto entra en 4 actos con la secuencia de timing especificada
- [ ] El scroll indicator aparece con delay y pulsa infinitamente
- [ ] El gradiente de overlay es el propio del tour (no el genérico `from-negro/85`)

### Galería
- [ ] Se renderiza solo si `tour.gallery` tiene elementos
- [ ] Las imágenes tienen aspect ratio constante `3:2` a `55vh` de altura
- [ ] Scroll horizontal funciona en desktop y mobile (swipe nativo)
- [ ] Stagger de entrada visible al cruzar el viewport

### Narrativa
- [ ] Drop cap visible en el primer párrafo, color tumbaga, `float: left`
- [ ] Pull quote ocupa pleno ancho del container con borde izquierdo tumbaga
- [ ] Separador isotipo meridiana al final de la sección

### Itinerario
- [ ] Número de día fantasma visible como elemento de fondo (no compite con el texto)
- [ ] Separador entre días usa acento del tour (no `border-negro/10` genérico)
- [ ] La animación de acordeón es más lenta que la versión actual

### Includes
- [ ] Fondo oscuro (theme dark)
- [ ] Includes en marfil/75, excludes en marfil/40 — contraste claro
- [ ] Separador vertical entre columnas en desktop

### Pricing
- [ ] Imagen hero visible como fondo subliminal (opacity ~0.12)
- [ ] `contextPhrase` se renderiza si existe en el JSON
- [ ] Precio con letter-spacing negativo, escala clamp responsive

### PreTrip
- [ ] Aparece solo si `tour.preTrip` existe en el JSON
- [ ] Packing list y preparación en dos columnas
- [ ] `return null` limpio si no hay data — sin espacios vacíos

### General
- [ ] Ningún componente muestra texto placeholder (`// TODO`)
- [ ] La secuencia narrativa EMOTION → UNDERSTANDING → TRUST → DESIRE → ACTION es reconocible al recorrer la página
- [ ] Los 3 tours con imágenes muestran todas sus fotos. Los 2 pendientes muestran solo hero.
- [ ] En mobile cada sección es navegable y legible sin zoom

---

## Ritmo de Alternancia de Fondo — Secuencia Final

El scroll completo de una ficha debe transitar así:

```
TourHero        → negro total (imagen)
TourNarrative   → blanco/page (lectura)
TourGallery     → negro (franja fotográfica)
TourIncludes    → negro (dark — contraste)
TourItinerary   → blanco/page (datos)
TourExperience  → verde profundo (marca)
TourPreTrip     → marfil/light (preparación cálida)
TourPricing     → negro + imagen subliminal (clímax)
```

Esta alternancia negro/blanco/negro/negro/blanco/verde/marfil/negro crea **ritmo de página** — es la misma lógica que el layout de una revista editorial bien diseñada.

---

## Notas de Estilo para /impeccable + /design-taste-frontend

**NUNCA en fichas de tour:**
- `border-radius` en ningún contenedor de imagen
- Tipografía de precio en bold (siempre `font-light`)
- Iconos de emoji o pictogramas externos (usar SVG del sistema)
- Más de una `background-image` decorativa por sección (las imágenes editoriales son el contenido, no decoración)
- Gradientes con saturación alta sobre las fotos (destruyen la fotografía)

**SIEMPRE en fichas de tour:**
- El hero es el hook. Tiene que funcionar en los primeros 3 segundos sin scroll
- El número de día en itinerario es un elemento de diseño, no solo información
- El drop cap es obligatorio cuando existe `narrative.long` de más de 200 palabras
- El separador tumbaga (línea horizontal) marca cada transición de sección importante
- El isotipo Meridiana aparece al menos dos veces en la ficha: en el TourNarrative (separador) y como marca de agua en el TourPricing

---

## Precedencia de Referencia

1. `docs/experience-engine.md` — flujo emocional de la ficha
2. `docs/design-tokens.md` — paleta y tipografía canónica
3. `docs/copy-rules.md` — tono del copy y labels
4. `tasks/11-viajes-immersive-cards.md` — coherencia con el sistema de cards
5. `TRAVELCARDS/meridiana-travel-cards.html` — referencia de animaciones y easing

---

*Task creado: 2026-05-25 | Depende de: Task 11 (imágenes en public/images/tours/) | Skills: `/impeccable` → `/design-taste-frontend` → review manual*

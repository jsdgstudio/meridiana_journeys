# Design Contract: Sección "La Experiencia" — Meridiana Tour Detail

## 1. Visual Theme & Atmosphere

Una sección de ficha editorial — densidad calibrada (5/10), asimetría controlada
(varianza 6/10), movimiento fluido spring-physics (6/10). El fondo es verde oscuro
(#1A2E24): una sala de mapas iluminada con luz cálida, no una interfaz de software.
Cada dato comunica autoridad sin frialdad. La jerarquía nace del contraste tipográfico,
no del tamaño de fuente gritón.

**Problema central resuelto:** Los elementos actuales usan opacidades demasiado bajas
(0.60–0.70) sobre verde oscuro, generando contraste insuficiente en pantallas medianas
y móvil. Las barras de 1px son invisibles en retina. El grid `[140px_1fr]` rompe en
móvil. Se elimina toda ambigüedad visual.

---

## 2. Color Palette & Roles

- **Fondo de sección** (#1A2E24) — verde profundo, toda la sección vive sobre esto
- **Texto primario** (#E7D5BC, opacity 1.0) — marfil puro para títulos y valores clave
- **Texto secundario** (#E7D5BC, opacity 0.80) — marfil 80% para descripciones y valores de hechos
- **Etiquetas / labels** (#9A7A3A, opacity 1.0) — tumbaga sólido, nunca diluido, para keys y eyebrows
- **Acento principal** (#CC754A) — terracota solo para iconos de bullets distintivos y fills de tags "Ideal para"
- **Barra de métrica — fondo** (rgba(231,213,188,0.10)) — marfil 10%, raíl visible pero recesivo
- **Barra de métrica — fill** (#9A7A3A) — tumbaga sólido, sin transparencia
- **Líneas divisoras** (rgba(231,213,188,0.12)) — marfil 12%, estructurales, nunca decorativas
- **Tag idealFor — borde** (rgba(204,117,74,0.40)) — terracota 40%
- **Tag idealFor — texto** (#CC754A) — terracota sólido

**PROHIBIDO:** No usar opacidades por debajo de 0.75 en texto que deba leerse. No mezclar
grises fríos. No #000000 puro.

---

## 3. Tipografía

- **Heading de sección (h2):** Cormorant Garamond — weight 300, tamaño clamp(1.75rem,3vw,2.5rem), color marfil puro
- **Eyebrow / etiquetas:** General Sans — uppercase, 10px/11px, letter-spacing 0.26em, color tumbaga (#9A7A3A) sólido
- **Número de métrica:** Cormorant Garamond — weight 300, 1.5rem, color tumbaga sólido (NO 2rem — demasiado dominante)
- **Nombre de métrica (label):** General Sans — 12px (no 10px), color marfil 80%
- **Valor de hecho (dd):** General Sans — 14px, leading-relaxed, marfil 85%
- **Key de hecho (dt):** General Sans — uppercase, 10px, letter-spacing 0.22em, tumbaga sólido
- **Signature experience text:** General Sans — 15px, leading-relaxed, marfil 85% (NO 0.70)
- **Tag idealFor:** General Sans — 11px, uppercase, letter-spacing 0.16em, terracota sólido

**PROHIBIDO:** Inter. Pesos bold en headings de sección. Texto de cuerpo por debajo de 13px.

---

## 4. Componentes

### MetricBar (rediseñada)
- Raíl: altura 3px (no 1px), fondo rgba(231,213,188,0.10)
- Fill animado: altura 3px, color tumbaga (#9A7A3A) sólido, origin-left, spring EASE
- Layout: fila flex `justify-between` — label izquierda (12px, marfil 80%) + número derecha (1.5rem Cormorant, tumbaga)
- Gap entre texto y barra: 10px (mb-2.5)
- Animación: `scaleX` 0→1 en viewport, duration 1.0s, ease [0.65,0,0.35,1]

### Facts Table (dl rediseñada)
- Desktop (≥640px): grid `grid-cols-[160px_1fr]` — dt fijo 160px
- Móvil (<640px): stack vertical — dt arriba, dd abajo, sin grid de columnas
- Implementación: `sm:grid sm:grid-cols-[160px_1fr]` con `block` en base
- Padding vertical por fila: `py-3` (no py-2 — más espacio para respirar)
- Separador: `border-b border-marfil/8` — ligeramente más visible que 0.06
- dt: uppercase 10px, letter-spacing 0.22em, tumbaga sólido, mb-0.5 en móvil
- dd: 14px, marfil 85%, leading-relaxed

### Signature Experiences (ul rediseñada)
- Bullet: línea vertical 2px × 16px, color terracota, `flex-shrink-0 mt-1` — reemplaza ◆
- Texto: 15px (sm:text-base), marfil 85% (opacity mínima 0.85, NO 0.70)
- Gap item: `gap-3`
- Animación: opacity+x stagger igual que ahora pero con delay reducido (i*0.06)

### Tags "Ideal para"
- Borde: 1px, `border-terracota/40`
- Texto: terracota sólido, 11px uppercase, letter-spacing 0.16em
- Padding: `px-3 py-1.5`
- Sin border-radius (consistente con estética sharp)
- Hover: borde terracota sólido (opacity 1.0), transición 200ms

---

## 5. Layout

**Desktop (lg+):** Grid 2 columnas `gap-16 lg:gap-24` — izquierda: métricas + hechos / derecha: experiencias + tags
**Tablet (md):** 2 columnas con gap reducido
**Móvil (<lg):** 1 columna, stack vertical, col izquierda primero

Separación de bloques dentro de cada columna: `space-y-12` se mantiene.
El heading h2 mantiene el eyebrow-line (línea 24px tumbaga + h2 marfil).

Max-width del Container: heredado del sistema existente.

---

## 6. Motion & Interaction

- **MetricBar fill:** `scaleX` 0→1, duration 1.0s, ease [0.65,0,0.35,1], `viewport once:true`
- **Facts rows:** opacity+y(8→0), duration 0.4s, stagger i*0.04 — igual que ahora
- **Signature items:** opacity+x(-12→0), duration 0.5s, stagger i*0.06
- **Tags idealFor:** `whileHover` — `borderColor` a terracota sólido, duration 200ms
- Solo `transform` y `opacity` — nunca animar `width`, `height`, `top`, `left`
- Client component: mantener `"use client"` para Framer Motion

---

## 7. Anti-Patterns (Prohibido)

- No opacidades < 0.75 en texto legible (la causa raíz de los problemas actuales)
- No barras de 1px — mínimo 3px para elementos métricos
- No grid de columnas fijas en móvil (el `[140px_1fr]` rompe en 320-375px)
- No bullets decorativos ◆ — prefiero líneas de acento geométricas
- No border-radius en ningún elemento (estética Meridiana: sharp edges)
- No gradientes en texto
- No emojis
- No texto de placeholder "Lorem ipsum"
- No spinner circular en loading states
- No hover states con glow o box-shadow de neón
- No mezclar familias tipográficas fuera del sistema (Cormorant + General Sans únicamente)

# Task 15: Home Sobre Meridiana — Rediseño con Video Scroll

## Ejecutar con: /GSD
## Commit: "Task 15: sobre meridiana — rediseño con video scroll y isotipo"

---

## Objetivo
Rediseñar la sección AboutPreview del homepage. Quitar elementos específicos, mantener otros, y agregar un video de fondo sincronizado con scroll + animación del isotipo.

## Qué QUITAR
- "Método · 01 Investigación, escucha, curaduría." → ELIMINAR
- La sección "Lo que mostramos" → ELIMINAR

## Qué MANTENER
- Texto editorial desde el inicio hasta "Redefinimos la forma en que el mundo experimenta Colombia."
- Las líneas decorativas del centro y sus animaciones actuales
- La frase de cierre: "Si quieres ser parte de una experiencia cultural inolvidable, Meridiana te transporta al alma de Colombia."
- El CTA existente

## Qué AGREGAR

### Video de fondo con scroll sync
- **Archivo:** `public/video/fondo_redefinimos.mp4`
- **Comportamiento:** El video avanza sincronizado con el scroll del usuario (no autoplay libre)
- **Implementación sugerida:**
```tsx
// Scroll-driven video playback
const videoRef = useRef<HTMLVideoElement>(null);
const { scrollYProgress } = useScroll({ target: sectionRef });

useMotionValueEvent(scrollYProgress, "change", (progress) => {
  if (videoRef.current) {
    videoRef.current.currentTime = progress * videoRef.current.duration;
  }
});
```
- **Máscara/overlay:** Gradiente interno basado en `--negro` para mantener legibilidad
- El video NO debe tener audio

### Isotipo animado
- **Archivo:** `public/images/meridiana_isotipo.svg`
- **Color:** `--tumbaga` (#9A7A3A)
- **Posición:** Centro de la sección, prominente
- **Animación:** Aparición envolvente activada por scroll (scale from 0.8→1 + opacity 0→1)
- Sincronizada con el avance del video

### Efecto de máscara/dither (experimental)
- Gradiente interno en los bordes del video usando `--negro`
- Opción A: Máscara CSS con gradiente radial (la más ligera)
- Opción B: Patrón SVG de puntos pequeños como filtro dither (sutil, activado por scroll)
- **Regla:** Si la implementación del dither suma complejidad sin beneficio visual claro, usar solo la máscara de gradiente. Ligero > decorativo.

## Estructura final de la sección

```
┌─────────────────────────────────────────────────────────┐
│ VIDEO fondo (scroll-synced, con máscara gradiente)      │
│                                                         │
│   [Contenido editorial existente — texto mantener]      │
│                                                         │
│   ─── líneas decorativas animadas ───                   │
│                                                         │
│   [ meridiana_isotipo.svg en tumbaga ]                  │
│   (animación envolvente por scroll)                     │
│                                                         │
│   "Redefinimos la forma en que el mundo                 │
│    experimenta Colombia."                               │
│                                                         │
│   ─── líneas decorativas animadas ───                   │
│                                                         │
│   "Si quieres ser parte de una experiencia..."          │
│   [ CTA ]                                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Archivos a modificar
- `frontend/components/sections/AboutPreview.tsx` → refactor significativo
- `frontend/content/pages/homepage.json` → simplificar aboutPreview (quitar method, quitar "lo que mostramos")
- **Requerir del usuario:** `fondo_redefinimos.mp4` en `public/video/`
- **Requerir del usuario:** `meridiana_isotipo.svg` en `public/images/` (si no existe ya)

## Performance
- Video: preload="none", carga lazy al entrar en viewport
- Usar `<video>` nativo, NO librerías externas
- El scroll sync debe ser smooth (requestAnimationFrame si es necesario)
- Si el video no está disponible, la sección debe funcionar sin él (fallback a fondo degradado)

## Acceptance Criteria
- [ ] Método eliminado del contenido
- [ ] "Lo que mostramos" eliminado
- [ ] Video sincroniza con scroll (si el archivo existe)
- [ ] Isotipo aparece en tumbaga con animación envolvente
- [ ] Máscara gradiente en bordes del video
- [ ] Texto editorial legible sobre video
- [ ] Frase de cierre y CTA presentes
- [ ] Funciona sin video (fallback graceful)
- [ ] Performance: no jank en el scroll

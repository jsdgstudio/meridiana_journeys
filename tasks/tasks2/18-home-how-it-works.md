# Task 18: Home Cómo Funciona — Nuevos Textos + Hover

## Ejecutar con: /GSD
## Commit: "Task 18: cómo funciona — nuevos textos y hover animation"

---

## Cambios

### 1. Actualizar textos de los 3 pasos

```json
{
  "howItWorks": {
    "headline": { "es": "Cómo funciona", "en": "How it works" },
    "steps": [
      {
        "number": "01",
        "title": { "es": "Descubre", "en": "Discover" },
        "description": {
          "es": "Navega el catálogo de viajes. Cada uno está documentado con la profundidad que merece: la historia detrás del destino, las experiencias que lo definen, el tipo de viajero para quien fue diseñado.",
          "en": "Browse the journey catalog. Each one is documented with the depth it deserves: the story behind the destination, the experiences that define it, the type of traveler it was designed for."
        }
      },
      {
        "number": "02",
        "title": { "es": "Decide", "en": "Decide" },
        "description": {
          "es": "Escríbenos. No hay formularios automatizados ni respuestas predefinidas. Una persona de Meridiana responde en menos de 48 horas para entender lo que buscas y cómo podemos construirlo juntos.",
          "en": "Write to us. No automated forms or pre-set answers. A person from Meridiana responds within 48 hours to understand what you're looking for and how we can build it together."
        }
      },
      {
        "number": "03",
        "title": { "es": "Viaja", "en": "Travel" },
        "description": {
          "es": "El día del viaje, todo está listo. Lo que no está en el itinerario es la conversación que tendrás con el ceramista que lleva cuarenta años estudiando los patrones precolombinos, o el silencio exacto de las seis de la mañana en la laguna.",
          "en": "On the day of travel, everything is ready. What's not on the itinerary is the conversation you'll have with the ceramist who's spent forty years studying pre-Columbian patterns, or the exact silence of six in the morning at the lagoon."
        }
      }
    ]
  }
}
```

### 2. Hover animation en cada step card

- Al hacer hover, el texto se resalta de manera elegante y sutil
- Implementación con Framer Motion:
  - El card completo: escala sutil (1.0 → 1.015)
  - El texto de descripción: opacity 0.7 → 1.0, ligero translateY(-2px)
  - El número: se ilumina más (opacity 0.85 → 1.0)
  - Transición: `--duration-base` (350ms) con `--ease-brand`
- **Mantener los colores actuales** — el hover es solo resaltado, no cambio de color
- Los números deben usar `--terracota` o `--tumbaga` (como se definió en Task 11)

## Archivos a modificar
- `frontend/content/pages/homepage.json` → howItWorks texts
- `frontend/components/sections/HowItWorks.tsx` → textos + hover animation

## Acceptance Criteria
- [ ] Textos actualizados exactamente como se proporcionan
- [ ] Hover suave y elegante en cada step
- [ ] Animación con Framer Motion (no CSS transitions)
- [ ] Colores se mantienen (solo resaltado)
- [ ] Bilingüe ES/EN
- [ ] Responsive (hover solo desktop, mobile sin hover)

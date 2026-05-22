# Task 14: Home Hero — Nuevo Copy

## Ejecutar con: /GSD
## Commit: "Task 14: hero — nuevo headline y animación"

---

## Cambio
Reemplazar headline y subheadline del hero principal.

## Nuevo contenido

```json
"hero": {
  "headline": {
    "es": "Cada territorio cuenta una historia.",
    "en": "Every territory tells a story."
  },
  "subheadline": {
    "es": "Nosotros la traducimos.",
    "en": "We translate it."
  }
}
```

## Tratamiento visual
- **Headline:** `--font-display`, `--text-4xl`, weight 300, `--leading-tight`
- **Subheadline:** `--font-display`, `--text-xl`, weight 300, italic — sentirse como un eco íntimo del headline
- Ajustar tamaño, visualidad y animación para que sea impactante
- Separación headline↔subheadline: `--space-6`
- Animación de entrada: staggered fade-in (headline primero, subheadline 400ms después)

## Archivos a modificar
- `frontend/content/pages/homepage.json` → hero section
- `frontend/components/sections/Hero.tsx` → verificar animación y tipografía

## Acceptance Criteria
- [ ] Hero muestra el nuevo copy exacto en ES y EN
- [ ] Animación de entrada es suave y escalonada
- [ ] Tipografía respeta los pesos (300 light, nunca bold)
- [ ] Responsive en mobile

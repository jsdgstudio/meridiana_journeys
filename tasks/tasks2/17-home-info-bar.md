# Task 17: Home Info Bar — Barra Diferencial en Terracota

## Ejecutar con: /GSD
## Commit: "Task 17: info bar terracota — diferencial simplificado"

---

## Objetivo
Transformar el contenido de "EL DIFERENCIAL" en una barra informativa simple debajo de las Travel Cards. Fondo en terracota del sistema.

## Diseño

```
┌──────────────────────────────────────────────────────────┐
│  bg: --terracota (#CC754A)  |  text: --negro (#0F130E)   │
│                                                          │
│  "Nuestros viajes nacen de una propuesta curatorial      │
│   responsable y auténtica. Lo que nos diferencia no      │
│   es solo lo que mostramos, sino quién lo cuenta."       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Especificaciones
- **Fondo:** `--terracota` (#CC754A) sólido
- **Texto:** `--negro` (#0F130E) para máximo contraste
- **Tipografía:** `--font-display` (Cormorant Garamond), `--text-lg` o `--text-xl`, weight 300, italic
- **Padding:** `--space-12` vertical (48px), centrado
- **Container:** `--container-narrow` (768px) para que el texto respire
- **Sin botón, sin CTA** — es solo una declaración
- **Animación:** Fade-in sutil al entrar en viewport

## Contenido bilingüe

```json
{
  "infoBar": {
    "text": {
      "es": "Nuestros viajes nacen de una propuesta curatorial responsable y auténtica. Lo que nos diferencia no es solo lo que mostramos, sino quién lo cuenta.",
      "en": "Our journeys are born from a responsible and authentic curatorial approach. What sets us apart is not just what we show, but who tells the story."
    }
  }
}
```

## Archivos a crear/modificar
- **Crear:** `frontend/components/sections/InfoBar.tsx`
- **Modificar:** `frontend/app/[locale]/page.tsx` → insertar InfoBar debajo de TravelCards
- **Modificar:** `frontend/content/pages/homepage.json` → agregar `infoBar`

## Acceptance Criteria
- [ ] Barra renderiza con fondo terracota sólido
- [ ] Texto negro legible
- [ ] Tipografía Cormorant Garamond italic
- [ ] Centrado, responsive
- [ ] Bilingüe

# Task 13: Navbar — Nueva Jerarquía

## Ejecutar con: /GSD
## Commit: "Task 13: navbar — nueva jerarquía de navegación"

---

## Cambio
Actualizar el orden de los items del navbar.

**Antes:** Home, Journeys, Journal, About, Contact
**Ahora:** VIAJES - SOBRE MERIDIANA - JOURNAL - CONTACTO

## Archivos a modificar
- `frontend/content/i18n/es.json` → actualizar nav labels
- `frontend/content/i18n/en.json` → actualizar nav labels
- `frontend/components/layout/Navbar.tsx` → reordenar items, actualizar hrefs

## Nuevo orden y labels

```json
// es.json
"nav": {
  "journeys": "Viajes",
  "about": "Sobre Meridiana",
  "journal": "Journal",
  "contact": "Contacto"
}

// en.json
"nav": {
  "journeys": "Journeys",
  "about": "About Meridiana",
  "journal": "Journal",
  "contact": "Contact"
}
```

**Nota:** "Home" no aparece como item — el logo es el link al home. El orden en el navbar es exactamente: Viajes → Sobre Meridiana → Journal → Contacto.

## Acceptance Criteria
- [ ] Navbar muestra 4 items en el orden correcto
- [ ] Labels bilingües funcionan con toggle ES/EN
- [ ] Links navegan a las rutas correctas
- [ ] Mobile menu refleja el mismo orden

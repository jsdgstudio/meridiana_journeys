# Task 16: Home Travel Cards — Reemplazar El Diferencial

## Ejecutar con: /GSD
## Commit: "Task 16: travel cards — reemplaza sección diferencial"

---

## Objetivo
Eliminar la sección "EL DIFERENCIAL" del homepage y reemplazarla con las travel cards definidas en `meridiana-travel-cards.html`.

## Fuente
El archivo HTML está en la máquina del usuario:
`C:\Users\Jaime\Desktop\DG SS\TT estudio\SITIO - meridianajourneys.com\meridiana\TRAVELCARDS\meridiana-travel-cards.html`

**Solicitar al usuario** que copie este archivo a `frontend/` o que pegue su contenido.

## Instrucciones de integración (de Claude Design)

1. **Quitar** `<script src="cdn.tailwindcss.com">` — el proyecto ya usa Tailwind vía build
2. **Mover** el `<style>` scopeado (`.meridiana-cards { ... }`) a `globals.css` o a un módulo CSS
3. **Conectar** los `data-i18n` al sistema JSON de traducciones existente (`content/i18n/`)
4. Las imágenes son placeholders — mantener como están, se reemplazan cuando haya fotografía final
5. **Adaptar** el HTML a un componente React/TSX: `components/sections/TravelCards.tsx`

## Proceso

1. Leer el HTML fuente completo
2. Convertir a componente React funcional con TypeScript
3. Respetar la paleta del design system (verificar colores, tipografía)
4. Conectar textos al sistema i18n bilingüe
5. Agregar el contenido bilingüe a `homepage.json` si es necesario
6. Integrar en el homepage en la posición donde estaba "El Diferencial"
7. Aplicar Framer Motion para animaciones (reemplazar cualquier CSS transition)

## CRÍTICO
- No deben existir errores tras la integración
- El componente debe seguir las directrices del design system de Meridiana
- Verificar contraste y legibilidad
- Responsive en mobile

## Archivos a crear/modificar
- **Crear:** `frontend/components/sections/TravelCards.tsx`
- **Modificar:** `frontend/app/[locale]/page.tsx` → importar TravelCards donde estaba "El Diferencial"
- **Modificar:** `frontend/content/pages/homepage.json` → agregar contenido si las cards lo requieren
- **Eliminar:** componente/sección del Diferencial del homepage

## Acceptance Criteria
- [ ] Sección "El Diferencial" eliminada del homepage
- [ ] Travel Cards renderizan en su lugar
- [ ] Estilos integrados al design system (no CSS inline suelto)
- [ ] Textos bilingües (ES/EN)
- [ ] Imágenes cargan (aunque sean placeholder)
- [ ] Responsive
- [ ] npm run build sin errores

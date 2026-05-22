# Task 20: Página Contacto — Formulario Actualizado

## Ejecutar con: /GSD
## Commit: "Task 20: contacto — formulario simplificado + WhatsApp"

---

## Objetivo
Simplificar la página de contacto. Solo formulario + datos de contacto directos.

## Campos del formulario (simplificados)

1. **Nombre** — text input
2. **País** — text input (NUEVO — reemplaza campos anteriores)
3. **Correo** — email input
4. **Mensaje** — textarea

## Datos de contacto

```json
{
  "contact": {
    "email": "info@meridianajourneys.com",
    "whatsapp": {
      "number": "+57 310 7561974",
      "label": { "es": "WhatsApp (ideal)", "en": "WhatsApp (preferred)" },
      "href": "https://wa.me/573107561974"
    }
  }
}
```

## Cambios respecto al formulario actual
- **Quitar:** campo "Viaje de interés" (dropdown de tours)
- **Quitar:** campo "Fechas tentativas"
- **Agregar:** campo "País"
- **Agregar:** WhatsApp como método de contacto preferido
- Mantener el CTA de envío: "Enviar consulta" / "Send inquiry"
- Mantener la nota de tiempo de respuesta

## Layout
- Formulario limpio, minimalista, directo
- Información de contacto (email + WhatsApp) visible junto al form o debajo
- WhatsApp con ícono y link directo (abre app)
- Diseño editorial — no formulario genérico

## Archivos a modificar
- `frontend/content/pages/contact.json` → simplificar contenido
- `frontend/components/sections/ContactForm.tsx` → actualizar campos
- `frontend/app/[locale]/(contact)/page.tsx` → si necesita ajustes

## Acceptance Criteria
- [ ] Formulario tiene 4 campos: Nombre, País, Correo, Mensaje
- [ ] Email y WhatsApp visibles como datos de contacto
- [ ] WhatsApp tiene link directo funcional
- [ ] Bilingüe ES/EN
- [ ] Validación client-side funciona
- [ ] Responsive

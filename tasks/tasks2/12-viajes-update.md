# Task 12: Actualización del Sistema de Viajes

## Tipo: Cambio estructural de contenido
## Ejecutar con: /GSD
## Prioridad: PRIMERA — todos los demás cambios dependen de esto

---

## Objetivo
Reducir de 7 a 5 viajes oficiales. Reemplazar TODO el contenido de cada viaje con los textos exactos proporcionados. Actualizar precios, itinerarios, experiencia y metadata. El contenido debe quedar **exactamente** como está escrito — los textos han sido redactados especialmente.

## Viajes a ELIMINAR
- `classic-colombia-cafetero.json` → BORRAR
- `classic-colombia-caribe.json` → BORRAR

## Viajes a MANTENER y ACTUALIZAR (5 definitivos)
1. `classic-bogota.json` → reescribir completo
2. `classic-colombia.json` → RENOMBRAR de `classic-colombia-full.json` → reescribir completo
3. `en-busqueda-del-dorado.json` → reescribir completo
4. `macondo-realismo-magico.json` → reescribir completo
5. `wild-colombia.json` → reescribir completo

## Archivos a modificar ADEMÁS de los tours
- `frontend/content/pages/homepage.json` → actualizar `featuredTours.tourIds`
- `frontend/content/i18n/es.json` y `en.json` → si referencian tours eliminados
- `frontend/hooks/useTours.ts` → verificar que carga los 5 correctos
- `frontend/types/tour.ts` → verificar que TourTier sigue válido (ya no hay "core" x3)
- Cualquier componente que referencie slugs eliminados

## Cambios en el modelo de datos

### Precios — nuevo formato
```typescript
// Antes
price: { amount: number; currency: "USD"; note?: LocaleString }

// Ahora — soporte para pricing escalonado
price: {
  tiers?: { label: LocaleString; amount: number }[];  // ej: "grupo de 2" → 8200, "grupo de 4" → 6800
  currency: "USD";
  note?: LocaleString;
  customQuote?: boolean;  // true si es "Por confirmar"
}
```

### Experiencia — nuevo formato expandido
```typescript
// Agregar estos campos al tipo si no existen
experience: {
  duration: LocaleString;        // "2 noches / 3 días"
  departures?: LocaleString;     // "1 al año, agosto"
  groupSize: LocaleString;       // "Máximo 12 personas"
  pace: LocaleString;            // "Moderado — caminatas, traslados en vehículo privado"
  language: LocaleString;        // "Español, inglés o francés"
  startPoint: LocaleString;      // "Bogotá (El Dorado, BOG)"
  endPoint?: LocaleString;       // "Cartagena (CTG)"
  season: LocaleString;          // "Todo el año"
  physicalLevel: LocaleString;   // "Bajo — sin actividades de alta exigencia"
  culturalDepth: 1|2|3|4|5;
  physicalDemand: 1|2|3|4|5;
  comfort: 1|2|3|4|5;
  groupIntimacy: 1|2|3|4|5;
}
```

### Nuevo campo: preTrip expandido
```typescript
preTrip: {
  kit?: LocaleString;           // descripción del kit físico
  virtualEvent?: LocaleString;  // evento pre-viaje
  addOns?: LocaleString[];      // extensiones opcionales
  reading?: string[];
  packing?: LocaleString[];
  preparation?: LocaleString;
}
```

---

## Contenido exacto por viaje

### 1. Classic Bogotá

**Slug:** `classic-bogota`
**Tier:** `entry`
**Category:** `cultural`

**Narrativa ES:**
"Bogotá tiene cinco siglos encima y los lleva todos al mismo tiempo. En una misma cuadra de La Candelaria conviven el barroco colonial, la arquitectura republicana y un mural pintado después del 9 de abril de 1948, el día en que asesinaron a Gaitán y la ciudad se incendió y de alguna manera se volvió a hacer. Esa superposición de tiempos es lo que hace a Bogotá tan difícil de entender para quien llega de afuera, y tan apasionante para quien se toma tres días de verdad."

**Incluye:**
- Guía experto dedicado durante todo el recorrido
- Todas las entradas a museos e instituciones culturales
- Experiencia gastronómica privada con chef (Día 1)
- Transporte privado en todos los trayectos
- Hospedaje (2 noches, hoteles boutique patrimoniales en Chapinero)
- Seguros de viaje completos
- Visita a la Laguna Sagrada del Dorado y la Catedral de Sal de Zipaquirá

**No incluye:** Transporte aéreo, almuerzos y cenas los días 2 y 3, bebidas adicionales, compras personales.

**Itinerario:**
- Día 1 — Llegada y Cena de Bienvenida. Visita a Monserrate al atardecer. Cena de bienvenida y conversación privada con el chef.
- Día 2 — Más Allá de la Ciudad. Laguna Sagrada del Dorado. Catedral de Sal de Zipaquirá.
- Día 3 — El Corazón de La Candelaria. Museo del Oro, iglesias coloniales, esmeraldas, Museo Botero, Fragmentos, Teatro Colón, Claustro de San Agustín, Escuela de Artes y Oficios.

**Experiencia:**
- Duración: 2 noches / 3 días
- Tamaño: Máximo 12 personas
- Ritmo: Moderado
- Idioma: Español, inglés o francés
- Punto de inicio: Bogotá (El Dorado, BOG)
- Temporada: Todo el año
- Nivel físico: Bajo

**Ideal para:** Viajeros con curiosidad intelectual. Amantes del arte, la historia y la gastronomía. Parejas, amigos cercanos o viajeros solos que quieren entender una ciudad, no solo verla.

**Precio:** Por confirmar. "Cada itinerario se cotiza a medida. Escríbenos y construimos el tuyo."

---

### 2. Classic Colombia

**Slug:** `classic-colombia` (RENOMBRAR de classic-colombia-full)
**Tier:** `core`
**Category:** `cultural`

**Narrativa ES:**
"Colombia se comprende en actos: una diagonal cultural que atraviesa el país desde la Bogotá andina, donde 2.600 metros de altura custodian el oro precolombino y cinco siglos de historia en La Candelaria, hasta la transformación de Medellín. En la capital antioqueña, la resiliencia ha convertido la violencia en innovación social y arte urbano, permitiendo que lugares como la Comuna 13 narren la fuerza de una comunidad que abraza su pasado para rediseñar su futuro.

La ruta desciende hacia el Eje Cafetero, motor de la economía local, para culminar en el Caribe afrodescendiente y su herencia ancestral. En Cartagena, el poderío de la España colonial grabado en el Castillo de San Felipe se funde con la vibrante resistencia de Getsemaní. Allí, entre murallas y tambores, la experiencia se sella con la gastronomía de matronas locales, cuyas recetas no solo alimentan, sino que transmiten la dignidad de una cultura extraordinaria que ha resistido el paso del tiempo."

**Precio:** Desde USD 6.800/persona (grupo de 4). Desde USD 8.200/persona (grupo de 2).
**Duración:** 13 días. Salidas: 1 al año, agosto. Máximo 8 personas.
**Nota:** "En caso de querer un tour más corto se puede reemplazar un destino por otro o se puede agregar Parque Tayrona al finalizar el tour."

*(Incluye, itinerario y experiencia completos en CAMBIOS_VIAJES.txt — copiar textual)*

---

### 3. En Búsqueda del Dorado

**Slug:** `en-busqueda-del-dorado`
**Tier:** `premium`
**Subtitle:** "Del mito muisca al oro que construyó imperios"

**Precio:** Desde USD 4.200/persona (grupo de 2). Desde USD 3.400/persona (grupo de 4).
**Duración:** 8 a 9 días. Máximo 12 personas. Todo el año.
**PreTrip:** Kit con réplica de tunjo Muisca + evento virtual con historiador colonial.

*(Contenido completo en CAMBIOS_VIAJES.txt — copiar textual)*

---

### 4. Macondo y el Realismo Mágico

**Slug:** `macondo-realismo-magico`
**Tier:** `premium`

**Precio:** Desde USD 3.800/persona (grupo de 2). Desde USD 2.900/persona (grupo de 4-6).
**Duración:** 7 a 10 días. Máximo 12 personas. Todo el año.
**PreTrip:** Kit con journal de cuero + evento virtual con historiador y crítico literario.
**Add-on:** Taller de escritura creativa y taller de narrativa vallenata.
**Incluye:** Fotógrafo profesional documentando momentos clave.

*(Contenido completo en CAMBIOS_VIAJES.txt — copiar textual)*

---

### 5. Wild Colombia

**Slug:** `wild-colombia`
**Tier:** `premium`

**Narrativa ES:**
"Súmate a una expedición que redefine lo que es viajar. 21 días por los cinco ecosistemas del segundo país más biodiverso del planeta. De los páramos de Chingaza y sus más de veinte especies de colibríes a los llanos infinitos de la Orinoquía donde el joropo suena al atardecer. De los ríos negros del Amazonas y sus delfines rosados a las ballenas jorobadas del Pacífico chocoano. Hasta la Sierra Nevada de Santa Marta, la cordillera costera más alta del mundo, donde los Arhuacos custodian una cosmovisión que lleva milenios leyendo el territorio. Wild Colombia no es un tour de naturaleza, es un encuentro con la vida en todas sus formas, la de los bosques, la de los ríos y la de los pueblos que los habitan."

**Precio:** Desde USD 9.500/persona (grupo de 4, 17 días). Desde USD 12.000/persona (grupo de 2, 21 días).
**Duración:** 18 a 21 días. Máximo 6 personas. Agosto.
**Itinerario:** Estructura en 5 Actos (Andes → Orinoquía → Amazonía → Pacífico → Caribe).
**Extensión opcional:** Sobrevuelo en helicóptero por Chiribiquete y Cerros de Mavecure.

*(Contenido completo en CAMBIOS_VIAJES.txt — copiar textual)*

---

## Instrucciones para Claude Code

1. Lee CAMBIOS_VIAJES.txt completo para el contenido exacto
2. Elimina los 2 archivos JSON de tours que sobran
3. Renombra classic-colombia-full → classic-colombia
4. Reescribe los 5 JSON con TODO el contenido nuevo (bilingüe ES/EN)
5. Actualiza types/tour.ts si es necesario (precio escalonado, experiencia expandida)
6. Actualiza homepage.json → featuredTours con los slugs correctos
7. Verifica que la página /viajes y cada /viajes/[slug] compile sin errores
8. **npm run dev** → confirmar que todo renderiza

## Acceptance Criteria
- [ ] Solo 5 tours existen en content/tours/
- [ ] Contenido es TEXTUALMENTE igual al proporcionado
- [ ] Precios escalonados renderizan correctamente
- [ ] Todos los textos son bilingües (ES/EN)
- [ ] Homepage featured tours apunta a slugs válidos
- [ ] npm run build sin errores

# TASK 31 — JOURNAL: CONTENT MODEL, TEXTOS BILINGÜES Y ESTRUCTURA

> Sección Journal · Paso 1 de 3 · Ejecutar con /GSD
> Modelo sugerido: Sonnet
> Pre-requisito: Fase 1 completada (sitio funcional en Vercel).

## Objetivo

Crear el content model de la sección Journal y los archivos de contenido bilingüe (ES + EN) para los 5 ensayos, listos para ser consumidos por los componentes que se construyen en Tasks 32 y 33. Esta task NO toca código de UI — solo datos y estructura.

---

## Decisión de diseño: qué es el Journal

El Journal **no es un blog**. No tiene fechas de publicación, no tiene lista cronológica, no tiene autor individual. Es un archivo literario fijo, íntimamente ligado a los tours: cada entrada es el ensayo de fondo del tour correspondiente, con sus imágenes del cuaderno visual integradas en la lectura.

La jerarquía es:
```
/es/journal                     ← índice — 5 entradas en grid masonry
/es/journal/classic-bogota      ← artículo largo: ensayo + cuaderno visual integrado
/es/journal/classic-colombia
/es/journal/en-busqueda-del-dorado
/es/journal/macondo-realismo-magico
/es/journal/wild-colombia
```
(misma estructura para /en/)

---

## Paso 1 — Crear `content/journal/` con 5 archivos JSON

Cada archivo sigue este schema:

```ts
interface JournalEntry {
  slug: string;
  tourSlug: string;                    // liga al tour
  category: LocaleString;             // ej. "Literatura · Caribe" / "Literature · Caribbean"
  title: LocaleString;
  subtitle: LocaleString;
  pullQuote: LocaleString;            // frase que se usa como cita destacada en el artículo
  heroImage: {
    src: string;                       // ruta desde /public
    alt: LocaleString;
  };
  body: JournalSection[];
  visualNotebook: VisualImage[];      // cuaderno visual COMPLETO (todas las imágenes, no solo 5)
  seo: {
    title: LocaleString;
    description: LocaleString;
    keywords: LocaleString;
  };
}

interface JournalSection {
  type: 'paragraph' | 'heading' | 'pullquote' | 'imagebreak';
  content?: LocaleString;             // para paragraph, heading, pullquote
  imageIndex?: number;                // para imagebreak: índice en visualNotebook
  imageCaption?: LocaleString;
}

interface VisualImage {
  src: string;
  alt: LocaleString;
  caption: LocaleString;
}

type LocaleString = { es: string; en: string };
```

---

## Paso 2 — Contenidos de los 5 archivos

### `content/journal/classic-bogota.json`

```json
{
  "slug": "classic-bogota",
  "tourSlug": "classic-bogota",
  "category": {
    "es": "Historia · Andes",
    "en": "History · Andes"
  },
  "title": {
    "es": "Classic Bogotá",
    "en": "Classic Bogotá"
  },
  "subtitle": {
    "es": "Cinco siglos en tres días",
    "en": "Five centuries in three days"
  },
  "pullQuote": {
    "es": "Bogotá tiene cinco siglos encima y los lleva todos al mismo tiempo.",
    "en": "Bogotá carries five centuries on its back — and wears them all at once."
  },
  "heroImage": {
    "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-catedral-primada-plaza-bolivar-nubes.jpg",
    "alt": {
      "es": "Catedral Primada y Plaza Bolívar bajo nubes dramáticas, Bogotá",
      "en": "Catedral Primada and Plaza Bolívar under dramatic clouds, Bogotá"
    }
  },
  "body": [
    {
      "type": "paragraph",
      "content": {
        "es": "Bogotá tiene cinco siglos encima y los lleva todos al mismo tiempo. En una misma cuadra de La Candelaria conviven el barroco colonial, la arquitectura republicana y un mural pintado después del 9 de abril de 1948, el día en que asesinaron a Gaitán y la ciudad se incendió y de alguna manera se volvió a hacer. Esa superposición de tiempos es lo que hace a Bogotá tan difícil de entender para quien llega de afuera, y tan apasionante para quien se toma tres días de verdad.",
        "en": "Bogotá carries five centuries on its back — and wears them all at once. On a single block of La Candelaria, colonial baroque, republican architecture, and a mural painted after April 9, 1948 — the day Gaitán was assassinated, the city burned, and somehow rebuilt itself — coexist in the same frame. That layering of time is what makes Bogotá so difficult to understand for those who arrive from outside, and so compelling for those who take three genuine days."
      }
    },
    {
      "type": "imagebreak",
      "imageIndex": 4,
      "imageCaption": {
        "es": "Monserrate, a 3.100 metros, abre la primera mirada a la ciudad.",
        "en": "Monserrate, at 3,100 metres, opens the first view of the city."
      }
    },
    {
      "type": "heading",
      "content": {
        "es": "Primer día: la ciudad desde arriba",
        "en": "Day one: the city from above"
      }
    },
    {
      "type": "paragraph",
      "content": {
        "es": "El primer día daremos apertura a esta narrativa visitando el santuario de Monserrate para tener una primera mirada a 3.100 metros de altura a las distintas capas históricas, culturales y sociales de la ciudad. Finalizamos con una cena de bienvenida y una conversación con un chef sobre los ingredientes ancestrales que sobreviven en cocinas contemporáneas, mientras hablamos de la Bogotá de ayer, de hoy, y de hacia dónde va.",
        "en": "The first day opens with a visit to the Monserrate sanctuary, where a first look at the city's historical, cultural, and social layers is possible from 3,100 metres. It closes with a welcome dinner and a conversation with a chef about the ancestral ingredients that survive in contemporary kitchens — and about the Bogotá of yesterday, today, and wherever it is going."
      }
    },
    {
      "type": "imagebreak",
      "imageIndex": 1,
      "imageCaption": {
        "es": "Máscara Muisca, Museo del Oro.",
        "en": "Muisca mask, Museo del Oro."
      }
    },
    {
      "type": "heading",
      "content": {
        "es": "Segundo día: el oro que no era riqueza",
        "en": "Day two: the gold that was not wealth"
      }
    },
    {
      "type": "paragraph",
      "content": {
        "es": "El segundo día empieza con los Muiscas, un pueblo que vivía a orillas de los lagos de la sabana, con su propia astronomía, sus propios rituales y una economía construida sobre las esmeraldas más codiciadas del continente. Cuando los españoles llegaron buscando El Dorado encontraron algo más extraño y más rico: una civilización que ya sabía quién era. Visitaremos la Laguna Sagrada del Dorado, donde nació la leyenda que movió imperios, y la Catedral de Sal de Zipaquirá, tallada a 180 metros de profundidad en el interior de una montaña de sal.",
        "en": "The second day begins with the Muisca — a people who lived along the highland lakes, with their own astronomy, their own rituals, and an economy built on the most coveted emeralds on the continent. When the Spanish arrived seeking El Dorado they found something stranger and richer: a civilization that already knew who it was. The route visits the Sacred Lagoon of Dorado, where the legend that moved empires was born, and the Salt Cathedral of Zipaquirá, carved 180 metres deep inside a mountain of salt."
      }
    },
    {
      "type": "pullquote",
      "content": {
        "es": "El cacique que se cubría de oro y se sumergía en el agua como ofrenda. Esa malinterpretación movió ejércitos.",
        "en": "The chieftain who covered himself in gold and submerged into the water as an offering. That misreading moved armies."
      }
    },
    {
      "type": "imagebreak",
      "imageIndex": 2,
      "imageCaption": {
        "es": "Capitolio Nacional, patio interior.",
        "en": "Capitolio Nacional, inner courtyard."
      }
    },
    {
      "type": "heading",
      "content": {
        "es": "Tercer día: La Candelaria",
        "en": "Day three: La Candelaria"
      }
    },
    {
      "type": "paragraph",
      "content": {
        "es": "El tercer día traza la ciudad colonial y republicana. El recorrido nos cuenta la historia del corazón histórico, cultural y político de Bogotá. Recorreremos sus calles, sus edificios, iglesias y museos más emblemáticos, incluyendo el Museo del Oro, el Museo Botero y Fragmentos, un espacio donde el arte canaliza las heridas del pasado en Colombia.",
        "en": "The third day maps the colonial and republican city — the historical, cultural, and political heart of Bogotá. The route covers streets, buildings, churches, and emblematic museums: the Museo del Oro, the Museo Botero, and Fragmentos, a space where art channels Colombia's unhealed past."
      }
    },
    {
      "type": "paragraph",
      "content": {
        "es": "Tres días en Bogotá con la sensación, al final, de haber entendido algo que la ciudad lleva cinco siglos tratando de explicar. Es una conversación continua con la ciudad a través de sus chefs, sus artesanos, sus historiadores, sus urbanistas y sus calles.",
        "en": "Three days in Bogotá, with the feeling, at the end, of having understood something the city has spent five centuries trying to explain. A continuous conversation with the city — through its chefs, its artisans, its historians, its urban planners, and its streets."
      }
    }
  ],
  "visualNotebook": [
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-catedral-primada-plaza-bolivar-nubes.jpg",
      "alt": { "es": "Catedral Primada bajo nubes", "en": "Catedral Primada under clouds" },
      "caption": { "es": "Catedral Primada · plaza Bolívar", "en": "Catedral Primada · Plaza Bolívar" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-museo-oro-mascara-precolombina-muisca.jpg",
      "alt": { "es": "Máscara precolombina muisca", "en": "Muisca pre-Columbian mask" },
      "caption": { "es": "máscara muisca · Museo del Oro", "en": "Muisca mask · Museo del Oro" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-capitolio-nacional-arquitectura-patio.jpg",
      "alt": { "es": "Capitolio Nacional patio interior", "en": "Capitolio Nacional inner courtyard" },
      "caption": { "es": "Capitolio Nacional · patio interior", "en": "Capitolio Nacional · inner courtyard" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-candelaria-fachada-chicha-sumerce.jpg",
      "alt": { "es": "Fachada vernácula La Candelaria", "en": "Vernacular facade La Candelaria" },
      "caption": { "es": "el vernáculo · La Candelaria", "en": "the vernacular · La Candelaria" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-santuario-monserrate-cerros-orientales.jpg",
      "alt": { "es": "Santuario de Monserrate cerros orientales", "en": "Monserrate sanctuary eastern hills" },
      "caption": { "es": "Monserrate · cerros orientales", "en": "Monserrate · eastern hills" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-candelaria-calle-iglesia-carmen.jpg",
      "alt": { "es": "Calle La Candelaria iglesia del Carmen", "en": "La Candelaria street, Carmen church" },
      "caption": { "es": "iglesia del Carmen · La Candelaria", "en": "Carmen church · La Candelaria" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-candelaria-calle-cerro-monserrate.jpg",
      "alt": { "es": "Calle La Candelaria con cerro al fondo", "en": "La Candelaria street with hill in background" },
      "caption": { "es": "La Candelaria · cerro al fondo", "en": "La Candelaria · hill in the distance" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-catedral-primada-plaza-bolivar.jpg",
      "alt": { "es": "Catedral Primada plaza Bolívar", "en": "Catedral Primada Plaza Bolívar" },
      "caption": { "es": "Catedral Primada · plaza Bolívar", "en": "Catedral Primada · Plaza Bolívar" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-museo-arte-colonial-pinturas.jpg",
      "alt": { "es": "Arte colonial Museo Colonial pinturas", "en": "Colonial art, Museo Colonial" },
      "caption": { "es": "arte colonial · Museo Colonial", "en": "colonial art · Museo Colonial" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-museo-oro-orfebreria-detalle.jpg",
      "alt": { "es": "Detalle orfebrería en tumbaga Museo del Oro", "en": "Tumbaga goldwork detail Museo del Oro" },
      "caption": { "es": "detalle en tumbaga · Museo del Oro", "en": "tumbaga detail · Museo del Oro" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-plaza-santamaria-torres-del-parque.jpg",
      "alt": { "es": "Torres del Parque plaza Santamaría", "en": "Torres del Parque, Plaza Santamaría" },
      "caption": { "es": "Torres del Parque · plaza Santamaría", "en": "Torres del Parque · Plaza Santamaría" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-museo-oro-orfebreria-precolombina.jpg",
      "alt": { "es": "Orfebrería precolombina Museo del Oro", "en": "Pre-Columbian goldwork Museo del Oro" },
      "caption": { "es": "orfebrería precolombina · Museo del Oro", "en": "pre-Columbian goldwork · Museo del Oro" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-candelaria-calle-torre-catedral.jpg",
      "alt": { "es": "Torre catedral centro histórico Bogotá", "en": "Cathedral tower, historic center Bogotá" },
      "caption": { "es": "torre · catedral · centro histórico", "en": "tower · cathedral · historic center" }
    },
    {
      "src": "/images/FOTOS_CARDS_VIAJES/classic-bogota/classic-bogota-transmilenio-avenida-transito-urbano.jpg",
      "alt": { "es": "Transmilenio avenida movilidad urbana Bogotá", "en": "Transmilenio avenue urban mobility Bogotá" },
      "caption": { "es": "Transmilenio · movilidad urbana", "en": "Transmilenio · urban mobility" }
    }
  ],
  "seo": {
    "title": {
      "es": "Classic Bogotá — Cinco Siglos en Tres Días | Journal Meridiana",
      "en": "Classic Bogotá — Five Centuries in Three Days | Meridiana Journal"
    },
    "description": {
      "es": "El ensayo literario de Bogotá: La Candelaria, el Museo del Oro, la Laguna del Dorado y la Catedral de Sal como capas de una ciudad que lleva cinco siglos explicándose.",
      "en": "The literary essay of Bogotá: La Candelaria, the Museo del Oro, the Lagoon of Dorado and the Salt Cathedral as layers of a city that has spent five centuries explaining itself."
    },
    "keywords": {
      "es": "bogotá cultura historia, museo del oro, la candelaria, catedral de sal zipaquirá, viaje cultural colombia",
      "en": "bogotá culture history, museo del oro, la candelaria, zipaquirá salt cathedral, cultural travel colombia"
    }
  }
}
```

### `content/journal/classic-colombia.json`

Usar el mismo schema. Textos del MD sección 2. Imágenes: `/images/FOTOS_CARDS_VIAJES/classic-colombia/`. Secciones del body:
- Párrafo de apertura (diagonal cultural Andes→Caribe).
- imagebreak → classic-colombia-valle-cocora-paisaje-editorial-flores (índice 0)
- heading "Bogotá: el archivo andino"
- Párrafo sobre Bogotá (Museo del Oro, La Candelaria, Fragmentos).
- imagebreak → segunda imagen del folder
- heading "Medellín: la ciudad que se reescribió"
- Párrafo sobre Medellín (Comuna 13, guías comunitarios, chef local).
- pullquote: *"La Comuna 13, narrada por guías comunitarios que vivieron desde adentro el paso de la violencia al arte urbano."*
- imagebreak → tercera imagen del folder
- heading "Cartagena: el cierre caribeño"
- Párrafo sobre Cartagena (Castillo San Felipe, Getsemaní, almuerzo con matrona).
- category: "Historia · Andes · Caribe" / "History · Andes · Caribbean"
- pullQuote: *"Colombia se comprende en actos."* / *"Colombia is understood in acts."*

Nota: Claude Code debe listar las imágenes reales disponibles en `/public/images/FOTOS_CARDS_VIAJES/classic-colombia/` y mapearlas en el mismo orden que el cuaderno visual del tour.

### `content/journal/en-busqueda-del-dorado.json`

Textos del MD sección 3. Imágenes: placeholder Unsplash del tour actual (`https://images.unsplash.com/photo-1539020140153-e479b8c22e70`) para hero; las imágenes del cuaderno visual del tour detail (si existen en el folder) o las mismas del tour.
- category: "Arqueología · Historia colonial" / "Archaeology · Colonial History"
- pullQuote: *"El Dorado nunca existió como los españoles lo imaginaron. Pero la obsesión que generó sí existe."* / *"El Dorado never existed the way the Spanish imagined it. But the obsession it generated does."*
- body: 5 secciones (apertura sobre el mito muisca, Bogotá/Guatavita, río Magdalena/Honda/Falan, Mompox filigrana, Cartagena cierre).

### `content/journal/macondo-realismo-magico.json`

Textos del MD sección 4. Imágenes: `/images/FOTOS_CARDS_VIAJES/ruta-macondo/`.
- category: "Literatura · Caribe" / "Literature · Caribbean"
- pullQuote: *"Aracataca no le dio metáforas. Le dio hechos."* / *"Aracataca didn't give him metaphors. It gave him facts."*
- body: Apertura (Aracataca), Ciénaga/masacre bananera, Valledupar/vallenato, Cartagena/Florentino Ariza.
- Nota: el pullquote de Florentino va como sección pullquote en el body: *"La ciudad donde Florentino Ariza esperó cincuenta y un años, nueve meses y cuatro días."*

### `content/journal/wild-colombia.json`

Textos del MD sección 5. Imágenes: Unsplash placeholder + imágenes del tour detail si existen.
- category: "Naturaleza · Expedición" / "Nature · Expedition"
- pullQuote: *"Colombia es el único país del planeta donde en dos semanas se puede caminar entre nieve, páramo, bosque de niebla, sabana, selva tropical y playa."* / *"Colombia is the only country on the planet where in two weeks you can walk through snow, páramo, cloud forest, savannah, rainforest, and beach."*
- body: Andes/Chingaza, Orinoquía/Caño Cristales, Amazonía/comunidades Tikuna, Pacífico/ballenas jorobadas/comunidades afro, Sierra Nevada/Arhuacos.
- Una sección pullquote para la cita de los Arhuacos.

---

## Paso 3 — Traducciones adicionales en `content/i18n/`

Agregar en `es.json` y `en.json` bajo clave `journal`:

```json
// es.json
"journal": {
  "nav": "Journal",
  "headline": "El territorio que estamos leyendo.",
  "subtitle": "Cinco ensayos. Cinco maneras de entender Colombia antes de recorrerla.",
  "readMore": "Leer ensayo →",
  "backToJournal": "← Journal",
  "relatedTour": "Ver el viaje",
  "visualNotebook": "Cuaderno visual completo",
  "minutesRead": "min de lectura"
}

// en.json
"journal": {
  "nav": "Journal",
  "headline": "The territory we are reading.",
  "subtitle": "Five essays. Five ways to understand Colombia before travelling through it.",
  "readMore": "Read essay →",
  "backToJournal": "← Journal",
  "relatedTour": "See the journey",
  "visualNotebook": "Full visual notebook",
  "minutesRead": "min read"
}
```

---

## Criterios de aceptación

- [ ] Los 5 archivos JSON validan contra el schema (crear un script temporal `scripts/validate-journal.ts` con Zod si es práctico).
- [ ] Cada `imagebreak` en el body referencia un índice que existe en `visualNotebook`.
- [ ] Todas las `LocaleString` tienen tanto `es` como `en` (ninguna undefined o vacía).
- [ ] Las rutas de imagen de classic-bogota y ruta-macondo existen en `/public` (verificar con `ls`).
- [ ] Los archivos de los otros 3 tours tienen rutas correctas o placeholders explícitos listos para reemplazar.

## Archivos creados
`content/journal/classic-bogota.json` · `content/journal/classic-colombia.json` · `content/journal/en-busqueda-del-dorado.json` · `content/journal/macondo-realismo-magico.json` · `content/journal/wild-colombia.json` · `content/i18n/es.json` (actualizado) · `content/i18n/en.json` (actualizado)

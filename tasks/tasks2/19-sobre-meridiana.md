# Task 19: Página Sobre Meridiana — Contenido + Tarjetas Equipo

## Ejecutar con: /GSD
## Commit: "Task 19: sobre meridiana — página completa con team cards"

---

## Objetivo
Actualizar la página `/sobre-meridiana` (antes `/nosotros`) con nuevo contenido y tarjetas desplegables del equipo. Mantener la distribución, diseño y animaciones existentes del apartado nosotros.

## Ruta
- ES: `/es/sobre-meridiana`
- EN: `/en/about-meridiana`

## Contenido de la página

### Hero

**Título:** "Meridiana Cultural"

**Lead:**
```
ES: "Somos una agencia de viajes culturales hechos a la medida que conecta a viajeros conscientes con la esencia de una Colombia auténtica, biodiversa y excepcionalmente creativa.

Nuestras propuestas nacen desde la investigación y acercamientos con creadores, pensadores y comunidades, dando forma a rutas culturales únicas que transforman el viaje en un acto de comprensión cultural para mentes curiosas que valoran el arte, la historia y el respeto genuino por las comunidades que nos abren sus puertas."
```

### Sección intermedia

**Pull quote:** "Redefinimos la forma en que el mundo experimenta Colombia."

**Body:**
```
ES: "Como parte de nuestro compromiso fomentamos proyectos en las comunidades en donde operamos, con programas de preservación y traspaso de saberes, ayuda a productores locales e iniciativas de conservación.

Queremos mostrarte un país donde dialogan la memoria y la contemporaneidad.

Donde cinco ecosistemas han dado forma a culturas anfibias. Donde la gastronomía cuenta historias de mestizaje y resistencia.

Donde la artesanía piensa el mundo en sus propias formas.

Si quieres ser parte de una experiencia cultural inolvidable, Meridiana te transporta al alma de Colombia."
```

### Sección Quiénes Somos — Tarjetas del equipo

Dos tarjetas con sistema de despliegue elegante en hover/click.

#### Laura Querubín — Co-founder y CEO

**Bio completa (se despliega):**
"Nacida en Bogotá, Laura lleva más de dieciséis años construyendo la manera en que Colombia es comprendida en el mundo. Su trayectoria cruza la diplomacia, la narrativa cultural y el posicionamiento estratégico desde roles clave: Agregada Cultural en la Embajada de Colombia en Londres, asesora en Invest in Bogotá e iNNpulsa, y Coordinadora de Producción del episodio sobre Colombia de The Arts Hour on Tour de la BBC.

Su formación académica profundizó su comprensión de las fuerzas históricas, las arquitecturas institucionales y las dinámicas culturales que definen el lugar de América Latina en el mundo. Es licenciada en Estudios Latinoamericanos, Historia y Gobierno por la Universidad de Texas en Austin, y Magíster en Administración Pública con énfasis en Desarrollo Internacional por la London School of Economics. Además, es guía de turismo certificada por el Ministerio de Comercio, Industria y Turismo de Colombia.

Una inmersión en Historia del Arte en París amplió su entendimiento de cómo las culturas se narran a sí mismas a través de la forma, el espacio y la materia.

Su convicción es simple: la forma en que se cuenta un país determina la manera en que es valorado."

#### Fabrizio Rubio — Co-founder y Director Creativo

**Bio completa (se despliega):**
"Fabrizio es economista chileno egresado de la Universidad del Desarrollo, con una especialización en Apreciación del Arte Contemporáneo y una Maestría en Política Internacional y Economía de la Universidad de San Andrés en Buenos Aires, donde su tesis examinó la construcción de la diplomacia cultural y la marca país de México.

Durante más de ocho años ha trabajado en la intersección entre la economía creativa y la cultura, desde la convicción de que la cultura es un activo estratégico capaz de transformar la manera en que los territorios son comprendidos, valorados y conectados.

Su trayectoria incluye la Coordinación Nacional de Exportación de Servicios en ProChile, donde lideró estrategias de internacionalización para las industrias de servicios de Chile. Recientemente, lideró la caracterización de las economías culturales y creativas de Cartagena como consultor del Banco de Desarrollo de América Latina y el Caribe (CAF). Fundó y dirigió MoCuLat, plataforma de cultura latinoamericana que trabajó con artistas, curadores, chefs y emprendedores culturales de todo el continente.

Sus años formativos en Buenos Aires, Lima y París consolidaron su comprensión de que la producción cultural y la vitalidad económica son inseparables."

### Diseño de las tarjetas del equipo

```
┌──────────────────────────────────┐
│  [ foto perfil ]  (pequeña,      │
│                    circular)     │
│  LAURA QUERUBÍN                  │
│  Co-founder y CEO                │
│                                  │
│  ▼ hover/click: bio se despliega │
│  ┌────────────────────────────┐  │
│  │ "Nacida en Bogotá..."     │  │
│  │ (texto completo, scroll   │  │
│  │  interno si necesario)    │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

**Especificaciones:**
- Tarjeta con fondo `--gradient-card` o superficie sutil
- Foto de perfil: espacio circular reservado (placeholder si no hay foto)
- Nombre: `--font-display`, `--text-lg`, weight 400
- Rol: `--font-sans`, `--text-sm`, `.label` style, `--tumbaga`
- Bio: oculta por defecto, se despliega con hover (desktop) o click (mobile)
- Animación de despliegue: Framer Motion `AnimatePresence` + `height: auto`
- Si el texto es largo: scroll interno elegante o despliegue progresivo
- **Los textos deben quedar EXACTAMENTE iguales** — no resumir ni editar
- Layout: 2 tarjetas side by side (desktop), stacked (mobile)
- Usar el design system: bordes sharp, colores del sistema

## Archivos a crear/modificar
- **Crear:** `frontend/components/sections/TeamCards.tsx`
- **Modificar:** `frontend/content/pages/about.json` → nuevo contenido completo
- **Modificar:** `frontend/app/[locale]/(about)/page.tsx` → integrar nuevo contenido
- **Modificar:** rutas si es necesario: `/nosotros` → `/sobre-meridiana`

## Acceptance Criteria
- [ ] Página renderiza con todo el contenido exacto
- [ ] Tarjetas del equipo se despliegan elegantemente
- [ ] Bios son textuales — no editadas ni resumidas
- [ ] Espacio para foto de perfil (placeholder OK)
- [ ] Bilingüe ES/EN
- [ ] Responsive (hover desktop, click mobile)
- [ ] Mantiene las animaciones del diseño actual

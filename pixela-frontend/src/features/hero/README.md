# Hero Feature 🎬

## 📋 Descripción

La feature **Hero** es la sección principal de bienvenida que aparece en la página de inicio. Presenta un carrusel automático de imágenes de alta calidad obtenidas de contenido destacado, con controles de navegación, indicadores de progreso y contenido promocional. Es una experiencia visual inmersiva que introduce a los usuarios a la plataforma Pixela.

## 🎯 Propósito

- **Primera impresión**: Crear una experiencia visual impactante al llegar al sitio
- **Contenido destacado**: Mostrar imágenes de películas y series populares
- **Navegación automática**: Carrusel que se reproduce automáticamente
- **Interactividad**: Controles para pausa, navegación manual y progreso
- **Responsive design**: Experiencia optimizada en todos los dispositivos

## 🏗️ Estructura de Archivos

```
src/features/hero/
├── README.md                    # Este archivo
├── type.ts                      # Interfaces principales
├── content.ts                   # Contenido estático y datos
├── store.ts                     # Store global (Zustand)
├── components/
│   ├── index.ts                 # Exportaciones centralizadas
│   ├── HeroSection.tsx          # Componente principal
│   ├── ImageCarousel.tsx        # Carrusel de imágenes
│   ├── ContentSection.tsx       # Contenido de texto y botones
│   ├── ProgressIndicator.tsx    # Indicadores y controles
│   └── NavigationControls.tsx   # Botones de navegación
└── services/
    └── heroBackdropService.ts   # Servicio de imágenes destacadas
```

## 🧩 Componentes

### HeroSection
**Ubicación**: `components/HeroSection.tsx`

Componente principal que orquesta toda la funcionalidad del hero:

- **Composición**: Combina todos los subcomponentes
- **Hooks personalizados**: Maneja carrusel automático y progreso
- **Props interface**: Recibe contenido dinámico
- **Auto-play**: Controla reproducción automática cada 5 segundos

#### Props:
```typescript
interface HeroSectionProps {
  title: string;
  accentTitle: string;
  description: string;
  secondaryButtonText: string;
  images?: string[];
  ctaText?: string;
  ctaLink?: string;
}
```

#### Hooks personalizados:
- **useCarouselAutoPlay**: Maneja la reproducción automática
- **useProgressBar**: Controla la barra de progreso animada

### ImageCarousel
**Ubicación**: `components/ImageCarousel.tsx`

Carrusel de imágenes optimizado con efectos visuales:

- **Optimización de imágenes**: Next.js Image con configuración avanzada
- **Efectos visuales**: Gradientes, overlays y filtros
- **Transiciones**: Fade in/out suaves (500ms)
- **Fallback**: Estado por defecto si no hay imágenes
- **Responsive**: Tamaños optimizados por breakpoint

#### Características:
- **Calidad máxima**: Quality 100% para alta definición
- **Priority loading**: Carga eager para primera imagen
- **Blur placeholder**: Efecto de carga suave
- **Grayscale filter**: Efecto estético consistente
- **Multi-overlay**: Gradientes superiores e inferiores

### ContentSection
**Ubicación**: `components/ContentSection.tsx`

Sección de contenido textual y llamadas a la acción:

- **Título principal**: Con texto acentuado en color de marca
- **Descripción**: Texto promocional con backdrop blur
- **Línea de acento**: Elemento decorativo de marca
- **Botón secundario**: Navegación con ícono animado
- **Layout responsive**: Adaptación completa móvil/desktop

#### Subcomponentes:
- **AccentLine**: Línea decorativa de la marca
- **HeroTitle**: Título con texto acentuado
- **SecondaryButton**: Botón con animación de hover

### ProgressIndicator
**Ubicación**: `components/ProgressIndicator.tsx`

Controles e indicadores del carrusel:

- **Barra de progreso**: Indicador visual del tiempo transcurrido
- **Control de reproducción**: Botón play/pause con iconos
- **Navegación por puntos**: Dots para acceso directo a imágenes
- **Contador**: Indicador de posición actual (ej: "3/6")
- **Responsive**: Tamaños adaptados por dispositivo

#### Subcomponentes:
- **ProgressBar**: Barra de progreso animada
- **PlaybackControl**: Botón de play/pause
- **SlideDot**: Puntos de navegación individuales

### NavigationControls
**Ubicación**: `components/NavigationControls.tsx`

Controles de navegación manual del carrusel:

- **Botones anterior/siguiente**: Chevrons en los laterales
- **Posicionamiento absoluto**: Centrados verticalmente
- **Efectos visuales**: Backdrop blur y hover effects
- **Accesibilidad**: Labels apropriados y keyboard support
- **Responsive**: Tamaños y posiciones adaptadas

## 🔧 Gestión de Estado

### Store (Zustand)
**Ubicación**: `store.ts`

```typescript
interface HeroState {
  currentImageIndex: number;
  fadeIn: boolean;
  isPlaying: boolean;
  progress: number;
  
  // Acciones
  setCurrentImageIndex: (index: number) => void;
  setFadeIn: (state: boolean) => void;
  setIsPlaying: (state: boolean) => void;
  setProgress: (progress: number | ((prev: number) => number)) => void;
  prevImage: (imagesLength: number) => void;
  nextImage: (imagesLength: number) => void;
  handleSlideChange: (index: number) => void;
  resetProgress: () => void;
}
```

#### Características:
- **Transiciones suaves**: Función auxiliar `transitionToImage` con fade
- **Navegación circular**: Wrap-around entre primera y última imagen
- **Control de progreso**: Sistema granular de progreso (0-100%)
- **Estados de animación**: Control de fade in/out

#### Configuración:
```typescript
const FADE_ANIMATION_DURATION = 300; // ms
```

## 🌐 Servicios y API

### heroBackdropService
**Ubicación**: `services/heroBackdropService.ts`

Servicio para obtener imágenes destacadas:

```typescript
const getFeaturedBackdrops = (): Promise<string[]>
```

#### Funcionalidades:
- **Contenido curado**: Lista predefinida de medios destacados
- **Peticiones paralelas**: Promise.all para optimización
- **Manejo de errores**: Fallback a array vacío
- **Tipo mixto**: Soporta películas y series
- **Filtrado**: Solo imágenes válidas

#### Medios destacados:
```typescript
const featuredMedia: MediaItem[] = [
  { id: "986056",  type: "movie" },  // Thunderbolts
  { id: "124364",  type: "serie" },  // From
  { id: "1084199", type: "movie" },  // La acompañante
  { id: "680",     type: "movie" },  // Pulp Fiction
  { id: "95396",   type: "serie" },  // Severance
  { id: "4607",    type: "serie" },  // Lost
];
```

## 📊 Contenido y Datos

### getHeroData Function
**Ubicación**: `content.ts`

```typescript
const getHeroData = (): Promise<HeroData>
```

#### Datos estáticos:
- **Título**: "Explora el universo"
- **Título acentuado**: "cinematográfico"
- **Descripción**: Texto promocional de la plataforma
- **Botón**: "Descubrir más"
- **Imágenes**: Dinámicas desde heroBackdropService

## 🎨 Sistema de Diseño

### Paleta Visual
- **Texto principal**: `text-pixela-light`
- **Texto acentuado**: `text-pixela-accent`
- **Overlays**: `bg-pixela-dark` con opacidades variables
- **Gradientes**: Múltiples capas para profundidad visual

### Tipografía
- **Título principal**: 4xl a 7xl según dispositivo (28px-72px)
- **Descripción**: Base a xl (16px-20px)
- **Tracking**: Tight para títulos, normal para descripción

### Efectos Visuales
- **Grayscale**: Filtro en imágenes para consistencia
- **Backdrop blur**: En controles y descripción
- **Drop shadows**: Efectos de profundidad en texto
- **Gradientes**: Overlays superior e inferior

### Animaciones
- **Transiciones de imagen**: 500ms ease-in-out
- **Fade effects**: 300ms para cambios de estado
- **Progress bar**: Incremento cada 25ms (0.5% por step)
- **Hover effects**: 300ms en botones y controles

## 🔗 Dependencias

### Externas
- `zustand`: Gestión de estado global
- `next/image`: Optimización de imágenes
- `next/link`: Navegación interna
- `react-icons/fi`: Iconos Feather
- `clsx`: Utilidad para clases CSS condicionales

### Internas
- `@/api/peliculas/peliculas`: API de películas
- `@/api/series/series`: API de series

## 📱 Uso

```tsx
import { HeroSection } from '@/features/hero';
import { getHeroData } from '@/features/hero/content';

// En una página
const heroData = await getHeroData();

<HeroSection 
  title={heroData.title}
  accentTitle={heroData.accentTitle}
  description={heroData.description}
  secondaryButtonText={heroData.secondaryButtonText}
  images={heroData.images}
/>
```

## 🛠️ Configuración

### Timing del carrusel:
```typescript
// En HeroSection.tsx
const AUTO_PLAY_INTERVAL = 5000; // ms
```

### Progreso de la barra:
```typescript
// En HeroSection.tsx
const PROGRESS_INCREMENT = 0.5; // % por step
const PROGRESS_INTERVAL = 25; // ms entre increments
```

### Optimización de imágenes:
```typescript
// En ImageCarousel.tsx
const IMAGE_CONFIG = {
  width: 3000,
  height: 2000,
  quality: 100,
  priority: true,
  sizes: "(max-width: 393px) 393px, (...), 1920px"
};
```

## 🎯 Características Principales

- ✅ **Carrusel automático**: Reproducción cada 5 segundos
- ✅ **Controles completos**: Play/pause, anterior/siguiente, navegación directa
- ✅ **Progreso visual**: Barra animada y contador de posición
- ✅ **Imágenes optimizadas**: Next.js Image con configuración avanzada
- ✅ **Efectos visuales**: Gradientes, overlays y transiciones suaves
- ✅ **Responsive design**: Adaptación completa a todos los dispositivos
- ✅ **Contenido dinámico**: Imágenes obtenidas de API
- ✅ **Accesibilidad**: Labels apropiados y keyboard support
- ✅ **Fallback handling**: Estados por defecto sin imágenes

## 🚀 Optimizaciones

### Rendimiento
- **Priority loading**: Primera imagen carga inmediatamente
- **Image optimization**: Tamaños específicos por breakpoint
- **Promise.all**: Peticiones paralelas para imágenes
- **Lazy computation**: useMemo para longitud de imágenes

### UX/UI
- **Smooth transitions**: Fade effects en cambios de imagen
- **Visual feedback**: Hover effects en controles
- **Progress indication**: Barra y contador de posición
- **Auto-pause**: Pausa al interactuar manualmente

### Accesibilidad
- **ARIA labels**: Descripciones apropiadas en controles
- **Keyboard support**: Navegación con teclado
- **Screen reader**: Textos alternativos en imágenes
- **Focus management**: Estados de foco visibles

## 📝 Notas Importantes

- **Auto-play timing**: 5 segundos por imagen, configurable
- **Image quality**: Máxima calidad (100%) para experiencia premium
- **Fade duration**: 300ms para transiciones suaves
- **Progress granularity**: Incremento 0.5% cada 25ms
- **Error resilience**: Fallback a fondo oscuro si fallan imágenes
- **Featured content**: Lista curada de 6 medios destacados

## 🔧 Extensibilidad

### Para añadir nuevos medios destacados:
1. Actualizar array `featuredMedia` en `heroBackdropService.ts`
2. Mantener balance entre películas y series
3. Verificar que IDs sean válidos en APIs

### Para modificar timing del carrusel:
1. Ajustar `AUTO_PLAY_INTERVAL` en `HeroSection.tsx`
2. Sincronizar con `PROGRESS_INCREMENT` y `PROGRESS_INTERVAL`

### Para personalizar efectos visuales:
1. Modificar gradientes en `ImageCarousel.tsx`
2. Ajustar opacidades en overlays
3. Customizar filtros CSS (grayscale, blur, etc.)

### Para cambiar el contenido estático:
1. Editar función `getHeroData` en `content.ts`
2. Mantener consistencia en tono y longitud de textos 
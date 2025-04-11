# Metadata

Este directorio contiene los metadatos utilizados en toda la aplicación. Los metadatos son información descriptiva sobre las páginas y componentes, como títulos, descripciones, palabras clave SEO, etc.

## Estructura

- `/pages`: Contiene los metadatos específicos para cada página
- `index.ts`: Archivo que exporta todos los metadatos para facilitar su importación

## Uso

Para utilizar los metadatos en una página:

```typescript
// Importar metadatos específicos
import { seriesMetadata } from "@/metadata";

// Asignar como metadata de la página
export const metadata = seriesMetadata;
```

## Beneficios

- **Centralización**: Todos los metadatos están en un solo lugar
- **Consistencia**: Facilita mantener un formato consistente en toda la aplicación
- **Mantenibilidad**: Es más fácil actualizar los metadatos cuando están separados de la lógica de la aplicación
- **Reutilización**: Los metadatos pueden ser reutilizados en diferentes partes de la aplicación

## Ejemplo

```typescript
// /metadata/pages/home.ts
export const homeMetadata = {
  title: 'Pixela - Inicio',
  description: 'Tu plataforma de contenido digital favorita',
  keywords: 'películas, series, streaming, pixela'
};
``` 
import { Category } from '@/api/categories/categories';
import { Pelicula, Serie } from '@/features/media/types/content';

/**
 * Props del componente CategoriesContent
 * @interface
 * @param {Category | null} selectedCategory - Categoría seleccionada
 * @param {Pelicula[]} movies - Array de películas
 * @param {Serie[]} series - Array de series
 * @param {boolean} loading - Indica si se está cargando el contenido
 * @param {string | null} error - Mensaje de error si hay algún problema
 */
export interface CategoriesContentProps {
    selectedCategory: Category | null;
    movies: Pelicula[];
    series: Serie[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    onSearch: (query: string) => void;
    mediaType: 'all' | 'movies' | 'series' | 'random';
}

/**
 * Props del componente ContentSkeleton
 * @interface
 * @param {number} [count=12] - Número de elementos esqueleto a mostrar
 */
export interface ContentSkeletonProps {
    count?: number;
} 
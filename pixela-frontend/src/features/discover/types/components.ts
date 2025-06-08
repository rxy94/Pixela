import { TrendingSerie, TrendingMovie } from '@/features/trending/type';
import { MediaType, MediaContent } from './media';

/**
 * Props del componente DiscoverSection
 * @interface DiscoverSectionProps
 * @property {TrendingSerie[]} series - Lista de series en tendencia
 * @property {TrendingMovie[]} movies - Lista de películas en tendencia
 */
export interface DiscoverSectionProps {
    series: TrendingSerie[];
    movies: TrendingMovie[];
}

/**
 * Propiedades para el componente DiscoverSelector
 * @interface
 */
export interface DiscoverSelectorProps {
    activeType: MediaType;
    onTypeChange: (type: MediaType) => void;
}

/**
 * Propiedades para el componente DiscoverCard
 * @interface
 */
export interface DiscoverCardProps {
    media: MediaContent;
    type: MediaType;
    index: number;
    isMobile?: boolean;
}

/**
 * Propiedades para el componente DiscoverGrid
 * @interface
 */
export interface DiscoverGridProps {
    type: MediaType;
} 
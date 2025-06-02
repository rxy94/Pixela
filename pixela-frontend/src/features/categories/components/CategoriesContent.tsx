'use client';

import Image from 'next/image';
import { Category } from '@/api/categories/categories';
import { Pelicula, Serie } from '@/features/media/types/content';
import { FaStar } from 'react-icons/fa';
import { Badge } from '@/shared/components/Badge';
import { ActionButtons } from '@/shared/components/ActionButtons';
import { useRouter } from 'next/navigation';
import { useState, memo } from 'react';
import { FiSearch } from 'react-icons/fi';

interface CategoriesContentProps {
    selectedCategory: Category | null;
    movies: Pelicula[];
    series: Serie[];
    loading: boolean;
    error: string | null;
}

const INITIAL_VISIBLE_ITEMS = 6;
const HIGH_RATING_THRESHOLD = 7.5;
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const STYLES = {
    card: 'w-full flex flex-col relative group overflow-hidden',
    posterContainer: 'relative w-full aspect-[2/3] overflow-hidden rounded-lg',
    noiseEffect: 'noise-effect opacity-5',
    contentGrid: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6',
    emptyState: 'text-center text-gray-400 py-12',
    errorState: 'text-center text-red-500 py-12',
    searchContainer: 'relative mb-8',
    searchIcon: 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
    searchInput: 'w-full pl-10 pr-4 py-3 bg-pixela-dark/30 border border-pixela-accent/20 rounded-xl text-pixela-light placeholder-pixela-light/40 focus:outline-none focus:border-pixela-accent/40 transition-colors duration-300',
    overlay: 'absolute inset-0 bg-gradient-to-t from-pixela-dark/95 via-pixela-dark/80 to-transparent flex flex-col justify-end p-3 md:p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-lg',
    overlayContent: 'mb-2 md:mb-3',
    title: 'text-pixela-light font-bold text-sm md:text-base lg:text-lg mb-1 md:mb-2 font-outfit overflow-hidden text-ellipsis whitespace-nowrap',
    mediaInfo: 'flex items-center gap-2 mb-2 md:mb-3 flex-wrap',
    rating: 'flex items-center',
    ratingIcon: 'text-yellow-400 mr-1 text-xs md:text-sm',
    ratingText: 'text-pixela-light font-semibold text-xs md:text-sm',
    year: 'text-pixela-light/80 text-xs md:text-sm',
    mediaType: 'text-pixela-light/90 bg-pixela-dark/60 px-1.5 py-0.5 rounded-sm text-xs',
    poster: 'object-cover',
    mainContainer: 'space-y-8 pb-24',
    contentWrapper: 'transform-gpu'
} as const;

const PosterImage = memo(({ posterPath, title, isInitiallyVisible }: { posterPath: string, title: string, isInitiallyVisible: boolean }) => (
    <Image
        src={`${TMDB_IMAGE_BASE_URL}${posterPath}`}
        alt={title || 'Imagen no disponible'}
        fill
        className={STYLES.poster}
        priority={isInitiallyVisible}
        sizes="(max-width: 768px) 100vw, 375px"
        loading={isInitiallyVisible ? "eager" : "lazy"}
    />
));

PosterImage.displayName = 'PosterImage';

const OverlayContent = memo(({ 
    media, 
    type, 
    onFollowClick, 
    onReviewsClick 
}: { 
    media: Pelicula | Serie, 
    type: 'series' | 'movies',
    onFollowClick: () => void,
    onReviewsClick: () => void
}) => (
    <div className={STYLES.overlay}>
        <div className={STYLES.overlayContent}>
            <h3 className={STYLES.title}>
                {type === 'movies' 
                    ? (media as Pelicula).title || (media as Pelicula).titulo || 'Sin título'
                    : (media as Serie).name || (media as Serie).titulo || 'Sin título'}
            </h3>
            
            <div className={STYLES.mediaInfo}>
                <div className={STYLES.rating}>
                    <FaStar className={STYLES.ratingIcon} />
                    <span className={STYLES.ratingText}>
                        {media.vote_average?.toFixed(1) || media.puntuacion?.toFixed(1) || "N/A"}
                    </span>
                </div>
                
                {(type === 'movies' && ((media as Pelicula).release_date || (media as Pelicula).fecha)) || 
                 (type === 'series' && ((media as Serie).first_air_date || (media as Serie).fecha)) ? (
                    <span className={STYLES.year}>
                        {type === 'movies' 
                            ? ((media as Pelicula).release_date || (media as Pelicula).fecha)?.split('-')[0]
                            : ((media as Serie).first_air_date || (media as Serie).fecha)?.split('-')[0]}
                    </span>
                ) : null}
                
                <span className={STYLES.mediaType}>
                    {type === 'series' ? 'Serie' : 'Película'}
                </span>
            </div>
        </div>

        <ActionButtons 
            tmdbId={Number(media.id)}
            itemType={type === 'series' ? 'series' : 'movie'}
            onFollowClick={onFollowClick}
            onReviewsClick={onReviewsClick}
            detailsHref={type === 'series' ? `/series/${media.id}` : `/movies/${media.id}`}
        />
    </div>
));

OverlayContent.displayName = 'OverlayContent';

const MediaCard = memo(({ 
    media, 
    type, 
    index 
}: { 
    media: Pelicula | Serie, 
    type: 'series' | 'movies',
    index: number 
}) => {
    const router = useRouter();
    
    const isHighRated = (media.vote_average ?? 0) >= HIGH_RATING_THRESHOLD;
    const isInitiallyVisible = index < INITIAL_VISIBLE_ITEMS;

    const handleFollowClick = () => {
        console.log("Seguir", type === 'series' ? 'serie' : 'película', type === 'movies' ? (media as Pelicula).title : (media as Serie).name);
    };

    const handleReviewsClick = () => {
        const route = type === 'series' ? `/series/${media.id}` : `/movies/${media.id}`;
        router.prefetch(route);
        router.push(route);
    };
    
    return (
        <div className={STYLES.card}>
            <div className={STYLES.posterContainer}>
                <PosterImage 
                    posterPath={media.poster_path || media.poster || ''}
                    title={type === 'movies' 
                        ? ((media as Pelicula).title || (media as Pelicula).titulo || 'Sin título')
                        : ((media as Serie).name || (media as Serie).titulo || 'Sin título')}
                    isInitiallyVisible={isInitiallyVisible}
                />
                
                <div className={STYLES.noiseEffect} />
                
                <OverlayContent 
                    media={media}
                    type={type}
                    onFollowClick={handleFollowClick}
                    onReviewsClick={handleReviewsClick}
                />
                
                {isHighRated && (
                    <Badge 
                        label="TOP PIXELA"
                        position="top-left"
                        variant="primary"
                    />
                )}
            </div>
        </div>
    );
});

MediaCard.displayName = 'MediaCard';

/**
 * Componente que muestra el contenido de películas y series.   
 * 
 * @component
 * @param {CategoriesContentProps} props - Propiedades del componente
 * @returns {JSX.Element} El contenido renderizado
 */
const ContentGrid = ({ movies, series, searchTerm }: { movies: Pelicula[], series: Serie[], searchTerm: string }) => {
    // Crear contenido con identificadores claros de tipo
    const movieContent = movies.map(movie => ({ ...movie, mediaType: 'movie' as const }));
    const seriesContent = series.map(serie => ({ ...serie, mediaType: 'series' as const }));
    
    type ContentItem = (Pelicula & { mediaType: 'movie' }) | (Serie & { mediaType: 'series' });
    
    const allContent: ContentItem[] = [...movieContent, ...seriesContent]
        .filter(item => {
            // Si no hay término de búsqueda, mostrar todo
            if (searchTerm === '') {
                return true;
            }
            
            const searchField = item.mediaType === 'movie' 
                ? (item as Pelicula).title || (item as Pelicula).titulo
                : (item as Serie).name || (item as Serie).titulo;
            
            const shouldInclude = searchField?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
            
            if (!shouldInclude && item.mediaType === 'series') {
                console.log('[DEBUG] Serie filtered out:', { 
                    id: item.id, 
                    searchField, 
                    searchTerm, 
                    name: (item as Serie).name,
                    titulo: (item as Serie).titulo
                });
            }
            
            return shouldInclude;
        })
        .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));

    return (
        <div className={STYLES.contentGrid}>
            {allContent.map((item, index) => (
                    <MediaCard
                    key={`${item.id}-${item.mediaType}`}
                        media={item}
                    type={item.mediaType === 'movie' ? 'movies' : 'series'}
                        index={index}
                    />
            ))}
        </div>
    );
};

/**
 * Componente que muestra el contenido de películas y series.
 * 
 * @component
 * @param {CategoriesContentProps} props - Propiedades del componente
 * @returns {JSX.Element} El contenido renderizado
 */
export const CategoriesContent = ({
    selectedCategory,
    movies,
    series,
    loading,
    error
}: CategoriesContentProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (error) {
        return (
            <div className={STYLES.errorState}>
                {error}
            </div>
        );
    }

    const hasContent = movies.length > 0 || series.length > 0;

    if (!hasContent && !loading) {
        return (
            <div className={STYLES.emptyState}>
                {selectedCategory 
                    ? `No se encontró contenido en la categoría ${selectedCategory.name}`
                    : 'No se encontró contenido'}
            </div>
        );
    }

    return (
        <div className={STYLES.mainContainer}>
            <div className={STYLES.searchContainer}>
                <div className={STYLES.searchIcon}>
                    <FiSearch className="h-5 w-5 text-pixela-light/40" />
                </div>
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    className={STYLES.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className={STYLES.contentWrapper}>
                <ContentGrid movies={movies} series={series} searchTerm={searchTerm} />
            </div>
        </div>
    );
}; 
'use client';

import Image from 'next/image';
import { Category } from '@/api/categories/categories';
import { Pelicula, Serie } from '@/features/media/types/content';
import { FaStar } from 'react-icons/fa';
import { Badge } from '@/shared/components/Badge';
import { ActionButtons } from '@/shared/components/ActionButtons';
import { useRouter } from 'next/navigation';
import { useState, memo, useMemo, useEffect, useCallback } from 'react';
import { FiSearch, FiX, FiRefreshCw } from 'react-icons/fi';
import { ContentSkeleton } from '../ui/ContentSkeleton';

interface CategoriesContentProps {
    selectedCategory: Category | null;
    movies: Pelicula[];
    series: Serie[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    onSearch: (query: string) => void;
    mediaType: 'all' | 'movies' | 'series' | 'random';
}

const INITIAL_VISIBLE_ITEMS = 6;
const HIGH_RATING_THRESHOLD = 7.5;
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BATCH_SIZE = 12;

const STYLES = {
    card: 'w-full flex flex-col relative group overflow-hidden animate-fade-in',
    posterContainer: 'relative w-full aspect-[2/3] overflow-hidden rounded-lg',
    noiseEffect: 'noise-effect opacity-5',
    contentGrid: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6',
    emptyState: 'text-center text-gray-400 py-12',
    errorState: 'text-center text-red-500 py-12',
    searchContainer: 'relative mb-8',
    searchIcon: 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
    searchInput: 'w-full pl-10 pr-10 py-3 bg-pixela-dark/30 border border-pixela-accent/20 rounded-xl text-pixela-light placeholder-pixela-light/40 focus:outline-none focus:border-pixela-accent/40 transition-colors duration-300',
    clearButton: 'absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-pixela-light/40 hover:text-pixela-light transition-colors duration-300',
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
    contentWrapper: 'transform-gpu',
    searchIconInner: 'h-5 w-5 text-pixela-light/40',
    mobileCategoriesList: 'lg:hidden mb-6',
    placeholderContainer: 'absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center p-4 text-center',
    placeholderEmoji: 'text-4xl mb-3 opacity-50',
    placeholderTitle: 'text-white text-sm font-medium leading-tight mb-2 line-clamp-3',
    placeholderNoImage: 'text-xs text-gray-400 opacity-75',
    placeholderOverlay: 'absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none',
    randomContainer: 'container px-4 mx-auto',
    randomGrid: 'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]',
    textContainer: 'max-w-2xl space-y-8 ml-8 lg:ml-12',
    textContent: 'space-y-6',
    mainTitle: 'text-4xl font-black leading-tight md:text-5xl lg:text-6xl text-pixela-light',
    accentText: 'text-pixela-accent',
    descriptionContainer: 'space-y-6 text-lg leading-relaxed md:text-xl text-pixela-light/90',
    descriptionText: 'text-balance',
    highlightText: 'font-semibold text-pixela-accent',
    highlightTextWhite: 'font-semibold text-white',
    decorativeLine: 'flex items-center gap-4',
    lineBar: 'w-16 h-1 rounded-full bg-pixela-accent',
    lineText: 'text-sm font-medium tracking-wider uppercase text-pixela-light/70',
    cardsContainer: 'flex justify-center w-full',
    cardsWrapper: 'relative w-full max-w-lg text-center',
    randomButton: 'flex items-center justify-center w-full max-w-lg gap-3 px-6 py-3 mb-4 text-purple-400 transition-all duration-300 border group bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 hover:scale-105',
    buttonIcon: 'w-5 h-5 transition-transform duration-500 group-hover:rotate-180',
    buttonText: 'font-medium',
    cardsGrid: 'grid grid-cols-1 sm:grid-cols-2 gap-6',
    mysteryCard: 'w-full aspect-[2/3] rounded-lg border-2 border-dashed border-pixela-accent/30 bg-pixela-dark/20 flex flex-col items-center justify-center p-6 transition-all duration-300 hover:border-pixela-accent/50 hover:bg-pixela-dark/30',
    mysteryEmoji: 'text-4xl mb-4 opacity-50',
    mysteryTitle: 'text-pixela-light/60 text-sm font-medium mb-2',
    mysteryDescription: 'text-pixela-light/40 text-xs text-center',
    recommendationCard: 'relative w-full aspect-[2/3] overflow-hidden rounded-lg group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300',
    recommendationOverlay: 'absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-pixela-dark via-pixela-dark/70 to-transparent group-hover:opacity-100',
    recommendationTitle: 'mb-2 text-base font-bold leading-tight text-pixela-light md:text-lg font-outfit line-clamp-2',
    recommendationInfo: 'flex flex-wrap items-center gap-2 mb-2',
    recommendationRating: 'flex items-center',
    recommendationRatingIcon: 'mr-1 text-xs text-yellow-400',
    recommendationRatingText: 'text-xs font-semibold text-pixela-light',
    recommendationYear: 'text-xs text-pixela-light/80',
    recommendationMediaType: 'text-pixela-light/90 bg-pixela-dark/60 px-1.5 py-0.5 rounded text-xs'
} as const;

/**
 * Componente placeholder cuando no hay imagen disponible
 */
const PlaceholderPoster = memo(({ title, type }: { title: string, type: 'movies' | 'series' }) => {
    return (
        <div className={STYLES.placeholderContainer}>
            <div className={STYLES.placeholderEmoji}>
                {type === 'movies' ? '🎬' : '📺'}
            </div>
            <h3 className={STYLES.placeholderTitle}>
                {title}
            </h3>
            <div className={STYLES.placeholderNoImage}>
                Sin imagen disponible
            </div>
            <div className={STYLES.placeholderOverlay} />
        </div>
    );
});

PlaceholderPoster.displayName = 'PlaceholderPoster';

/**
 * Componente que muestra la imagen de la película o serie.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.posterPath - URL de la imagen de la película o serie
 * @param {string} props.title - Título de la película o serie  
 * @param {boolean} props.isInitiallyVisible - Indica si la imagen se debe cargar inicialmente
 * @param {'movies' | 'series'} props.type - Tipo de contenido
 */
const PosterImage = memo(({ posterPath, title, isInitiallyVisible, type }: { 
    posterPath: string, 
    title: string, 
    isInitiallyVisible: boolean,
    type: 'movies' | 'series'
}) => {
    const [imageError, setImageError] = useState(false);
    
    // Si no hay posterPath o hubo error, mostrar placeholder
    if (!posterPath || posterPath.trim() === '' || imageError) {
        return <PlaceholderPoster title={title} type={type} />;
    }

    return (
        <Image
            src={`${TMDB_IMAGE_BASE_URL}${posterPath}`}
            alt={title || 'Imagen no disponible'}
            fill
            className={STYLES.poster}
            priority={isInitiallyVisible}
            sizes="(max-width: 768px) 100vw, 375px"
            loading={isInitiallyVisible ? "eager" : "lazy"}
            quality={90}
            placeholder="blur"
            onError={() => setImageError(true)}
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
    );
});

PosterImage.displayName = 'PosterImage';

/**
 * Componente que muestra el contenido de películas y series.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Pelicula | Serie} props.media - Película o serie
 * @param {'series' | 'movies'} props.type - Tipo de media  
 * @param {() => void} props.onFollowClick - Función para manejar el clic en el botón de seguir
 * @param {() => void} props.onReviewsClick - Función para manejar el clic en el botón de reseñas
 */
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
                    : (media as Serie).name || (media as Serie).titulo || (media as Serie).title || 'Sin título'}
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

/**
 * Componente que muestra la tarjeta de la película o serie.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Pelicula | Serie} props.media - Película o serie
 * @param {'series' | 'movies'} props.type - Tipo de media
 * @param {number} props.index - Índice de la película o serie  
 * @returns {JSX.Element} La tarjeta renderizada
 */
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
        <div 
            className={STYLES.card}
            style={{
                opacity: 0,
                animationName: 'fadeIn',
                animationDuration: '0.5s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: `${index * 50}ms`
            }}
        >
            <div className={STYLES.posterContainer}>
                <PosterImage 
                    posterPath={media.poster_path || media.poster || ''}
                    title={type === 'movies' 
                        ? ((media as Pelicula).title || (media as Pelicula).titulo || 'Sin título')
                        : ((media as Serie).name || (media as Serie).titulo || (media as Serie).title || 'Sin título')}
                    isInitiallyVisible={isInitiallyVisible}
                    type={type}
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
 * Hook para filtrar y ordenar el contenido de películas y series.
 * 
 * @param {Pelicula[]} movies - Array de películas
 * @param {Serie[]} series - Array de series
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Pelicula[] | Serie[]} Array de películas o series filtrado y ordenado
 */
const useFilteredContent = (movies: Pelicula[], series: Serie[], searchTerm: string) => {
    return useMemo(() => {
        const movieContent = movies.map(movie => ({ ...movie, mediaType: 'movie' as const }));
        const seriesContent = series.map(serie => ({ ...serie, mediaType: 'series' as const }));
        
        return [...movieContent, ...seriesContent]
            .filter(item => {
                if (searchTerm === '') return true;
                
                const searchField = item.mediaType === 'movie' 
                    ? (item as Pelicula).title || (item as Pelicula).titulo
                    : (item as Serie).name || (item as Serie).titulo || (item as Serie).title;
                
                return searchField?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
            })
            .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    }, [movies, series, searchTerm]);
};

/**
 * Componente que muestra el contenido de películas y series.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Pelicula[]} props.movies - Array de películas
 * @param {Serie[]} props.series - Array de series
 * @param {string} props.searchTerm - Término de búsqueda
 * @returns {JSX.Element} El contenido renderizado
 */
const ContentGrid = memo(({ movies, series, searchTerm }: { movies: Pelicula[], series: Serie[], searchTerm: string }) => {
    const [visibleItems, setVisibleItems] = useState(BATCH_SIZE);
    const filteredContent = useFilteredContent(movies, series, searchTerm);
    const hasMore = visibleItems < filteredContent.length;

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
                setVisibleItems(prev => Math.min(prev + BATCH_SIZE, filteredContent.length));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [filteredContent.length]);

    return (
        <div className={STYLES.contentGrid}>
            {filteredContent.slice(0, visibleItems).map((item, index) => (
                <MediaCard
                    key={`${item.id}-${item.mediaType}`}
                    media={item}
                    type={item.mediaType === 'movie' ? 'movies' : 'series'}
                    index={index}
                />
            ))}
            {hasMore && <div className="h-8" />}
        </div>
    );
});

ContentGrid.displayName = 'ContentGrid';

/**
 * Hook para obtener recomendaciones aleatorias separadas (una película y una serie).
 * 
 * @param {Pelicula[]} movies - Array de películas
 * @param {Serie[]} series - Array de series
 * @returns {Object} Objeto con las recomendaciones actuales y función para obtener nuevas
 */
const useRandomRecommendations = (movies: Pelicula[], series: Serie[]) => {
    const [currentMovie, setCurrentMovie] = useState<(Pelicula & { mediaType: 'movie' }) | null>(null);
    const [currentSerie, setCurrentSerie] = useState<(Serie & { mediaType: 'series' }) | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const getNewRecommendations = useCallback(() => {
        // Seleccionar película aleatoria
        if (movies.length > 0) {
            const randomMovieIndex = Math.floor(Math.random() * movies.length);
            setCurrentMovie({ ...movies[randomMovieIndex], mediaType: 'movie' as const });
        }
        
        // Seleccionar serie aleatoria
        if (series.length > 0) {
            const randomSerieIndex = Math.floor(Math.random() * series.length);
            setCurrentSerie({ ...series[randomSerieIndex], mediaType: 'series' as const });
        }

        setHasSearched(true);
    }, [movies, series]);

    return { currentMovie, currentSerie, hasSearched, getNewRecommendations };
};

/**
 * Componente que muestra una card de recomendación individual.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {(Pelicula | Serie) & { mediaType: 'movie' | 'series' }} props.recommendation - Recomendación a mostrar
 * @returns {JSX.Element} Card de recomendación
 */
const RecommendationCard = memo(({ recommendation }: { recommendation: (Pelicula | Serie) & { mediaType: 'movie' | 'series' } }) => {
    return (
        <div className={STYLES.recommendationCard}>
            <div className="relative w-full h-full">
                <PosterImage 
                    posterPath={recommendation.poster_path || recommendation.poster || ''}
                    title={recommendation.mediaType === 'movie' 
                        ? ((recommendation as Pelicula).title || (recommendation as Pelicula).titulo || 'Sin título')
                        : ((recommendation as Serie).name || (recommendation as Serie).titulo || (recommendation as Serie).title || 'Sin título')}
                    isInitiallyVisible={true}
                    type={recommendation.mediaType === 'movie' ? 'movies' : 'series'}
                />
                
                {/* Overlay que aparece en hover - estilo trending */}
                <div className={STYLES.recommendationOverlay}>
                    <div className={STYLES.recommendationInfo}>
                        {/* Título */}
                        <h3 className={STYLES.recommendationTitle}>
                            {recommendation.mediaType === 'movie' 
                                ? ((recommendation as Pelicula).title || (recommendation as Pelicula).titulo || 'Sin título')
                                : ((recommendation as Serie).name || (recommendation as Serie).titulo || (recommendation as Serie).title || 'Sin título')}
                        </h3>

                        {/* Información */}
                        <div className={STYLES.recommendationInfo}>
                            <div className={STYLES.recommendationRating}>
                                <FaStar className={STYLES.recommendationRatingIcon} />
                                <span className={STYLES.recommendationRatingText}>
                                    {recommendation.vote_average?.toFixed(1) || recommendation.puntuacion?.toFixed(1) || "N/A"}
                                </span>
                            </div>
                            
                            {((recommendation.mediaType === 'movie' && ((recommendation as Pelicula).release_date || (recommendation as Pelicula).fecha)) || 
                              (recommendation.mediaType === 'series' && ((recommendation as Serie).first_air_date || (recommendation as Serie).fecha))) && (
                                <span className={STYLES.recommendationYear}>
                                    {recommendation.mediaType === 'movie' 
                                        ? ((recommendation as Pelicula).release_date || (recommendation as Pelicula).fecha)?.split('-')[0]
                                        : ((recommendation as Serie).first_air_date || (recommendation as Serie).fecha)?.split('-')[0]}
                                </span>
                            )}

                            <span className={STYLES.recommendationMediaType}>
                                {recommendation.mediaType === 'series' ? 'Serie' : 'Película'}
                            </span>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <ActionButtons 
                        tmdbId={Number(recommendation.id)}
                        itemType={recommendation.mediaType === 'series' ? 'series' : 'movie'}
                        onFollowClick={() => console.log("Seguir")}
                        onReviewsClick={() => {}}
                        detailsHref={recommendation.mediaType === 'series' ? `/series/${recommendation.id}` : `/movies/${recommendation.id}`}
                    />
                </div>
                
                {/* Badge TOP PIXELA si tiene alta puntuación */}
                {(recommendation.vote_average ?? 0) >= HIGH_RATING_THRESHOLD && (
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

RecommendationCard.displayName = 'RecommendationCard';

/**
 * Componente que muestra dos recomendaciones aleatorias (una película y una serie).
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Pelicula[]} props.movies - Array de películas
 * @param {Serie[]} props.series - Array de series
 * @returns {JSX.Element} Las dos recomendaciones renderizadas
 */
const RandomRecommendations = memo(({ movies, series }: { movies: Pelicula[], series: Serie[] }) => {
    const { currentMovie, currentSerie, hasSearched, getNewRecommendations } = useRandomRecommendations(movies, series);

    const handleNewRecommendations = () => {
        getNewRecommendations();
    };

    return (
        <div className={STYLES.randomContainer}>
            <div className={STYLES.randomGrid}>
                
                {/* Texto descriptivo a la izquierda */}
                <div className={STYLES.textContainer}>
                    <div className={STYLES.textContent}>
                        <h2 className={STYLES.mainTitle}>
                            ¿No sabes qué ver{' '}
                            <span className={STYLES.accentText}>
                                ahora mismo?
                            </span>
                        </h2>
                        
                        <div className={STYLES.descriptionContainer}>
                            <p className={STYLES.descriptionText}>
                                No te preocupes, tenemos la solución perfecta para los momentos de indecisión. 
                                Con un simple clic, te mostraremos{' '}
                                <span className={STYLES.highlightText}>recomendaciones aleatorias</span>{' '}
                                que harán que tu elección sea más fácil.
                            </p>
                            <p className={STYLES.descriptionText}>
                                Descubre una película y una serie seleccionadas especialmente para ti. 
                                Es la herramienta perfecta para{' '}
                                <span className={STYLES.highlightTextWhite}>auténticos cinéfilos y seriéfilos</span>{' '}
                                que buscan ampliar sus horizontes audiovisuales.
                            </p>
                        </div>
                    </div>

                    <div className={STYLES.decorativeLine}>
                        <div className={STYLES.lineBar} />
                        <span className={STYLES.lineText}>
                            {hasSearched ? 'Tus recomendaciones personales' : 'Descubre algo nuevo'}
                        </span>
                    </div>
                </div>

                {/* Cards de recomendación a la derecha */}
                <div className={STYLES.cardsContainer}>
                    <div className={STYLES.cardsWrapper}>
                        <button
                            onClick={handleNewRecommendations}
                            className={STYLES.randomButton}
                        >
                            <FiRefreshCw className={STYLES.buttonIcon} />
                            <span className={STYLES.buttonText}>
                                {hasSearched ? 'Nuevas recomendaciones' : 'Sorpréndeme'}
                            </span>
                        </button>
                        
                        {!hasSearched ? (
                            <div className={STYLES.cardsGrid}>
                                {[
                                    { type: 'Película', emoji: '🎬' },
                                    { type: 'Serie', emoji: '📺' }
                                ].map(({ type, emoji }) => (
                                    <div key={type} className={STYLES.mysteryCard}>
                                        <div className={STYLES.mysteryEmoji}>{emoji}</div>
                                        <h3 className={STYLES.mysteryTitle}>{type} misteriosa</h3>
                                        <p className={STYLES.mysteryDescription}>Haz clic en &quot;Sorpréndeme&quot; para descubrirla</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={STYLES.cardsGrid}>
                                {currentMovie && <RecommendationCard recommendation={currentMovie} />}
                                {currentSerie && <RecommendationCard recommendation={currentSerie} />}
                                {(!currentMovie && !currentSerie) && (
                                     <div className="text-center sm:col-span-2 text-pixela-light/50">
                                         No hay contenido disponible para generar recomendaciones.
                                     </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

RandomRecommendations.displayName = 'RandomRecommendations';

/**
 * Componente que muestra el contenido de películas y series.   
 * 
 * @component
 * @param {CategoriesContentProps} props - Propiedades del componente
 * @returns {JSX.Element} El contenido renderizado
 */
export const CategoriesContent = memo(({
    selectedCategory,
    movies,
    series,
    loading,
    error,
    searchQuery,
    onSearch,
    mediaType
}: CategoriesContentProps) => {
    const [isContentReady, setIsContentReady] = useState(false);
    const [inputValue, setInputValue] = useState(searchQuery);

    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);


    useEffect(() => {
        setInputValue('');
        onSearch('');
    }, [mediaType, onSearch]);

    useEffect(() => {
        if (!loading && (movies.length > 0 || series.length > 0)) {
            const timer = setTimeout(() => {
                setIsContentReady(true);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setIsContentReady(false);
        }
    }, [loading, movies, series]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(inputValue);
    };

    const handleClearSearch = () => {
        setInputValue('');
        onSearch('');
    };

    const getSearchPlaceholder = () => {
        switch (mediaType) {
            case 'movies':
                return 'Buscar películas...';
            case 'series':
                return 'Buscar series...';
            default:
                return 'Buscar películas o series...';
        }
    };

    if (error) {
        return (
            <div className={STYLES.errorState}>
                {error}
            </div>
        );
    }

    // Para mediaType random, renderizar inmediatamente sin depender de isContentReady
    // Para otros tipos, mostrar skeleton mientras carga
    if (mediaType !== 'random' && (loading || !isContentReady)) {
        return <ContentSkeleton count={12} />;
    }

    const hasContent = movies.length > 0 || series.length > 0;

    if (!hasContent && mediaType !== 'random') {
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
            {/* Solo mostrar búsqueda si no es modo random */}
            {mediaType !== 'random' && (
                <form onSubmit={handleFormSubmit} className={STYLES.searchContainer}>
                    <div className={STYLES.searchIcon}>
                        <FiSearch className={STYLES.searchIconInner} />
                    </div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={getSearchPlaceholder()}
                        className={STYLES.searchInput}
                    />
                    {inputValue && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className={STYLES.clearButton}
                            aria-label="Limpiar búsqueda"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    )}
                </form>
            )}

            <div className={STYLES.contentWrapper}>
                {mediaType === 'random' ? (
                    <RandomRecommendations movies={movies} series={series} />
                ) : (
                    <ContentGrid movies={movies} series={series} searchTerm={''} />
                )}
            </div>
        </div>
    );
});

CategoriesContent.displayName = 'CategoriesContent'; 
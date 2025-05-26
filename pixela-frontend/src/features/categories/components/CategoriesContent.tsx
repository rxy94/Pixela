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
    card: 'w-full flex flex-col relative group',
    posterContainer: 'relative w-full aspect-[2/3] overflow-hidden rounded-lg',
    noiseEffect: 'noise-effect opacity-5',
    contentGrid: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6',
    emptyState: 'text-center text-gray-400 py-12',
    errorState: 'text-center text-red-500 py-12',
    searchContainer: 'relative mb-8',
    searchIcon: 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
    searchInput: 'w-full pl-10 pr-4 py-3 bg-pixela-dark/30 border border-pixela-accent/20 rounded-xl text-pixela-light placeholder-pixela-light/40 focus:outline-none focus:border-pixela-accent/40 transition-colors duration-300'
} as const;

const PosterImage = memo(({ posterPath, title, isInitiallyVisible }: { posterPath: string, title: string, isInitiallyVisible: boolean }) => (
    <Image
        src={`${TMDB_IMAGE_BASE_URL}${posterPath}`}
        alt={title}
        fill
        className="object-cover"
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
    <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark via-pixela-dark/70 to-transparent 
                    flex flex-col justify-end p-5 transition-opacity duration-300">
        <div className="mb-4">
            <h3 className="text-pixela-light font-bold text-xl mb-2 font-outfit">
                {type === 'movies' ? (media as Pelicula).title : (media as Serie).name}
            </h3>
            
            <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-pixela-light font-semibold">
                        {media.vote_average?.toFixed(1) || "N/A"}
                    </span>
                </div>
                
                {(type === 'movies' && (media as Pelicula).release_date?.split('-')[0]) || 
                 (type === 'series' && (media as Serie).first_air_date?.split('-')[0]) ? (
                    <span className="text-pixela-light/80">
                        {type === 'movies' 
                            ? (media as Pelicula).release_date?.split('-')[0]
                            : (media as Serie).first_air_date?.split('-')[0]}
                    </span>
                ) : null}
                
                <span className="text-pixela-light/90 bg-pixela-dark/60 px-2 py-0.5 rounded-sm text-xs">
                    {type === 'series' ? 'Serie' : 'Película'}
                </span>
            </div>
        </div>

        <ActionButtons 
            tmdbId={Number(media.id)}
            itemType={type === 'series' ? 'series' : 'movie'}
            onFollowClick={onFollowClick}
            onReviewsClick={onReviewsClick}
            detailsHref={`/${type}/${media.id}`}
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
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    
    const isHighRated = (media.vote_average ?? 0) >= HIGH_RATING_THRESHOLD;
    const isInitiallyVisible = index < INITIAL_VISIBLE_ITEMS;

    const handleFollowClick = () => {
        console.log("Seguir", type === 'series' ? 'serie' : 'película', type === 'movies' ? (media as Pelicula).title : (media as Serie).name);
    };

    const handleReviewsClick = () => {
        router.prefetch(`/${type}/${media.id}`);
        router.push(`/${type}/${media.id}`);
    };
    
    return (
        <div 
            className={STYLES.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={STYLES.posterContainer}>
                <PosterImage 
                    posterPath={media.poster_path || ''}
                    title={type === 'movies' ? (media as Pelicula).title || '' : (media as Serie).name || ''}
                    isInitiallyVisible={isInitiallyVisible}
                />
                
                <div className={STYLES.noiseEffect} />
                
                {isHovered && (
                    <OverlayContent 
                        media={media}
                        type={type}
                        onFollowClick={handleFollowClick}
                        onReviewsClick={handleReviewsClick}
                    />
                )}
                
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

const ContentGrid = ({ movies, series, searchTerm }: { movies: Pelicula[], series: Serie[], searchTerm: string }) => {
    const allContent = [...movies, ...series]
        .filter(item => {
            const title = 'title' in item ? item.title : item.name;
            return title.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));

    return (
        <div className={STYLES.contentGrid}>
            {allContent.map((item, index) => {
                const isMovie = 'title' in item;
                return (
                    <MediaCard
                        key={`${item.id}-${isMovie ? 'movie' : 'series'}`}
                        media={item}
                        type={isMovie ? 'movies' : 'series'}
                        index={index}
                    />
                );
            })}
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
        <div className="space-y-8 pb-24">
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

            <div className="transform-gpu">
                <ContentGrid movies={movies} series={series} searchTerm={searchTerm} />
            </div>
        </div>
    );
}; 
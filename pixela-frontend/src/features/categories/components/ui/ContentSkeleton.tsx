import { ContentSkeletonProps } from '@/features/categories/types/content';

const STYLES = {
    // Contenedor principal y grid
    container: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6',
    card: 'w-full flex flex-col relative group overflow-hidden',

    // Contenedor del poster y efectos visuales
    posterContainer: 'relative w-full aspect-[2/3] overflow-hidden rounded-lg bg-pixela-dark/30',
    shimmer: 'absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/20 to-transparent animate-shimmer',
    noiseEffect: 'noise-effect opacity-5',

    // Overlay y contenido superpuesto
    overlay: 'absolute inset-0 bg-gradient-to-t from-pixela-dark/95 via-pixela-dark/80 to-transparent',
    overlayContent: 'absolute bottom-0 left-0 right-0 p-3 md:p-4',

    // Elementos de texto y detalles
    title: 'h-4 w-3/4 bg-pixela-dark/50 rounded mb-2',
    details: 'flex items-center gap-2',
    rating: 'h-4 w-12 bg-pixela-dark/50 rounded',
    year: 'h-4 w-8 bg-pixela-dark/50 rounded',
    type: 'h-4 w-16 bg-pixela-dark/50 rounded'
} as const;


/**
 * Componente que muestra un esqueleto de carga para las tarjetas de contenido.
 * Imita la estructura visual de las cards de películas y series.
 * 
 * @component
 * @param {ContentSkeletonProps} props - Propiedades del componente
 * @returns {JSX.Element} El esqueleto de carga renderizado
 */
export const ContentSkeleton = ({ count = 12 }: ContentSkeletonProps) => {
    return (
        <div className={STYLES.container}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={STYLES.card}>
                    <div className={STYLES.posterContainer}>
                        <div className={STYLES.shimmer} />
                        <div className={STYLES.noiseEffect} />
                        <div className={STYLES.overlay}>
                            <div className={STYLES.overlayContent}>
                                <div className={STYLES.title} />
                                <div className={STYLES.details}>
                                    <div className={STYLES.rating} />
                                    <div className={STYLES.year} />
                                    <div className={STYLES.type} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}; 
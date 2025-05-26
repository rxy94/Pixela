const STYLES = {
    container: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6',
    card: 'relative aspect-[2/3] rounded-lg overflow-hidden bg-pixela-dark/50',
    shimmer: 'absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/10 to-transparent animate-shimmer',
    poster: 'w-full h-full bg-pixela-dark/70',
    info: 'absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-pixela-dark to-transparent',
    title: 'h-6 w-3/4 bg-pixela-dark/70 rounded mb-2',
    details: 'flex gap-2',
    detail: 'h-4 w-16 bg-pixela-dark/70 rounded',
} as const;

interface ContentSkeletonProps {
    count?: number;
}

/**
 * Componente que muestra un esqueleto de carga para las tarjetas de contenido.
 * Imita la estructura visual de las cards de películas y series.
 * 
 * @component
 * @param {ContentSkeletonProps} props - Propiedades del componente
 * @returns {JSX.Element} El esqueleto de carga renderizado
 */
export const ContentSkeleton = ({ count = 20 }: ContentSkeletonProps) => {
    return (
        <div className={STYLES.container}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={STYLES.card}>
                    <div className={STYLES.poster} />
                    <div className={STYLES.shimmer} />
                    <div className={STYLES.info}>
                        <div className={STYLES.title} />
                        <div className={STYLES.details}>
                            <div className={STYLES.detail} />
                            <div className={STYLES.detail} />
                            <div className={STYLES.detail} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}; 
/**
 * Componentes de skeleton para la sección discover
 * Mantiene la estética y colores de Pixela durante las cargas
 * 
 * @author Pixela
 * @version 1.0.0
 */

const STYLES = {
    // Grid containers
    container: "flex flex-col items-center gap-4",
    row: "flex gap-4",
    mobileGridContainer: "grid grid-cols-2 gap-2 px-1 sm:gap-3 sm:px-2 w-full",
    
    // Skeleton cards con diseño Pixela
    skeletonCard: "bg-gradient-to-br from-pixela-accent/10 via-pixela-dark/40 to-pink-400/10 animate-shimmer rounded-2xl w-[200px] h-[281px] relative overflow-hidden",
    mobileSkeletonCard: "bg-gradient-to-br from-pixela-accent/10 via-pixela-dark/40 to-pink-400/10 animate-shimmer rounded-2xl w-full h-[240px] xs:h-[220px] sm:h-[240px] relative overflow-hidden",
    
    // Efectos visuales
    shimmerOverlay: "absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer",
    noiseEffect: "absolute inset-0 noise-effect opacity-[0.02]",
    gradientOverlay: "absolute inset-0 bg-gradient-to-t from-pixela-dark/80 via-transparent to-transparent",
    
    // Contenido interno de las cards
    cardContent: "absolute bottom-0 left-0 right-0 p-3 space-y-2",
    titleLine: "h-3 bg-pixela-light/20 rounded animate-pulse",
    detailsLine: "h-2 bg-pixela-light/15 rounded animate-pulse",
    ratingBadge: "h-2 w-8 bg-pixela-accent/30 rounded animate-pulse",
    
    // Animaciones escalonadas
    cardContainer: "flex flex-col items-center gap-4 relative",
    firstRow: "[&>*]:animate-float",
    secondRow: "[&>*]:animate-float [&>*:nth-child(2)]:animation-delay-200",
    thirdRow: "[&>*]:animate-float [&>*:nth-child(2)]:animation-delay-200",
    
    // Discover section skeleton
    discoverSection: "w-full py-16 bg-pixela-dark relative overflow-hidden",
    sectionContainer: "container mx-auto px-4 relative z-10",
    sectionTitle: "h-8 w-64 bg-gradient-to-r from-pixela-accent/20 to-pink-400/20 rounded-lg animate-shimmer mx-auto mb-8",
    sectionSubtitle: "h-4 w-96 bg-pixela-light/15 rounded mx-auto animate-pulse mb-12",
    
    // Layout con toggle
    toggleContainer: "flex justify-center mb-8",
    toggle: "flex p-1 bg-pixela-dark/40 rounded-full border border-pixela-accent/10",
    toggleButton: "h-10 px-6 bg-pixela-accent/20 rounded-full animate-pulse",
    toggleButtonInactive: "h-10 px-6 bg-pixela-light/5 rounded-full animate-pulse",
} as const;

/**
 * Skeleton card individual con efectos Pixela
 */
const SkeletonCard = ({ mobile = false, delay = 0 }) => (
  <div 
    className={mobile ? STYLES.mobileSkeletonCard : STYLES.skeletonCard}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={STYLES.shimmerOverlay} />
    <div className={STYLES.noiseEffect} />
    <div className={STYLES.gradientOverlay} />
    
    <div className={STYLES.cardContent}>
      <div className={`${STYLES.titleLine} w-3/4`} />
      <div className={`${STYLES.detailsLine} w-1/2`} />
      <div className="flex gap-2">
        <div className={STYLES.ratingBadge} />
        <div className={`${STYLES.detailsLine} w-12`} />
      </div>
    </div>
  </div>
);

/**
 * Grid skeleton para móvil (2 columnas)
 */
export const DiscoverGridSkeletonMobile = ({ count = 6 }: { count?: number }) => (
  <div className={STYLES.mobileGridContainer}>
    {[...Array(count)].map((_, index) => (
      <SkeletonCard key={index} mobile={true} delay={index * 100} />
    ))}
  </div>
);

/**
 * Grid skeleton para desktop (diseño 2-3-2)
 */
export const DiscoverGridSkeletonDesktop = () => (
  <div className={STYLES.container}>
    <div className={STYLES.row}>
      <SkeletonCard delay={0} />
      <SkeletonCard delay={100} />
    </div>
    <div className={STYLES.row}>
      <SkeletonCard delay={200} />
      <SkeletonCard delay={300} />
      <SkeletonCard delay={400} />
    </div>
    <div className={STYLES.row}>
      <SkeletonCard delay={500} />
      <SkeletonCard delay={600} />
    </div>
  </div>
);

/**
 * Skeleton completo para la sección discover
 */
export const DiscoverSectionSkeleton = () => (
  <div className={STYLES.discoverSection}>
    {/* Efectos de fondo */}
    <div className="absolute top-0 w-32 h-32 rounded-full left-1/4 bg-pixela-accent/3 blur-2xl"></div>
    <div className="absolute bottom-0 w-40 h-40 rounded-full right-1/4 bg-pink-500/3 blur-2xl"></div>
    
    <div className={STYLES.sectionContainer}>
      {/* Título de sección */}
      <div className="mb-12 text-center">
        <div className={STYLES.sectionTitle} />
        <div className={STYLES.sectionSubtitle} style={{ animationDelay: '0.2s' }} />
      </div>
      
      {/* Toggle de películas/series */}
      <div className={STYLES.toggleContainer}>
        <div className={STYLES.toggle}>
          <div className={STYLES.toggleButton} />
          <div className={STYLES.toggleButtonInactive} style={{ animationDelay: '0.1s' }} />
        </div>
      </div>
      
      {/* Grid responsive */}
      <div className="block md:hidden">
        <DiscoverGridSkeletonMobile />
      </div>
      <div className="hidden md:block">
        <DiscoverGridSkeletonDesktop />
      </div>
    </div>
  </div>
);

/**
 * Skeleton simple para el grid interno de discover (diseño original limpio)
 */
export const DiscoverGridSkeleton = ({ isMobile = false }: { isMobile?: boolean }) => {
  const SIMPLE_STYLES = {
    container: "flex flex-col items-center gap-4",
    row: "flex gap-4",
    mobileGridContainer: "grid grid-cols-2 gap-2 px-1 sm:gap-3 sm:px-2 w-full",
  };

  if (isMobile) {
    return (
      <div className={SIMPLE_STYLES.mobileGridContainer}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 dark:bg-gray-700 rounded-2xl w-full h-[240px] xs:h-[220px] sm:h-[240px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={SIMPLE_STYLES.container}>
      <div className={SIMPLE_STYLES.row}>
        <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl w-[200px] h-[281px] animate-pulse" />
        <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl w-[200px] h-[281px] animate-pulse" />
      </div>
      <div className={SIMPLE_STYLES.row}>
        <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl w-[200px] h-[281px] animate-pulse" />
        <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl w-[200px] h-[281px] animate-pulse" />
        <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl w-[200px] h-[281px] animate-pulse" />
      </div>
      <div className={SIMPLE_STYLES.row}>
        <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl w-[200px] h-[281px] animate-pulse" />
        <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl w-[200px] h-[281px] animate-pulse" />
      </div>
    </div>
  );
}; 
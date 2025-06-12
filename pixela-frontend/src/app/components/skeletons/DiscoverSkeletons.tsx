/**
 * Componentes de skeleton para la sección discover
 * Solo incluye el skeleton que realmente se usa en la aplicación
 * 
 * @author Pixela
 * @version 2.0.0
 */

/**
 * Skeleton simple para el grid de discover
 * Usado en la página de discover para mostrar durante la carga
 */
export const DiscoverGridSkeleton = ({ isMobile = false }: { isMobile?: boolean }) => {
  const STYLES = {
    container: "flex flex-col items-center gap-4",
    row: "flex gap-4",
    mobileGridContainer: "grid grid-cols-2 gap-2 px-1 sm:gap-3 sm:px-2 w-full",
    skeletonCard: "bg-gradient-to-br from-pixela-accent/10 via-pixela-dark/40 to-pink-400/10 rounded-2xl animate-shimmer relative overflow-hidden",
    mobileCard: "w-full h-[240px] xs:h-[220px] sm:h-[240px]",
    desktopCard: "w-[200px] h-[281px]"
  };

  if (isMobile) {
    return (
      <div className={STYLES.mobileGridContainer}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`${STYLES.skeletonCard} ${STYLES.mobileCard}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark/80 via-transparent to-transparent"></div>
            
            {/* Contenido simulado */}
            <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
              <div className="w-3/4 h-3 rounded bg-pixela-light/20 animate-pulse"></div>
              <div className="w-1/2 h-2 rounded bg-pixela-light/15 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-8 h-2 rounded bg-pixela-accent/30 animate-pulse"></div>
                <div className="w-12 h-2 rounded bg-pixela-light/15 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={STYLES.container}>
      <div className={STYLES.row}>
        <div className={`${STYLES.skeletonCard} ${STYLES.desktopCard}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark/80 via-transparent to-transparent"></div>
        </div>
        <div className={`${STYLES.skeletonCard} ${STYLES.desktopCard}`} style={{ animationDelay: '100ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark/80 via-transparent to-transparent"></div>
        </div>
      </div>
      <div className={STYLES.row}>
        <div className={`${STYLES.skeletonCard} ${STYLES.desktopCard}`} style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark/80 via-transparent to-transparent"></div>
        </div>
        <div className={`${STYLES.skeletonCard} ${STYLES.desktopCard}`} style={{ animationDelay: '300ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark/80 via-transparent to-transparent"></div>
        </div>
        <div className={`${STYLES.skeletonCard} ${STYLES.desktopCard}`} style={{ animationDelay: '400ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark/80 via-transparent to-transparent"></div>
        </div>
      </div>
      <div className={STYLES.row}>
        <div className={`${STYLES.skeletonCard} ${STYLES.desktopCard}`} style={{ animationDelay: '500ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark/80 via-transparent to-transparent"></div>
        </div>
        <div className={`${STYLES.skeletonCard} ${STYLES.desktopCard}`} style={{ animationDelay: '600ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark/80 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
}; 
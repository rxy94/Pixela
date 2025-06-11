/**
 * Componentes de skeleton para elementos multimedia
 * Mantiene la estética y colores de Pixela durante las cargas
 */
const STYLES = {
  // Media page skeleton
  mediaPage: 'min-h-screen bg-gradient-to-b from-pixela-dark to-black pt-20',
  mediaContainer: 'container mx-auto px-4 py-8',
  
  // Hero section skeleton
  mediaHero: 'relative w-full h-[60vh] rounded-2xl overflow-hidden mb-8',
  mediaHeroGradient: 'absolute inset-0 bg-gradient-to-br from-pixela-accent/10 via-pixela-dark/40 to-pink-400/10 animate-shimmer',
  mediaHeroOverlay: 'absolute inset-0 bg-gradient-to-t from-pixela-dark via-transparent to-transparent',
  mediaHeroContent: 'absolute bottom-8 left-8 right-8 space-y-4',
  mediaTitle: 'h-12 w-2/3 bg-gradient-to-r from-pixela-accent/20 to-pink-400/20 rounded-lg animate-shimmer',
  mediaInfo: 'flex gap-4',
  mediaRating: 'h-6 w-16 bg-pixela-accent/30 rounded animate-pulse',
  mediaYear: 'h-6 w-12 bg-pixela-light/20 rounded animate-pulse',
  mediaGenre: 'h-6 w-24 bg-pink-400/20 rounded animate-pulse',
  
  // Content sections
  contentSection: 'mb-12 space-y-6',
  sectionTitle: 'h-8 w-48 bg-gradient-to-r from-pixela-accent/15 to-pink-400/15 rounded-lg animate-shimmer',
  descriptionLines: 'space-y-3',
  descriptionLine: 'h-4 bg-pixela-light/15 rounded animate-pulse',
  
  // Cast section
  castGrid: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4',
  castCard: 'text-center space-y-2',
  castAvatar: 'w-20 h-20 rounded-full bg-gradient-to-br from-pixela-accent/20 to-pink-400/20 animate-pulse mx-auto',
  castName: 'h-3 bg-pixela-light/15 rounded animate-pulse',
  castRole: 'h-2 bg-pixela-light/10 rounded animate-pulse',
  
  // Gallery section
  gallery: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
  galleryItem: 'aspect-video bg-gradient-to-br from-pixela-accent/10 to-pink-400/10 rounded-lg animate-shimmer relative overflow-hidden',
  galleryShimmer: 'absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer',
  
  // Reviews section
  reviewsGrid: 'space-y-6',
  reviewCard: 'p-6 bg-pixela-dark/40 border border-pixela-accent/10 rounded-xl space-y-4',
  reviewHeader: 'flex items-center gap-3',
  reviewAvatar: 'w-12 h-12 rounded-full bg-pixela-accent/20 animate-pulse',
  reviewUser: 'space-y-2',
  reviewUserName: 'h-4 w-24 bg-pixela-light/15 rounded animate-pulse',
  reviewDate: 'h-3 w-16 bg-pixela-light/10 rounded animate-pulse',
  reviewContent: 'space-y-2',
  reviewText: 'h-3 bg-pixela-light/10 rounded animate-pulse',
  
  // Loading states
  loadingContainer: 'flex items-center justify-center py-12',
  loadingSpinner: 'w-8 h-8 border-2 border-pixela-accent/30 border-t-pixela-accent rounded-full animate-spin',
  loadingText: 'ml-3 text-pixela-light/60 animate-pulse',
  
  // Action buttons
  actionButtons: 'flex gap-4 mt-6',
  actionButton: 'h-12 w-32 bg-pixela-accent/20 rounded-lg animate-pulse',
  favoriteButton: 'h-12 w-12 bg-pink-400/20 rounded-lg animate-pulse',
  
  // Media cards
  mediaCard: 'relative group cursor-pointer transition-all duration-300 hover:scale-105',
  mediaCardContainer: 'overflow-hidden bg-pixela-dark/60 backdrop-blur-sm border border-pixela-accent/10 rounded-xl hover:border-pixela-accent/30 transition-all duration-300',
  mediaCardImage: 'aspect-[2/3] bg-gradient-to-br from-pixela-accent/15 via-pink-400/10 to-pixela-accent/15 animate-shimmer relative overflow-hidden',
  mediaCardImageOverlay: 'absolute inset-0 bg-gradient-to-t from-pixela-dark/80 to-transparent',
  mediaCardContent: 'p-4 space-y-3',
  mediaCardTitle: 'h-5 bg-gradient-to-r from-pixela-accent/20 to-pink-400/20 rounded animate-shimmer',
  mediaCardSubtitle: 'h-3 w-2/3 bg-pixela-light/15 rounded animate-pulse',
  mediaCardRating: 'flex items-center gap-2',
  mediaCardStar: 'h-4 w-16 bg-pixela-accent/25 rounded animate-pulse',
  mediaCardYear: 'h-3 w-12 bg-pixela-light/10 rounded animate-pulse',
  
  // Horizontal media cards
  mediaCardHorizontal: 'flex gap-4 p-4 bg-pixela-dark/40 border border-pixela-accent/10 rounded-xl hover:border-pixela-accent/20 transition-all duration-300',
  mediaCardHorizontalImage: 'aspect-[3/4] w-24 bg-gradient-to-br from-pixela-accent/15 to-pink-400/15 rounded-lg animate-shimmer flex-shrink-0',
  mediaCardHorizontalContent: 'flex-1 space-y-2',
  mediaCardHorizontalTitle: 'h-5 bg-gradient-to-r from-pixela-accent/20 to-pink-400/20 rounded animate-shimmer',
  mediaCardHorizontalMeta: 'flex gap-3',
  mediaCardHorizontalDesc: 'h-3 bg-pixela-light/10 rounded animate-pulse',
} as const;

/**
 * Skeleton para la página completa de media que replica la estructura real
 */
export const MediaPageSkeleton = () => (
  <div className="min-h-screen bg-[#0F0F0F]">
    {/* Hero Section Skeleton */}
    <div className="relative min-h-[80vh] w-full">
      {/* Backdrop skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-pixela-accent/10 via-pixela-dark/40 to-pink-400/10 animate-shimmer">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="container relative px-4 mx-auto">
        
        {/* Mobile Layout Skeleton */}
        <div className="pb-8 lg:hidden pt-36 md:pt-44">
          <div className="flex flex-col items-center gap-6">
            {/* Poster skeleton */}
            <div className="w-48 aspect-[2/3] bg-gradient-to-br from-pixela-accent/20 to-pink-400/20 rounded-xl animate-shimmer"></div>
            
            {/* Content skeleton */}
            <div className="w-full space-y-4">
              {/* Title */}
              <div className="h-8 rounded bg-gradient-to-r from-pixela-accent/20 to-pink-400/20 animate-shimmer"></div>
              
              {/* Genres */}
              <div className="flex justify-center gap-2">
                <div className="w-16 h-6 rounded bg-pixela-accent/15 animate-pulse"></div>
                <div className="w-20 h-6 rounded bg-pixela-accent/15 animate-pulse"></div>
                <div className="h-6 rounded w-18 bg-pixela-accent/15 animate-pulse"></div>
              </div>
              
              {/* Metadata */}
              <div className="flex justify-center gap-4">
                <div className="w-12 h-5 rounded bg-pixela-light/15 animate-pulse"></div>
                <div className="w-16 h-5 rounded bg-pixela-light/15 animate-pulse"></div>
                <div className="w-20 h-5 rounded bg-pixela-light/15 animate-pulse"></div>
              </div>
              
              {/* Synopsis */}
              <div className="mt-4 mb-6 space-y-2">
                <div className="h-4 rounded bg-pixela-light/10 animate-pulse"></div>
                <div className="w-4/5 h-4 rounded bg-pixela-light/10 animate-pulse"></div>
                <div className="w-3/5 h-4 rounded bg-pixela-light/10 animate-pulse"></div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-center gap-3">
                <div className={STYLES.actionButton}></div>
                <div className={STYLES.favoriteButton}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout Skeleton */}
        <div className="hidden lg:flex h-[80vh] items-end pb-20">
          <div className="flex flex-row gap-8">
            {/* Poster skeleton */}
            <div className="w-72 aspect-[2/3] bg-gradient-to-br from-pixela-accent/20 to-pink-400/20 rounded-xl animate-shimmer flex-shrink-0"></div>
            
            {/* Content skeleton */}
            <div className="flex-grow space-y-6">
              {/* Title */}
              <div className="h-12 max-w-2xl rounded bg-gradient-to-r from-pixela-accent/20 to-pink-400/20 animate-shimmer"></div>
              
              {/* Genres */}
              <div className="flex gap-3">
                <div className="w-20 h-8 rounded bg-pixela-accent/15 animate-pulse"></div>
                <div className="w-24 h-8 rounded bg-pixela-accent/15 animate-pulse"></div>
                <div className="h-8 rounded w-22 bg-pixela-accent/15 animate-pulse"></div>
              </div>
              
              {/* Metadata */}
              <div className="flex gap-6">
                <div className="w-16 h-6 rounded bg-pixela-light/15 animate-pulse"></div>
                <div className="w-20 h-6 rounded bg-pixela-light/15 animate-pulse"></div>
                <div className="w-24 h-6 rounded bg-pixela-light/15 animate-pulse"></div>
              </div>
              
              {/* Synopsis */}
              <div className="max-w-3xl mb-8 space-y-3">
                <div className="h-5 rounded bg-pixela-light/10 animate-pulse"></div>
                <div className="w-11/12 h-5 rounded bg-pixela-light/10 animate-pulse"></div>
                <div className="w-4/5 h-5 rounded bg-pixela-light/10 animate-pulse"></div>
                <div className="w-2/3 h-5 rounded bg-pixela-light/10 animate-pulse"></div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-4">
                <div className="rounded-lg h-14 w-36 bg-pixela-accent/20 animate-pulse"></div>
                <div className="rounded-lg h-14 w-14 bg-pink-400/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Content Sections Skeleton */}
    <div className="relative z-10 pb-40 -mt-20">
      <div className="container px-4 pt-8 mx-auto space-y-12 md:pt-0">
        
        {/* Streaming Providers */}
        <div className="space-y-4">
          <div className={STYLES.sectionTitle} />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-lg bg-pixela-light/10 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>

        {/* Cast Section */}
        <div className="space-y-6">
          <div className={STYLES.sectionTitle} style={{ animationDelay: '0.2s' }} />
          <div className={STYLES.castGrid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={STYLES.castCard}>
                <div className={STYLES.castAvatar} style={{ animationDelay: `${i * 0.1}s` }} />
                <div className={STYLES.castName} style={{ animationDelay: `${i * 0.1 + 0.05}s` }} />
                <div className={STYLES.castRole} style={{ animationDelay: `${i * 0.1 + 0.1}s` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Trailers Section */}
        <div className="space-y-6">
          <div className={STYLES.sectionTitle} style={{ animationDelay: '0.4s' }} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="rounded-lg aspect-video bg-gradient-to-br from-pixela-accent/10 to-pink-400/10 animate-shimmer" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-6">
          <div className={STYLES.sectionTitle} style={{ animationDelay: '0.6s' }} />
          <div className={STYLES.gallery}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={STYLES.galleryItem} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={STYLES.galleryShimmer} />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <div className={STYLES.sectionTitle} style={{ animationDelay: '0.8s' }} />
          <div className={STYLES.reviewsGrid}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={STYLES.reviewCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={STYLES.reviewHeader}>
                  <div className={STYLES.reviewAvatar} />
                  <div className={STYLES.reviewUser}>
                    <div className={STYLES.reviewUserName} />
                    <div className={STYLES.reviewDate} />
                  </div>
                </div>
                <div className={STYLES.reviewContent}>
                  <div className={STYLES.reviewText} />
                  <div className={`${STYLES.reviewText} w-4/5`} />
                  <div className={`${STYLES.reviewText} w-3/5`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Skeleton para la sección de galería
 */
export const GallerySkeleton = ({ count = 8 }: { count?: number }) => (
  <div className={STYLES.contentSection}>
    <div className={STYLES.sectionTitle} />
    <div className={STYLES.gallery}>
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className={STYLES.galleryItem}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className={STYLES.galleryShimmer} />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Skeleton para la sección de reseñas
 */
export const ReviewsSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className={STYLES.contentSection}>
    <div className={STYLES.sectionTitle} />
    <div className={STYLES.reviewsGrid}>
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className={STYLES.reviewCard}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className={STYLES.reviewHeader}>
            <div className={STYLES.reviewAvatar} />
            <div className={STYLES.reviewUser}>
              <div className={STYLES.reviewUserName} />
              <div className={STYLES.reviewDate} />
            </div>
          </div>
          <div className={STYLES.reviewContent}>
            <div className={STYLES.reviewText} />
            <div className={`${STYLES.reviewText} w-4/5`} />
            <div className={`${STYLES.reviewText} w-3/5`} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Skeleton para el cast
 */
export const CastSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className={STYLES.contentSection}>
    <div className={STYLES.sectionTitle} />
    <div className={STYLES.castGrid}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={STYLES.castCard}>
          <div 
            className={STYLES.castAvatar} 
            style={{ animationDelay: `${i * 0.1}s` }}
          />
          <div 
            className={STYLES.castName} 
            style={{ animationDelay: `${i * 0.1 + 0.05}s` }}
          />
          <div 
            className={STYLES.castRole} 
            style={{ animationDelay: `${i * 0.1 + 0.1}s` }}
          />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Skeleton de loading simple con spinner
 */
export const LoadingSkeleton = ({ text = "Cargando..." }: { text?: string }) => (
  <div className={STYLES.loadingContainer}>
    <div className={STYLES.loadingSpinner} />
    <span className={STYLES.loadingText}>{text}</span>
  </div>
);

/**
 * Skeleton para carrusel de media
 */
export const MediaCarouselSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="flex gap-4 overflow-hidden">
    {[...Array(count)].map((_, i) => (
      <div 
        key={i}
        className="min-w-[200px] h-[300px] bg-gradient-to-br from-pixela-accent/10 to-pink-400/10 rounded-lg animate-shimmer relative overflow-hidden"
        style={{ animationDelay: `${i * 0.1}s` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer" />
        <div className="absolute space-y-2 bottom-4 left-4 right-4">
          <div className="h-4 rounded bg-pixela-light/20 animate-pulse" />
          <div className="w-2/3 h-3 rounded bg-pixela-light/15 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Skeleton para tarjeta de media individual (vertical)
 */
export const MediaCardSkeleton = () => (
  <div className={STYLES.mediaCard}>
    <div className={STYLES.mediaCardContainer}>
      {/* Imagen */}
      <div className={STYLES.mediaCardImage}>
        <div className={STYLES.mediaCardImageOverlay} />
        
        {/* Efectos de shimmer cinematográficos */}
        <div className="absolute w-8 h-8 rounded-full top-4 right-4 bg-pixela-accent/20 animate-pulse"></div>
        <div className="absolute w-6 h-6 rounded bottom-4 left-4 bg-pink-400/20 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        
        {/* Rating flotante */}
        <div className="absolute top-4 left-4">
          <div className="w-10 h-6 rounded-full bg-pixela-accent/30 animate-pulse"></div>
        </div>
      </div>
      
      {/* Contenido */}
      <div className={STYLES.mediaCardContent}>
        <div className={STYLES.mediaCardTitle} />
        <div className={STYLES.mediaCardSubtitle} style={{ animationDelay: '0.1s' }} />
        
        <div className={STYLES.mediaCardRating}>
          <div className={STYLES.mediaCardStar} />
          <div className={STYLES.mediaCardYear} style={{ animationDelay: '0.15s' }} />
        </div>
      </div>
    </div>
    
    {/* Efecto hover */}
    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-t from-pixela-accent/10 to-transparent group-hover:opacity-100 rounded-xl"></div>
  </div>
);

/**
 * Skeleton para tarjeta de media horizontal (para listas)
 */
export const MediaCardHorizontalSkeleton = () => (
  <div className={STYLES.mediaCardHorizontal}>
    {/* Imagen */}
    <div className={STYLES.mediaCardHorizontalImage}>
      <div className="absolute inset-0 bg-gradient-to-br from-pixela-accent/5 to-pink-400/5 animate-pulse"></div>
    </div>
    
    {/* Contenido */}
    <div className={STYLES.mediaCardHorizontalContent}>
      <div className={STYLES.mediaCardHorizontalTitle} />
      
      <div className={STYLES.mediaCardHorizontalMeta}>
        <div className="w-12 h-4 rounded bg-pixela-accent/25 animate-pulse"></div>
        <div className="w-16 h-4 rounded bg-pixela-light/15 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-20 h-4 rounded bg-pink-400/20 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      </div>
      
      <div className="mt-2 space-y-2">
        <div className={STYLES.mediaCardHorizontalDesc} />
        <div className={`${STYLES.mediaCardHorizontalDesc} w-4/5`} style={{ animationDelay: '0.1s' }} />
        <div className={`${STYLES.mediaCardHorizontalDesc} w-2/3`} style={{ animationDelay: '0.2s' }} />
      </div>
    </div>
  </div>
);

/**
 * Skeleton para grid de tarjetas de media
 */
export const MediaGridSkeleton = ({ 
  count = 12, 
  layout = 'vertical' 
}: { 
  count?: number;
  layout?: 'vertical' | 'horizontal';
}) => (
  <div className={`${
    layout === 'vertical' 
      ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6' 
      : 'space-y-4'
  }`}>
    {[...Array(count)].map((_, i) => (
      <div key={i} style={{ animationDelay: `${i * 0.1}s` }}>
        {layout === 'vertical' ? (
          <MediaCardSkeleton />
        ) : (
          <MediaCardHorizontalSkeleton />
        )}
      </div>
    ))}
  </div>
);

/**
 * Skeleton para sección de media recomendado/relacionado
 */
export const RelatedMediaSkeleton = () => (
  <div className={STYLES.contentSection}>
    <div className="flex items-center justify-between mb-6">
      <div className="w-64 h-8 rounded-lg bg-gradient-to-r from-pixela-accent/20 to-pink-400/20 animate-shimmer"></div>
      <div className="w-20 h-6 rounded bg-pixela-light/15 animate-pulse"></div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ animationDelay: `${i * 0.1}s` }}>
          <MediaCardSkeleton />
        </div>
      ))}
    </div>
  </div>
); 
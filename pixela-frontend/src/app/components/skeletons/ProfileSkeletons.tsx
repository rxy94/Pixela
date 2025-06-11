/**
 * Componentes de skeleton para la sección de perfil
 * Mantiene la estética y colores de Pixela durante las cargas
 * 
 * @author Pixela
 * @version 1.0.0
 */

'use client';

import clsx from 'clsx';

const STYLES = {
  // Layout principal
  main: 'pt-28 px-6 min-h-screen bg-gradient-to-b from-pixela-dark to-black',
  container: 'max-w-6xl mx-auto',
  title: 'h-10 w-48 bg-gradient-to-r from-pixela-accent/20 to-pink-400/20 rounded-lg animate-shimmer mb-8',
  
  // Navegación por tabs
  tabsContainer: 'flex flex-wrap gap-2 mb-8',
  tab: 'h-10 w-32 bg-pixela-dark/60 border border-pixela-accent/20 rounded-full animate-pulse',
  
  // Contenedor principal
  contentContainer: clsx(
    'bg-pixela-dark/60 backdrop-blur-lg border border-pixela-accent/10',
    'rounded-3xl p-8 shadow-lg shadow-pixela-accent/5'
  ),
  
  // Header de sección
  header: 'flex justify-between items-center mb-6',
  headerTitle: 'h-8 w-48 bg-gradient-to-r from-pixela-accent/15 to-pink-400/15 rounded-lg animate-shimmer',
  headerButton: 'h-10 w-24 bg-pixela-accent/30 rounded-full animate-pulse',
  
  // Perfil y avatar
  profileContainer: 'flex flex-col md:flex-row items-start gap-8',
  avatar: 'w-32 h-32 rounded-full bg-gradient-to-br from-pixela-accent/20 to-pink-400/20 animate-pulse',
  
  // Información del perfil
  infoContainer: 'flex-1 space-y-6 py-2',
  infoTitle: 'h-10 w-1/3 bg-gradient-to-r from-pixela-accent/20 to-pink-400/20 rounded-lg animate-shimmer',
  infoList: 'space-y-4',
  infoItem: 'flex items-center gap-3',
  infoIcon: 'w-10 h-10 rounded-full bg-pixela-accent/20 animate-pulse',
  infoContent: 'space-y-2',
  infoLabel: 'h-4 w-24 bg-pixela-light/15 rounded animate-pulse',
  infoValue: 'h-6 w-48 bg-pixela-light/20 rounded animate-pulse',

  // Skeletons para contenido específico
  reviewsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  reviewCard: 'p-4 bg-pixela-dark/40 border border-pixela-accent/10 rounded-xl space-y-3',
  reviewTitle: 'h-5 bg-pixela-light/15 rounded animate-pulse',
  reviewText: 'space-y-2',
  reviewLine: 'h-3 bg-pixela-light/10 rounded animate-pulse',

  favoritesGrid: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4',
  favoriteCard: 'aspect-[2/3] bg-gradient-to-br from-pixela-accent/10 to-pink-400/10 rounded-lg animate-shimmer',

  usersGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  userCard: 'flex items-center gap-3 p-4 bg-pixela-dark/40 border border-pixela-accent/10 rounded-lg',
  userAvatar: 'w-12 h-12 rounded-full bg-pixela-accent/20 animate-pulse',
  userInfo: 'space-y-2',
  userName: 'h-4 w-24 bg-pixela-light/15 rounded animate-pulse',
  userRole: 'h-3 w-16 bg-pixela-accent/15 rounded animate-pulse'
} as const;

/**
 * Componente que muestra un esqueleto de carga para el perfil principal
 */
export const ProfileSkeleton = () => {
  return (
    <main className={STYLES.main}>
      <div className={STYLES.container}>
        <div className={STYLES.title} />
        
        <div className={STYLES.tabsContainer}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={STYLES.tab} style={{ animationDelay: `${item * 0.1}s` }} />
          ))}
        </div>
        
        <div className={STYLES.contentContainer}>
          <div className={STYLES.header}>
            <div className={STYLES.headerTitle} />
            <div className={STYLES.headerButton} />
          </div>
          
          <div className={STYLES.profileContainer}>
            <div className={STYLES.avatar} />
            
            <div className={STYLES.infoContainer}>
              <div className={STYLES.infoTitle} />
              
              <div className={STYLES.infoList}>
                {[1, 2, 3].map((item) => (
                  <div key={item} className={STYLES.infoItem}>
                    <div className={STYLES.infoIcon} style={{ animationDelay: `${item * 0.1}s` }} />
                    <div className={STYLES.infoContent}>
                      <div className={STYLES.infoLabel} style={{ animationDelay: `${item * 0.1 + 0.05}s` }} />
                      <div className={STYLES.infoValue} style={{ animationDelay: `${item * 0.1 + 0.1}s` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/**
 * Skeleton para la sección de reseñas del perfil
 */
export const ProfileReviewsSkeleton = () => (
  <div className={STYLES.reviewsGrid}>
    {[...Array(6)].map((_, i) => (
      <div key={i} className={STYLES.reviewCard}>
        <div className={`${STYLES.reviewTitle} w-3/4`} style={{ animationDelay: `${i * 0.1}s` }} />
        <div className={STYLES.reviewText}>
          <div className={STYLES.reviewLine} style={{ animationDelay: `${i * 0.1 + 0.1}s` }} />
          <div className={`${STYLES.reviewLine} w-4/5`} style={{ animationDelay: `${i * 0.1 + 0.2}s` }} />
          <div className={`${STYLES.reviewLine} w-3/5`} style={{ animationDelay: `${i * 0.1 + 0.3}s` }} />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Skeleton para la sección de favoritos del perfil
 */
export const ProfileFavoritesSkeleton = () => (
  <div className={STYLES.favoritesGrid}>
    {[...Array(8)].map((_, i) => (
      <div 
        key={i} 
        className={STYLES.favoriteCard}
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ))}
  </div>
);

/**
 * Skeleton para la sección de usuarios (admin)
 */
export const ProfileUsersSkeleton = () => (
  <div className={STYLES.usersGrid}>
    {[...Array(6)].map((_, i) => (
      <div key={i} className={STYLES.userCard}>
        <div className={STYLES.userAvatar} style={{ animationDelay: `${i * 0.1}s` }} />
        <div className={STYLES.userInfo}>
          <div className={STYLES.userName} style={{ animationDelay: `${i * 0.1 + 0.1}s` }} />
          <div className={STYLES.userRole} style={{ animationDelay: `${i * 0.1 + 0.2}s` }} />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Skeleton para el loading general de la página de perfil
 */
export const ProfileLoadingSkeleton = () => (
  <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pixela-dark via-gray-900/80 to-black">
    <div className="relative">
      {/* Efectos de fondo */}
      <div className="absolute w-16 h-16 rounded-full -top-8 -left-8 bg-pixela-accent/20 blur-xl animate-pulse"></div>
      <div className="absolute w-20 h-20 rounded-full -bottom-8 -right-8 bg-pink-400/20 blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Contenido central */}
      <div className="relative z-10 space-y-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-pixela-accent/30 to-pink-400/30 animate-pulse"></div>
        <div className="space-y-2">
          <div className="w-48 h-6 mx-auto rounded bg-gradient-to-r from-pixela-accent/20 to-pink-400/20 animate-shimmer"></div>
          <div className="w-32 h-4 mx-auto rounded bg-pixela-light/15 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
); 
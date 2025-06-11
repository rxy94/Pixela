/**
 * Índice de componentes skeleton de Pixela
 * Exporta todos los skeletons organizados por categorías
 * 
 * @author Pixela
 * @version 1.0.0
 */

// ===============================
// SKELETONS DE PÁGINAS PRINCIPALES
// ===============================
export {
  HeroSectionSkeleton,
  SectionSkeleton
} from './PageSkeletons';

// ===============================
// SKELETONS DE CATEGORÍAS
// ===============================
export {
  ContentSkeleton,
  CategoriesListSkeleton,
  PaginationSkeleton
} from './CategorySkeletons';

// ===============================
// SKELETONS DE PERFIL
// ===============================
export {
  ProfileSkeleton,
  ProfileReviewsSkeleton,
  ProfileFavoritesSkeleton,
  ProfileUsersSkeleton,
  ProfileLoadingSkeleton
} from './ProfileSkeletons';

// ===============================
// SKELETONS DE DISCOVER
// ===============================
export {
  DiscoverGridSkeletonMobile,
  DiscoverGridSkeletonDesktop,
  DiscoverSectionSkeleton,
  DiscoverGridSkeleton
} from './DiscoverSkeletons';

// ===============================
// SKELETONS DE MEDIA
// ===============================
export {
  MediaPageSkeleton,
  GallerySkeleton,
  ReviewsSkeleton,
  CastSkeleton,
  LoadingSkeleton,
  MediaCarouselSkeleton,
  MediaCardSkeleton,
  MediaCardHorizontalSkeleton,
  MediaGridSkeleton,
  RelatedMediaSkeleton,
} from './MediaSkeletons';

// ===============================
// TIPOS DE EXPORTACIÓN AGRUPADOS
// ===============================

// Skeletons de páginas principales
export type PageSkeletons = {
  HeroSectionSkeleton: typeof import('./PageSkeletons').HeroSectionSkeleton;
  SectionSkeleton: typeof import('./PageSkeletons').SectionSkeleton;
};

// Skeletons de categorías
export type CategorySkeletons = {
  ContentSkeleton: typeof import('./CategorySkeletons').ContentSkeleton;
  CategoriesListSkeleton: typeof import('./CategorySkeletons').CategoriesListSkeleton;
  PaginationSkeleton: typeof import('./CategorySkeletons').PaginationSkeleton;
};

// Skeletons de perfil
export type ProfileSkeletons = {
  ProfileSkeleton: typeof import('./ProfileSkeletons').ProfileSkeleton;
  ProfileReviewsSkeleton: typeof import('./ProfileSkeletons').ProfileReviewsSkeleton;
  ProfileFavoritesSkeleton: typeof import('./ProfileSkeletons').ProfileFavoritesSkeleton;
  ProfileUsersSkeleton: typeof import('./ProfileSkeletons').ProfileUsersSkeleton;
  ProfileLoadingSkeleton: typeof import('./ProfileSkeletons').ProfileLoadingSkeleton;
};

// Skeletons de discover
export type DiscoverSkeletons = {
  DiscoverGridSkeletonMobile: typeof import('./DiscoverSkeletons').DiscoverGridSkeletonMobile;
  DiscoverGridSkeletonDesktop: typeof import('./DiscoverSkeletons').DiscoverGridSkeletonDesktop;
  DiscoverSectionSkeleton: typeof import('./DiscoverSkeletons').DiscoverSectionSkeleton;
  DiscoverGridSkeleton: typeof import('./DiscoverSkeletons').DiscoverGridSkeleton;
};

// Skeletons de media
export type MediaSkeletons = {
  MediaPageSkeleton: typeof import('./MediaSkeletons').MediaPageSkeleton;
  GallerySkeleton: typeof import('./MediaSkeletons').GallerySkeleton;
  ReviewsSkeleton: typeof import('./MediaSkeletons').ReviewsSkeleton;
  CastSkeleton: typeof import('./MediaSkeletons').CastSkeleton;
  LoadingSkeleton: typeof import('./MediaSkeletons').LoadingSkeleton;
  MediaCarouselSkeleton: typeof import('./MediaSkeletons').MediaCarouselSkeleton;
  MediaCardSkeleton: typeof import('./MediaSkeletons').MediaCardSkeleton;
  MediaCardHorizontalSkeleton: typeof import('./MediaSkeletons').MediaCardHorizontalSkeleton;
  MediaGridSkeleton: typeof import('./MediaSkeletons').MediaGridSkeleton;
  RelatedMediaSkeleton: typeof import('./MediaSkeletons').RelatedMediaSkeleton;
}; 
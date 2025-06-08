'use client';

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { MediaContent, MediaType } from "@/features/discover/types/media";
import { TrendingSerie } from "@/features/trending/type";
import { Badge } from "@/shared/components/Badge";
import { ActionButtons } from "@/shared/components/ActionButtons";
import { DiscoverCardProps } from '@/features/discover/types/components';


const STYLES = {
  // Contenedor principal
  containerBase: "relative aspect-[2/3] group rounded-2xl overflow-hidden",
  
  // Imagen
  image: "object-cover",
  
  // Overlay con gradiente
  overlay: "absolute inset-0 bg-gradient-to-t from-pixela-dark via-pixela-dark/70 to-transparent flex flex-col justify-end p-3 sm:p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100",
  
  // Contenido del overlay
  overlayContent: "mb-3 sm:mb-4",
  
  // Título
  title: "text-pixela-light font-bold text-lg sm:text-xl mb-2 font-outfit",
  
  // Contenedor de información
  infoContainer: "flex items-center gap-2 sm:gap-3 mb-3",
  
  // Calificación
  rating: {
    container: "flex items-center",
    icon: "text-yellow-400 mr-1",
    value: "text-pixela-light font-semibold text-sm"
  },
  
  // Año
  year: "text-pixela-light/80 text-sm",
  
  // Badge
  badge: "text-pixela-light/90 bg-pixela-dark/60 px-2 py-0.5 rounded-sm text-xs",
  
  // Efecto de ruido
  noiseEffect: "noise-effect opacity-5"
} as const;

const HIGH_RATING_THRESHOLD = 8.0;

/**
 * Type guard para determinar si el contenido es una serie
 */
const isTrendingSerie = (media: MediaContent): media is TrendingSerie => {
  return 'first_air_date' in media;
};

/**
 * Componente que renderiza el contenido superpuesto al hacer hover
 */
const OverlayContent = ({ media, type, onFollowClick, onReviewsClick }: {
  media: MediaContent;
  type: MediaType;
  onFollowClick: () => void;
  onReviewsClick: () => void;
}) => {
  const releaseYear = isTrendingSerie(media)
    ? media.first_air_date?.split('-')[0]
    : media.release_date?.split('-')[0];

  return (
    <div className={STYLES.overlay}>
      <div className={STYLES.overlayContent}>
        <h3 className={STYLES.title}>
          {media.title}
        </h3>
        
        <div className={STYLES.infoContainer}>
          <div className={STYLES.rating.container}>
            <FaStar className={STYLES.rating.icon} />
            <span className={STYLES.rating.value}>
              {media.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>
          
          {releaseYear && (
            <span className={STYLES.year}>
              {releaseYear}
            </span>
          )}
          
          <span className={STYLES.badge}>
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
        infoLabel="Más información"
        followLabel="Favoritos"
        reviewsLabel="Reseñas"
      />
    </div>
  );
};

/**
 * Componente que muestra una tarjeta de contenido multimedia (serie o película)
 */
export const DiscoverCard = ({ media, type, index, isMobile }: DiscoverCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  
  const imagePath = type === 'series' 
    ? media.poster_path || media.backdrop_path
    : media.backdrop_path || media.poster_path;
  
  const isHighRated = (media.vote_average ?? 0) >= HIGH_RATING_THRESHOLD;

  const containerClasses = clsx(
    STYLES.containerBase,
    isMobile ? "w-full" : "w-[200px]"
  );

  const handleFollowClick = () => {
    console.log("Seguir", type === 'series' ? 'serie' : 'película', media.title);
  };

  const handleReviewsClick = () => {
    const route = type === 'series' ? `/series/${media.id}` : `/movies/${media.id}`;
    router.prefetch(route);
    router.push(route);
  };

  return (
    <div 
      className={containerClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${imagePath}`}
        alt={media.title}
        fill
        className={STYLES.image}
        sizes={isMobile ? "(max-width: 768px) 50vw, 200px" : "200px"}
        quality={90}
        priority={index < 4}
        loading={index < 4 ? "eager" : "lazy"}
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
  );
}; 
'use client';

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MediaContent, MediaType } from "../type";
import { TrendingSerie } from "@/features/trending/type";
import clsx from "clsx";

interface DiscoverCardProps {
  media: MediaContent;
  type: MediaType;
  index: number;
  isMobile?: boolean;
}

const STYLES = {
  containerBase: "relative aspect-[2/3] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pixela-accent/20 group rounded-2xl overflow-hidden",
  image: "object-cover",
  overlay: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-2 sm:p-3 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-sm",
  title: "text-white font-bold text-base sm:text-lg font-outfit line-clamp-1 mb-1 sm:mb-2",
  ratingContainer: "flex items-center bg-black/30 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full",
  ratingIcon: "text-yellow-400 mr-1 w-3 h-3 sm:w-auto sm:h-auto",
  ratingText: "text-white font-semibold text-xs sm:text-sm",
  yearContainer: "text-white/80 bg-black/30 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs sm:text-sm",
  overview: "text-white/90 text-[10px] sm:text-xs md:text-sm line-clamp-2",
  glowEffect: "absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-pixela-accent/20 to-transparent"
} as const;

/**
 * Type guard para determinar si el contenido es una serie
 */
const isTrendingSerie = (media: MediaContent): media is TrendingSerie => {
  return 'first_air_date' in media;
};

/**
 * Componente que muestra una tarjeta de contenido multimedia (serie o película)
 */
export const DiscoverCard = ({ media, type, index, isMobile }: DiscoverCardProps) => {
  const imagePath = type === 'series' 
    ? media.poster_path || media.backdrop_path
    : media.backdrop_path || media.poster_path;
  
  const releaseYear = isTrendingSerie(media)
    ? media.first_air_date?.split('-')[0]
    : media.release_date?.split('-')[0];

  const containerClasses = clsx(
    STYLES.containerBase,
    isMobile ? "w-full" : "w-[200px]"
  );

  return (
    <div className={containerClasses}>
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
      
      <div className={STYLES.overlay}>
        <h3 className={STYLES.title}>
          {media.title}
        </h3>
        
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <div className={STYLES.ratingContainer}>
            <FaStar className={STYLES.ratingIcon} />
            <span className={STYLES.ratingText}>
              {media.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>
          
          <span className={STYLES.yearContainer}>
            {releaseYear}
          </span>
        </div>

        <p className={STYLES.overview}>
          {media.overview}
        </p>
      </div>

      <div className={STYLES.glowEffect} />
    </div>
  );
}; 
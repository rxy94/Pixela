"use client";

import { Media } from '../../types';
import { BackdropImage } from './backdrop/BackdropImage';
import { MediaPoster } from './poster/MediaPoster';
import { MediaTitle } from './title/MediaTitle';
import { GenresList } from './genres/GenresList';
import { MediaMetadata } from './metadata/MediaMetadata';
import { CreatorInfo } from './creators/CreatorInfo';
import { ActionButtons } from './actions/ActionButtons';

interface HeroSectionProps {
  media: Media;
  onPosterClick: () => void;
  title: string;
  refreshReviews?: () => void;
}

export function HeroSection({ media, onPosterClick, title, refreshReviews }: HeroSectionProps) {
  // Mapeo exacto de tipo
  const getItemType = (tipo: 'pelicula' | 'serie'): 'movie' | 'series' =>
    tipo === 'pelicula' ? 'movie' : 'series';

  return (
    <div className="relative min-h-[80vh] w-full">
      {/* Backdrop con degradado */}
      <BackdropImage backdropUrl={media.backdrop} />
      
      {/* Content */}
      <div className="relative container mx-auto px-4">
        {/* Mobile Layout */}
        <div className="lg:hidden pt-36 md:pt-44 pb-8">
          <div className="flex flex-col items-center gap-6">
            <MediaPoster 
              posterUrl={media.poster} 
              title={media.titulo} 
              onClick={onPosterClick}
              className="w-48" 
            />
            <div className="w-full">
              <MediaTitle title={media.titulo} score={media.puntuacion} />
              <GenresList genres={media.generos} />
              <MediaMetadata media={media} />
              <CreatorInfo media={media} />
              
              <p className="text-gray-300 text-base leading-relaxed mt-4 mb-6">
                {media.sinopsis}
              </p>

              <ActionButtons 
                tmdbId={Number(media.id)} 
                itemType={getItemType(media.tipo)}
                title={title}
                refreshReviews={refreshReviews}
              />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex h-[80vh] items-end pb-20">
          <div className="flex flex-row gap-8">
            <MediaPoster 
              posterUrl={media.poster} 
              title={media.titulo} 
              onClick={onPosterClick} 
            />
            
            <div className="flex-grow">
              <MediaTitle title={media.titulo} score={media.puntuacion} />
              <GenresList genres={media.generos} />
              <MediaMetadata media={media} />
              <CreatorInfo media={media} />
              
              <p className="text-gray-300 text-lg max-w-3xl leading-relaxed mb-8">
                {media.sinopsis}
              </p>

              <ActionButtons 
                tmdbId={Number(media.id)} 
                itemType={getItemType(media.tipo)}
                title={title}
                refreshReviews={refreshReviews}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
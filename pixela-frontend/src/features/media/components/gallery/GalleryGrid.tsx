"use client";

import { Wallpaper } from '../../types/gallery';
import Image from 'next/image';
import { useState } from 'react';

interface GalleryGridProps {
  images: Wallpaper[];
  type: 'backdrops' | 'posters';
  onImageClick: (image: Wallpaper) => void;
  showAll?: boolean;
}

const STYLES = {
  emptyContainer: "py-6 flex justify-center",
  emptyMessage: "text-gray-400",
  gridBackdrops: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  gridPosters: "grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  imageContainer: "group relative cursor-pointer overflow-hidden rounded-lg",
  imageWrapperBackdrops: "relative w-full aspect-video",
  imageWrapperPosters: "relative w-full aspect-[2/3]",
  image: "object-cover transition-transform duration-300 group-hover:scale-105",
  overlay: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
  overlayText: "text-white text-sm font-medium"
} as const;

export function GalleryGrid({ images, type, onImageClick, showAll = false }: GalleryGridProps) { 
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (imagePath: string) => {
    setImageErrors(prev => ({
      ...prev,
      [imagePath]: true
    }));
  };

  if (images.length === 0) {
    return (
      <div className={STYLES.emptyContainer}>
        <p className={STYLES.emptyMessage}>No hay imágenes disponibles</p>
      </div>
    );
  }

  // Mostrar solo las primeras 4 si no está expandido
  const imagesToShow = showAll ? images : images.slice(0, 6);

  const gridClasses = type === 'backdrops' ? STYLES.gridBackdrops : STYLES.gridPosters;

  return (
    <div className={gridClasses}>
      {imagesToShow.map((image, index) => {
        // Saltar imágenes que fallaron al cargar
        if (imageErrors[image.file_path]) {
          return null;
        }

        const imageWrapperClasses = type === 'backdrops' 
          ? STYLES.imageWrapperBackdrops 
          : STYLES.imageWrapperPosters;

        return (
          <div 
            key={image.file_path || index}
            className={STYLES.imageContainer}
            onClick={() => onImageClick(image)}
          >
            <div className={imageWrapperClasses}>
              <Image
                src={image.file_path}
                alt={`${type === 'backdrops' ? 'Backdrop' : 'Poster'} ${index + 1}`}
                fill
                sizes={type === 'backdrops' 
                  ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                  : "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"}
                className={STYLES.image}
                onError={() => handleImageError(image.file_path)}
              />
              <div className={STYLES.overlay}>
                <span className={STYLES.overlayText}>Ver</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 
"use client";
import { useMemo } from "react";
import { ImageCarousel, NavigationControls, ProgressIndicator, ContentSection } from "@/features/hero/components";
import { useHeroStore } from "@/features/hero/store/heroStore";
import { HeroSectionProps } from "@/features/hero/types/content";
import { useCarouselAutoPlay } from "@/features/hero/hooks/useCarouselAutoPlay";
import { useProgressBar } from "@/features/hero/hooks/useProgressBar";

const STYLES = {
  hero: {
    base: "relative w-full min-h-[80vh] sm:min-h-[85vh] md:min-h-screen lg:h-screen overflow-hidden px-4 sm:px-6 md:px-8 lg:px-0",
    ipadFix: "sm:[min-height:1180px]:min-h-screen sm:[min-width:820px]:min-h-screen"
  }
} as const;

/**
 * Componente principal que muestra la sección hero de la página
 * Incluye carrusel de imágenes, controles de navegación y contenido principal
 */
export const HeroSection = ({
  title,
  accentTitle,
  description,
  secondaryButtonText,
  images = []
}: HeroSectionProps) => {
  const imagesLength = useMemo(() => images.length, [images]);
  const { currentImageIndex } = useHeroStore();
  
  useCarouselAutoPlay(imagesLength);
  useProgressBar();
  
  return (
    <div className={`${STYLES.hero.base} ${STYLES.hero.ipadFix}`}>
      <ImageCarousel images={images} />
      <NavigationControls imagesLength={imagesLength}/>
      <ProgressIndicator images={images}/>
  
      <ContentSection 
        title={title} 
        accentTitle={accentTitle}
        description={description}
        secondaryButtonText={secondaryButtonText}
        images={images}
        currentImageIndex={currentImageIndex}
      />
    </div>
  );
}; 
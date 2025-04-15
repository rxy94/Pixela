"use client";

import { useEffect, useState } from "react";
import { 
  ImageCarousel, 
  NavigationControls, 
  ProgressIndicator,
  ContentSection
} from "./HeroSection/components";

interface HeroSectionProps {
  title: string;
  accentTitle: string;
  description: string;
  secondaryButtonText: string;
  images?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export const HeroSection = ({
  title,
  accentTitle,
  description,
  secondaryButtonText,
  images = [],
  ctaText = "",
  ctaLink = ""
}: HeroSectionProps) => {
  // Estado para controlar la imagen actual
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Función para ir a la imagen anterior
  const prevImage = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setFadeIn(true);
      setProgress(0);
    }, 300);
  };

  // Función para ir a la imagen siguiente
  const nextImage = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFadeIn(true);
      setProgress(0);
    }, 300);
  };

  // Función para cambiar a una diapositiva específica
  const handleSlideChange = (index: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setFadeIn(true);
      setProgress(0);
    }, 300);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    
    if (isPlaying) {
      // Intervalo para la presentación de diapositivas
      interval = setInterval(() => {
        nextImage();
      }, 5000);
      
      // Intervalo para la barra de progreso
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 0.5; // Aumenta 0.5% cada 25ms (5000ms ÷ 0.5% = 25ms)
        });
      }, 25);
    }
    
    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isPlaying, images.length]);
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Componente de carrusel de imágenes */}
      <ImageCarousel 
        images={images} 
        currentImageIndex={currentImageIndex} 
        fadeIn={fadeIn} 
      />
      
      {/* Componente de controles de navegación */}
      <NavigationControls 
        prevImage={prevImage} 
        nextImage={nextImage} 
      />
      
      {/* Componente de indicador de progreso */}
      <ProgressIndicator 
        progress={progress} 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        images={images}
        currentImageIndex={currentImageIndex}
        onSlideChange={handleSlideChange}
      />
      
      {/* Componente de contenido */}
      <ContentSection 
        title={title} 
        accentTitle={accentTitle}
        description={description}
        secondaryButtonText={secondaryButtonText}
        ctaText={ctaText}
        ctaLink={ctaLink}
      />
    </div>
  );
}; 
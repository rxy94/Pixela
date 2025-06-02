"use client";

import { Actor } from '../../types';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useState, useEffect } from 'react';
import clsx from 'clsx';
import { ActorCard } from './ActorCard';
import { ActorSliderControls } from './ActorSliderControls';

interface CastSectionProps {
  actors: Actor[];
}

export function CastSection({ actors }: CastSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });
  
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Móvil: < 768px
      setIsTablet(width >= 768 && width < 1024); // Tablet: 768px - 1024px
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  useEffect(() => {
    if (!emblaApi || (!isMobile && !isTablet && actors.length <= 6)) return;
    
    const onPointerDown = () => setIsDragging(true);
    const onPointerUp = () => setIsDragging(false);
    
    emblaApi.on('pointerDown', onPointerDown);
    emblaApi.on('pointerUp', onPointerUp);
    
    return () => {
      emblaApi.off('pointerDown', onPointerDown);
      emblaApi.off('pointerUp', onPointerUp);
    };
  }, [emblaApi, isMobile, isTablet, actors.length]);
  
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  
  if (!actors || actors.length === 0) return null;
  
  // Usar grid solo en desktop (>= 1024px) cuando hay 6 o menos actores
  const useGrid = !isMobile && !isTablet && actors.length <= 6;
  
  return (
    <div className="mb-12 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="pt-4">
          <h2 className="text-2xl font-bold text-white">Reparto Principal</h2>
          <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-pixela-dark/60 text-gray-400">{actors.length} {actors.length === 1 ? 'actor' : 'actores'}</span>
        </div>
        
        {!useGrid && <ActorSliderControls onPrevClick={scrollPrev} onNextClick={scrollNext} />}
      </div>
      
      {useGrid ? (
        // Cuadrícula solo en desktop cuando hay pocos actores
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {actors.map(actor => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>
      ) : (
        // Slider en móvil, tablet, y desktop con muchos actores
        <div className="relative">
          <div 
            className={clsx(
              "overflow-hidden w-full cursor-grab",
              { "cursor-grabbing": isDragging }
            )}
            ref={emblaRef}
          >
            <div className="flex -mx-2">
              {actors.map(actor => (
                <ActorCard 
                  key={actor.id} 
                  actor={actor} 
                  className="flex-none w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] mx-2" 
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
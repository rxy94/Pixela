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
  const [isDragging, setIsDragging] = useState(false);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px es el breakpoint md de Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (!emblaApi || (!isMobile && actors.length <= 6)) return;
    
    const onPointerDown = () => setIsDragging(true);
    const onPointerUp = () => setIsDragging(false);
    
    emblaApi.on('pointerDown', onPointerDown);
    emblaApi.on('pointerUp', onPointerUp);
    
    return () => {
      emblaApi.off('pointerDown', onPointerDown);
      emblaApi.off('pointerUp', onPointerUp);
    };
  }, [emblaApi, isMobile, actors.length]);
  
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  
  if (!actors || actors.length === 0) return null;
  
  const useGrid = !isMobile && actors.length <= 6;
  
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
        // Cuadrícula cuando hay pocos actores
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {actors.map(actor => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>
      ) : (
        // Slider cuando hay muchos actores
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
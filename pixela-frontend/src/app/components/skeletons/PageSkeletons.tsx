'use client';

/**
 * Componentes de skeleton para la página principal
 * Mantiene la estética y colores de Pixela durante las cargas
 * 
 * @author Pixela
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';

/**
 * Componente de loading optimizado para el hero con mensaje de bienvenida
 */
export const HeroSectionSkeleton = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 500); // Mostrar bienvenida por 1.5 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-pixela-dark">
      {/* Fondo con gradiente Pixela */}
      <div className="absolute inset-0 bg-pixela-dark">
        {/* Efectos de fondo animados */}
        <div className="absolute w-64 h-64 rounded-full top-1/4 left-1/4 bg-pixela-accent/5 blur-3xl animate-pulse"></div>
        <div className="absolute rounded-full bottom-1/4 right-1/3 w-96 h-96 bg-pink-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Mensaje de bienvenida */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
          showWelcome ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="space-y-4 text-center">
            <div className="relative">
              <h1 className="text-4xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-pixela-accent via-pink-400 to-pixela-accent bg-clip-text animate-shimmer">
                Bienvenido a Pixela
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-pixela-accent/20 via-pink-400/20 to-pixela-accent/20 blur-xl animate-pulse"></div>
            </div>
            <p className="text-lg text-pixela-light/70 md:text-xl animate-pulse">
              Cargando tu experiencia cinematográfica...
            </p>
            
            {/* Indicador de carga animado */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-3 h-3 rounded-full bg-pixela-accent animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton del hero (aparece después del mensaje de bienvenida) */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          showWelcome ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}>
          <div className="flex items-center justify-center h-full px-4">
            <div className="w-full max-w-4xl space-y-6 text-center">
              {/* Título principal skeleton */}
              <div className="space-y-4">
                <div className="h-16 max-w-2xl mx-auto bg-gradient-to-r from-pixela-accent/20 via-pink-400/20 to-pixela-accent/20 rounded-xl animate-shimmer"></div>
                <div className="h-12 max-w-xl mx-auto rounded-lg bg-gradient-to-r from-pixela-accent/15 via-pink-400/15 to-pixela-accent/15 animate-shimmer" style={{ animationDelay: '0.2s' }}></div>
              </div>
              
              {/* Descripción skeleton */}
              <div className="max-w-2xl mx-auto space-y-3">
                <div className="h-4 rounded bg-pixela-light/10 animate-pulse"></div>
                <div className="w-3/4 h-4 mx-auto rounded bg-pixela-light/10 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1/2 h-4 mx-auto rounded bg-pixela-light/10 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
              
              {/* Botones skeleton */}
              <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
                <div className="w-48 h-12 rounded-full bg-gradient-to-r from-pixela-accent/30 to-pink-400/30 animate-pulse"></div>
                <div className="w-40 h-12 border-2 rounded-full border-pixela-accent/20 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Indicador de navegación skeleton */}
          <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-pixela-accent/30 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    
      {/* Overlay con patrón de ruido sutil */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-effect"></div>
    </div>
  );
};

/**
 * Componente de loading para secciones secundarias con diseño Pixela
 */
export const SectionSkeleton = () => (
  <div className="relative w-full py-16 overflow-hidden bg-pixela-dark">
    {/* Efectos de fondo sutiles */}
    <div className="absolute top-0 w-32 h-32 rounded-full left-1/4 bg-pixela-accent/3 blur-2xl"></div>
    <div className="absolute bottom-0 w-40 h-40 rounded-full right-1/4 bg-pink-500/3 blur-2xl"></div>
    
    <div className="container relative z-10 px-4 mx-auto">
      <div className="space-y-8">
        {/* Título de sección skeleton */}
        <div className="space-y-4 text-center">
          <div className="h-10 max-w-md mx-auto rounded-lg bg-gradient-to-r from-pixela-accent/15 via-pink-400/15 to-pixela-accent/15 animate-shimmer"></div>
          <div className="h-4 max-w-lg mx-auto rounded bg-pixela-light/8 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Toggle/Botones skeleton */}
        <div className="flex justify-center">
          <div className="flex p-1 space-x-2 border rounded-full bg-pixela-dark/40 border-pixela-accent/10">
            <div className="w-24 h-10 rounded-full bg-pixela-accent/20 animate-pulse"></div>
            <div className="h-10 rounded-full w-28 bg-pixela-light/5 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          </div>
        </div>
        
        {/* Grid de contenido skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative group">
              {/* Card skeleton */}
              <div className="overflow-hidden transition-all duration-300 border bg-gray-900/40 backdrop-blur-sm rounded-xl border-pixela-accent/5 hover:border-pixela-accent/20">
                {/* Imagen skeleton */}
                <div className="aspect-[3/4] bg-gradient-to-br from-pixela-accent/10 via-pink-400/10 to-pixela-accent/10 animate-shimmer relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                {/* Contenido skeleton */}
                <div className="p-4 space-y-3">
                  <div className="h-5 rounded bg-pixela-light/10 animate-pulse"></div>
                  <div className="w-2/3 h-3 rounded bg-pixela-light/8 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="w-16 h-3 rounded bg-pixela-accent/20 animate-pulse"></div>
                    <div className="w-12 h-3 rounded bg-pixela-light/8 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Efecto hover skeleton */}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-t from-pixela-accent/5 to-transparent group-hover:opacity-100 rounded-xl"></div>
            </div>
          ))}
        </div>
        
        {/* Quote section skeleton */}
        <div className="pt-8 space-y-4 text-center">
          <div className="w-16 h-1 mx-auto rounded bg-pixela-accent/30 animate-pulse"></div>
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="h-4 rounded bg-pixela-light/8 animate-pulse"></div>
            <div className="w-3/4 h-4 mx-auto rounded bg-pixela-light/8 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          </div>
          <div className="w-32 h-3 mx-auto rounded bg-pixela-accent/15 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
); 
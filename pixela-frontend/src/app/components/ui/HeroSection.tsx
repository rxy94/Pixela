"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiPlay, FiPause } from "react-icons/fi";
import clsx from 'clsx';

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
  ctaText = "Comenzar ahora",
  ctaLink = "/signup"
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
      {/* Imagen de fondo con transición suave */}
      <div className="absolute inset-0 w-full h-full">
        {/* Imagen hero en blanco y negro */}
        <div 
          className={clsx(
            "absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out", 
            fadeIn ? "opacity-100" : "opacity-0"
          )}
        >
          <Image 
            src={images[currentImageIndex]} 
            alt="Hero Pixela" 
            className="w-full h-full object-cover brightness-90 contrast-100 grayscale"
            width={1920}
            height={1080}
            priority
          />
        </div>
        
        {/* Capas para efecto visual */}
        <div className="absolute inset-0 bg-pixela-dark/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-pixela-accent/15 via-pixela-dark/70 to-pixela-dark/90"></div>
        {/* Degradado superior para navbar */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-pixela-dark via-pixela-dark/70 to-transparent"></div>
        {/* Degradado inferior para reforzar el efecto accent desde abajo (más sutil) */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-pixela-accent/10 to-transparent"></div>
        {/* Capa de ruido */}
        <div className="noise-effect"></div>
      </div>
      
      {/* Controles de navegación de imágenes en los laterales */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <button 
          onClick={prevImage}
          className="p-2 rounded-full bg-pixela-dark/40 backdrop-blur-sm text-pixela-light hover:text-pixela-accent hover:bg-pixela-dark/60 transition-all duration-300"
          aria-label="Imagen anterior"
        >
          <FiChevronLeft className="h-8 w-8" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <button 
          onClick={nextImage}
          className="p-2 rounded-full bg-pixela-dark/40 backdrop-blur-sm text-pixela-light hover:text-pixela-accent hover:bg-pixela-dark/60 transition-all duration-300"
          aria-label="Imagen siguiente"
        >
          <FiChevronRight className="h-8 w-8" />
        </button>
      </div>
      
      {/* Controles de navegación y progreso en la parte inferior */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xl">
        <div className="flex flex-col items-center gap-4">
          {/* Barra de progreso */}
          <div className="w-full h-1 bg-pixela-light/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-pixela-accent" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between w-full">
            {/* Control de reproducción */}
            <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="p-2 rounded-full bg-pixela-dark/40 backdrop-blur-sm text-pixela-light hover:text-pixela-accent hover:bg-pixela-dark/60 transition-all duration-300"
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? <FiPause className="h-4 w-4" /> : <FiPlay className="h-4 w-4" />}
            </button>
            
            {/* Indicador de slides (pequeños puntos) */}
            <div className="flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFadeIn(false);
                    setTimeout(() => {
                      setCurrentImageIndex(index);
                      setFadeIn(true);
                      setProgress(0);
                    }, 300);
                  }}
                  className={clsx(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentImageIndex ? "bg-pixela-accent w-6" : "bg-pixela-light/50 w-2 hover:bg-pixela-light/70"
                  )}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Contador de imágenes */}
            <div className="text-pixela-light/70 text-sm font-medium">
              {currentImageIndex + 1}/{images.length}
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido hero limpio y minimalista */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="max-w-[83.333%] mx-auto pb-36">
          {/* Línea de acento superior */}
          <div className="w-24 h-1 bg-pixela-accent mb-8"></div>
          
          {/* Título grande y audaz */}
          <h1 className="text-7xl font-bold text-pixela-light mb-6 tracking-tight leading-[1.1]">
            {title}<br />
            <span className="text-pixela-accent">{accentTitle}</span>
          </h1>
          
          {/* Descripción */}
          <p className="text-xl text-pixela-light/80 max-w-lg mb-12">
            {description}
          </p>
          
          {/* Botones - Diseño mejorado */}
          <div className="flex items-center gap-8">
            {/* Botón primario CTA */}
            <Link 
              href={ctaLink}
              className="bg-pixela-accent hover:bg-pixela-accent/90 text-pixela-dark font-medium py-3 px-8 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,84,84,0.5)] transform hover:translate-y-[-2px]"
            >
              {ctaText}
            </Link>
            
            {/* Botón secundario con icono al lado */}
            <Link 
              href="#features"
              className="group flex items-center transition-all duration-300"
            >
              <span className="font-medium text-pixela-light group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.7)] transition-all duration-300 mr-2">
                {secondaryButtonText}
              </span>
              <FiChevronDown className="h-6 w-6 animate-bounce text-pixela-light group-hover:text-pixela-accent opacity-80 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 
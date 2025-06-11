'use client';


/**
 * Componente de loading optimizado para el hero con mensaje de bienvenida
 */
export const HeroSectionSkeleton = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-pixela-dark">
      {/* Fondo con gradiente Pixela */}
      <div className="absolute inset-0 bg-pixela-dark">
        {/* Efectos de fondo animados */}
        <div className="absolute w-64 h-64 rounded-full top-1/4 left-1/4 bg-pixela-accent/5 blur-3xl animate-pulse"></div>
        <div className="absolute rounded-full bottom-1/4 right-1/3 w-96 h-96 bg-pink-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Mensaje de bienvenida siempre visible */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-6 text-center">
            <div className="relative">
              <h1 className="text-6xl font-black tracking-tight text-transparent md:text-8xl lg:text-9xl font-outfit bg-gradient-to-r from-pixela-accent via-pink-400 to-pixela-accent bg-clip-text animate-shimmer">
                BIENVENIDO A PIXELA
              </h1>
              <div className="absolute -inset-6 bg-gradient-to-r from-pixela-accent/20 via-pink-400/20 to-pixela-accent/20 blur-xl animate-pulse"></div>
            </div>
            <p className="text-xl font-light text-pixela-light/70 md:text-2xl font-outfit">
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
      </div>
    
      {/* Overlay con patrón de ruido sutil */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-effect"></div>
    </div>
  );
};

/**
 * Skeleton para la sección de trending que replica la estructura real
 */
export const TrendingSectionSkeleton = () => (
  <div className="relative flex flex-col w-full min-h-screen pt-8 bg-pixela-dark md:pt-20">
    {/* Efectos de fondo sutiles */}
    <div className="absolute top-0 w-32 h-32 rounded-full left-1/4 bg-pixela-accent/3 blur-2xl"></div>
    <div className="absolute bottom-0 w-40 h-40 rounded-full right-1/4 bg-pink-500/3 blur-2xl"></div>
    
    <div className="relative z-10 flex flex-col justify-center flex-grow pb-16 md:justify-start md:pb-0">
      <div className="relative w-full bg-pixela-dark flex flex-col justify-center overflow-hidden items-stretch gap-8 px-4 py-12 lg:w-[85%] xl:w-[80%] lg:mx-auto lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:px-0 lg:py-0">
        
        {/* Título TENDENCIAS skeleton con misma estética del hero */}
        <div className="mb-8 lg:mb-0">
          <h2 className="w-full font-black leading-none tracking-wider text-left uppercase font-outfit md:w-auto">
            <span className="block sm:hidden text-[64px] leading-[0.95] text-transparent bg-gradient-to-r from-pixela-accent via-pink-400 to-pixela-accent bg-clip-text animate-shimmer pl-4">
              TEN-<br/>DENCIAS
            </span>
            <span className="hidden sm:block text-[64px] md:text-[96px] lg:text-[128px] text-transparent bg-gradient-to-r from-pixela-accent via-pink-400 to-pixela-accent bg-clip-text animate-shimmer pl-4 sm:pl-0">
              TENDENCIAS
            </span>
          </h2>
        </div>
        
        {/* Toggle skeleton que replica el real */}
        <div className="px-4 mb-12 md:mb-10 md:px-0">
          <div className="relative flex w-full p-1 border rounded-full shadow-lg bg-white/5 backdrop-blur-sm border-white/10 shadow-black/20 sm:w-auto">
            <div className="h-12 px-8 rounded-full bg-pixela-accent/25 animate-pulse">
              <div className="w-12 h-4 mt-4 rounded bg-white/20 animate-pulse"></div>
            </div>
            <div className="h-12 px-8 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-4 mt-4 rounded bg-white/10 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carrusel skeleton que replica las dimensiones reales */}
      <div className="mx-0 overflow-hidden trending-carousel">
        <div className="flex gap-0 px-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative w-[280px] min-w-[280px] max-w-[280px] md:w-[375px] md:min-w-[375px] md:max-w-[375px] flex-none mr-4">
              <div className="w-full h-[395px] md:h-[528px] bg-gradient-to-br from-pixela-accent/10 via-pixela-dark/40 to-pink-400/10 animate-shimmer rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark/80 to-transparent"></div>
                
                {/* Contenido interno de la card */}
                <div className="absolute space-y-2 bottom-4 left-4 right-4">
                  <div className="h-5 rounded bg-white/20 animate-pulse"></div>
                  <div className="w-2/3 h-3 rounded bg-white/15 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  <div className="flex gap-2 mt-2">
                    <div className="w-12 h-3 rounded bg-pixela-accent/30 animate-pulse"></div>
                    <div className="w-8 h-3 rounded bg-white/10 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quote section skeleton */}
      <div className="px-4 pt-16 space-y-6 text-center">
        <div className="w-16 h-1 mx-auto rounded bg-pixela-accent/30 animate-pulse"></div>
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="h-5 rounded bg-pixela-light/15 animate-pulse"></div>
          <div className="w-4/5 h-5 mx-auto rounded bg-pixela-light/15 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2/3 h-5 mx-auto rounded bg-pixela-light/15 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <div className="w-40 h-4 mx-auto rounded bg-pixela-accent/20 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      </div>
    </div>
  </div>
);

/**
 * Componente de loading para secciones secundarias (mantenemos para compatibilidad)
 */
export const SectionSkeleton = () => <TrendingSectionSkeleton />; 
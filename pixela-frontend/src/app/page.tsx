import { Suspense } from 'react';
import { getHeroData } from "@/features/hero/services/heroContentService";
import { HeroSection } from "@/features/hero/components";
import { TrendingSection } from "@/features/trending/components";
import { DiscoverSection } from "@/features/discover/components";
import { getTrendingSeries, getTrendingMovies } from "@/features/trending/services/trendingService";
import { getDiscoveredSeries, getDiscoveredMovies } from "@/features/discover/service/discover";
import AboutSection from "@/features/about/components/AboutSection";
import { getRandomQuote } from "@/features/quotes/service";
import { HeroSectionSkeleton, SectionSkeleton } from "./components/skeletons/PageSkeletons";

export const dynamic = 'force-dynamic';

const STYLES = {
  main: "flex-grow 2k:max-w-[100vw] 2k:mx-auto",
  section: "scroll-mt-24 2k:scroll-mt-16"
} as const;


/** 
 * Componente async para hero (crítico)
 * @returns {JSX.Element} HeroSection
 */
async function HeroSectionAsync() {
  const heroData = await getHeroData();
  return <HeroSection {...heroData} />;
}

/**
 * Componente async para trending (no crítico)
 * @returns {JSX.Element} TrendingSection
 */
async function TrendingSectionAsync() {
  const [trendingSeries, trendingMovies] = await Promise.all([
    getTrendingSeries(15),
    getTrendingMovies(15)
  ]);
  const randomQuote = getRandomQuote();
  
  return <TrendingSection series={trendingSeries} movies={trendingMovies} quote={randomQuote} />;
}


/**
 * Componente async para discover (no crítico)
 * @returns {JSX.Element} DiscoverSection
 */
async function DiscoverSectionAsync() {
  const [discoveredSeries, discoveredMovies] = await Promise.all([
    getDiscoveredSeries(),
    getDiscoveredMovies()
  ]);
  
  return <DiscoverSection series={discoveredSeries} movies={discoveredMovies} />;
}

/**
 * Componente principal de la página de inicio optimizado con Suspense boundaries
 * para mejorar el INP y la experiencia de usuario
 * 
 * 
 * @returns {JSX.Element} Página de inicio optimizada
 */
export default function Home() {
  return (
    <main className={STYLES.main}>

      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSectionAsync />
      </Suspense>
      
      <div id="trending" className={STYLES.section}>
        <Suspense fallback={<SectionSkeleton />}>
          <TrendingSectionAsync />
        </Suspense>
      </div>
      
      <div id="discover" className={STYLES.section}>
        <Suspense fallback={<SectionSkeleton />}>
          <DiscoverSectionAsync />
        </Suspense>
      </div>
      
      <div id="about" className={STYLES.section}>
        <AboutSection />
      </div>
    </main>
  );
}

import { Suspense } from 'react';
import { getHeroData } from "@/features/hero/services/heroContentService";
import { HeroSection } from "@/features/hero/components";
import { TrendingSection } from "@/features/trending/components";
import { DiscoverSection } from "@/features/discover/components";
import { getTrendingSeries, getTrendingMovies } from "@/features/trending/services/trendingService";
import { getDiscoveredSeries, getDiscoveredMovies } from "@/features/discover/service/discover";
import AboutSection from "@/features/about/components/AboutSection";
import { getRandomQuote } from "@/features/quotes/service";
import { HeroSectionSkeleton } from "./components/skeletons/PageSkeletons";

export const dynamic = 'force-dynamic';

const STYLES = {
  main: "flex-grow 2k:max-w-[100vw] 2k:mx-auto",
  section: "scroll-mt-24 2k:scroll-mt-16"
} as const;


/**
 * Componente async que maneja toda la página como una unidad
 */
async function HomePageContent() {
  // Ejecutar todo en paralelo pero manejar como una sola unidad
  const [heroData, [trendingSeries, trendingMovies], [discoveredSeries, discoveredMovies]] = await Promise.all([
    getHeroData(),
    Promise.all([getTrendingSeries(15), getTrendingMovies(15)]),
    Promise.all([getDiscoveredSeries(), getDiscoveredMovies()])
  ]);
  
  const randomQuote = getRandomQuote();

  return (
    <>
      <HeroSection {...heroData} />
      
      <div id="trending" className={STYLES.section}>
        <TrendingSection series={trendingSeries} movies={trendingMovies} quote={randomQuote} />
      </div>
      
      <div id="discover" className={STYLES.section}>
        <DiscoverSection series={discoveredSeries} movies={discoveredMovies} />
      </div>
      
      <div id="about" className={STYLES.section}>
        <AboutSection />
      </div>
    </>
  );
}

/**
 * Skeleton de página completa que muestra solo la pantalla inicial
 */
const FullPageSkeleton = () => (
  <HeroSectionSkeleton />
);

/**
 * Componente principal de la página de inicio optimizado
 * @returns {JSX.Element} Página de inicio optimizada
 */
export default function Home() {
  return (
    <main className={STYLES.main}>
      <Suspense fallback={<FullPageSkeleton />}>
        <HomePageContent />
      </Suspense>
    </main>
  );
}

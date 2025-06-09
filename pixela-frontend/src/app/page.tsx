import { getHeroData } from "@/features/hero/services/heroContentService";
import { HeroSection } from "@/features/hero/components";
import { TrendingSection } from "@/features/trending/components";
import { DiscoverSection } from "@/features/discover/components";
import { getTrendingSeries, getTrendingMovies } from "@/features/trending/services/trendingService";
import { getDiscoveredSeries, getDiscoveredMovies } from "@/features/discover/service/discover";
import AboutSection from "@/features/about/components/AboutSection";
import { getRandomQuote } from "@/features/quotes/service";

export const dynamic = 'force-dynamic';

const STYLES = {
  main: "flex-grow 2k:max-w-[100vw] 2k:mx-auto",
  section: "scroll-mt-24 2k:scroll-mt-16"
} as const;

/**
 * Componente principal de la página de inicio que renderiza las diferentes secciones
 * de la aplicación incluyendo el héroe, tendencias, descubrimientos y la sección about.
 * 
 * @async
 * @returns {Promise<JSX.Element>} Componente de la página de inicio con todas sus secciones
 */
export default async function Home() {
  const [heroData, trendingSeries, trendingMovies, discoveredSeries, discoveredMovies] = await Promise.all([
    getHeroData(),
    getTrendingSeries(20),
    getTrendingMovies(20),
    getDiscoveredSeries(),
    getDiscoveredMovies()
  ]);

  const randomQuote = getRandomQuote();


  return (
    <main className={STYLES.main}>
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
    </main>
  );
}

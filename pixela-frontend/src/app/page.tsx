import { getHeroData } from "@/features/hero/content";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { TrendingSection } from "@/features/trending/components/TrendingSection";
import { DiscoverSection } from "@/features/discover/components/DiscoverSection";
import { getTrendingSeries, getTrendingMovies } from "@/features/trending/service";
import { getDiscoveredSeries, getDiscoveredMovies } from "@/features/discover/service";
import AboutSection from "@/features/about/components/AboutSection";

//TODO Página de inicio o layout principal
export default async function Home() {
  const [heroData, trendingSeries, trendingMovies, discoveredSeries, discoveredMovies] = await Promise.all([
    getHeroData(),
    getTrendingSeries(20),
    getTrendingMovies(20),
    getDiscoveredSeries(),
    getDiscoveredMovies()
  ]);

  return (
    <main>
      <HeroSection {...heroData} />
      <div id="trending" className="scroll-mt-24">
        <TrendingSection series={trendingSeries} movies={trendingMovies} />
      </div>
      <div id="discover" className="scroll-mt-24">
        <DiscoverSection series={discoveredSeries} movies={discoveredMovies} />
      </div>
      <div id="about" className="scroll-mt-24">
        <AboutSection />
      </div>
    </main>
  );
}

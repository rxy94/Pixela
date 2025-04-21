import { heroData } from "@/data";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { TrendingSection } from "@/features/trending/components/TrendingSection";
import { getTrendingSeries } from "@/features/trending/service";

//TODO Página de inicio o layout principal
export default async function Home() {
  const trendingSeries = await getTrendingSeries(20);

  return (
    <main>
      <HeroSection {...heroData} />
      <TrendingSection series={trendingSeries} />
    </main>
  );
}

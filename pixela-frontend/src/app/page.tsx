import { heroData } from "@/data";
import { HeroSection } from "@/features/hero/components/HeroSection";

//TODO Página de inicio o layout principal
export default function Home() {
  return (
    <main>
      <HeroSection {...heroData} />
    </main>
  );
}

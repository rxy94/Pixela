import { HeroSection } from "./components/ui/HeroSection";

//TODO Página de inicio o layout principal
export default function Home() {
  return (
    <>
      <div className="w-full">
        <HeroSection 
          title="Explora el universo"
          accentTitle="cinematográfico"
          description="Descubre, colecciona y comparte experiencias audiovisuales en una comunidad de apasionados del cine y las series."
          secondaryButtonText="Descubrir más"
          images={[
            "/source/images/Adolescence.avif", 
            "/source/images/Blackmirror.avif", 
            "/source/images/MovieDestacada_uno.avif", 
            "/source/images/MovieDestacada_dos.avif"
          ]}
        />
      </div>
    </>
  );
}

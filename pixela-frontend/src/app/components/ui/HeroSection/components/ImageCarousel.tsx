import Image from "next/image";
import clsx from 'clsx';

interface ImageCarouselProps {
  images: string[];
  currentImageIndex: number;
  fadeIn: boolean;
}

export const ImageCarousel = ({ images, currentImageIndex, fadeIn }: ImageCarouselProps) => {
  return (
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
  );
}; 
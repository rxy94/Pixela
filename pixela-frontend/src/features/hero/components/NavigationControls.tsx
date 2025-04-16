import { useHeroStore } from "../store";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface NavigationControlsProps {
  imagesLength: number;
}

export const NavigationControls = ({ imagesLength }: NavigationControlsProps) => {

  const { prevImage, nextImage } = useHeroStore();

  return (
    <>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <button 
          onClick={() => prevImage(imagesLength)}
          className="p-2 rounded-full bg-pixela-dark/40 backdrop-blur-sm text-pixela-light hover:text-pixela-accent hover:bg-pixela-dark/60 transition-all duration-300"
          aria-label="Imagen anterior"
        >
          <FiChevronLeft className="h-8 w-8" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <button 
          onClick={() => nextImage(imagesLength)}
          className="p-2 rounded-full bg-pixela-dark/40 backdrop-blur-sm text-pixela-light hover:text-pixela-accent hover:bg-pixela-dark/60 transition-all duration-300"
          aria-label="Imagen siguiente"
        >
          <FiChevronRight className="h-8 w-8" />
        </button>
      </div>
    </>
  );
}; 
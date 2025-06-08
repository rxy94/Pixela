import { create } from "zustand";
import { TrendingSerie, TrendingMovie } from "@/features/trending/types";
import { MediaType } from "@/features/discover/types/media";

/**
 * Interfaz para el estado del descubrimiento
 * @interface DiscoverState
 * @property {TrendingSerie[]} series - Lista de series en tendencia
 * @property {TrendingMovie[]} movies - Lista de películas en tendencia
 * @property {MediaType} activeType - Tipo de medio activo
 * @property {function} setSeries - Función para establecer las series
 * @property {function} setMovies - Función para establecer las películas
 * @property {function} setActiveType - Función para establecer el tipo activo
 */
interface DiscoverState {
    series: TrendingSerie[];
    movies: TrendingMovie[];
    activeType: MediaType;
    setSeries: (series: TrendingSerie[]) => void;
    setMovies: (movies: TrendingMovie[]) => void;
    setActiveType: (type: MediaType) => void;
}

const initialState = {
    series: [],
    movies: [],
    activeType: 'movies' as const,
};

/**
 * Hook para el estado de descubrimiento
 * @function useDiscoverStore - Hook para el estado de descubrimiento
 * @returns {DiscoverState} - El estado de descubrimiento
 */
export const useDiscoverStore = create<DiscoverState>((set) => ({
    ...initialState,
    setSeries: (series) => set({ series }),
    setMovies: (movies) => set({ movies }),
    setActiveType: (type) => set({ activeType: type }),
})); 
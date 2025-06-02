import { create } from 'zustand';
import { CategoriesState } from './type';
import { getCategoriesForMediaType } from '@/api/categories/categories';
import { MediaType } from './types/media';

/**
 * Store para manejar las categorías.
 * 
 * @function
 * @param {CategoriesState} set - Función para actualizar el estado
 * @param {CategoriesState} get - Función para obtener el estado
 * @returns {CategoriesState} - Estado del store
 */
export const useCategoriesStore = create<CategoriesState>((set, get) => ({
    categories: [],
    loading: false,
    error: null,
    selectedMediaType: 'movies' as MediaType,

    fetchCategories: async (mediaType?: MediaType) => {
        set({ loading: true, error: null });
        try {
            const currentMediaType = mediaType || get().selectedMediaType;
            const categories = await getCategoriesForMediaType(currentMediaType);
            set({ categories, loading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Error al cargar las categorías',
                loading: false 
            });
        }
    },

    setSelectedMediaType: (type: MediaType) => {
        set({ selectedMediaType: type });
        get().fetchCategories(type);
    }
})); 
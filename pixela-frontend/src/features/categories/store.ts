import { create } from 'zustand';
import { CategoriesState } from './type';
import { getAllCategories } from '@/api/categories/categories';
import { MediaType } from './types/media';

export const useCategoriesStore = create<CategoriesState>((set) => ({
    categories: [],
    loading: false,
    error: null,
    selectedMediaType: 'movies' as MediaType,

    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const categories = await getAllCategories();
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
    }
})); 
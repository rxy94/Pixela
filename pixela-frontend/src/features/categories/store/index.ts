import { create } from 'zustand';
import { MediaType } from '../types/media';

export interface CategoriesState {
    selectedMediaType: MediaType;
    selectedCategory: string | null;
    setSelectedMediaType: (type: MediaType) => void;
    setSelectedCategory: (category: string | null) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
    selectedMediaType: 'all',
    selectedCategory: null,
    setSelectedMediaType: (type) => set({ selectedMediaType: type }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
})); 
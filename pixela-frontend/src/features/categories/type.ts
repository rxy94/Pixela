import { Category } from '@/api/categories/categories';
import { MediaType } from './types/media';

export interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    selectedMediaType: MediaType;
    fetchCategories: () => Promise<void>;
    setSelectedMediaType: (type: MediaType) => void;
}

export interface CategoriesProps {
    onCategorySelect?: (category: Category) => void;
    selectedCategory?: Category | null;
} 
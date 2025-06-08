import { Category } from '@/api/categories/categories';
import { MediaType } from './media';

/**
 * Props del componente MediaTypeSelector
 * @interface
 * @param {MediaType | 'random'} selectedType - Tipo de media seleccionado
 * @param {function} onTypeChange - Función para cambiar el tipo de media
 */
export interface MediaTypeSelectorProps {
    selectedType: MediaType | 'random';
    onTypeChange: (type: MediaType | 'random') => void;
}

/**
 * Props del componente CategoriesModal
 * @interface
 * @param {boolean} isOpen - Indica si el modal está abierto
 * @param {function} onClose - Función para cerrar el modal
 * @param {Category[]} categories - Lista de categorías
 * @param {Category | null} selectedCategory - Categoría seleccionada
 * @param {function} onCategorySelect - Función para seleccionar una categoría
 */
export interface CategoriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    selectedCategory: Category | null;
    onCategorySelect: (category: Category) => void;
}

/**
 * Props del componente CategoriesHeader
 * @interface
 * @param {MediaType | 'random'} selectedMediaType - Tipo de medio seleccionado
 * @param {function} onMediaTypeChange - Función para cambiar el tipo de medio
 */
export interface CategoriesHeaderProps {
    selectedMediaType: MediaType | 'random';
    onMediaTypeChange: (type: MediaType | 'random') => void;
} 
import { Category } from '@/api/categories/categories';
import { FiX } from 'react-icons/fi';

interface CategoriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    selectedCategory: Category | null;
    onCategorySelect: (category: Category) => void;
}

const STYLES = {
    overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50',
    modal: 'fixed inset-x-0 bottom-0 h-[100dvh] bg-pixela-dark/95 backdrop-blur-md rounded-t-2xl p-4 z-50 transform transition-transform duration-300 flex flex-col',
    modalOpen: 'translate-y-0',
    modalClosed: 'translate-y-full',
    header: 'flex justify-between items-center mb-6',
    title: 'text-2xl font-semibold text-white',
    closeButton: 'p-2 text-pixela-light/60 hover:text-pixela-accent transition-colors',
    closeIcon: 'w-6 h-6',
    list: 'flex-1 space-y-2 overflow-y-auto pb-8',
    categoryButton: 'w-full px-4 py-3.5 rounded-lg transition-all duration-200 font-medium text-base flex items-center gap-3',
    categoryButtonActive: 'bg-pixela-accent/10 text-pixela-accent border border-pixela-accent/30',
    categoryButtonInactive: 'bg-pixela-dark/30 text-pixela-light/80 border border-pixela-accent/20 hover:bg-pixela-accent/10 hover:border-pixela-accent/40',
} as const;

/**
 * Componente que muestra el modal de categorías.
 * 
 * @component
 * @param {CategoriesModalProps} props - Propiedades del componente
 * @returns {JSX.Element} El modal renderizado
 */
export const CategoriesModal = ({ 
    isOpen, 
    onClose, 
    categories, 
    selectedCategory, 
    onCategorySelect 
}: CategoriesModalProps) => {
    if (!isOpen) return null;

    const handleCategoryClick = (category: Category) => {
        onCategorySelect(category);
        onClose();
    };

    return (
        <>
            <div className={STYLES.overlay} onClick={onClose} />
            <div className={`${STYLES.modal} ${isOpen ? STYLES.modalOpen : STYLES.modalClosed}`}>
                <div className={STYLES.header}>
                    <h2 className={STYLES.title}>Categorías</h2>
                    <button 
                        onClick={onClose}
                        className={STYLES.closeButton}
                        aria-label="Cerrar"
                    >
                        <FiX className={STYLES.closeIcon} />
                    </button>
                </div>
                <div className={STYLES.list}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            className={`${STYLES.categoryButton} ${
                                selectedCategory?.id === category.id 
                                    ? STYLES.categoryButtonActive 
                                    : STYLES.categoryButtonInactive
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}; 
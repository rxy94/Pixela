'use client';

import { useEffect } from 'react';
import { CategoriesProps } from '../type';
import { useCategoriesStore } from '../store';
import { FiGrid } from 'react-icons/fi';

const STYLES = {
    container: 'w-full flex flex-col md:flex-row gap-6',
    categoriesWrapper: 'w-full md:w-64 flex-shrink-0 md:sticky md:top-24',
    categoriesContainer: 'flex flex-col gap-2',
    categoryButton: 'w-full px-4 py-2.5 rounded-lg transition-all duration-300 font-outfit text-sm flex items-center gap-3',
    categoryButtonActive: 'bg-pixela-accent/20 text-pixela-accent border border-pixela-accent/40 shadow-lg shadow-pixela-accent/10',
    categoryButtonInactive: 'bg-pixela-dark/30 text-pixela-light/80 border border-pixela-accent/20 hover:bg-pixela-accent/10 hover:border-pixela-accent/40',
    loadingContainer: 'flex justify-center items-center p-4',
    loadingSpinner: 'animate-spin rounded-full h-6 w-6 border-2 border-pixela-accent border-t-transparent',
    errorContainer: 'text-center p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/20',
    errorText: 'text-red-400 font-outfit',
    categoryIcon: 'w-4 h-4 text-pixela-light/60',
    categoryName: 'truncate'
} as const;

export const CategoriesList: React.FC<CategoriesProps> = ({ 
    onCategorySelect,
    selectedCategory 
}) => {
    const { categories, loading, error, fetchCategories } = useCategoriesStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (loading) {
        return (
            <div className={STYLES.loadingContainer}>
                <div className={STYLES.loadingSpinner}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={STYLES.errorContainer}>
                <p className={STYLES.errorText}>{error}</p>
            </div>
        );
    }

    return (
        <div className={STYLES.container}>
            <div className={STYLES.categoriesWrapper}>
                <div className={STYLES.categoriesContainer}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategorySelect?.(category)}
                            className={`${STYLES.categoryButton} ${
                                selectedCategory?.id === category.id 
                                    ? STYLES.categoryButtonActive 
                                    : STYLES.categoryButtonInactive
                            }`}
                        >
                            <FiGrid className={STYLES.categoryIcon} />
                            <span className={STYLES.categoryName}>{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}; 
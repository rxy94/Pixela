'use client';

import { useState, useEffect, useCallback } from 'react';
import { CategoriesList } from './CategoriesList';
import { CategoriesContent } from './CategoriesContent';
import { CategoriesHeader } from './CategoriesHeader';
import { Pagination } from './Pagination';
import { Category } from '@/api/categories/categories';
import { useCategoriesStore } from '../store';
import { useContentLoader } from '../hooks/useContentLoader';

const STYLES = {
    container: 'min-h-screen bg-gradient-to-br from-pixela-dark via-[#1a1a1a] to-pixela-dark pt-24',
    contentWrapper: 'container mx-auto px-4 py-12',
    mainContent: 'flex gap-8',
    categoriesContainer: 'w-64 flex-shrink-0',
    contentArea: 'flex-1',
} as const;

/**
 * Componente principal que maneja la visualización y navegación de categorías de contenido.
 * Permite filtrar por tipo de medio (películas/series) y categorías específicas.
 * Implementa paginación para la navegación del contenido.
 * 
 * @component
 * @returns {JSX.Element} El componente CategoriesContainer renderizado
 */
export const CategoriesContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const { selectedMediaType, setSelectedMediaType } = useCategoriesStore();
    
    const {
        movies,
        series,
        loading,
        error,
        currentPage,
        totalPages,
        loadContent,
        resetContent
    } = useContentLoader(selectedMediaType);

    /**
     * Maneja la selección de una categoría y carga su contenido.
     * 
     * @param {Category} category - La categoría seleccionada
     */
    const handleCategorySelect = useCallback(async (category: Category) => {
        setSelectedCategory(category);
        resetContent();
        await loadContent(category, 1);
    }, [loadContent, resetContent]);

    /**
     * Maneja el cambio de página en la paginación.
     * 
     * @param {number} page - El número de página a cargar
     */
    const handlePageChange = useCallback(async (page: number) => {
        await loadContent(selectedCategory, page);
    }, [selectedCategory, loadContent]);

    /**
     * Maneja el cambio de tipo de medio.
     * 
     * @param {MediaType} type - El nuevo tipo de medio
     */
    const handleMediaTypeChange = useCallback(async (type: 'all' | 'movies' | 'series') => {
        setSelectedMediaType(type);
        setSelectedCategory(null);
        resetContent();
        await loadContent(null, 1);
    }, [setSelectedMediaType, resetContent, loadContent]);

    // Carga inicial del contenido
    useEffect(() => {
        const initializeContent = async () => {
            await handleMediaTypeChange('all');
            setIsInitialized(true);
        };

        initializeContent();
    }, []);

    const getContentToShow = useCallback(() => {
        switch (selectedMediaType) {
            case 'all':
                return {
                    movies: movies,
                    series: series
                };
            case 'movies':
                return {
                    movies: movies,
                    series: []
                };
            case 'series':
                return {
                    movies: [],
                    series: series
                };
            default:
                return {
                    movies: [],
                    series: []
                };
        }
    }, [selectedMediaType, movies, series]);

    const content = getContentToShow();

    return (
        <div className={STYLES.container}>
            <div className={STYLES.contentWrapper}>
                <CategoriesHeader 
                    selectedMediaType={selectedMediaType}
                    onMediaTypeChange={handleMediaTypeChange}
                />
                
                <div className={STYLES.mainContent}>
                    {isInitialized && selectedMediaType !== 'all' && (
                        <div className={STYLES.categoriesContainer}>
                            <CategoriesList 
                                onCategorySelect={handleCategorySelect}
                                selectedCategory={selectedCategory}
                            />
                        </div>
                    )}

                    <div className={STYLES.contentArea}>
                        <div className="transform-gpu">
                            <CategoriesContent
                                selectedCategory={selectedCategory}
                                movies={content.movies}
                                series={content.series}
                                loading={loading}
                                error={error}
                            />
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                disabled={loading}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}; 
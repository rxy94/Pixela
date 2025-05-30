import { useState, useCallback, useRef, useEffect } from 'react';
import { Category } from '@/api/categories/categories';
import { Pelicula, Serie } from '@/features/media/types/content';
import { fetchFromAPI } from '@/api/shared/apiHelpers';
import { preloadImages } from '../utils/imageUtils';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    page: number;
    total_pages: number;
    total_results: number;
}

const ITEMS_PER_PAGE = 20;

type MediaType = 'all' | 'movies' | 'series';

export const useContentLoader = (selectedMediaType: MediaType) => {
    const [movies, setMovies] = useState<Pelicula[]>([]);
    const [series, setSeries] = useState<Serie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const isLoadingRef = useRef(false);
    const previousMediaTypeRef = useRef<MediaType>(selectedMediaType);

    // Efecto para manejar cambios en el tipo de medio
    useEffect(() => {
        if (previousMediaTypeRef.current !== selectedMediaType) {
            resetContent();
            loadContent(null, 1);
            previousMediaTypeRef.current = selectedMediaType;
        }
    }, [selectedMediaType]);

    const resetContent = useCallback(() => {
        setCurrentPage(1);
        setMovies([]);
        setSeries([]);
        setTotalPages(1);
        isLoadingRef.current = false;
    }, []);

    const updateContent = useCallback(<T extends Pelicula | Serie>(
        newContent: T[],
        isMovies: boolean,
        page: number,
        totalPages: number
    ) => {
        if (isMovies) {
            setMovies(newContent as Pelicula[]);
        } else {
            setSeries(newContent as Serie[]);
        }
        setTotalPages(totalPages);
    }, []);

    const loadContent = useCallback(async (category: Category | null, page: number) => {
        if (isLoadingRef.current) return;
        
        isLoadingRef.current = true;
        setLoading(true);
        setError(null);
        
        try {
            const promises = [];
            const endpoints = [];

            if (selectedMediaType === 'all' || selectedMediaType === 'movies') {
                const endpoint = category 
                    ? `/movies/genre/${category.id}?page=${page}&limit=${ITEMS_PER_PAGE}`
                    : `/movies/discover?page=${page}&limit=${ITEMS_PER_PAGE}`;
                endpoints.push(endpoint);
                promises.push(fetchFromAPI<ApiResponse<Pelicula[]>>(endpoint));
            }

            if (selectedMediaType === 'all' || selectedMediaType === 'series') {
                const endpoint = category 
                    ? `/series/genre/${category.id}?page=${page}&limit=${ITEMS_PER_PAGE}`
                    : `/series/discover?page=${page}&limit=${ITEMS_PER_PAGE}`;
                endpoints.push(endpoint);
                promises.push(fetchFromAPI<ApiResponse<Serie[]>>(endpoint));
            }

            const results = await Promise.all(promises);
            
            if (selectedMediaType === 'all') {
                const [movieResult, seriesResult] = results as [ApiResponse<Pelicula[]>, ApiResponse<Serie[]>];
                
                // Actualizamos el contenido de películas y series simultáneamente
                const updatePromises = [
                    preloadImages(movieResult.data).then(() => {
                        updateContent(movieResult.data, true, page, movieResult.total_pages);
                    }),
                    preloadImages(seriesResult.data).then(() => {
                        updateContent(seriesResult.data, false, page, seriesResult.total_pages);
                    })
                ];

                await Promise.all(updatePromises);
            } else if (selectedMediaType === 'movies') {
                const movieResult = results[0] as ApiResponse<Pelicula[]>;
                await preloadImages(movieResult.data);
                updateContent(movieResult.data, true, page, movieResult.total_pages);
            } else if (selectedMediaType === 'series') {
                const seriesResult = results[0] as ApiResponse<Serie[]>;
                await preloadImages(seriesResult.data);
                updateContent(seriesResult.data, false, page, seriesResult.total_pages);
            }

            setCurrentPage(page);
        } catch (error) {
            console.error('Error al cargar el contenido:', error);
            setError(error instanceof Error ? error.message : 'Error al cargar el contenido');
        } finally {
            setLoading(false);
            isLoadingRef.current = false;
        }
    }, [selectedMediaType, updateContent]);

    return {
        movies,
        series,
        loading,
        error,
        currentPage,
        totalPages,
        loadContent,
        resetContent
    };
}; 
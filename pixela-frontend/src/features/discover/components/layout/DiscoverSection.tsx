'use client';

import { useEffect } from 'react';
import { useDiscoverStore } from '@/features/discover/store/discoverStore';
import { DiscoverContent } from '@/features/discover/components/core/DiscoverContent';
import { DiscoverSectionProps } from '@/features/discover/types/components';

/**
 * Componente que muestra la sección de descubrimiento
 * @component
 * @param {DiscoverSectionProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de sección de descubrimiento
 */
export const DiscoverSection = ({ series, movies }: DiscoverSectionProps) => {
    const { setSeries, setMovies } = useDiscoverStore();

    useEffect(() => {
        const hasValidSeries = series?.length > 0;
        const hasValidMovies = movies?.length > 0;

        if (hasValidSeries) setSeries(series);
        if (hasValidMovies) setMovies(movies);
    }, [series, movies, setSeries, setMovies]);

    return <DiscoverContent />;
}; 
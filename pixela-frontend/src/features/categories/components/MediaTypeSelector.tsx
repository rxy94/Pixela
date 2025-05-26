'use client';

import { MediaType } from '../types/media';

interface MediaTypeSelectorProps {
    selectedType: MediaType;
    onTypeChange: (type: MediaType) => void;
}

/**
 * Componente selector de tipo de medio (películas/series/todos).
 * 
 * @component
 * @param {MediaTypeSelectorProps} props - Propiedades del componente
 * @returns {JSX.Element} El selector de tipo de medio renderizado
 */
export const MediaTypeSelector = ({ selectedType, onTypeChange }: MediaTypeSelectorProps) => {
    const options: { value: MediaType; label: string }[] = [
        { value: 'all', label: 'Todos' },
        { value: 'movies', label: 'Películas' },
        { value: 'series', label: 'Series' }
    ];

    return (
        <div className="flex gap-2">
            {options.map(({ value, label }) => (
                <button
                    key={value}
                    onClick={() => onTypeChange(value)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                        selectedType === value
                            ? 'bg-pixela-primary text-white shadow-lg shadow-pixela-primary/20'
                            : 'bg-pixela-dark/50 text-gray-300 hover:bg-pixela-dark hover:text-white'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}; 
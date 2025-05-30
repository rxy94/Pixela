'use client';

import { MediaType } from '../types/media';

interface MediaTypeSelectorProps {
    selectedType: MediaType;
    onTypeChange: (type: MediaType) => void;
}

const STYLES = {
    container: 'flex gap-2',
    button: 'px-5 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm md:text-base',
    buttonActive: 'bg-pixela-accent/10 text-pixela-accent border border-pixela-accent/30',
    buttonInactive: 'bg-pixela-dark/20 text-pixela-light/60 border border-pixela-accent/10 hover:bg-pixela-accent/5 hover:text-pixela-accent/80'
} as const;

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
        <div className={STYLES.container}>
            {options.map(({ value, label }) => (
                <button
                    key={value}
                    onClick={() => onTypeChange(value)}
                    className={`${STYLES.button} ${
                        selectedType === value
                            ? STYLES.buttonActive
                            : STYLES.buttonInactive
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}; 
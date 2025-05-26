import { MediaTypeSelector } from './MediaTypeSelector';
import { MediaType } from '../types/media';

const STYLES = {
    container: 'flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12',
    title: 'text-4xl md:text-5xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-r from-pixela-accent to-pink-500',
} as const;

interface CategoriesHeaderProps {
    selectedMediaType: MediaType;
    onMediaTypeChange: (type: MediaType) => void;
}

/**
 * Componente de encabezado para la sección de categorías.
 * Muestra el título y el selector de tipo de medio.
 * 
 * @component
 * @param {CategoriesHeaderProps} props - Propiedades del componente
 * @returns {JSX.Element} El encabezado renderizado
 */
export const CategoriesHeader = ({ selectedMediaType, onMediaTypeChange }: CategoriesHeaderProps) => {
    return (
        <div className={STYLES.container}>
            <h1 className={STYLES.title}>
                {selectedMediaType === 'all' ? 'Todo el Contenido' : 'Categorías'}
            </h1>
            <MediaTypeSelector 
                activeType={selectedMediaType}
                onTypeChange={onMediaTypeChange}
            />
        </div>
    );
}; 
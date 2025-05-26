import { useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const STYLES = {
    container: 'flex justify-center items-center gap-1 md:gap-2',
    button: 'flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    pageButton: 'w-8 h-8 md:w-10 md:h-10 text-sm md:text-base',
    activeButton: 'bg-pixela-accent text-white shadow-lg shadow-pixela-accent/20',
    inactiveButton: 'bg-pixela-dark/30 text-pixela-light/80 border border-pixela-accent/20 hover:bg-pixela-accent/10 hover:border-pixela-accent/40',
    ellipsis: 'flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-pixela-light/60',
    navButton: 'w-8 h-8 md:w-10 md:h-10 text-pixela-light/60 hover:text-pixela-accent'
} as const;

const MAX_VISIBLE_PAGES = 5;
const MAX_TOTAL_PAGES = 500; // Límite de TMDB

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}

/**
 * Componente de paginación que muestra controles de navegación entre páginas.
 * Incluye botones de navegación, números de página y manejo de estados.
 * 
 * @component
 * @param {PaginationProps} props - Propiedades del componente
 * @returns {JSX.Element | null} Los controles de paginación o null si no hay páginas
 */
export const Pagination = ({ currentPage, totalPages, onPageChange, disabled = false }: PaginationProps) => {
    const getPageNumbers = () => {
        const pages: (number | '...')[] = [];
        const maxVisiblePages = window.innerWidth < 768 ? 3 : 5;
        
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Siempre mostrar primera página
        pages.push(1);

        // Calcular páginas alrededor de la actual
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        // Añadir elipsis inicial si es necesario
        if (start > 2) {
            pages.push('...');
        }

        // Añadir páginas alrededor de la actual
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Añadir elipsis final si es necesario
        if (end < totalPages - 1) {
            pages.push('...');
        }

        // Siempre mostrar última página
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    // No mostramos la paginación si no hay páginas o si la página actual es inválida
    if (totalPages <= 1 || currentPage > MAX_TOTAL_PAGES) return null;

    return (
        <div className={STYLES.container}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || disabled}
                className={`${STYLES.button} ${STYLES.navButton}`}
                aria-label="Página anterior"
            >
                <FiChevronLeft className="w-5 h-5" />
            </button>

            {getPageNumbers().map((page, index) => (
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className={STYLES.ellipsis}>
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page as number)}
                        disabled={disabled}
                        className={`${STYLES.button} ${STYLES.pageButton} ${
                            currentPage === page
                                ? STYLES.activeButton
                                : STYLES.inactiveButton
                        }`}
                    >
                        {page}
                    </button>
                )
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || disabled}
                className={`${STYLES.button} ${STYLES.navButton}`}
                aria-label="Página siguiente"
            >
                <FiChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}; 
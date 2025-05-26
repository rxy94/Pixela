import { useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const STYLES = {
    container: 'flex justify-center items-center gap-2 mt-8',
    button: 'px-4 py-2 rounded-lg bg-pixela-dark/50 border border-pixela-accent/20 hover:bg-pixela-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-pixela-dark/50',
    buttonActive: 'bg-pixela-accent/20 text-pixela-light',
    dots: 'text-pixela-light/50 px-2',
    pageButton: 'min-w-[40px] h-[40px] flex items-center justify-center',
    navButton: 'flex items-center gap-2',
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
    const renderPageNumbers = useCallback(() => {
        if (totalPages <= 1) return [];

        const pages = [];
        const halfVisible = Math.floor(MAX_VISIBLE_PAGES / 2);
        
        // Aseguramos que no excedamos el límite de TMDB
        const safeTotalPages = Math.min(totalPages, MAX_TOTAL_PAGES);
        let startPage = Math.max(1, currentPage - halfVisible);
        const endPage = Math.min(safeTotalPages, startPage + MAX_VISIBLE_PAGES - 1);
        
        // Ajustar el rango si estamos cerca del final
        if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
            startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
        }

        // Primera página y elipsis inicial
        if (startPage > 1) {
            pages.push(
                <button
                    key="first"
                    onClick={() => onPageChange(1)}
                    className={`${STYLES.button} ${STYLES.pageButton}`}
                    aria-label="Ir a la primera página"
                    disabled={disabled}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="dots1" className={STYLES.dots} aria-hidden="true">
                        ...
                    </span>
                );
            }
        }

        // Páginas numeradas
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`${STYLES.button} ${STYLES.pageButton} ${i === currentPage ? STYLES.buttonActive : ''}`}
                    aria-label={`Ir a la página ${i}`}
                    aria-current={i === currentPage ? 'page' : undefined}
                    disabled={disabled}
                >
                    {i}
                </button>
            );
        }

        // Última página y elipsis final
        if (endPage < safeTotalPages) {
            if (endPage < safeTotalPages - 1) {
                pages.push(
                    <span key="dots2" className={STYLES.dots} aria-hidden="true">
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key="last"
                    onClick={() => onPageChange(safeTotalPages)}
                    className={`${STYLES.button} ${STYLES.pageButton}`}
                    aria-label="Ir a la última página"
                    disabled={disabled}
                >
                    {safeTotalPages}
                </button>
            );
        }

        return pages;
    }, [currentPage, totalPages, onPageChange, disabled]);

    // No mostramos la paginación si no hay páginas o si la página actual es inválida
    if (totalPages <= 1 || currentPage > MAX_TOTAL_PAGES) return null;

    return (
        <nav className={STYLES.container} role="navigation" aria-label="Paginación">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || disabled}
                className={`${STYLES.button} ${STYLES.navButton}`}
                aria-label="Ir a la página anterior"
            >
                <FaChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= Math.min(totalPages, MAX_TOTAL_PAGES) || disabled}
                className={`${STYLES.button} ${STYLES.navButton}`}
                aria-label="Ir a la página siguiente"
            >
                <span>Siguiente</span>
                <FaChevronRight className="w-4 h-4" />
            </button>
        </nav>
    );
}; 
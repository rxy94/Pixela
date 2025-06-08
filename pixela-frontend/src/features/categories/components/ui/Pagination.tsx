import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const STYLES = {
    container: 'flex justify-center items-center gap-1 md:gap-2',
    button: 'flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
    pageButton: 'w-8 h-8 md:w-10 md:h-10 text-sm md:text-base',
    activeButton: 'bg-pixela-accent text-white shadow-lg shadow-pixela-accent/20',
    inactiveButton: 'bg-pixela-dark/30 text-pixela-light/80 border border-pixela-accent/20 hover:bg-pixela-accent/10 hover:border-pixela-accent/40',
    ellipsis: 'flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-pixela-light/60',
    navButton: 'w-8 h-8 md:w-10 md:h-10 text-pixela-light/60 hover:text-pixela-accent',
    chevronIcon: 'w-5 h-5'
} as const;

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
    // Limitar totalPages al máximo permitido
    const limitedTotalPages = Math.min(totalPages, MAX_TOTAL_PAGES);
    
    const getPageNumbers = () => {
        const pages: (number | '...')[] = [];
        const maxVisiblePages = window.innerWidth < 768 ? 3 : 5;
        
        if (limitedTotalPages <= maxVisiblePages) {
            return Array.from({ length: limitedTotalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(limitedTotalPages - 1, currentPage + 1);

        if (start > 2) {
            pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < limitedTotalPages - 1) {
            pages.push('...');
        }

        if (limitedTotalPages > 1) {
            pages.push(limitedTotalPages);
        }

        return pages;
    };

    if (limitedTotalPages <= 1 || currentPage > MAX_TOTAL_PAGES) return null;

    return (
        <div className={STYLES.container}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || disabled}
                className={`${STYLES.button} ${STYLES.navButton}`}
                aria-label="Página anterior"
            >
                <FiChevronLeft className={STYLES.chevronIcon} />
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
                        disabled={disabled || (page as number) > MAX_TOTAL_PAGES}
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
                disabled={currentPage === limitedTotalPages || disabled}
                className={`${STYLES.button} ${STYLES.navButton}`}
                aria-label="Página siguiente"
            >
                <FiChevronRight className={STYLES.chevronIcon} />
            </button>
        </div>
    );
}; 
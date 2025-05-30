import { API_ENDPOINTS } from '@/api/shared/apiEndpoints';
import { DEFAULT_FETCH_OPTIONS } from '@/api/shared/apiHelpers';

export interface Category {
    id: number;
    name: string;
}

/**
 * Obtiene todas las categorías disponibles
 * @returns Array de categorías
 */
export async function getAllCategories(): Promise<Category[]> {
    const apiUrl = API_ENDPOINTS.CATEGORIES.LIST;
    console.log(`[DEBUG] getAllCategories - Intentando obtener categorías`);

    try {
        const response = await fetch(apiUrl, {
            ...DEFAULT_FETCH_OPTIONS,
        });

        if (!response.ok) {
            console.error(`[ERROR] getAllCategories - Código ${response.status}`);
            throw new Error(`Error al obtener las categorías: ${response.status}`);
        }

        const data = await response.json();
        return data.success ? (data.data || []) : [];
    } catch (error) {
        console.error('[ERROR] getAllCategories:', error);
        throw error;
    }
} 
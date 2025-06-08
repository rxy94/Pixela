import { TrendingSerie, TrendingMovie } from "@/features/trending/types";
import { MediaType } from "@/features/trending/types/common";
import { FetchOptions } from "@/features/trending/types/api";
import { API_BASE_URL } from "@/api/shared/apiEndpoints"; // PROD   UCTION: Cambiar {API_BASE_URL} por {API_URL}

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;


/**
 * Función base para realizar peticiones a la API de tendencias
 * @param mediaType Tipo de contenido (series o películas)
 * @param options Opciones de paginación
 * @returns Datos de la respuesta
 */
async function fetchTrendingMedia<T>(
    mediaType: MediaType,
    options: FetchOptions = {}
): Promise<T[]> {
    const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = options;
    const endpoint = `${API_BASE_URL}/${mediaType}/trending`; // PRODUCTION: Cambiar {API_BASE_URL} por {API_URL}

    try {
        console.log(`Fetching trending ${mediaType} from: ${endpoint}?limit=${limit}&offset=${offset}`);
        const response = await fetch(`${endpoint}?limit=${limit}&offset=${offset}`);
        
        if (!response.ok) {
            throw new Error(`Error de API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error(`Error fetching trending ${mediaType}:`, error);
        return [];
    }
}

/**
 * Obtiene las series en tendencia
 * @param limit Número de series a obtener
 * @param offset Punto de inicio para la paginación
 * @returns Lista de series en tendencia
 */
export async function getTrendingSeries(
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET
): Promise<TrendingSerie[]> {
    return fetchTrendingMedia<TrendingSerie>('series', { limit, offset });
}

/**
 * Obtiene las películas en tendencia
 * @param limit Número de películas a obtener
 * @param offset Punto de inicio para la paginación
 * @returns Lista de películas en tendencia
 */
export async function getTrendingMovies(
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET
): Promise<TrendingMovie[]> {
    return fetchTrendingMedia<TrendingMovie>('movies', { limit, offset });
} 
import { Serie } from '@/features/media/types/content';
import { API_ENDPOINTS } from '@/api/shared/apiEndpoints';
import { DEFAULT_FETCH_OPTIONS } from '@/api/shared/apiHelpers';
import { mapSerieFromApi } from './mapper/mapSerie';
import type { 
  Video, Provider, ApiSerie, ApiActor,
  ApiResponse, ApiCastResponse, ApiVideosResponse, ApiProvidersResponse 
} from './types';

/**
 * Función para manejar errores en las peticiones a la API
 * @param url - URL de la petición
 * @returns - Respuesta de la petición
 */
async function fetchWithErrorHandling<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, DEFAULT_FETCH_OPTIONS);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[API] Error fetching ${url}:`, error);
    return null;
  }
}

/**
 * Obtiene los datos de una serie
 * @param id - ID de la serie
 * @returns - Serie
 */
export async function getSerieById(id: string): Promise<Serie> {
  const data = await fetchWithErrorHandling<ApiResponse<ApiSerie>>(
    API_ENDPOINTS.SERIES.GET_BY_ID(id)
  );
  
  if (!data?.data?.id) {
    throw new Error('Serie no encontrada o datos inválidos');
  }

  const rawSerie = data.data;

  // Obtener datos adicionales en paralelo
  const [actores, videos, proveedores] = await Promise.allSettled([
    getSerieActores(id),
    getSerieVideos(id),
    getSerieProveedores(id)
  ]);

  return mapSerieFromApi({
    ...rawSerie,
    actores: actores.status === 'fulfilled' ? actores.value : [],
    trailers: videos.status === 'fulfilled' ? videos.value : [],
    proveedores: proveedores.status === 'fulfilled' ? proveedores.value : []
  });
}

/**
 * Obtiene los actores de una serie
 * @param id - ID de la serie
 * @returns - Actores
 */
export async function getSerieActores(id: string): Promise<ApiActor[]> {
  const data = await fetchWithErrorHandling<ApiCastResponse>(
    API_ENDPOINTS.SERIES.GET_CAST(id)
  );
  
  if (!data?.success || !data.data?.cast) return [];
  
  // Filtrar actores con datos válidos
  return data.data.cast.filter((actor: ApiActor) => 
    actor && 
    (actor.nombre || actor.name) && 
    (actor.foto || actor.profile_path)
  );
}

/**
 * Obtiene los videos/trailers de una serie
 * @param id - ID de la serie
 * @returns - Videos
 */
export async function getSerieVideos(id: string): Promise<Video[]> {
  const data = await fetchWithErrorHandling<ApiVideosResponse>(
    API_ENDPOINTS.SERIES.GET_VIDEOS(id)
  );
  return data?.success ? (data.data?.results || []) : [];
}

/**
 * Obtiene los proveedores de streaming de una serie
 * @param id - ID de la serie
 * @param region - Región para los proveedores
 * @returns - Proveedores
*/
export async function getSerieProveedores(id: string, region = 'ES'): Promise<Provider[]> {
  const data = await fetchWithErrorHandling<ApiProvidersResponse>(
    `${API_ENDPOINTS.SERIES.GET_WATCH_PROVIDERS(id)}?region=${region}`
  );
  
  if (!data?.success || !data.data?.results?.[region]) return [];
  
  const providers = data.data.results[region];
  const allProviders = [
    ...(providers.flatrate || []),
    ...(providers.rent || []),
    ...(providers.buy || [])
  ];
  
  return allProviders.filter((provider, index, self) =>
    index === self.findIndex(p => p.provider_id === provider.provider_id)
  );
}

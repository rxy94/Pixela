import { Pelicula } from '@/features/media/types/content';
import { API_ENDPOINTS } from '@/api/shared/apiEndpoints';
import { DEFAULT_FETCH_OPTIONS } from '@/api/shared/apiHelpers';
import { mapPeliculaFromApi } from './mapper/mapPelicula'; 
import type {
  ApiImage, ApiProvider, ApiTrailer, ApiPelicula, ApiActor,
  ApiResponse, ApiCastResponse, ApiVideosResponse, ApiProvidersResponse, 
  ApiImagesResponse, ApiCreatorResponse
} from './types';

/**
 * Helper para hacer fetch con manejo de errores unificado
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
 * Obtiene la película por ID junto con datos adicionales
 * @param id ID de la película
 * @returns Objeto Pelicula completo
 */
export async function getPeliculaById(id: string): Promise<Pelicula> {
  const data = await fetchWithErrorHandling<ApiResponse<ApiPelicula>>(
    API_ENDPOINTS.PELICULAS.GET_BY_ID(id)
  );
  
  if (!data?.data?.id) {
    throw new Error('Película no encontrada o datos inválidos');
  }

  const rawPelicula = data.data;

  // Obtener datos adicionales en paralelo
  const [actores, videos, proveedores, imagenes, creatorData] = await Promise.allSettled([
    getPeliculaActores(id),
    getPeliculaVideos(id),
    getPeliculaProveedores(id),
    getPeliculaImagenes(id),
    fetchWithErrorHandling<ApiCreatorResponse>(`${API_ENDPOINTS.PELICULAS.GET_BY_ID(id)}/creator`)
  ]);

  return mapPeliculaFromApi({
    ...rawPelicula,
    actores: actores.status === 'fulfilled' ? actores.value : [],
    trailers: videos.status === 'fulfilled' ? videos.value : [],
    proveedores: proveedores.status === 'fulfilled' ? proveedores.value : [],
    imagenes: imagenes.status === 'fulfilled' ? {
      backdrops: imagenes.value.filter(img => img.file_path.includes('backdrop')),
      posters: imagenes.value.filter(img => !img.file_path.includes('backdrop'))
    } : { backdrops: [], posters: [] },
    creador: creatorData.status === 'fulfilled' && creatorData.value?.data?.creator 
      ? creatorData.value.data.creator 
      : undefined
  });
}

/**
 * Obtiene los actores de una película
 * @param id ID de la película
 * @returns Array de actores
 */
export async function getPeliculaActores(id: string): Promise<ApiActor[]> {
  const data = await fetchWithErrorHandling<ApiCastResponse>(
    API_ENDPOINTS.PELICULAS.GET_CAST(id)
  );
  return data?.success ? (data.data?.cast || []) : [];
}

/**
 * Obtiene los videos/trailers de una película
 * @param id ID de la película
 * @returns Array de videos
 */
export async function getPeliculaVideos(id: string): Promise<ApiTrailer[]> {
  const data = await fetchWithErrorHandling<ApiVideosResponse>(
    API_ENDPOINTS.PELICULAS.GET_VIDEOS(id)
  );
  return data?.success ? (data.data?.results || []) : [];
}

/**
 * Obtiene los proveedores de streaming de una película
 * @param id ID de la película
 * @param region Región para los proveedores (por defecto ES para España)
 * @returns Array de proveedores de streaming
 */
export async function getPeliculaProveedores(id: string, region = 'ES'): Promise<ApiProvider[]> {
  const data = await fetchWithErrorHandling<ApiProvidersResponse>(
    `${API_ENDPOINTS.PELICULAS.GET_WATCH_PROVIDERS(id)}?region=${region}`
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

/**
 * Obtiene las imágenes de una película (backdrops y posters)
 * @param id ID de la película
 * @returns Array de imágenes
 */
export async function getPeliculaImagenes(id: string): Promise<ApiImage[]> {
  const data = await fetchWithErrorHandling<ApiImagesResponse>(
    API_ENDPOINTS.PELICULAS.GET_IMAGES(id)
  );
  return data?.success ? [...(data.data?.backdrops || []), ...(data.data?.posters || [])] : [];
}

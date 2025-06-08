import { API_ENDPOINTS } from '@/api/shared/apiEndpoints';
import { DEFAULT_FETCH_OPTIONS } from '@/api/shared/apiHelpers';
import { WallpapersResponse, ApiResponse, ApiImageResponse } from '@/features/media/types/gallery';


/**
 * Obtiene las imágenes de una película o serie
 * @param {string} mediaId - ID de la película o serie
 * @param {'movie' | 'series'} mediaType - Tipo de media
 * @returns {Promise<WallpapersResponse>} Respuesta con las imágenes
 */
export async function getMediaImages(
  mediaId: string, 
  mediaType: 'movie' | 'series'
): Promise<WallpapersResponse> {
  // Determine which endpoint to use based on media type
  const apiUrl = mediaType === 'movie' 
    ? `${API_ENDPOINTS.PELICULAS.GET_IMAGES(mediaId)}`
    : `${API_ENDPOINTS.SERIES.GET_IMAGES(mediaId)}`;

  console.log(`[DEBUG] getMediaImages - Fetching from: ${apiUrl}`);

  try {
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(apiUrl, {
      ...DEFAULT_FETCH_OPTIONS,
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ERROR] getMediaImages - Status code ${response.status}, Response: ${errorText}`);
      return { backdrops: [], posters: [], logos: [] };
    }

    const data = await response.json() as ApiResponse;
    console.log('[DEBUG] getMediaImages - Response data:', data);
    
    if (!data.success) {
      console.error('[ERROR] getMediaImages - API response indicates failure:', data);
      return { backdrops: [], posters: [], logos: [] };
    }

    if (!data.data || (!data.data.backdrops && !data.data.posters)) {
      console.error('[ERROR] getMediaImages - Unexpected data structure:', data);
      return { backdrops: [], posters: [], logos: [] };
    }

    /**
     * Transforma la respuesta para que coincida con el formato esperado
     * @param {ApiResponse} data - Respuesta de la API
     * @returns {WallpapersResponse} Respuesta transformada
     */
    const result: WallpapersResponse = {
      backdrops: Array.isArray(data.data.backdrops) ? data.data.backdrops.map((backdrop: ApiImageResponse) => ({
        file_path: backdrop.url,
        width: backdrop.ancho || 0,
        height: backdrop.alto || 0,
        aspect_ratio: backdrop.ancho && backdrop.alto ? backdrop.ancho / backdrop.alto : 1.78,
        vote_average: 0,
        vote_count: 0
      })) : [],
      posters: Array.isArray(data.data.posters) ? data.data.posters.map((poster: ApiImageResponse) => ({
        file_path: poster.url,
        width: poster.ancho || 0,
        height: poster.alto || 0,
        aspect_ratio: poster.ancho && poster.alto ? poster.ancho / poster.alto : 0.667,
        vote_average: 0,
        vote_count: 0
      })) : [],
      logos: []
    };

    return result;
    
  } catch (error) {
    console.error('[ERROR] getMediaImages:', error);
    return { backdrops: [], posters: [], logos: [] };
  }
} 
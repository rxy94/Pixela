import { MediaContent } from '@/features/discover/types/media';

/**
 * Respuesta de la API para el endpoint de descubrimiento
 * @interface DiscoverResponse
 * @property {boolean} success - Si la respuesta fue exitosa
 * @property {Array<MediaContent>} data - Datos de la respuesta
 */
export interface DiscoverResponse {
    success: boolean;
    data: MediaContent[];
} 
import { TrendingSerie, TrendingMovie } from "@/features/trending/types";

/**
 * Respuesta de la API para el endpoint de descubrimiento
 * @interface DiscoverResponse
 * @property {boolean} success - Si la respuesta fue exitosa
 * @property {Array<TrendingSerie | TrendingMovie>} data - Datos de la respuesta
 */
export interface DiscoverResponse {
    success: boolean;
    data: (TrendingSerie | TrendingMovie)[];
}

/**
 * Tipo para el contenido multimedia (serie o película)
 * @type {string}
 * @enum {string}
 * @property {TrendingSerie} series - Series
 * @property {TrendingMovie} movies - Películas
 */
export type MediaContent = TrendingSerie | TrendingMovie;

export type { TrendingSerie, TrendingMovie }; 
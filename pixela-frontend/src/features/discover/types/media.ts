import { TrendingSerie, TrendingMovie } from "@/features/trending/types";

/**
 * Tipo de contenido multimedia
 * @type {string}
 * @enum {string}
 * @property {string} series - Series
 * @property {string} movies - Películas
 */
export type MediaType = 'series' | 'movies';

/**
 * Tipo para el contenido multimedia (serie o película)
 * @type {string}
 * @enum {string}
 * @property {TrendingSerie} series - Series
 * @property {TrendingMovie} movies - Películas
 */
export type MediaContent = TrendingSerie | TrendingMovie;

export type { TrendingSerie, TrendingMovie }; 
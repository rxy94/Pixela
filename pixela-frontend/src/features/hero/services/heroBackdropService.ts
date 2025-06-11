import { getPeliculaById } from "@/api/peliculas/peliculas";
import { getSerieById } from "@/api/series/series";
import { MediaItem, MediaResponse } from "@/features/hero/types/content";

/**
 * Lista de medios destacados cuyas imágenes se mostrarán en el Hero.
 * Cada medio debe tener un ID válido y un tipo específico.
 */
export const featuredMedia: MediaItem[] = [
  { id: "986056",  type: "movie" },  // Thunderbolts
  { id: "1084199", type: "movie" },  // La acompañante
  { id: "124364",  type: "serie" },  // From
  { id: "680",     type: "movie" },  // Pulp Fiction
  { id: "95396",   type: "serie" },  // Severance
  { id: "4607",    type: "serie" },  // Lost
  { id: "66732",    type: "serie" },  // Lost
  { id: "87108",  type: "serie" },   // Chernobyl
  { id: "1087891",  type: "movie" },  // Amateur
  { id: "46952",   type: "serie" },   // Black List
  { id: "533535",  type: "movie" },  // Deadpool y Wolverine
];

/**
 * Obtiene los fondos destacados para el hero
 * @returns {Promise<string[]>} Array de URLs de imágenes
 */
export async function getFeaturedBackdrops(): Promise<string[]> {
  try {
    const mediaPromises = featuredMedia.map(async (item) => {
      try {
        const media = item.type === 'movie' 
          ? await getPeliculaById(item.id)
          : await getSerieById(item.id);
        return media as MediaResponse;
      } catch (error) {
        console.warn(`Error al obtener ${item.type} ${item.id}:`, error);
        return null;
      }
    });

    const mediaResults = await Promise.all(mediaPromises);

    return mediaResults
      .filter((media): media is MediaResponse => media !== null)
      .map(media => media.backdrop || "")
      .filter(Boolean);
  } catch (error) {
    console.error("Error al obtener imágenes de fondo:", error);
    return [];
  }
} 
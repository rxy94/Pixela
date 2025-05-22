import { Pelicula } from '@/features/media/types/content';
import { Actor } from '@/features/media/types/people';
import { Trailer } from '@/features/media/types/supplements';

// URL base para imágenes de TMDb
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

/**
 * Formatea la URL de la imagen
 * @param path
 * @returns 
 */
export const formatImageUrl = (path: string): string =>
  path?.startsWith('/') ? `${TMDB_IMAGE_BASE_URL}${path}` : path || '';

interface MovieData {
  id: string | number;
  nombre?: string;
  titulo?: string;
  title?: string;
  descripcion?: string;
  sinopsis?: string;
  overview?: string;
  fecha_estreno?: string;
  fecha?: string;
  release_date?: string;
  generos?: string[] | { nombre?: string; name?: string }[];
  poster_path?: string;
  poster?: string;
  backdrop_path?: string;
  backdrop?: string;
  vote_average?: number;
  puntuacion?: number;
  duracion?: string | number;
  runtime?: string | number;
  actores?: Actor[];
  trailers?: Trailer[];
  creador?: {
    id: string | number;
    nombre?: string;
    name?: string;
    foto?: string;
    profile_path?: string;
  };
}

interface Genre {
  nombre?: string;
  name?: string;
}

interface ActorData {
  id: string | number;
  nombre?: string;
  name?: string;
  foto?: string;
  profile_path?: string;
  personaje?: string;
  character?: string;
}

interface TrailerData {
  id: string | number;
  nombre?: string;
  name?: string;
  key?: string;
  site?: string;
  tipo?: string;
  type?: string;
}

/**
 * Mapea un actor
 * @param actor
 * @returns 
 */
const mapActor = (actor: ActorData): Actor => ({
  id: actor.id.toString(),
  nombre: actor.nombre || actor.name || '',
  foto: formatImageUrl(actor.foto || actor.profile_path || ''),
  personaje: actor.personaje || actor.character || '',
});

/**
 * Mapea un trailer
 * @param trailer
 * @returns 
 */
const mapTrailer = (trailer: TrailerData): Trailer => ({
  id: trailer.id.toString(),
  nombre: trailer.nombre || trailer.name || '',
  key: trailer.key || '',
  site: trailer.site || 'YouTube',
  tipo: trailer.tipo || trailer.type || '',
});

/**
 * Mapea los datos de la API a un objeto Pelicula
 * @param movieData 
 * @returns 
 */
export function mapPeliculaFromApi(movieData: MovieData): Pelicula {
  if (!movieData || !movieData.id) {
    console.error('[ERROR] mapPeliculaFromApi - Datos de API incompletos:', movieData);
    throw new Error('Los datos recibidos de la API están incompletos o en un formato inesperado');
  }

  const duracion = parseInt(String(movieData.duracion || movieData.runtime));
  if (isNaN(duracion)) {
    throw new Error('La duración de la película es requerida y debe ser un número válido');
  }

  const titulo = movieData.nombre || movieData.titulo || movieData.title || '';
  const sinopsis = movieData.descripcion || movieData.sinopsis || movieData.overview || '';
  const fecha = movieData.fecha_estreno || movieData.fecha || movieData.release_date || '';
  const generos = movieData.generos 
    ? (Array.isArray(movieData.generos) 
        ? movieData.generos.map((g: string | Genre) => typeof g === 'string' ? g : g.nombre || g.name || '')
        : [String(movieData.generos)])
    : [];
  const poster = formatImageUrl(movieData.poster_path || movieData.poster || '');
  const backdrop = formatImageUrl(movieData.backdrop_path || movieData.backdrop || '');
  const puntuacion = parseFloat(String(movieData.vote_average || movieData.puntuacion)) || 0;

  return {
    id: movieData.id.toString(),
    titulo,
    sinopsis,
    fecha,
    generos,
    poster,
    backdrop,
    puntuacion,
    tipo: 'pelicula',
    duracion,
    actores: movieData.actores?.map(mapActor) || [],
    trailers: movieData.trailers?.map(mapTrailer) || [],
    creador: movieData.creador ? {
      id: Number(movieData.creador.id),
      nombre: movieData.creador.nombre || movieData.creador.name || '',
      foto: formatImageUrl(movieData.creador.foto || movieData.creador.profile_path || '')
    } : undefined
  };
} 
import { Media } from './mediaBase';
import { Creator } from './people';

export interface Serie extends Media {
  temporadas: number;
  episodios: number;
  creadores?: Creator[];
  // Campos de TMDB
  poster_path?: string;
  name?: string;
  title?: string;
  vote_average?: number;
  first_air_date?: string;
  overview?: string;
}

export interface Pelicula extends Media {
  duracion: number;
  // Campos de TMDB
  poster_path?: string;
  title?: string;
  vote_average?: number;
  release_date?: string;
  overview?: string;
} 
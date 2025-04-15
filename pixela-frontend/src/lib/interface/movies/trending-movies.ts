export interface MovieResponse {
    success: boolean;
    data: Movie[];
}

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    overview: string;
    genres?: number[];
} 
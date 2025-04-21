export interface SeriesResponse {
    success: boolean;
    data: TrendingSerie[];
}

export interface MoviesResponse {
    success: boolean;
    data: TrendingMovie[];
}

export interface TrendingSerie {
    id: number;
    title: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
}

export interface TrendingMovie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}   
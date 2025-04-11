export interface SeriesResponse {
    success: boolean;
    data: Series[];
}

export interface Series {
    id: number;
    title: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
}

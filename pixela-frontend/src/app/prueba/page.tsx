import { SeriesResponse, Series } from "./interface/trending-series";
import { SeriesGrid } from "./components/SeriesGrid";

const getSeries = async (limit = 20, offset = 0): Promise<Series[]> => {
    try {
        const response = await fetch(`http://laravel.test/api/series/top-rated?limit=${limit}&offset=${offset}`);
        const data: SeriesResponse = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error fetching series:', error);
        throw error;
    }
}

export default async function SeriesPage() {
    try {
        const series = await getSeries(20);
        return (
            <div className="flex flex-col">
                <span className="text-5xl my-2">Series más valoradas <small>estático</small></span>
                <SeriesGrid series={series} />
            </div>
        );
    } catch (error) {
        console.error('Error in SeriesPage:', error);
        return (
            <div className="flex flex-col">
                <span className="text-5xl my-2">Error al cargar las series</span>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }
}

import { SeriesGrid } from "../components/series/SeriesGrid";
import { getTopRatedSeries } from "@/lib/api/series/series";
import { seriesMetadata } from "@/metadata";

export const metadata = seriesMetadata;

export default async function SeriesPage() {

    try {
        
        const series = await getTopRatedSeries(20);
        return (
            <div className="flex flex-col">
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

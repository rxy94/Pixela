'use client';

import { useEffect } from "react";
import Image from "next/image";
import { Series } from "@/lib/interface/series/trending-series";
import { useSeriesStore } from "@/store/seriesStore";

interface Props {
    series: Series[];
}

// TODO Mejorar responsive para que se pueda ver en cualquier dispositivo
export const SeriesGrid = ({ series }: Props) => { 
    const { setSeries, series: storeSeries } = useSeriesStore();
    
    useEffect(() => {
        // Actualizamos el store con las series recibidas por props
        setSeries(series);
    }, [series, setSeries]);
    
    // Usamos las series del store para renderizar
    const displaySeries = storeSeries.length > 0 ? storeSeries : series;
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1E1E1E]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-3 p-4">
                {displaySeries.map((serie) => (
                    <div 
                        key={serie.id} 
                        className="relative overflow-hidden rounded-lg shadow-2xl mx-auto"
                    >
                        {/* Imagen del Poster */}
                        <div className="relative h-full w-full">
                            <Image 
                                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} 
                                alt={serie.title} 
                                className="object-cover"
                                width={297}
                                height={437}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
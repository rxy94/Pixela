'use client';

import { Series } from "../interface/trending-series";
import Image from "next/image";
interface Props {
    series: Series[];
}

export const SeriesGrid = ({ series }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {series.map((serie) => (
                <div 
                    key={serie.id} 
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                    <div className="relative h-80">
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} 
                            alt={serie.title} 
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-4 space-y-2">
                        <h3 className="text-xl font-bold text-gray-800 truncate">{serie.title}</h3>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                {new Date(serie.first_air_date).toLocaleDateString()}
                            </p>
                            <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <span className="text-sm font-semibold text-gray-700">{serie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}; 
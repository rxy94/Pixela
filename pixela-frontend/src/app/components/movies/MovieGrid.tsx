'use client';

import { Movie } from "@/lib/interface/movies/trending-movies";
import Image from "next/image";

interface Props {
    movies: Movie[];
}

// Componente para mostrar grid de películas
export const MovieGrid = ({ movies }: Props) => { 
    return (
        <div className="flex justify-center items-center bg-[#1E1E1E]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-4">
                {movies.map((movie) => (
                    <div 
                        key={movie.id} 
                        className="relative overflow-hidden rounded-lg shadow-2xl mx-auto"
                    >
                        {/* Imagen del Poster */}
                        <div className="relative h-full w-full">
                            <Image 
                                src={movie.poster_path.startsWith('/') && !movie.poster_path.startsWith('/source') 
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : movie.poster_path} 
                                alt={movie.title} 
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
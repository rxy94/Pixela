import { Pelicula, Serie } from '@/features/media/types/content';

export const preloadImages = async (items: (Pelicula | Serie)[]): Promise<void> => {
    const imagePromises = items.map(item => {
        if (item.poster_path) {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
                img.onload = () => resolve();
                img.onerror = () => resolve();
            });
        }
        return Promise.resolve();
    });
    await Promise.all(imagePromises);
}; 
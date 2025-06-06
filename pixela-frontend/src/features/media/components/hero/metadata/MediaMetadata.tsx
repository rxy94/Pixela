"use client";

import { Media, Serie } from '../../../types';

interface MediaMetadataProps {
  media: Media;
}

const STYLES = {
  container: "flex items-center gap-4 text-gray-400 mb-4 text-sm"
} as const;

export const MediaMetadata = ({ media }: MediaMetadataProps) => {
  const isSerie = media.tipo === 'serie';
  const serie = media as Serie;
  
  return (
    <div className={STYLES.container}>
      <span>{new Date(media.fecha).getFullYear()}</span>
      <span>•</span>
      {isSerie ? (
        <>
          <span>{serie.temporadas} Temporadas</span>
          <span>•</span>
          <span>{serie.episodios} Episodios</span>
        </>
      ) : (
        <>
          <span>{media.duracion} minutos</span>
          <span>•</span>
          <span>Película</span>
        </>
      )}
    </div>
  );
}; 
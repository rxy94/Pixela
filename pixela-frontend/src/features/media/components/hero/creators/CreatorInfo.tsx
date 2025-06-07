"use client";

import { Media, Serie } from '../../../types';
import { CreatorAvatar } from './CreatorAvatar';

interface CreatorInfoProps {
  media: Media;
}

const STYLES = {
  container: "mb-4",
  title: "text-gray-300 text-sm font-medium mb-2",
  creatorsWrapper: "flex flex-wrap gap-4"
} as const;

export const CreatorInfo = ({ media }: CreatorInfoProps) => {
  const isSerie = media.tipo === 'serie';
  const serie = media as Serie;
  
  // Si no hay creadores, no renderizamos nada
  if (!(isSerie ? (serie.creadores?.length ?? 0) > 0 : media.creador)) {
    return null;
  }
  
  return (
    <div className={STYLES.container}>
      <h3 className={STYLES.title}>
        {isSerie 
          ? ((serie.creadores?.length ?? 0) > 1 ? 'Creadores' : 'Creador')
          : 'Director'
        }
      </h3>
      <div className={STYLES.creatorsWrapper}>
        {isSerie ? (
          (serie.creadores ?? []).map((creador) => (
            <CreatorAvatar 
              key={creador.id} 
              photo={creador.foto} 
              name={creador.nombre} 
            />
          ))
        ) : (
          media.creador && (
            <CreatorAvatar 
              photo={media.creador.foto} 
              name={media.creador.nombre} 
            />
          )
        )}
      </div>
    </div>
  );
}; 
"use client";

import { FiStar } from 'react-icons/fi';
import { StarDisplayProps } from '@/features/media/types/reviews';

const STYLES = {
  container: "flex items-center gap-0.5",
  star: "relative inline-block w-6 h-6 transition-transform duration-200 hover:scale-110",
  value: "ml-2 text-xs text-gray-400"
} as const;

/**
 * Componente que muestra la puntuación de la reseña
 * @param {StarDisplayProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de puntuación de la reseña
 */
export const StarDisplay = ({ value }: StarDisplayProps) => (
  <span className={STYLES.container}>
    {[1, 2, 3, 4, 5].map((star) => {
      const starValue = star * 2;
      const isFull = value >= starValue;
      const isHalf = value === starValue - 1;
      return (
        <span
          key={star}
          className={STYLES.star}
        >
          <FiStar className={`w-6 h-6 absolute top-0 left-0 ${isFull ? 'text-yellow-400' : 'text-gray-400'}`} />
          {isHalf && (
            <FiStar
              className="absolute top-0 left-0 w-6 h-6 text-yellow-400"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
          )}
        </span>
      );
    })}
    <span className={STYLES.value}>
      {value % 1 === 0 ? value : value.toFixed(1)}/10
    </span>
  </span>
); 
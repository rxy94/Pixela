'use client';
import { MediaCarousel } from '@/shared/components/MediaCarousel';
import { TrendingMediaCard } from './TrendingMediaCard';
import { TrendingSerie, TrendingMovie } from '../type';

interface TrendingMediaCarouselProps {
  content: (TrendingSerie | TrendingMovie)[];
  type: 'series' | 'movies';
}

export const TrendingMediaCarousel = ({ content, type }: TrendingMediaCarouselProps) => {
  return (
    <MediaCarousel>
      {content.map((item, index) => (
        <div key={`${item.id}-${index}`} className="relative min-w-[375px] max-w-[375px] w-[375px] flex-none pb-16">
          <TrendingMediaCard media={item} type={type} />
        </div>
      ))}
    </MediaCarousel>
  );
}; 
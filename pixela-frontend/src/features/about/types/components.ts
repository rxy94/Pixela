import { ReactNode } from 'react';

/**
 * Interfaz que define la estructura de un miembro del equipo
 * @interface TeamMember
 */
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  favoriteSeries: string;
  favoriteMovie: string;
  quote: string;
}

/**
 * Interfaz que define la estructura de una tarjeta de característica
 * @interface FeatureCard
 */
export interface FeatureCard {
  icon: ReactNode;
  title: string;
  description: string;
  isComingSoon?: boolean;
} 
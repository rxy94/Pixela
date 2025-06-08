import { FooterLink } from '../types/links';

// Enlaces para las columnas - Extraídos como constantes para evitar re-creación en cada render
export const DISCOVER_LINKS: FooterLink[] = [
  { name: 'Películas', href: '/movies' },
  { name: 'Series', href: '/series' },
  { name: 'Categorías', href: '/categories' },
  { name: 'Tendencias', href: '/trending' }
];

export const COMMUNITY_LINKS: FooterLink[] = [
  { name: 'Reseñas', href: '/reviews' },
  { name: 'Favoritos', href: '/favorites' },
  { name: 'Listas', href: '/lists' },
  { name: 'Perfil', href: '/profile' }
];

export const LEGAL_LINKS: FooterLink[] = [
  { name: 'Términos', href: '/terms' },
  { name: 'Privacidad', href: '/privacy' },
  { name: 'Cookies', href: '/cookies' },
  { name: 'Contacto', href: '/contact' }
]; 
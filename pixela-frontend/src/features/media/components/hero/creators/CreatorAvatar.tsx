"use client";

import Image from 'next/image';
import { useState, memo } from 'react';

const STYLES = {
  container: 'flex items-center gap-2',
  avatarContainer: 'relative w-10 h-10',
  avatar: 'rounded-full object-cover border-2 border-pixela-accent/30',
  name: 'text-white font-medium',
  placeholderContainer: 'w-10 h-10 rounded-full border-2 border-pixela-accent/30 bg-gradient-to-br from-pixela-dark via-pixela-dark/80 to-black flex items-center justify-center',
  placeholderIcon: 'text-pixela-accent/60 text-lg'
} as const;

interface CreatorAvatarProps {
  photo?: string;
  name: string;
}

/**
 * Componente placeholder para avatar de director/creador
 */
const AvatarPlaceholder = memo(({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <div className={STYLES.placeholderContainer}>
      {initials ? (
        <span className="text-white text-sm font-semibold">{initials}</span>
      ) : (
        <span className={STYLES.placeholderIcon}>👤</span>
      )}
    </div>
  );
});

AvatarPlaceholder.displayName = 'AvatarPlaceholder';

export const CreatorAvatar = ({ photo, name }: CreatorAvatarProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.avatarContainer}>
        {!photo || photo.trim() === '' || imageError ? (
          <AvatarPlaceholder name={name} />
        ) : (
          <Image 
            src={photo} 
            alt={name}
            className={STYLES.avatar}
            fill
            sizes="40px"
            style={{objectFit: 'cover'}}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <span className={STYLES.name}>{name}</span>
    </div>
  );
}; 
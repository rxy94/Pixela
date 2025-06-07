"use client";

import clsx from 'clsx';

interface GalleryTabsProps {
  activeTab: 'backdrops' | 'posters';
  onTabChange: (tab: 'backdrops' | 'posters') => void;
  backdropsCount: number;
  postersCount: number;
}

const STYLES = {
  container: "flex border-b border-gray-700",
  tabBase: "py-3 px-6 text-sm font-medium rounded-t-lg focus:outline-none transition-colors",
  tabActive: "bg-pixela-accent text-gray-900",
  tabInactive: "text-gray-400 hover:text-white"
} as const;

export function GalleryTabs({ 
  activeTab, 
  onTabChange, 
  backdropsCount, 
  postersCount 
}: GalleryTabsProps) {
  return (
    <div className={STYLES.container}>
      <button
        className={clsx(
          STYLES.tabBase,
          {
            [STYLES.tabActive]: activeTab === 'backdrops',
            [STYLES.tabInactive]: activeTab !== 'backdrops'
          }
        )}
        onClick={() => onTabChange('backdrops')}
      >
        Fondos ({backdropsCount})
      </button>
      
      <button
        className={clsx(
          STYLES.tabBase,
          {
            [STYLES.tabActive]: activeTab === 'posters',
            [STYLES.tabInactive]: activeTab !== 'posters'
          }
        )}
        onClick={() => onTabChange('posters')}
      >
        Pósters ({postersCount})
      </button>
    </div>
  );
} 
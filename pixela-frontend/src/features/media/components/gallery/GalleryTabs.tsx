"use client";

import { GalleryTabsProps } from '@/features/media/types/gallery';

const STYLES = {
  container: "flex space-x-4 mb-6",
  tab: "px-4 py-2 rounded-lg font-medium transition-colors duration-200",
  activeTab: "bg-pixela-accent text-white",
  inactiveTab: "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
} as const;

export const GalleryTabs = ({ activeTab, onTabChange, backdropsCount, postersCount }: GalleryTabsProps) => {
  return (
    <div className={STYLES.container}>
      <button
        className={`${STYLES.tab} ${activeTab === 'backdrops' ? STYLES.activeTab : STYLES.inactiveTab}`}
        onClick={() => onTabChange('backdrops')}
      >
        Fondos ({backdropsCount})
      </button>
      <button
        className={`${STYLES.tab} ${activeTab === 'posters' ? STYLES.activeTab : STYLES.inactiveTab}`}
        onClick={() => onTabChange('posters')}
      >
        Pósters ({postersCount})
      </button>
    </div>
  );
}; 
import { create } from 'zustand';
import { HeroState } from './type';

export const useHeroStore = create<HeroState>((set) => ({
  currentImageIndex: 0,
  fadeIn: true,
  isPlaying: true,
  progress: 0,

  setCurrentImageIndex: (index) => set({ currentImageIndex: index }),
  setFadeIn: (state) => set({ fadeIn: state }),
  setIsPlaying: (state) => set({ isPlaying: state }),
  setProgress: (progress) =>
    set((state) => ({
      progress: typeof progress === 'function' ? progress(state.progress) : progress,
    })),

  resetProgress: () => set({ progress: 0 }),

  prevImage: (imagesLength) => {
    set({ fadeIn: false });
    setTimeout(() => {
      set((state) => ({
        currentImageIndex: (state.currentImageIndex - 1 + imagesLength) % imagesLength,
        fadeIn: true,
        progress: 0,
      }));
    }, 300);
  },

  nextImage: (imagesLength) => {
    set({ fadeIn: false });
    setTimeout(() => {
      set((state) => ({
        currentImageIndex: (state.currentImageIndex + 1) % imagesLength,
        fadeIn: true,
        progress: 0,
      }));
    }, 300);
  },

  handleSlideChange: (index) => {
    set({ fadeIn: false });
    setTimeout(() => {
      set({
        currentImageIndex: index,
        fadeIn: true,
        progress: 0,
      });
    }, 300);
  },
}));

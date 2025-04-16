import { create } from 'zustand';

interface HeroState {
  currentImageIndex: number;
  fadeIn: boolean;
  isPlaying: boolean;
  progress: number;
  setCurrentImageIndex: (index: number) => void;
  setFadeIn: (state: boolean) => void;
  setIsPlaying: (state: boolean) => void;
  setProgress: (progress: number | ((prev: number) => number)) => void;
  resetProgress: () => void;
  prevImage: (imagesLength: number) => void;
  nextImage: (imagesLength: number) => void;
  handleSlideChange: (index: number) => void;
}

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

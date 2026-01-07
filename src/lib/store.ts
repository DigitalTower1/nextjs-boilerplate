import { create } from 'zustand';

interface TransitionState {
  isExiting: boolean;
  setIsExiting: (val: boolean) => void;
}

export const useTransitionStore = create<TransitionState>((set) => ({
  isExiting: false,
  setIsExiting: (val) => set({ isExiting: val }),
}));
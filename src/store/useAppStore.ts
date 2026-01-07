import { create } from 'zustand';

// Definizione dei tipi per il cursore e lo stato
type CursorType = 'default' | 'hover' | 'project';

interface AppState {
  // Navigation State
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;

  // Transition State
  isTransitioning: boolean;
  setTransitioning: (loading: boolean) => void;

  // Creative UI State
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Defaults
  isMenuOpen: false,
  isTransitioning: false,
  cursorType: 'default',

  // Actions
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  
  setTransitioning: (loading) => set({ isTransitioning: loading }),
  
  setCursorType: (type) => set({ cursorType: type }),
}));
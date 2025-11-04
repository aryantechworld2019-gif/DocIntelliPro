import { create } from 'zustand';

interface AppState {
  sidebarOpen: boolean;
  searchQuery: string;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  showUploadModal: boolean;
  setShowUploadModal: (show: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  searchQuery: '',
  showUploadModal: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setShowUploadModal: (show) => set({ showUploadModal: show }),
}));

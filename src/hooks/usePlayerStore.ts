import { Song } from "@/types/custom.types";
import { create } from "zustand";

// define types for state values and actions separately
type PlayerState = {
  currentSongs: Song[];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSongId: string;
  isExiting: boolean;
};
type PlayerAction = {
  setCurrentSongs: (ids: Song[]) => void;
  playPause: (state: boolean) => void;
  setIsActive: (state: boolean) => void;
  setCurrentIndex: (index: number) => void;
  setIsExiting: (state: boolean) => void;
  setActiveSongId: (state: string) => void;
  reset: () => void;
};

// define the initial state
const initialState: PlayerState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSongId: "",
  isExiting: false,
};

// create Store
export const usePlayerStore = create<PlayerState & PlayerAction>((set) => ({
  ...initialState,

  setCurrentSongs: (songsArray) => set({ currentSongs: songsArray }),
  playPause: (state) => set({ isPlaying: state }),
  setIsActive: (state) => set({ isActive: state }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setActiveSongId: (songId) => set({ activeSongId: songId }),
  setIsExiting: (state) => set({ isExiting: state }),
  // reset all state
  reset: () => set(initialState),
}));

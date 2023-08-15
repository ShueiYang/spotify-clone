import { Song } from "@/types/custom.types"
import { create } from "zustand"

interface PlayerStore {
  currentSongs: Song[]
  currentIndex: number
  isActive: boolean
  isPlaying: boolean
  // activeSong: string
  // activeId?: string
 
  // setActiveSong: (id: string) => void
  setCurrentSongs: (ids: Song[]) => void
  playPause: (state: boolean) => void

  setIsActive: (state: boolean) => void
  // setActiveId: (id: string) => void
  setCurrentIndex: (index: number) => void
  reset: () => void
}


export const usePlayerStore = create<PlayerStore>((set) => ({
  currentSongs: [],
  currentIndex: 0,
  isActive:false,
  isPlaying: false,
  // activeSong: "",
  // activeId: undefined,

  // setActiveSong: (songUrl) => set({activeSong: songUrl}),
  setCurrentSongs: (songsArray) => set({currentSongs: songsArray}),
  playPause: (state) => set({isPlaying: state}),

  setIsActive: (state) => set({isActive: state}),
  // setActiveId: (id) => set({activeId: id}),
  setCurrentIndex: (index) => set({currentIndex: index}),
  reset: () => set({currentSongs: []})

  // setId: (id) => set({activeId: id}),
}))

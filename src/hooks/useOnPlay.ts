import { Song } from "@/types/custom.types";
import { usePlayerStore } from "./usePlayerStore";
import { useAuthModal } from "./useAuthModal";
import { useUserStore } from "./useUserStore";


function useOnPlay(songs: Song[]) {

  const authModal = useAuthModal();
  const user = useUserStore((state) => state.user)
  const setActiveId = usePlayerStore((state) => state.setActiveId)
  const setCurrentSongs = usePlayerStore((state) => state.setCurrentSongs)
  const setIsActive = usePlayerStore((state) => state.setIsActive)
  const setCurrentIndex = usePlayerStore((state) => state.setCurrentIndex)

  const onPlay = (id: string) => {
    if(!user) {
      return authModal.onOpen();
    }
    const index = songs.findIndex((song) => song.id === id)
    setActiveId(id)
    setCurrentSongs(songs)
    setIsActive(true)
    setCurrentIndex(index)
  }
  
  return onPlay;
}

export default useOnPlay;

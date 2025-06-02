import { Song } from "@/types/custom.types";
import { usePlayerStore } from "./usePlayerStore";
import { useAuthModal } from "./useAuthModal";
import { useUserStore } from "./useUserStore";

export default function useOnPlay(songs: Song[]) {
  const authModal = useAuthModal();
  const user = useUserStore((state) => state.user);

  const [setCurrentSongs, setIsActive, setCurrentIndex, setActiveSongId] =
    usePlayerStore((state) => [
      state.setCurrentSongs,
      state.setIsActive,
      state.setCurrentIndex,
      state.setActiveSongId,
    ]);

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    const index = songs.findIndex((song) => song.id === id);
    setCurrentSongs(songs);
    setIsActive(true);
    setCurrentIndex(index);
    setActiveSongId(id);
  };
  return onPlay;
}

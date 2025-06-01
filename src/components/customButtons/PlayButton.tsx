import { usePlayerStore } from "@/hooks/usePlayerStore";
import { FaPause, FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface PlayButtonProps {
  songId: string;
  className?: string;
  onPlay: (songId: string) => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  songId,
  className,
  onPlay,
}) => {
  // Zustand custom hook
  const [isPlaying, activeSongId, playPause, setIsExiting] = usePlayerStore(
    (state) => [
      state.isPlaying,
      state.activeSongId,
      state.playPause,
      state.setIsExiting,
    ],
  );

  // handle action depending if a song is playing or not
  function handlePlayAction(songId: string) {
    if (!isPlaying || (isPlaying && songId !== activeSongId)) {
      playPause(true);
      return onPlay(songId);
    } else {
      return setIsExiting(true);
    }
  }

  return (
    <button
      type="button"
      className={twMerge(`play-btn translate`, className)}
      onClick={() => handlePlayAction(songId)}
    >
      {isPlaying && songId === activeSongId ? (
        <FaPause className="text-black" />
      ) : (
        <FaPlay className="text-black" />
      )}
    </button>
  );
};

export default PlayButton;

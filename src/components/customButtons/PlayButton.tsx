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
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const activeSongId = usePlayerStore((state) => state.activeSongId);

  return (
    <button
      className={twMerge(`play-btn translate`, className)}
      onClick={() => onPlay(songId)}
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

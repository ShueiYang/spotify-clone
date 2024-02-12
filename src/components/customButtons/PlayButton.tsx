import { usePlayerStore } from "@/hooks/usePlayerStore";
import { FaPause, FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface PlayButtonProps {
  songId: string;
  className?: string;
}

const PlayButton = ({ songId, className }: PlayButtonProps) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const activeSongId = usePlayerStore((state) => state.activeSongId);

  return (
    <button className={twMerge(`play-btn translate`, className)}>
      {isPlaying && songId === activeSongId ? (
        <FaPause className="text-black" />
      ) : (
        <FaPlay className="text-black" />
      )}
    </button>
  );
};

export default PlayButton;

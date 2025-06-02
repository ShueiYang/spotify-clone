import { twMerge } from "tailwind-merge";

import { usePlayerStore } from "@/hooks/usePlayerStore";
import { SvgIcon, SvgIconName } from "../svg/SvgIcon";

interface PlayButtonProps {
  songId: string;
  className?: string;
  onPlay: (songId: string) => void;
}

export function PlayButton({
  songId,
  className,
  onPlay,
}: Readonly<PlayButtonProps>) {
  // Zustand custom hook
  const [isPlaying, activeSongId, playPause, setIsExiting] = usePlayerStore(
    (state) => [
      state.isPlaying,
      state.activeSongId,
      state.playPause,
      state.setIsExiting,
    ],
  );

  const playIconName: SvgIconName =
    isPlaying && songId === activeSongId ? "Pause" : "Play";

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
      <SvgIcon
        name={playIconName}
        fill="black"
        className="text-black"
      />
    </button>
  );
}

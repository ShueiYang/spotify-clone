import { useRef, useEffect } from "react";
import { AudioEvent } from "./MusicPlayer";

interface PlayerProps {
  songUrl: string;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  repeat: boolean;
  onEnded: () => void;
  onTimeUpdate: (event: AudioEvent) => void;
  onLoadedData: (event: AudioEvent) => void;
}

export function Player({
  songUrl,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}: Readonly<PlayerProps>) {
  const ref = useRef<HTMLAudioElement | null>(null);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={songUrl}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
}

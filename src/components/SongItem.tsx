"use client";

import { useLoadImageUrl } from "@/hooks/useBucketStorage";
import { Song } from "@/types/custom.types";
import Image from "next/image";
import PlayButton from "@/components/customButtons/PlayButton";
import { usePlayerStore } from "@/hooks/usePlayerStore";

interface SongItemProps {
  data: Song;
  onPlayClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onPlayClick }) => {
  // Zustand custom hook
  const [isPlaying, activeSongId, playPause, setIsExiting] = usePlayerStore(
    (state) => [
      state.isPlaying,
      state.activeSongId,
      state.playPause,
      state.setIsExiting,
    ],
  );
  // load Song Image from storage
  const imagePath = useLoadImageUrl(data);

  // handle action depending if a song is playing or not
  function handleClickAction(songId: string) {
    if (!isPlaying || (isPlaying && songId !== activeSongId)) {
      playPause(true);
      return onPlayClick(songId);
    } else {
      return setIsExiting(true);
    }
  }

  return (
    <div
      className="group relative flex flex-col items-center justify-center gap-x-4 overflow-hidden 
      rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-auto w-full overflow-hidden rounded-md">
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          alt="album cover"
          fill
          sizes="(max-width: 250px) 100vw"
        />
      </div>
      <div className="flex w-full flex-1 flex-col items-start gap-y-1 pt-4">
        <h3 className="w-full truncate font-semibold">{data.title}</h3>
        <div className="w-full p-2 text-sm text-neutral-400">
          <p className="line-clamp-2">By {data.author}</p>
        </div>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton
          songId={data.id as string}
          className="translate-y-1/4 group-hover:translate-y-0"
          onPlay={handleClickAction}
        />
      </div>
    </div>
  );
};

export default SongItem;

"use client"

import { useLoadImageUrl } from "@/hooks/useBucketStorage";
import { Song } from "@/types/custom.types";
import Image from "next/image";
import PlayButton from "@/components/customButtons/PlayButton";
import { usePlayerStore } from "@/hooks/usePlayerStore";


interface SongItemProps {
  data: Song
  onPlayClick: (id: string) => void
}


const SongItem: React.FC<SongItemProps> = ({
  data,
  onPlayClick,
}) => {
  // Zustand custom hook
  const [isPlaying, activeSongId, setIsExiting] = usePlayerStore((state) => [
    state.isPlaying,
    state.activeSongId,
    state.setIsExiting
  ])
  // load Song Image from storage
  const imagePath = useLoadImageUrl(data);

  // handle action depending if a song is playing or not
  function handleClickAction() {
    if(!isPlaying || (isPlaying && data.id !== activeSongId)) {
      return onPlayClick(data.id as string)
    } else {
      return setIsExiting(true)
    }
  }

  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md gap-x-4 
      overflow-hidden bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square w-full h-auto rounded-md overflow-hidden">
        <Image 
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          alt="album cover"
          fill
          sizes="(max-width: 250px) 100vw"
        />
      </div>
      <div className="flex flex-col flex-1 items-start w-full pt-4 gap-y-1">
        <h3 className="font-semibold w-full truncate">
          {data.title}
        </h3>
        <div className="w-full text-neutral-400 text-sm p-2">
          <p className="line-clamp-2">
            By {data.author}
          </p>
        </div>
      </div>
      <div 
        className="absolute bottom-24 right-5"
        onClick={handleClickAction}
      >
        <PlayButton 
          songId={data.id as string}
          className="translate-y-1/4 group-hover:translate-y-0"
        />
      </div>
    </div>
  )
}

export default SongItem;
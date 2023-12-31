"use client"

import { Song } from "@/types/custom.types"
import MediaItem from "@/components/sidebar/MediaItem"
import LikeButton from "@/components/customButtons/LikeButton"
import useOnPlay from "@/hooks/useOnPlay"
import PlayButton from "@/components/customButtons/PlayButton"


export default function LikedContent({
  songs
}: { 
  songs: Song[]
}) {
  const onPlay = useOnPlay(songs);
  
  
  if(songs.length === 0) {
    return (
      <div className="flex flex-col w-full gap-y-2 px-6 text-neutral-400">
        No favorite songs found.
      </div>
    )  
  }

  return (
    <div className="flex flex-col w-full gap-y-2 px-6 mb-4">
      {songs.map(song => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div 
            className="relative group flex-1"
            onClick={() => onPlay(song.id as string)}
          >
            <MediaItem data={song} />
            <div className="absolute right-5 inset-y-3">
              <PlayButton
                songId={song.id as string} 
                className="p-3 translate-x-1/4 group-hover:translate-x-0"
              />
            </div>
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

"use client"

import { Song } from "@/types/custom.types";
import SongItem from "../SongItem";
import useOnPlay from "@/hooks/useOnPlay";



export default function HomeContent({
  songs
}: { 
  songs: Song[]
}) {
  const onPlay = useOnPlay(songs);

  if(songs.length === 0)
    return (
    <p className="text-neutral-400 mt-4">
      No songs available.
    </p>
  )  
    
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mt-4">
      {songs.map(song => {
        return (
          <SongItem
            key={song.id}
            data={song}
            onPlayClick={() => onPlay(song.id as string)}
          />
        )
      })}
    </div>
  )
}

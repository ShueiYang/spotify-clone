"use client";

import { Song } from "@/types/custom.types";
import SongItem from "../SongItem";
import useOnPlay from "@/hooks/useOnPlay";

export type SongsContent = {
  songs: Song[];
};

export default function HomeContent({ songs }: Readonly<SongsContent>) {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0)
    return <p className="mt-4 text-neutral-400">No songs available.</p>;

  return (
    <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {songs.map((song) => {
        return (
          <SongItem 
            key={song.id} 
            data={song} 
            onPlayClick={onPlay} 
          />
        )
      })}
    </div>
  );
}

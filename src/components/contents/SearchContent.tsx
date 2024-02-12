"use client";

import { Song } from "@/types/custom.types";
import MediaItem from "@/components/sidebar/MediaItem";
import LikeButton from "@/components/customButtons/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import PlayButton from "@/components/customButtons/PlayButton";

export default function SearchContent({ songs }: { songs: Song[] }) {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="mb-6 flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="mb-4 flex w-full flex-col gap-y-2 px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex w-full items-center gap-x-4">
          <div
            className="group relative flex-1"
            onClick={() => onPlay(song.id as string)}
          >
            <MediaItem data={song} />
            <div className="absolute inset-y-3 right-5">
              <PlayButton
                songId={song.id as string}
                className="translate-x-1/4 p-3 group-hover:translate-x-0"
              />
            </div>
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}

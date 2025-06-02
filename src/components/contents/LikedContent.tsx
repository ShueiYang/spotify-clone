"use client";

import { SongsContent } from "./HomeContent";
import MediaItem from "@/components/sidebar/MediaItem";
import { LikeButton } from "@/components/customButtons/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { PlayButton } from "@/components/customButtons/PlayButton";

export default function LikedContent({ songs }: Readonly<SongsContent>) {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No favorite songs found.
      </div>
    );
  }

  return (
    <div className="mb-4 flex w-full flex-col gap-y-2 px-6">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex w-full items-center gap-x-4"
        >
          <div className="group relative flex-1">
            <MediaItem data={song} />
            <div className="absolute inset-y-3 right-5">
              <PlayButton
                songId={song.id as string}
                className="translate-x-1/4 p-3 group-hover:translate-x-0"
                onPlay={onPlay}
              />
            </div>
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}

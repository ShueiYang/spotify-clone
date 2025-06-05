import Image from "next/image";

import { useLoadImageUrl } from "@/hooks/useBucketStorage";
import { Song } from "@/types/custom.types";
import { LikeButton } from "@/components/customButtons/LikeButton";

interface TrackProps {
  isPlaying: boolean;
  isActive: boolean;
  song: Song;
}

export function Track({ isPlaying, isActive, song }: Readonly<TrackProps>) {
  const imageUrl = useLoadImageUrl(song);

  return (
    <div className="flex max-w-[50%] items-center justify-start lg:basis-1/3">
      <div
        className={`${isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""} relative mr-4 hidden h-16 w-16 sm:block`}
      >
        <Image
          src={imageUrl || "/images/music-placeholder.png"}
          alt="cover art"
          className="rounded-full object-cover"
          fill
          sizes="(max-width: 64px) 100vw"
        />
      </div>
      <div className="w-[45%]">
        <p className="truncate text-lg font-bold text-white">{song.title}</p>
        <p className="truncate text-sm text-gray-300">No active Subtitle</p>
      </div>
      <LikeButton songId={song.id} />
    </div>
  );
}

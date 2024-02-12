"use client";

import Image from "next/image";
import { useLoadImageUrl } from "@/hooks/useBucketStorage";
import { Song } from "@/types/custom.types";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImageUrl(data);

  function handleClick() {
    if (onClick) {
      return onClick(data.id as string);
    }
  }

  return (
    <div
      className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/70"
      onClick={handleClick}
    >
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image
          src={imageUrl || "/images/music-placeholder.png"}
          className="object-cover"
          alt="MediaItem"
          fill
          sizes="(max-width: 48px) 100vw"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <h3 className="truncate text-white">{data.title}</h3>
        <p className="truncate text-sm text-neutral-400">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;

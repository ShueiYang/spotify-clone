"use client"

import Image from "next/image";
import { useLoadImageUrl } from "@/hooks/useBucketStorage";
import { Song } from "@/types/custom.types";


interface MediaItemProps {
  data: Song
  onClick?: (id: string) => void
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
}) => {
  const imageUrl = useLoadImageUrl(data);

  function handleClick() {
    if(onClick) {
      return onClick(data.id as string)
    }
  }

  return (
    <div
      className="flex items-center w-full gap-x-3 p-2 rounded-md cursor-pointer hover:bg-neutral-800/70"
      onClick={handleClick}
    >
      <div className="relative min-w-[48px] min-h-[48px] rounded-md overflow-hidden">
        <Image 
          src={imageUrl || "/images/music-placeholder.png"}
          className="object-cover"
          alt="MediaItem"
          fill
          sizes="(max-width: 48px) 100vw"    
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <h3 className="text-white truncate">
          {data.title}
        </h3>
        <p className="text-neutral-400 text-sm truncate">
          {data.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem;
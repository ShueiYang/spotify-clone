"use client"

import { useLoadImageUrl } from "@/hooks/useBucketStorage";
import { Song } from "@/types/custom.types";
import Image from "next/image";
import PlayButton from "@/components/customButtons/PlayButton";


interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}


const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick,
}) => {
  const imagePath = useLoadImageUrl(data);

  return (
    <div
      onClick={() => onClick(data.id as string)}
      className="relative group flex flex-col items-center justify-center rounded-md gap-x-4 
        overflow-hidden bg-neutral-400/5 cursor-pointer p-3 transition hover:bg-neutral-400/10"
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
      <div className="absolute bottom-24 right-5">
        <PlayButton className="translate-y-1/4 group-hover:translate-y-0"/>
      </div>
    </div>
  )
}

export default SongItem;
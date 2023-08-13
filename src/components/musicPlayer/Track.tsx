import { useLoadImageUrl } from "@/hooks/useBucketStorage";
import { Song } from "@/types/custom.types";
import Image from "next/image";
import LikeButton from "@/components/customButtons/LikeButton";

interface TrackProps {
  isPlaying: boolean
  isActive: boolean
  song: Song
}


const Track: React.FC<TrackProps> = ({
  isPlaying, 
  isActive, 
  song,
}) => {
  const imageUrl = useLoadImageUrl(song);
  
  return (
    <div className="flex-1 flex items-center justify-start">
      <div className={`${isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : "" }
         relative hidden sm:block w-16 h-16 mr-4`
      }>
        <Image 
          src={imageUrl || "/images/music-placeholder.png"} 
          alt="cover art" 
          className="object-cover rounded-full "
          fill
          sizes="(max-width: 64px) 100vw" 
        />
      </div>
      <div className="w-[45%]">
        <p className="truncate text-white font-bold text-lg">
          {song.title}
        </p>
        <p className="truncate text-gray-300 text-sm">
          No active Subtitle
        </p>
      </div>
      <LikeButton songId={song.id} />
    </div>
  )
};

export default Track;
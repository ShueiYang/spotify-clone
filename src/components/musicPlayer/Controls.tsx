import { Song } from "@/types/custom.types";
import { Dispatch, FC, SetStateAction } from "react";
import { RiSkipBackFill, RiSkipForwardFill } from "react-icons/ri";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { RxShuffle, RxUpdate, } from "react-icons/rx";


interface ControlProps {
  isPlaying: boolean
  repeat: boolean
  setRepeat:  Dispatch<SetStateAction<boolean>>
  shuffle: boolean
  setShuffle: Dispatch<SetStateAction<boolean>>
  currentSongs: Song[]
  handlePlayPause: () => void
  handlePrevSong: () => void
  handleNextSong: () => void
}


const Controls: FC<ControlProps> = ({ 
  isPlaying, 
  repeat, 
  setRepeat, 
  shuffle,
  setShuffle, 
  currentSongs,
  handlePlayPause, 
  handlePrevSong, 
  handleNextSong,
}) => {
  
  return (
    <div className="flex items-center justify-around w-40 sm:w-48 md:w-52 lg:w-60 2xl:w-80">
      <RxShuffle
        size={20} 
        color={shuffle ? "red" : "white"} 
        onClick={() => setShuffle((prevState) => !prevState)} 
        className="hidden sm:block cursor-pointer"
      />
      {currentSongs?.length && 
        <RiSkipBackFill
          size={29}
          color="#FFF"  
          onClick={handlePrevSong}    
          className="cursor-pointer"
        />
      }
      {isPlaying ? (
        <IoMdPause
          size={42} 
          color="#FFF" 
          onClick={handlePlayPause} 
          className="cursor-pointer" 
        />
      ) : (
        <IoMdPlay
          size={42}
          color="#FFF" 
          onClick={handlePlayPause} 
          className="cursor-pointer"
        />
      )}
      {currentSongs?.length &&
        <RiSkipForwardFill 
          size={29} 
          color="#FFF" 
          onClick={handleNextSong}
          className="cursor-pointer"  
        />
      }
      <RxUpdate
        size={20} 
        color={repeat ? "red" : "white"} 
        onClick={() => setRepeat((prevState) => !prevState)}  
        className="hidden sm:block rotate-90 cursor-pointer"
      />
    </div>
  )
};

export default Controls;
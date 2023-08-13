import { Song } from "@/types/custom.types";
import { Dispatch, FC, SetStateAction } from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from "react-icons/bs";

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
    <div className="flex items-center justify-around md:w-40 lg:w-60 2xl:w-80">
      <BsArrowRepeat
        size={20} 
        color={repeat ? "red" : "white"} 
        onClick={() => setRepeat((prevState) => !prevState)}  
        className="hidden sm:block cursor-pointer"
      />
      {currentSongs?.length && 
        <MdSkipPrevious 
          size={30} 
          color="#FFF"  
          onClick={handlePrevSong}    
          className="cursor-pointer"
        />
      }
      {isPlaying ? (
        <BsFillPauseFill 
          size={45} 
          color="#FFF" 
          onClick={handlePlayPause} 
          className="cursor-pointer" 
        />
      ) : (
        <BsFillPlayFill 
          size={45} 
          color="#FFF" 
          onClick={handlePlayPause} 
          className="cursor-pointer"
        />
      )}
      {currentSongs?.length &&
       <MdSkipNext 
        size={30} 
        color="#FFF" 
        onClick={handleNextSong}
        className="cursor-pointer"  
        />
      }
      <BsShuffle 
        size={20} 
        color={shuffle ? "red" : "white"} 
        onClick={() => setShuffle((prevState) => !prevState)} 
        className="hidden sm:block cursor-pointer"
      />
    </div>
  )
};

export default Controls;
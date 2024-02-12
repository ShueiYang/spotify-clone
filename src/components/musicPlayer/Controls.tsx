import { Song } from "@/types/custom.types";
import { Dispatch, SetStateAction } from "react";
import { RiSkipBackFill, RiSkipForwardFill } from "react-icons/ri";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { RxShuffle, RxUpdate } from "react-icons/rx";
import TooltipMenu from "@/components/Tooltip";

interface ControlProps {
  isPlaying: boolean;
  repeat: boolean;
  setRepeat: Dispatch<SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: Dispatch<SetStateAction<boolean>>;
  currentSongs: Song[];
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
}

const Controls: React.FC<ControlProps> = ({
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
    <div className="flex w-40 items-center justify-around sm:w-48 md:w-52 lg:w-60 2xl:w-80">
      <TooltipMenu content={shuffle ? "Disable shuffle" : "Enable shuffle"}>
        <RxShuffle
          size={20}
          color={shuffle ? "#33e86c" : "white"}
          onClick={() => setShuffle((prevState) => !prevState)}
          className="hidden cursor-pointer sm:block"
        />
      </TooltipMenu>
      {currentSongs?.length > 0 && (
        <TooltipMenu content="Previous">
          <RiSkipBackFill
            size={29}
            color="#FFF"
            onClick={handlePrevSong}
            className="cursor-pointer"
          />
        </TooltipMenu>
      )}
      {isPlaying ? (
        <TooltipMenu content="Pause">
          <IoMdPause
            size={42}
            color="#FFF"
            onClick={handlePlayPause}
            className="cursor-pointer"
          />
        </TooltipMenu>
      ) : (
        <TooltipMenu content="Play">
          <IoMdPlay
            size={42}
            color="#FFF"
            onClick={handlePlayPause}
            className="cursor-pointer"
          />
        </TooltipMenu>
      )}
      {currentSongs?.length > 0 && (
        <TooltipMenu content="Next">
          <RiSkipForwardFill
            size={29}
            color="#FFF"
            onClick={handleNextSong}
            className="cursor-pointer"
          />
        </TooltipMenu>
      )}
      <TooltipMenu content={repeat ? "Disable repeat" : "Enable repeat"}>
        <RxUpdate
          size={20}
          color={repeat ? "#33e86c" : "white"}
          onClick={() => setRepeat((prevState) => !prevState)}
          className="hidden rotate-90 cursor-pointer sm:block"
        />
      </TooltipMenu>
    </div>
  );
};

export default Controls;

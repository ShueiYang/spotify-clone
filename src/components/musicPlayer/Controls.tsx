import { Song } from "@/types/custom.types";
import { Dispatch, SetStateAction } from "react";

import { SvgIcon, SvgIconName } from "../svg/SvgIcon";
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

export function Controls({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}: Readonly<ControlProps>) {
  const playIcon: SvgIconName = isPlaying ? "Pause" : "Play";

  return (
    <div className="flex w-40 items-center justify-around sm:w-48 md:w-52 lg:w-60 2xl:w-80">
      <TooltipMenu content={shuffle ? "Disable shuffle" : "Enable shuffle"}>
        <SvgIcon
          name="Shuffle"
          size={20}
          color={shuffle ? "#33e86c" : "white"}
          onClick={() => setShuffle((prevState) => !prevState)}
          className="hidden cursor-pointer sm:block"
        />
      </TooltipMenu>

      {currentSongs?.length > 0 && (
        <TooltipMenu content="Previous">
          <SvgIcon
            name="SkipBack"
            size={29}
            fill="#FFF"
            onClick={handlePrevSong}
            className="cursor-pointer"
          />
        </TooltipMenu>
      )}

      <TooltipMenu content={playIcon}>
        <SvgIcon
          name={playIcon}
          size={42}
          fill="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      </TooltipMenu>

      {currentSongs?.length > 0 && (
        <TooltipMenu content="Next">
          <SvgIcon
            name="SkipForward"
            size={29}
            fill="#FFF"
            onClick={handleNextSong}
            className="cursor-pointer"
          />
        </TooltipMenu>
      )}

      <TooltipMenu content={repeat ? "Disable repeat" : "Enable repeat"}>
        <SvgIcon
          name="RefreshCw"
          size={20}
          color={repeat ? "#33e86c" : "white"}
          onClick={() => setRepeat((prevState) => !prevState)}
          className="hidden cursor-pointer sm:block"
        />
      </TooltipMenu>
    </div>
  );
}

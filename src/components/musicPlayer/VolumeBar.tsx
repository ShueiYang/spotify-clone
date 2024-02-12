import { Dispatch, SetStateAction } from "react";
import { InputEvent } from "./indexBar";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import TooltipMenu from "@/components/Tooltip";

interface VolumeBarProps {
  value: number;
  min: number;
  max: number;
  onChange: (event: InputEvent) => void;
  setVolume: Dispatch<SetStateAction<number>>;
}

const VolumeBar: React.FC<VolumeBarProps> = ({
  value,
  min,
  max,
  onChange,
  setVolume,
}) => (
  <div className="mt-2 flex flex-1 items-center justify-end sm:hidden lg:mt-0 lg:flex">
    {value <= 1 && value > 0.5 && (
      <TooltipMenu content="Mute">
        <BsFillVolumeUpFill
          size={25}
          color="#FFF"
          onClick={() => setVolume(0)}
          className="cursor-pointer"
        />
      </TooltipMenu>
    )}
    {value <= 0.5 && value > 0 && (
      <TooltipMenu content="Mute">
        <BsVolumeDownFill
          size={25}
          color="#FFF"
          onClick={() => setVolume(0)}
          className="cursor-pointer"
        />
      </TooltipMenu>
    )}
    {value === 0 && (
      <TooltipMenu content="Unmute">
        <BsFillVolumeMuteFill
          size={25}
          color="#FFF"
          onClick={() => setVolume(0.2)}
          className="cursor-pointer"
        />
      </TooltipMenu>
    )}
    <input
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className="firefox-height ml-2 h-1 md:w-32 lg:w-32 2xl:w-40"
    />
  </div>
);

export default VolumeBar;

import { Dispatch, FC, SetStateAction } from "react";
import { InputEvent } from "./indexBar";
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from "react-icons/bs";
import TooltipMenu from "@/components/Tooltip";

interface VolumeBarProps {
  value: number
  min: number
  max: number
  onChange: (event: InputEvent) => void
  setVolume: Dispatch<SetStateAction<number>>
}


const VolumeBar: FC<VolumeBarProps> = ({ 
  value, 
  min, 
  max, 
  onChange, 
  setVolume 
}) => (
  <div className="hidden lg:flex flex-1 items-center justify-end">
    {value <= 1 && value > 0.5 &&
      <TooltipMenu content="Mute">
        <BsFillVolumeUpFill 
          size={25} 
          color="#FFF" 
          onClick={() => setVolume(0)} 
          className="cursor-pointer"
        />
      </TooltipMenu> 
    }
    {value <= 0.5 && value > 0 &&
      <TooltipMenu content="Mute">
        <BsVolumeDownFill 
          size={25} 
          color="#FFF" 
          onClick={() => setVolume(0)}
          className="cursor-pointer" 
        />
      </TooltipMenu>
    }
    {value === 0 && 
      <TooltipMenu content="Unmute">
        <BsFillVolumeMuteFill 
          size={25} 
          color="#FFF" 
          onClick={() => setVolume(0.2)}
          className="cursor-pointer"
        />
      </TooltipMenu>
    }
    <input
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2 firefox-height"
    />
  </div>
);

export default VolumeBar;
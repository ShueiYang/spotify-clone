import { Dispatch, SetStateAction } from "react";

import { InputEvent } from "./MusicPlayer";
import { SvgIcon, SvgIconName } from "../svg/SvgIcon";
import TooltipMenu from "@/components/Tooltip";

interface VolumeBarProps {
  value: number;
  min: number;
  max: number;
  onChange: (event: InputEvent) => void;
  setVolume: Dispatch<SetStateAction<number>>;
}

export function VolumeBar({
  value,
  min,
  max,
  onChange,
  setVolume,
}: Readonly<VolumeBarProps>) {
  const isMuted = value === 0;
  const tooltip = isMuted ? "Unmute" : "Mute";

  function handleClick() {
    return setVolume(isMuted ? 0.2 : 0);
  }

  function getVolumeIcon(): SvgIconName {
    if (value > 0.6) {
      return "Volume2";
    }
    if (value > 0.2) {
      return "Volume1";
    }
    if (value > 0) {
      return "Volume";
    }
    return "VolumeX";
  }

  return (
    <div className="mt-2 flex flex-1 items-center justify-end sm:hidden lg:mt-0 lg:flex">
      <TooltipMenu content={tooltip}>
        <SvgIcon
          name={getVolumeIcon()}
          size={25}
          color="#FFF"
          onClick={handleClick}
          className="cursor-pointer"
        />
      </TooltipMenu>

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
}

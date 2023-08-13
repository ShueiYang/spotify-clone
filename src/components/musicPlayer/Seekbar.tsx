import { Dispatch, FC, SetStateAction } from "react";
import { InputEvent } from "./indexBar";

interface SeekbarProps {
  value: number
  min: number
  max: number
  onInput: (event: InputEvent) => void
  setSeekTime: Dispatch<SetStateAction<number>>
  appTime: number
}


const Seekbar: FC<SeekbarProps> = ({ 
  value, 
  min, 
  max, 
  onInput, 
  setSeekTime, 
  appTime 
}) => {
  // converts the time to format 0:00

  function getTime(time: number) {
    return `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`
  }

  return (
    <div className="hidden sm:flex flex-row items-center">
      <button 
        type="button" 
        onClick={() => setSeekTime(appTime - 5)} 
        className="hidden lg:mr-4 lg:block text-white"
      >
        -
      </button>
      <span className="text-white w-12 text-center">
        {value === 0 ? "0:00" : getTime(value)}
      </span>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg firefox-height"
      />
      <span className="text-white w-12 text-center">
        {max === 0 ? "0:00" : getTime(max)}
      </span>
      <button 
        type="button" 
        onClick={() => setSeekTime(appTime + 5)} 
        className="hidden lg:ml-4 lg:block text-white"
      >
        +
      </button>
    </div>
  );
};

export default Seekbar;
import { Dispatch, FC, SetStateAction } from "react";
import { InputEvent } from "./indexBar";

interface SeekbarProps {
  value: number;
  min: number;
  max: number;
  onInput: (event: InputEvent) => void;
  setSeekTime: Dispatch<SetStateAction<number>>;
  appTime: number;
}

const Seekbar: FC<SeekbarProps> = ({
  value,
  min,
  max,
  onInput,
  setSeekTime,
  appTime,
}) => {
  // converts the time to format 0:00

  function getTime(time: number) {
    return `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
  }

  return (
    <div className="hidden flex-row items-center sm:flex">
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="hidden text-white lg:mr-4 lg:block"
      >
        -
      </button>
      <span className="w-12 text-center text-white">
        {value === 0 ? "0:00" : getTime(value)}
      </span>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="firefox-height mx-4 h-1 w-24 rounded-lg md:block md:w-56 2xl:mx-6 2xl:w-96"
      />
      <span className="w-12 text-center text-white">
        {max === 0 ? "0:00" : getTime(max)}
      </span>
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className="hidden text-white lg:ml-4 lg:block"
      >
        +
      </button>
    </div>
  );
};

export default Seekbar;

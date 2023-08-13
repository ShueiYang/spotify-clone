import { FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface PlayButtonProps {
  className?: string
}

const PlayButton = ({className}: PlayButtonProps) => {

  return (
    <button className={twMerge(`play-btn translate`, className)}>
      <FaPlay className="text-black" />
    </button>
  )
}

export default PlayButton;
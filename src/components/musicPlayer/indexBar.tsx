"use client"

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { usePlayerStore } from "@/hooks/usePlayerStore";
import { useLoadSongUrl } from "@/hooks/useBucketStorage";
import Track from "./Track";
import Controls from "./Controls";
import Seekbar from "./Seekbar";
import Player from "./Player";
import VolumeBar from "./VolumeBar";

export type InputEvent = React.ChangeEvent<HTMLInputElement>
export type AudioEvent = React.SyntheticEvent<HTMLAudioElement> 

export default function MusicPlayer() {

  const currentSongs = usePlayerStore((state) => state.currentSongs)
  const currentIndex = usePlayerStore((state) => state.currentIndex)
  const isActive = usePlayerStore((state) => state.isActive)
  const isPlaying = usePlayerStore((state) => state.isPlaying)

  const setIsActive = usePlayerStore((state) => state.setIsActive)
  const playPause = usePlayerStore((state) => state.playPause)
  const setCurrentIndex = usePlayerStore((state) => state.setCurrentIndex)
  // const { song } = useGetSongById(activeId);
  
  // for exit animation
  const [isExiting, setIsExiting] = useState(false);

  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  
  const song = currentSongs[currentIndex]
  const songUrl = useLoadSongUrl(song)
 
  useEffect(() => {
    // trigger exit animation before removing the MusicPlayer component
    if(isExiting) {
      const exitTimer = setTimeout(() => {
        setIsActive(false)
        setIsExiting(false)
      }, 500)
      return () => clearTimeout(exitTimer)
    }
  }, [isExiting, setIsActive])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if(currentSongs.length) {
      playPause(true)
    }
  }, [currentIndex]);


  function handlePlayPause() {
    if (!songUrl) return;

    if (isPlaying) {
      playPause(false);
    } else {
      playPause(true);
    }
  }

  function handleNextSong() {
    playPause(false)
    setSeekTime(0)

    if(!shuffle) {
      const nextIndex = (currentIndex + 1) % currentSongs.length;
      setCurrentIndex(nextIndex)
    } else {
      const randomIndex = Math.floor(Math.random() * currentSongs.length)
      setCurrentIndex(randomIndex)
    }
  }

  function handlePrevSong() {
    playPause(false)
    setSeekTime(0)

    if(currentIndex === 0) {
      setCurrentIndex(currentSongs.length - 1)
    } else if(!shuffle) {
      const prevIndex = (currentIndex - 1);
      setCurrentIndex(prevIndex)
    } else {
      const randomIndex = Math.floor(Math.random() * currentSongs.length)
      setCurrentIndex(randomIndex)
    }
  }

  if(!songUrl || !isActive) {
    return null
  }

  return (
    <div className={`absolute h-28 bottom-0 inset-x-2 flex bg-gradient-to-br from-slate-50/10 to-fuchsia-700/50 backdrop-blur-lg z-10 
      ${isExiting ? "animate-slidedown" : "animate-slideup"}`}
    >
      <div className="relative sm:px-12 px-8 w-full flex items-center justify-between" key={songUrl}>
        <IoMdClose
          size={20}  
          className="absolute top-2 right-1 text-gray-300 hover:text-white cursor-pointer"
          onClick={()=> setIsExiting(true)} 
        />
        <Track 
          isPlaying={isPlaying}
          isActive={isActive}
          song={song}
        />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Controls 
            isPlaying={isPlaying}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
          />
          <Seekbar
            value={appTime}
            min={0}
            max={duration}
            onInput={(event: InputEvent) => {
              setSeekTime(parseFloat(event.target.value))
            }}
            setSeekTime={setSeekTime}
            appTime={appTime}
          />
          <Player
            songUrl={songUrl}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            onEnded={handleNextSong}
            onTimeUpdate={(event: AudioEvent) => {
              setAppTime((event.target as HTMLAudioElement).currentTime)
            }}
            onLoadedData={(event: AudioEvent) => {
              setDuration((event.target as HTMLAudioElement).duration)
            }}
          />
        </div>
        <VolumeBar 
          value={volume} 
          min={0} 
          max={1} 
          onChange={(event: InputEvent) => {
            setVolume(parseFloat(event.target.value))
          }} 
          setVolume={setVolume}
        />
      </div>
    </div>
  )
}
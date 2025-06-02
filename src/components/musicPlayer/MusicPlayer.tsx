"use client";

import { useEffect, useState } from "react";

import { usePlayerStore } from "@/hooks/usePlayerStore";
import { useLoadSongUrl } from "@/hooks/useBucketStorage";
import { SvgIcon } from "../svg/SvgIcon";
import Track from "./Track";
import { Controls } from "./Controls";
import Seekbar from "./Seekbar";
import { Player } from "./Player";
import { VolumeBar } from "./VolumeBar";

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type AudioEvent = React.SyntheticEvent<HTMLAudioElement>;

export default function MusicPlayer() {
  // Zustand custom hook
  const [
    currentSongs,
    currentIndex,
    isActive,
    isPlaying,
    isExiting,
    playPause,
    setCurrentIndex,
    setActiveSongId,
    setIsExiting,
    reset,
  ] = usePlayerStore((state) => [
    state.currentSongs,
    state.currentIndex,
    state.isActive,
    state.isPlaying,
    state.isExiting,
    state.playPause,
    state.setCurrentIndex,
    state.setActiveSongId,
    state.setIsExiting,
    state.reset,
  ]);

  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const song = currentSongs[currentIndex];
  // upload the songUrl fron the storage in order to play the song
  const songUrl = useLoadSongUrl(song);

  useEffect(() => {
    // trigger exit animation before removing the MusicPlayer component
    if (isExiting) {
      const exitTimer = setTimeout(() => {
        setDuration(0);
        setSeekTime(0);
        setAppTime(0);
        reset();
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [isExiting, reset]);

  useEffect(() => {
    if (currentSongs.length) {
      setSeekTime(0);
      playPause(true);
      setActiveSongId(song.id as string);
    }
  }, [currentIndex, currentSongs.length, song?.id, setActiveSongId]);

  function handlePlayPause() {
    if (!songUrl) {
      return;
    }

    if (isPlaying) {
      playPause(false);
    } else {
      playPause(true);
    }
  }

  function handleNextSong() {
    playPause(false);

    if (!shuffle) {
      const nextIndex = (currentIndex + 1) % currentSongs.length;
      setCurrentIndex(nextIndex);
    } else {
      const randomIndex = Math.floor(Math.random() * currentSongs.length);
      setCurrentIndex(randomIndex);
    }
  }

  function handlePrevSong() {
    playPause(false);

    if (currentIndex === 0) {
      setCurrentIndex(currentSongs.length - 1);
    } else if (!shuffle) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
    } else {
      const randomIndex = Math.floor(Math.random() * currentSongs.length);
      setCurrentIndex(randomIndex);
    }
  }

  if (!songUrl || !isActive) {
    return null;
  }

  return (
    <div
      className={`absolute inset-x-2 bottom-0 z-10 flex h-[100px] bg-gradient-to-br from-slate-700 to-fuchsia-700/40 backdrop-blur-lg 
      ${isExiting ? "animate-slidedown" : "animate-slideup"}`}
    >
      <div
        className="relative flex w-full items-center justify-between px-8 sm:px-12"
        key={songUrl}
      >
        <SvgIcon
          name="XIcon"
          size={20}
          className="absolute right-1 top-2 cursor-pointer text-gray-300 hover:text-white"
          onClick={() => setIsExiting(true)}
        />

        <Track
          isPlaying={isPlaying}
          isActive={isActive}
          song={song}
        />

        <div className="flex flex-col lg:basis-2/3 lg:flex-row">
          <div className="flex flex-1 flex-col items-center justify-center">
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
                setSeekTime(parseFloat(event.target.value));
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
                setAppTime((event.target as HTMLAudioElement).currentTime);
              }}
              onLoadedData={(event: AudioEvent) => {
                setDuration((event.target as HTMLAudioElement).duration);
              }}
            />
          </div>

          <VolumeBar
            value={volume}
            min={0}
            max={1}
            onChange={(event: InputEvent) => {
              setVolume(parseFloat(event.target.value));
            }}
            setVolume={setVolume}
          />
        </div>
      </div>
    </div>
  );
}

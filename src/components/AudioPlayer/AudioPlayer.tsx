import React, { useEffect, useState } from "react";
import "./AudioPlayer.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getSongId,
  getSongsList,
  setIsSongPlaying,
} from "../SongsList/songSlice";

type AudioPlayerProps = {
  songRefs: (HTMLAudioElement | null)[];
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ songRefs }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useAppDispatch();
  const songsList = useAppSelector(getSongsList);
  const currentSongId = useAppSelector(getSongId);
  const currentSongData = songsList?.find((song) => song.id === currentSongId);
  const currentSongRef = songRefs?.find((audio) => audio?.id === currentSongId);
  const songDuration = currentSongRef ? currentSongRef.duration : 0;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = currentSongRef;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentSongRef]);

  return (
    songsList &&
    currentSongId &&
    currentSongData && (
      <div className="audio-player">
        <img src={currentSongData.imagePath} alt="song-image" />
        <p>{currentSongData.title}</p>
        <p>{currentSongData.artist}</p>
        <button
          onClick={() => {
            currentSongRef?.play();
            dispatch(setIsSongPlaying(true));
          }}
        >
          Play
        </button>
        <button
          onClick={() => {
            currentSongRef?.pause();
            dispatch(setIsSongPlaying(false));
          }}
        >
          Pause
        </button>
        <p>Current Time: {formatTime(currentTime)}</p>
        <p>Duration: {formatTime(songDuration)}</p>
      </div>
    )
  );
};

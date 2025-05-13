import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";

export const useAudioPlayer = (
  songPath: string,
  isPlaying: boolean,
  currentSongId: string | null
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [volumeIcon, setVolumeIcon] = useState(faVolumeHigh);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = parseFloat(e.target.value);

    if (newVolume == 0) {
      setVolumeIcon(faVolumeXmark);
    } else if (newVolume < 0.5) {
      setVolumeIcon(faVolumeLow);
    } else {
      setVolumeIcon(faVolumeHigh);
    }
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentSongId]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.src = songPath;
    audio.currentTime = 0;

    if (isPlaying) {
      audio.play();
    }
  }, [currentSongId]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [isPlaying]);

  return {
    audioRef,
    currentTime,
    duration,
    volume,
    volumeIcon,
    handleSliderChange,
    handleVolumeChange,
  };
};

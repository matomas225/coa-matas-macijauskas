import { useAppSelector } from "@/hooks/reduxHooks";
import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { getTokenState } from "../Login/sessionSlice";

export const useAudioPlayer = (
  songPath: string,
  isPlaying: boolean,
  currentSongId: string | null
) => {
  const token = useAppSelector(getTokenState);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSliderRef = useRef<HTMLInputElement | null>(null);
  const volumeSliderRef = useRef<HTMLInputElement | null>(null);
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
    const percentage = newVolume * 100;
    if (volumeSliderRef.current) {
      volumeSliderRef.current.style.setProperty("--volume", `${percentage}%`);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const valuePercentage = (audio.currentTime / audio.duration) * 100;
      if (audioSliderRef.current) {
        audioSliderRef.current.style.setProperty(
          "--progress",
          `${valuePercentage}%`
        );
      }
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
    if (!token) return;

    const songPathWithToken = `${songPath}?token=${token}`;

    audio.src = songPathWithToken;
    audio.currentTime = 0;

    if (isPlaying) {
      audio.play();
    }
  }, [currentSongId]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;
    if (!token) return;

    if (isPlaying) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!songPath) {
      setVolumeIcon(faVolumeHigh);
      setVolume(1);
    }
  }, [songPath]);

  return {
    token,
    audioRef,
    currentTime,
    duration,
    volume,
    volumeIcon,
    audioSliderRef,
    volumeSliderRef,
    handleSliderChange,
    handleVolumeChange,
  };
};

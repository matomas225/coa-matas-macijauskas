import { useEffect, useRef, useState } from "react";

export const useAudioPlayer = (
  songPath: string,
  isPlaying: boolean,
  currentSongId: string | null
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
  }, [isPlaying, songPath]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [isPlaying]);

  return { audioRef, currentTime, duration };
};

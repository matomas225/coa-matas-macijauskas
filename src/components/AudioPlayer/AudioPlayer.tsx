import React, { useEffect, useState } from "react";
import "./AudioPlayer.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getIsSongPlaying,
  getSongId,
  getSongsList,
  setIsSongPlaying,
  setSongId,
} from "../SongsList/songSlice";
import { formatTime } from "@utils/formatTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faCirclePause,
  faCirclePlay,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

type AudioPlayerProps = {
  songRefs: (HTMLAudioElement | null)[];
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ songRefs }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(getIsSongPlaying);
  const songsList = useAppSelector(getSongsList);
  const currentSongId = useAppSelector(getSongId);
  const currentSongData = songsList?.find((song) => song.id === currentSongId);
  const currentSongRef = songRefs?.find((audio) => audio?.id === currentSongId);
  const currentSongIndex = songRefs.findIndex(
    (audio) => audio?.id === currentSongId
  );
  const songDuration = currentSongRef ? currentSongRef.duration : 0;

  const getSongIcon = () => {
    if (isPlaying) {
      return faCirclePause;
    } else {
      return faCirclePlay;
    }
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
    currentSongData &&
    songRefs && (
      <div className="audio-player">
        <div className="song-info">
          <img src={currentSongData.imagePath} alt="song-image" />
          <div>
            <p className="song-title">{currentSongData.title}</p>
            <p className="song-artist">{currentSongData.artist}</p>
          </div>
        </div>

        <div className="audio-controls">
          <FontAwesomeIcon
            className="previous-button"
            icon={faBackward}
            onClick={() => {
              const previousSong = songRefs[currentSongIndex - 1];

              if (previousSong) {
                currentSongRef?.pause();
                dispatch(setSongId(previousSong.id));
                previousSong.play();
                previousSong.currentTime = 0;
                dispatch(setIsSongPlaying(true));
              }
            }}
          />
          <FontAwesomeIcon
            className="play-pause-button"
            icon={getSongIcon()}
            onClick={() => {
              if (isPlaying) {
                currentSongRef?.pause();
                dispatch(setIsSongPlaying(false));
              } else {
                currentSongRef?.play();
                dispatch(setIsSongPlaying(true));
              }
            }}
          />
          <FontAwesomeIcon
            className="next-button"
            icon={faForward}
            onClick={() => {
              const nextSong = songRefs[currentSongIndex + 1];

              if (nextSong) {
                currentSongRef?.pause();
                dispatch(setSongId(nextSong.id));
                nextSong.play();
                nextSong.currentTime = 0;
                dispatch(setIsSongPlaying(true));
              }
            }}
          />
        </div>
        <div className="song-time">
          <p className="song-played">{formatTime(currentTime)} </p>
          <span>/</span>
          <p className="song-duration">{formatTime(songDuration)}</p>
        </div>
      </div>
    )
  );
};

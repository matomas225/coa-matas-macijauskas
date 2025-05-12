import React from "react";
import "./AudioPlayer.scss";
import { formatTime } from "@utils/formatTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "./useAudioPlayer";
import { useCurrentSong } from "./useCurrentSong";

export const AudioPlayer: React.FC = () => {
  const {
    currentSongData,
    isPlaying,
    currentSongId,
    songIcon,
    handlePlayPause,
    handleNextSong,
    handlePreviousSong,
  } = useCurrentSong();

  const { audioRef, currentTime, duration } = useAudioPlayer(
    currentSongData?.songPath ? currentSongData?.songPath : "",
    isPlaying,
    currentSongId
  );

  return (
    currentSongData &&
    currentSongId && (
      <div className="audio-player">
        <audio ref={audioRef} id={currentSongId} />
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
            onClick={handlePreviousSong}
          />
          <FontAwesomeIcon
            className="play-pause-button"
            icon={songIcon()}
            onClick={handlePlayPause}
          />
          <FontAwesomeIcon
            className="next-button"
            icon={faForward}
            onClick={handleNextSong}
          />
        </div>
        <div className="song-time">
          <p className="song-played">{formatTime(currentTime)} </p>
          <span>/</span>
          <p className="song-duration">{formatTime(duration)}</p>
        </div>
      </div>
    )
  );
};

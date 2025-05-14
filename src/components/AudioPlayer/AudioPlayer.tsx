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

  const {
    audioRef,
    currentTime,
    duration,
    volume,
    volumeIcon,
    audioSliderRef,
    volumeSliderRef,
    handleVolumeChange,
    handleSliderChange,
  } = useAudioPlayer(
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
          <div className="wrapper">
            <div className="buttons">
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
            <div className="slider">
              <input
                ref={audioSliderRef}
                style={{ background: "#292829" }}
                type="range"
                className="audio-slider"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSliderChange}
                step="0.1"
              />
            </div>
          </div>
        </div>
        <div className="song-time">
          <div>
            <FontAwesomeIcon icon={volumeIcon} className="fa-fw volume-icon" />
            <input
              ref={volumeSliderRef}
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              value={volume}
              onChange={handleVolumeChange}
              step="0.1"
            />
            <p className="song-time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

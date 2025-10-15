import React, { useState } from 'react'
import './AudioPlayer.scss'
import { formatTime } from '@utils/formatTime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBackward,
  faForward,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { useAudioPlayer } from './useAudioPlayer'
import { useCurrentSong } from './useCurrentSong'

export const AudioPlayer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    currentSongData,
    isPlaying,
    currentSongId,
    songIcon,
    handlePlayPause,
    handleNextSong,
    handlePreviousSong,
  } = useCurrentSong()

  const {
    audioRef,
    currentTime,
    duration,
    volume,
    volumeIcon,
    audioSliderRef,
    modalAudioSliderRef,
    volumeSliderRef,
    handleSliderChange,
    handleVolumeChange,
  } = useAudioPlayer(
    currentSongData?.songPath || '',
    isPlaying,
    currentSongId,
    handleNextSong,
  )

  // Only render when a track is actually selected and available
  if (!currentSongId || !currentSongData) return null

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <>
      <div className="full-layout" data-testid="audio-player">
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
                data-testid="previous-button"
                className="previous-button"
                icon={faBackward}
                onClick={handlePreviousSong}
              />
              <FontAwesomeIcon
                data-testid="play-pause-button"
                className="play-pause-button"
                icon={songIcon()}
                onClick={handlePlayPause}
              />
              <FontAwesomeIcon
                data-testid="next-button"
                className="next-button"
                icon={faForward}
                onClick={handleNextSong}
              />
            </div>
            <div className="slider">
              <p>{formatTime(currentTime)}</p>
              <input
                ref={audioSliderRef}
                type="range"
                data-testid="audio-slider"
                className="audio-slider"
                min="0"
                max={Number.isFinite(duration) && duration > 0 ? duration : 0}
                value={currentTime}
                onChange={handleSliderChange}
                step="0.1"
              />
              <p>{formatTime(duration)}</p>
            </div>
          </div>
        </div>

        <div className="song-time">
          <FontAwesomeIcon icon={volumeIcon} className="fa-fw volume-icon" />
          <input
            ref={volumeSliderRef}
            type="range"
            data-testid="volume-slider"
            className="volume-slider"
            min="0"
            max="1"
            value={volume}
            onChange={handleVolumeChange}
            step="0.1"
            style={{ ['--volume' as any]: `${volume * 100}%` }}
          />
        </div>
      </div>

      <div className="bar-layout" data-testid="audio-player">
        <audio ref={audioRef} id={currentSongId} />
        <div
          className="progress-bar"
          style={{ width: `${progressPercent}%` }}
        ></div>

        <div className="song-info">
          <img
            src={currentSongData.imagePath}
            alt="song-image"
            onClick={() => setIsModalOpen(true)}
          />
          <div>
            <p className="song-title">{currentSongData.title}</p>
            <p className="song-artist">{currentSongData.artist}</p>
          </div>
        </div>

        <div className="audio-controls">
          <FontAwesomeIcon
            data-testid="play-pause-button"
            className="play-pause-button"
            icon={songIcon()}
            onClick={handlePlayPause}
          />
          <FontAwesomeIcon
            data-testid="next-button"
            className="next-button"
            icon={faForward}
            onClick={handleNextSong}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="audio-modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="close-btn"
              onClick={() => setIsModalOpen(false)}
            />
            <img
              src={currentSongData.imagePath}
              alt="song-image"
              className="modal-img"
            />
            <div className="modal-info">
              <p className="modal-title">{currentSongData.title}</p>
              <p className="modal-artist">{currentSongData.artist}</p>
            </div>
            <div className="modal-slider">
              <p>{formatTime(currentTime)}</p>
              <input
                ref={modalAudioSliderRef}
                type="range"
                className="modal-audio-slider"
                min="0"
                max={Number.isFinite(duration) && duration > 0 ? duration : 0}
                value={currentTime}
                onChange={handleSliderChange}
                step="0.1"
              />
              <p>{formatTime(duration)}</p>
            </div>
            <div className="modal-controls">
              <FontAwesomeIcon
                className="modal-prev"
                icon={faBackward}
                onClick={handlePreviousSong}
              />
              <FontAwesomeIcon
                className="modal-play"
                icon={songIcon()}
                onClick={handlePlayPause}
              />
              <FontAwesomeIcon
                className="modal-next"
                icon={faForward}
                onClick={handleNextSong}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

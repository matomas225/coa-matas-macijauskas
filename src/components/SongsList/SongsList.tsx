import React from 'react'

import { SongsCarousel } from './SongsCarousel'

import './SongList.scss'
import { useSongsList } from './useSongsList'

export const SongsList: React.FC = () => {
  const { songs, handleOnClick, handlePlayPause } = useSongsList()

  if (!songs || songs.length === 0) {
    return (
      <div className="songs-empty">
        <p>No songs yet</p>
      </div>
    )
  }

  return (
    <section className="songs-wrapper">
      <h1>Popular Songs</h1>
      <SongsCarousel
        songs={songs}
        onSongClick={handleOnClick}
        getPlayPauseIcon={handlePlayPause}
      />
    </section>
  )
}

import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getCurrentAlbum, setAlbums, setCurrentAlbum } from './albumSlice'
import axios from 'axios'
import { apiPaths } from '@/services/api'
import './AlbumPage.scss'
import { Button } from '../elements/Button'
import { AddSongToAlbumModal } from './AddSongToAlbumModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

export const AlbumPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const album = useAppSelector(getCurrentAlbum)
  const [isAddSongModalOpen, setAddSongModalOpen] = useState(false)

  const handleRemoveSong = async (songId: string) => {
    if (!album?._id) return
    try {
      await axios.post(
        apiPaths.removeSongFromAlbum,
        { albumId: album._id, songId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )

      // Refetch albums after removal
      const albumsRes = await axios.get(apiPaths.getAlbums, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      dispatch(setAlbums(albumsRes.data))
      // Reselect the same album from the refreshed list (setCurrentAlbum expects an ID)
      dispatch(setCurrentAlbum(album._id))

      toast.success('Song removed from album')
    } catch (err) {
      const msg =
        (axios.isAxiosError(err) && (err.response?.data as any)?.error) ||
        (axios.isAxiosError(err) && (err.response?.data as any)?.message) ||
        'Failed to remove song'
      toast.error(msg)
    }
  }

  if (!album) {
    return <div className="album-page">No album selected.</div>
  }

  return (
    <div className="album-page">
      <div className="album-hero">
        <div className="hero-background">
          <img src={album.coverImagePath} alt="" className="hero-bg-image" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="album-cover-large">
            <img src={album.coverImagePath} alt={album.title} />
          </div>
          <div className="album-details">
            <h1>{album.title}</h1>
            <p className="album-artist">{album.artist}</p>
            <div className="album-stats">
              <span>{album.songs?.length || 0} songs</span>
            </div>
            <Button
              type="button"
              className="add-song-btn hero-btn"
              onClick={() => setAddSongModalOpen(true)}
            >
              Add Song
            </Button>
          </div>
        </div>
      </div>

      <div className="album-content">
        <div className="songs-section">
          <div className="section-header">
            <h2>Songs</h2>
            <Button
              type="button"
              className="add-song-btn"
              onClick={() => setAddSongModalOpen(true)}
            >
              Add Song
            </Button>
          </div>

          {album.songs && album.songs.length > 0 ? (
            <div className="songs-grid">
              {album.songs.map((song, index) => (
                <div className="song-card" key={song._id}>
                  <div className="song-number">{index + 1}</div>
                  <div className="song-image">
                    <img src={song.imagePath} alt={song.title} />
                  </div>
                  <div className="song-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                  <div className="song-actions">
                    <Button
                      type="button"
                      className="remove-song-btn"
                      onClick={() => handleRemoveSong(song._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🎵</div>
              <h3>No songs yet</h3>
              <p>Add your first song to this album</p>
              <Button
                type="button"
                className="add-song-btn"
                onClick={() => setAddSongModalOpen(true)}
              >
                Add Song
              </Button>
            </div>
          )}
        </div>
      </div>

      <AddSongToAlbumModal
        isOpen={isAddSongModalOpen}
        onClose={() => setAddSongModalOpen(false)}
        albumSongs={album.songs || []}
      />
    </div>
  )
}

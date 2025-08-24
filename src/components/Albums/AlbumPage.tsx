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
      <span className="album-header">
        <h1>Album Details</h1>
      </span>
      <div className="album-info">
        <div className="album-info-header">
          <img
            src={album.coverImagePath}
            alt={album.title}
            className="album-cover"
          />
          <div className="album-details">
            <h2>Album Title: {album.title}</h2>
            <p>Artist Name: {album.artist}</p>
            <Button type="button" onClick={() => setAddSongModalOpen(true)}>
              Add Song
            </Button>
          </div>
        </div>
        <div className="album-songs">
          <p>Albums Song List</p>
          {album.songs && album.songs.length > 0 ? (
            <div>
              {album.songs.map((song) => (
                <div className="album-song-item" key={song._id}>
                  <img src={song.imagePath} alt={song.title} />
                  <div>
                    <p>Title: {song.title}</p>
                    <p>Artist: {song.artist}</p>
                  </div>
                  <div className="album-song-actions">
                    <Button
                      type="button"
                      className="remove-song-btn danger"
                      onClick={() => handleRemoveSong(song._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No songs in this album.</p>
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

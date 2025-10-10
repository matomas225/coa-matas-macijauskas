import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getCurrentAlbum, setAlbums, setCurrentAlbum } from './albumSlice'
import { getSongsList, setSongsList } from '../SongsList/songSlice'
import { Button } from '../elements/Button'
import axios from 'axios'
import { apiPaths } from '@/services/api'
import './AddSongToAlbumModal.scss'
import { toast } from 'react-toastify'

type AddSongToAlbumModalProps = {
  isOpen: boolean
  onClose: () => void
  albumSongs: any[]
}

export const AddSongToAlbumModal: React.FC<AddSongToAlbumModalProps> = ({
  isOpen,
  onClose,
  albumSongs,
}) => {
  const dispatch = useAppDispatch()
  const album = useAppSelector(getCurrentAlbum)
  const allSongs = useAppSelector(getSongsList)

  React.useEffect(() => {
    const fetchUserSongs = async () => {
      try {
        const res = await axios.get(apiPaths.getSongs, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        if (res.data) {
          const normalizedSongs = res.data.map((song: any) => ({
            ...song,
            id: song._id || song.id,
          }))
          dispatch(setSongsList(normalizedSongs))
        }
      } catch (e) {
        console.error('Failed to fetch user songs', e)
      }
    }
    if (isOpen && !allSongs?.length) {
      fetchUserSongs()
    }
  }, [isOpen, allSongs?.length, dispatch])

  // Normalize album song IDs to a Set for fast lookup
  const albumSongIds = React.useMemo(() => {
    const ids: string[] = Array.isArray(albumSongs)
      ? albumSongs
          .map((s: any) =>
            typeof s === 'string' ? s : (s?._id ?? s?.id ?? s?.songId),
          )
          .filter((x): x is string => Boolean(x))
      : []
    return new Set(ids)
  }, [albumSongs])

  const handleAddSong = async (songId: string) => {
    if (!album?._id) return
    try {
      await axios.post(
        apiPaths.addSongToAlbum,
        { albumId: album._id, songId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      // Refetch albums after adding
      const albumsRes = await axios.get(apiPaths.getAlbums, {
        headers: {
          Authorization: {
            toString: () => `Bearer ${localStorage.getItem('token')}`,
          } as any,
        } as any, // ... existing code ...
      })
      dispatch(setAlbums(albumsRes.data))
      // Keep the same current album selected so UI updates in place
      dispatch(setCurrentAlbum(album._id))
      toast.success('Song added to album')
    } catch (err) {
      const msg =
        (axios.isAxiosError(err) && (err.response?.data as any)?.error) ||
        (axios.isAxiosError(err) && (err.response?.data as any)?.message) ||
        'Failed to add song'
      toast.error(msg)
    }
  }

  if (!isOpen) return null

  return (
    <div className="add-song-modal-overlay">
      <div className="add-song-modal">
        <div className="modal-header">
          <h2>Add Song to Album</h2>
          <Button type="button" onClick={onClose} className="close-modal">
            ×
          </Button>
        </div>

        <div className="songs-grid">
          {allSongs?.length ? (
            allSongs.map((song) => {
              const isInAlbum = albumSongIds.has(song.id)
              return (
                <div key={song.id} className="song-card">
                  <div className="song-image">
                    <img src={song.imagePath} alt={song.title} />
                  </div>
                  <div className="song-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                  <div className="song-action">
                    {!isInAlbum ? (
                      <Button
                        type="button"
                        onClick={() => handleAddSong(song.id)}
                        className="add-to-album"
                      >
                        Add to Album
                      </Button>
                    ) : (
                      <span className="already-added">Already Added</span>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="no-songs">
              <p>No songs found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

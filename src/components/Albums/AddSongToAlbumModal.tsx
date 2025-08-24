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
          dispatch(setSongsList(res.data))
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
        <h2>Add Song to Album</h2>
        <div>
          <Button type="button" onClick={onClose} className="close-modal">
            Close
          </Button>
        </div>

        <table className="songs-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allSongs?.length ? (
              allSongs.map((song) => {
                const isInAlbum = albumSongIds.has(song.id)
                return (
                  <tr key={song.id}>
                    <td>
                      <img src={song.imagePath} alt={song.title} width={40} />
                    </td>
                    <td>{song.title}</td>
                    <td>{song.artist}</td>
                    <td>
                      {!isInAlbum ? (
                        <Button
                          type="button"
                          onClick={() => handleAddSong(song.id)}
                          className="add-to-album"
                        >
                          Add
                        </Button>
                      ) : (
                        <p>Song is already added</p>
                      )}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={4}>No songs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

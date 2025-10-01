import './AlbumList.scss'
import PlaceholderImg from '@/assets/placeholder-album.png'
import { useEffect } from 'react'
import axios from 'axios'
import { apiPaths } from '@/services/api.ts'
import {
  getAlbums,
  setAlbums,
  setAlbumSidebarOpen,
  setCurrentAlbum,
} from '@/components/Albums/albumSlice.ts'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts'
import { getTokenState } from '@/components/Login/sessionSlice'
import { setDisplayPopupCard } from '@/components/PopupCard/popupCardSlice'

export const AlbumList = () => {
  const dispatch = useAppDispatch()
  const albums = useAppSelector(getAlbums)
  const token = useAppSelector(getTokenState)

  const handleAlbumClick = (albumId: string) => {
    if (!token) {
      dispatch(setDisplayPopupCard(true))
      return
    }
    dispatch(setCurrentAlbum(albumId))
    dispatch(setAlbumSidebarOpen(true))
  }

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get(apiPaths.getAllAlbums)
      dispatch(setAlbums(res.data))
    }
    fetchAlbums()
  }, [dispatch])

  return (
    <div className="album-list-wrapper">
      <h1>Popular Albums</h1>
      <div className="album-list">
        {albums?.map((album) => (
          <div
            key={album._id}
            className="album-item"
            onClick={() => handleAlbumClick(album._id)}
          >
            <img
              src={album.coverImagePath || PlaceholderImg}
              alt={album.title}
            />
            <div className="album-details">
              <h2>{album.title}</h2>
              <p>{album.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import './AlbumList.scss'
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
import { AlbumsCarousel } from './AlbumsCarousel'

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

  if (!albums || albums.length === 0) {
    return (
      <div className="album-list-empty">
        <p>No albums yet</p>
      </div>
    )
  }

  return (
    <div className="album-list-wrapper">
      <h1>Popular Albums</h1>
      <AlbumsCarousel albums={albums} onAlbumClick={handleAlbumClick} />
    </div>
  )
}

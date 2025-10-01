import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getAlbums, setAlbums, setCurrentAlbum } from './albumSlice'
import axios from 'axios'
import { apiPaths } from '@/services/api'
import './AlbumsList.scss'
import { AlbumCard } from './AlbumCard'
import { useNavigate } from 'react-router-dom'

export const AlbumsList: React.FC = () => {
  const dispatch = useAppDispatch()
  const albums = useAppSelector(getAlbums)
  const navigate = useNavigate()

  const handleAlbumClick = (albumId: string) => {
    dispatch(setCurrentAlbum(albumId))
    navigate('/album')
  }

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get(apiPaths.getAlbums)
      dispatch(setAlbums(res.data))
    }
    fetchAlbums()
  }, [dispatch])

  console.log(albums)

  return (
    <div className="albums-list">
      {albums?.map((album) => (
        <AlbumCard
          key={album._id}
          album={album}
          onClick={() => handleAlbumClick(album._id)}
        />
      ))}
    </div>
  )
}

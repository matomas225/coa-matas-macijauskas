import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { useCallback, useEffect, useState } from 'react'
import {
  getIsSongPlaying,
  getSongId,
  setIsSongPlaying,
  setSongId,
  setSongsList,
} from './songSlice'
import { faCirclePause, faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { apiPaths } from '@/services/api'
import { getTokenState } from '../Login/sessionSlice'
import { setDisplayPopupCard } from '../PopupCard/popupCardSlice'

type Songs = {
  id: string
  songPath: string
  imagePath: string
  title: string
  artist: string
}

export const useSongsList = () => {
  const [songs, setSongs] = useState<Songs[] | null>(null)

  const dispatch = useAppDispatch()
  const isPlaying = useAppSelector(getIsSongPlaying)
  const currentSongId = useAppSelector(getSongId)
  const token = useAppSelector(getTokenState)

  const handleOnClick = useCallback(
    (songId: string) => {
      if (!token) {
        dispatch(setDisplayPopupCard(true))
        return
      }
      if (songId !== currentSongId) {
        dispatch(setIsSongPlaying(true))
        dispatch(setSongId(songId))
      } else {
        dispatch(setIsSongPlaying(!isPlaying))
      }
    },
    [dispatch, currentSongId, isPlaying, token],
  )

  const handlePlayPause = useCallback(
    (songId: string) => {
      if (songId === currentSongId && isPlaying) {
        return faCirclePause
      } else {
        return faCirclePlay
      }
    },
    [currentSongId, isPlaying],
  )

  useEffect(() => {
    const getSongs = async () => {
      const results = await axios.get(apiPaths.getSongs)
      if (results.data) {
        const normalizedSongs = results.data.map((song: any) => ({
          ...song,
          id: song._id || song.id,
        }))
        setSongs(normalizedSongs)
        dispatch(setSongsList(normalizedSongs))
      }
    }

    getSongs()
  }, [dispatch])

  return { songs, handleOnClick, handlePlayPause }
}

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import {
  getIsSongPlaying,
  getSongId,
  getSongsList,
  setIsSongPlaying,
  setSongId,
} from '@/components/SongsList/songSlice'
import { faCirclePause, faCirclePlay } from '@fortawesome/free-solid-svg-icons'

export const useCurrentSong = () => {
  const dispatch = useAppDispatch()
  const isPlaying = useAppSelector(getIsSongPlaying)
  const songsList = useAppSelector(getSongsList) ?? []
  const currentSongId = useAppSelector(getSongId)

  const currentSongIndex = songsList.findIndex((s) => s?.id === currentSongId)
  const currentSongData =
    currentSongIndex >= 0 ? songsList[currentSongIndex] : null

  const handlePreviousSong = () => {
    if (!songsList.length) return
    if (currentSongIndex === -1) {
      // if nothing selected yet, choose last (wrap)
      const last = songsList[songsList.length - 1]
      if (last) {
        dispatch(setSongId(last.id))
        dispatch(setIsSongPlaying(true))
      }
      return
    }
    const prevIndex =
      (currentSongIndex - 1 + songsList.length) % songsList.length
    const previousSong = songsList[prevIndex]
    if (previousSong) {
      dispatch(setSongId(previousSong.id))
      dispatch(setIsSongPlaying(true))
    }
  }

  const handlePlayPause = () => dispatch(setIsSongPlaying(!isPlaying))

  const handleNextSong = () => {
    if (!songsList.length) return
    if (currentSongIndex === -1) {
      // if nothing selected yet, choose first
      const first = songsList[0]
      if (first) {
        dispatch(setSongId(first.id))
        dispatch(setIsSongPlaying(true))
      }
      return
    }
    const nextIndex = (currentSongIndex + 1) % songsList.length
    const nextSong = songsList[nextIndex]
    if (nextSong) {
      dispatch(setSongId(nextSong.id))
      dispatch(setIsSongPlaying(true))
    }
  }

  const songIcon = () => (isPlaying ? faCirclePause : faCirclePlay)

  return {
    isPlaying,
    currentSongData,
    songsList,
    currentSongId,
    handlePreviousSong,
    handlePlayPause,
    handleNextSong,
    songIcon,
  }
}

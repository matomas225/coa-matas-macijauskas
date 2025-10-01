import React, { useEffect, useMemo } from 'react'
import './AlbumSidebar.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import {
  getCurrentAlbum,
  getIsAlbumSidebarOpen,
  setAlbumSidebarOpen,
} from '@/components/Albums/albumSlice'
import {
  getIsSongPlaying,
  getSongId,
  getSongsList,
  setIsSongPlaying,
  setSongId,
} from '@/components/SongsList/songSlice'
import PlaceholderImg from '@/assets/placeholder-album.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCirclePause,
  faCirclePlay,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

const API_URL = import.meta.env.VITE_API_URL

export const AlbumSidebar: React.FC = () => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(getIsAlbumSidebarOpen)
  const album = useAppSelector(getCurrentAlbum)
  const isPlaying = useAppSelector(getIsSongPlaying)
  const currentSongId = useAppSelector(getSongId)
  const songsList = useAppSelector(getSongsList)

  // Build a playable stream URL from a stored path/filename (basename)
  const toStreamUrl = (pathOrFilename?: string) => {
    if (!pathOrFilename) return ''
    const file = String(pathOrFilename).split('/').pop() || ''
    return `${API_URL}/songs/stream/${encodeURIComponent(file)}`
  }

  // On album open/change: normalize songs to the player format with valid stream URLs
  useEffect(() => {
    if (!isOpen || !album?.songs) return

    const normalized = album.songs.map((s: any) => ({
      id: s._id,
      // IMPORTANT: server returns filePath, not songPath
      songPath:
        s.songPath && String(s.songPath).startsWith('http')
          ? s.songPath
          : s.filePath && String(s.filePath).startsWith('http')
            ? s.filePath
            : toStreamUrl(s.filePath || s.songPath || s.fileName || s.filename),
      imagePath: s.imagePath,
      title: s.title,
      artist: s.artist,
    }))

    // Ensure selected song belongs to the new album song list
    const selectionBelongs =
      currentSongId && normalized.some((x) => x.id === currentSongId)

    if (!selectionBelongs && normalized.length > 0) {
      dispatch(setSongId(normalized[0].id))
      // Do not auto-play here; avoid races when opening sidebar
    }
  }, [isOpen, album, currentSongId, dispatch])

  // Current song metadata for the sidebar header
  const currentSong = useMemo(() => {
    if (!album?.songs?.length) return null
    return album.songs.find((s: any) => s._id === currentSongId) ?? null
  }, [album, currentSongId])

  const handleClose = () => dispatch(setAlbumSidebarOpen(false))

  const handleSongClick = (song: any) => {
    if (!song?._id) return

    // Clicking the current song toggles play/pause
    if (currentSongId === song._id) {
      dispatch(setIsSongPlaying())
      return
    }

    // Ensure songsList contains a valid stream URL for this song
    // IMPORTANT: prefer filePath (from server), then fallbacks
    const fileLike =
      song.songPath || song.filePath || song.fileName || song.filename
    const ensuredUrl =
      typeof fileLike === 'string' && fileLike.startsWith('http')
        ? fileLike
        : toStreamUrl(fileLike)

    const list = songsList ?? []
    let exists = false
    const updated = list.map((s: any) => {
      if (s.id === song._id) {
        exists = true
        return { ...s, songPath: ensuredUrl }
      }
      return s
    })

    const nextList = exists
      ? updated
      : [
          ...list,
          {
            id: song._id,
            songPath: ensuredUrl,
            imagePath: song.imagePath,
            title: song.title,
            artist: song.artist,
          },
        ]

    dispatch(setSongId(song._id))
    dispatch(setIsSongPlaying(true))
  }

  const playPauseIcon = (songId: string) =>
    currentSongId === songId && isPlaying ? faCirclePause : faCirclePlay

  if (!isOpen) return null

  return (
    <aside className="album-sidebar">
      <div className="album-sidebar__backdrop" onClick={handleClose} />
      <div className="album-sidebar__panel">
        <div className="album-sidebar__header">
          <div className="album-sidebar__title">
            <span className="album-sidebar__album">{album?.title}</span>
            <span className="album-sidebar__artist">{album?.artist}</span>
          </div>
          <button
            className="album-sidebar__close"
            onClick={handleClose}
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="album-sidebar__hero">
          <img
            src={
              currentSong?.imagePath || album?.coverImagePath || PlaceholderImg
            }
            alt={currentSong?.title || album?.title || 'Album cover'}
          />
          <div className="album-sidebar__now-playing">
            <span className="label">Now playing</span>
            <h3 className="track">{currentSong?.title ?? '—'}</h3>
            <p className="artist">
              {currentSong?.artist ?? album?.artist ?? '—'}
            </p>
          </div>
        </div>

        <div className="album-sidebar__list">
          {album?.songs?.map((song: any) => {
            const isActive = currentSongId === song._id
            return (
              <button
                key={song._id}
                className={`album-sidebar__item ${isActive ? 'active' : ''}`}
                onClick={() => handleSongClick(song)}
              >
                <img
                  className="cover"
                  src={song.imagePath || PlaceholderImg}
                  alt={song.title}
                />
                <div className="meta">
                  <span className="title">{song.title}</span>
                  <span className="artist">{song.artist}</span>
                </div>
                <span className="control">
                  <FontAwesomeIcon icon={playPauseIcon(song._id)} />
                </span>
              </button>
            )
          })}
          {!album?.songs?.length && (
            <div className="album-sidebar__empty">
              No songs in this album yet.
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default AlbumSidebar

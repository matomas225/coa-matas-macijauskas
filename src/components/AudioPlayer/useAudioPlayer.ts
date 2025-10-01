import { useAppSelector } from '@/hooks/reduxHooks'
import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'
import { getTokenState } from '../Login/sessionSlice'

export const useAudioPlayer = (
  songPath: string,
  isPlaying: boolean,
  currentSongId: string | null,
) => {
  const token = useAppSelector(getTokenState)

  // DOM refs
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioSliderRef = useRef<HTMLInputElement | null>(null)
  const volumeSliderRef = useRef<HTMLInputElement | null>(null)

  // UI state
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [volumeIcon, setVolumeIcon] = useState(faVolumeHigh)

  // Internals
  const objectUrlRef = useRef<string | null>(null)
  const loadTokenRef = useRef(0)
  const shouldPlayRef = useRef(isPlaying)

  useEffect(() => {
    shouldPlayRef.current = isPlaying
  }, [isPlaying])

  // Keep audio element volume synced
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  // Progress + error wiring per song (do NOT depend on volume to avoid re-wiring on volume change)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      const safeDuration = audio.duration || 0
      const valuePercentage =
        safeDuration > 0 ? (audio.currentTime / safeDuration) * 100 : 0

      if (audioSliderRef.current) {
        audioSliderRef.current.style.setProperty(
          '--progress',
          `${valuePercentage}%`,
        )
      }

      if (!Number.isNaN(audio.currentTime)) {
        setCurrentTime(audio.currentTime)
      }
      if (!Number.isNaN(audio.duration) && audio.duration) {
        setDuration(audio.duration)
      }
    }

    const handleLoadedMetadata = () => {
      if (!Number.isNaN(audio.duration) && audio.duration) {
        setDuration(audio.duration)
      }
      // re-apply volume after source switch
      audio.volume = volume
    }

    const handleError = () => {
      const mediaError = (audio.error && audio.error.code) || 'unknown'
      console.error('Audio element error. MediaError code:', mediaError, {
        src: audio.currentSrc,
      })
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('error', handleError)
    }
  }, [currentSongId])

  // On song change, set the source. Avoid play/pause here to prevent races.
  // IMPORTANT: Do not depend on "volume" here, otherwise changing volume will reset the src.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const myToken = ++loadTokenRef.current

    // Revoke previous Blob URL if any
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }

    // Reset UI counters for the new track (updated again after metadata)
    setCurrentTime(0)
    setDuration(0)

    // No path -> clear source
    if (!songPath) {
      audio.removeAttribute('src')
      return
    }

    const setSrc = (src: string) => {
      if (loadTokenRef.current !== myToken) return // stale async
      // Assignment is enough; browsers autoload. Avoid load() to reduce races.
      audio.src = src
      audio.currentTime = 0
      // keep current volume
      audio.volume = volume
    }

    const hasQueryToken = /\btoken=/.test(songPath)
    const isAbsolute = /^https?:\/\//i.test(songPath)

    const prepare = async () => {
      try {
        if (token && isAbsolute && !hasQueryToken) {
          const res = await fetch(songPath, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (!res.ok) {
            // Fallback to ?token= if server supports it
            setSrc(
              `${songPath}${songPath.includes('?') ? '&' : '?'}token=${token}`,
            )
            return
          }
          const blob = await res.blob()
          if (loadTokenRef.current !== myToken) return
          const url = URL.createObjectURL(blob)
          objectUrlRef.current = url
          setSrc(url)
          return
        }

        // Direct assignment (optionally add ?token=)
        const directSrc =
          token && hasQueryToken
            ? songPath
            : token && !hasQueryToken
              ? `${songPath}${songPath.includes('?') ? '&' : '?'}token=${token}`
              : songPath

        setSrc(directSrc)
      } catch (e) {
        console.error('Failed to prepare audio src:', e)
        setSrc(songPath)
      }
    }

    prepare()

    return () => {
      if (objectUrlRef.current && loadTokenRef.current === myToken) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }
  }, [songPath, currentSongId, token]) // volume removed

  // Centralized play/pause with readiness check to avoid AbortError
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tryPlay = () => {
      const p = audio.play()
      if (p && typeof p.catch === 'function') {
        p.catch((err: any) => {
          if (err?.name === 'AbortError') return // benign race
          if (err?.name === 'NotAllowedError') {
            console.warn('Autoplay blocked; needs a user gesture.')
            return
          }

          console.warn('audio.play() failed:', err)
        })
      }
    }

    if (isPlaying) {
      if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        tryPlay()
      } else {
        const onCanPlay = () => {
          if (shouldPlayRef.current) tryPlay()
          audio.removeEventListener('canplay', onCanPlay)
        }
        audio.addEventListener('canplay', onCanPlay)
        return () => audio.removeEventListener('canplay', onCanPlay)
      }
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Also ensure we start playback right after a source change if the UI says "playing"
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (!isPlaying) return

    let cancelled = false
    let retryTimer: number | undefined

    const tryPlay = () => {
      if (cancelled) return
      const p = audio.play()
      if (p && typeof p.catch === 'function') {
        p.catch((err: any) => {
          if (err?.name === 'AbortError') return
          if (err?.name === 'NotAllowedError') {
            console.warn('Autoplay blocked; needs a user gesture.')
            return
          }
          console.warn('audio.play() failed:', err)
        })
      }
    }

    // If we already have some data buffered/ready, try immediately.
    // HAVE_CURRENT_DATA (2) is less strict than HAVE_FUTURE_DATA (3) and works better cross-browser.
    if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tryPlay()
    } else {
      const onReady = () => {
        audio.removeEventListener('loadeddata', onReady)
        audio.removeEventListener('canplay', onReady)
        audio.removeEventListener('canplaythrough', onReady)
        if (shouldPlayRef.current && !cancelled) tryPlay()
      }
      audio.addEventListener('loadeddata', onReady)
      audio.addEventListener('canplay', onReady)
      audio.addEventListener('canplaythrough', onReady)

      // Fallback retry in case events fired before listeners were attached
      retryTimer = window.setTimeout(() => {
        if (shouldPlayRef.current && !cancelled) tryPlay()
      }, 100)
    }

    return () => {
      cancelled = true
      if (retryTimer) window.clearTimeout(retryTimer)
      audio.removeEventListener('loadeddata', () => {})
      audio.removeEventListener('canplay', () => {})
      audio.removeEventListener('canplaythrough', () => {})
    }
  }, [songPath, currentSongId, isPlaying])

  // Slider/time control
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const time = parseFloat(e.target.value)
    audio.currentTime = time
    setCurrentTime(time)
  }

  // Volume control (does NOT change source)
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const newVolume = parseFloat(e.target.value)

    if (newVolume === 0) {
      setVolumeIcon(faVolumeXmark)
    } else if (newVolume < 0.5) {
      setVolumeIcon(faVolumeLow)
    } else {
      setVolumeIcon(faVolumeHigh)
    }
    audio.volume = newVolume
    setVolume(newVolume)

    const percentage = newVolume * 100
    if (volumeSliderRef.current) {
      volumeSliderRef.current.style.setProperty('--volume', `${percentage}%`)
    }
  }

  // Reset volume UI when no song selected
  useEffect(() => {
    if (!songPath) {
      setVolumeIcon(faVolumeHigh)
      setVolume(1)
    }
  }, [songPath])

  return {
    token,
    audioRef,
    currentTime,
    duration,
    volume,
    volumeIcon,
    audioSliderRef,
    volumeSliderRef,
    handleSliderChange,
    handleVolumeChange,
  }
}

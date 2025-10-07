import React, { useRef, useState, useEffect, useCallback } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { SongCard } from './SongCard'
import './SongsCarousel.scss'

type Songs = {
  id: string
  songPath: string
  imagePath: string
  title: string
  artist: string
}

type SongsCarouselProps = {
  songs: Songs[]
  onSongClick: (songId: string) => void
  getPlayPauseIcon: (songId: string) => IconDefinition
}

export const SongsCarousel: React.FC<SongsCarouselProps> = ({
  songs,
  onSongClick,
  getPlayPauseIcon,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [velocity, setVelocity] = useState(0)
  const [lastX, setLastX] = useState(0)
  const [animationId, setAnimationId] = useState<number | null>(null)

  // Simplified - no momentum scrolling to prevent auto-movement
  const animateMomentum = useCallback(() => {
    // Disabled momentum scrolling to prevent unwanted auto-movement
    setVelocity(0)
    setAnimationId(null)
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!carouselRef.current) return

      e.preventDefault()

      setIsMouseDown(true)
      setStartX(e.pageX - carouselRef.current.offsetLeft)
      setScrollLeft(carouselRef.current.scrollLeft)
      setLastX(e.pageX)
      setVelocity(0)
      setIsScrolling(false)

      // Cancel any existing animation
      if (animationId) {
        cancelAnimationFrame(animationId)
        setAnimationId(null)
      }
    },
    [animationId],
  )

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false)
    if (!isDragging) return

    setIsDragging(false)
    setIsScrolling(true)

    // Start momentum animation
    if (Math.abs(velocity) > 1) {
      animateMomentum()
    } else {
      setTimeout(() => setIsScrolling(false), 150)
    }
  }, [isDragging, velocity, animateMomentum])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isMouseDown || !carouselRef.current) return

      const x = e.pageX - carouselRef.current.offsetLeft
      const deltaX = Math.abs(x - startX)

      // Only start dragging if moved more than 5px
      if (!isDragging && deltaX > 5) {
        setIsDragging(true)
      }

      if (!isDragging) return

      e.preventDefault()

      const walk = (x - startX) * 2 // Scroll speed multiplier

      carouselRef.current.scrollLeft = scrollLeft - walk

      // Calculate velocity for momentum (reduced sensitivity)
      setVelocity((e.pageX - lastX) * 0.6)
      setLastX(e.pageX)
    },
    [isMouseDown, isDragging, startX, scrollLeft, lastX],
  )

  const handleMouseLeave = useCallback(() => {
    setIsMouseDown(false)
    if (isDragging) {
      handleMouseUp()
    }
  }, [isDragging, handleMouseUp])

  // Touch events for mobile
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!carouselRef.current) return

      e.preventDefault()

      setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
      setScrollLeft(carouselRef.current.scrollLeft)
      setLastX(e.touches[0].pageX)
      setVelocity(0)
      setIsScrolling(false)

      // Cancel any existing animation
      if (animationId) {
        cancelAnimationFrame(animationId)
        setAnimationId(null)
      }
    },
    [animationId],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!carouselRef.current) return

      const x = e.touches[0].pageX - carouselRef.current.offsetLeft
      const deltaX = Math.abs(x - startX)

      // Only start dragging if moved more than 5px
      if (!isDragging && deltaX > 5) {
        setIsDragging(true)
      }

      if (!isDragging) return

      e.preventDefault()

      const walk = (x - startX) * 2

      carouselRef.current.scrollLeft = scrollLeft - walk

      // Calculate velocity for momentum (reduced sensitivity)
      setVelocity((e.touches[0].pageX - lastX) * 0.6)
      setLastX(e.touches[0].pageX)
    },
    [isDragging, startX, scrollLeft, lastX],
  )

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)
    setIsScrolling(true)

    // Disabled momentum scrolling to prevent auto-movement
    setVelocity(0)
    setTimeout(() => setIsScrolling(false), 150)
  }, [isDragging, velocity, animateMomentum])

  // Wheel scrolling for desktop
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!carouselRef.current) return

    e.preventDefault()
    carouselRef.current.scrollLeft += e.deltaY
  }, [])

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [animationId])

  // Auto-scroll to show scrollbar on mount
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 1
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = 0
        }
      }, 100)
    }
  }, [songs])

  return (
    <div className="songs-carousel-wrapper">
      <div
        ref={carouselRef}
        className={`songs-carousel ${isDragging ? 'dragging' : ''} ${isScrolling ? 'scrolling' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        role="region"
        aria-label="Songs carousel"
        aria-live="polite"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' && carouselRef.current) {
            e.preventDefault()
            carouselRef.current.scrollLeft -= 200
          } else if (e.key === 'ArrowRight' && carouselRef.current) {
            e.preventDefault()
            carouselRef.current.scrollLeft += 200
          }
        }}
      >
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="carousel-item"
            role="group"
            aria-label={`Song ${index + 1} of ${songs.length}: ${song.title} by ${song.artist}`}
            onClick={() => onSongClick(song.id)}
          >
            <SongCard
              image={song.imagePath}
              title={song.title}
              artist={song.artist}
              playPause={getPlayPauseIcon(song.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

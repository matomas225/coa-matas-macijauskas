import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type SongCardProps = {
  image: string
  title: string
  artist: string
  playPause: IconDefinition
}

export const SongCard: React.FC<SongCardProps> = ({
  image,
  title,
  artist,
  playPause,
}) => {
  return (
    <div className="card-wrapper">
      <div className="image-wrapper">
        <img src={image} />
        <FontAwesomeIcon icon={playPause} className="play-icon" />
      </div>
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  )
}

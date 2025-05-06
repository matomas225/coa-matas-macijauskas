import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type SongCardProps = {
  songId: string;
  song: string;
  image: string;
  title: string;
  artist: string;
  audioRef: (element: HTMLAudioElement | null) => void;
  handleOnClick: () => void;
  playPause: IconDefinition;
};

export const SongCard: React.FC<SongCardProps> = ({
  song,
  image,
  title,
  artist,
  songId,
  audioRef,
  handleOnClick,
  playPause,
}) => {
  return (
    <div className="card-wrapper">
      <audio ref={audioRef} src={song} id={songId} />
      <div className="image-wrapper">
        <img src={image} />
        <FontAwesomeIcon
          icon={playPause}
          className="play-icon"
          onClick={handleOnClick}
        />
      </div>
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
};

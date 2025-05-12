import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type SongCardProps = {
  image: string;
  title: string;
  artist: string;
  handleOnClick: () => void;
  playPause: IconDefinition;
};

export const SongCard: React.FC<SongCardProps> = ({
  image,
  title,
  artist,
  handleOnClick,
  playPause,
}) => {
  return (
    <div className="card-wrapper">
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

import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

export const SongCard: React.FC = ({ song, image, title, artist, songId }) => {
  const songRef = useRef(null);

  return (
    <div className="card-wrapper">
      <audio ref={songRef} src={song} id={songId} />
      <div className="image-wrapper">
        <img src={image} />
        <FontAwesomeIcon
          icon={faCirclePlay}
          className="play-icon"
          onClick={() => songRef.current.play()}
        />
      </div>
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
};

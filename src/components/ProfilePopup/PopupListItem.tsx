import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

type PopupListItemProps = {
  name: string;
  icon: IconDefinition;
  link: string;
  onClick?: () => void;
};

export const PopupListItem: React.FC<PopupListItemProps> = ({
  name,
  icon,
  link,
  onClick,
}) => {
  return (
    <NavLink to={link} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      {name}
    </NavLink>
  );
};

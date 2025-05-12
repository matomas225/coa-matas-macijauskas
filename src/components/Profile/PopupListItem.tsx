import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type PopupListItemProps = {
  name: string;
  icon: IconDefinition;
  onClick?: () => void;
};

export const PopupListItem: React.FC<PopupListItemProps> = ({
  name,
  icon,
  onClick,
}) => {
  return (
    <li onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      {name}
    </li>
  );
};

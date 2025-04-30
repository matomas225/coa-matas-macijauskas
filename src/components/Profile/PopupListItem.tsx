import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type PopupListItemProps = {
  name: string;
  icon: IconDefinition;
};

export const PopupListItem: React.FC<PopupListItemProps> = ({ name, icon }) => {
  return (
    <li>
      <FontAwesomeIcon icon={icon} />
      {name}
    </li>
  );
};

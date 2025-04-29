import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  route: string;
  name: string;
  onClick?: () => void;
  element?: ReactElement;
  containerRef?: React.RefObject<HTMLLIElement | null>;
};

const NavItem: React.FC<NavItemProps> = ({
  route,
  name,
  onClick,
  element,
  containerRef,
}) => {
  return (
    <li ref={containerRef}>
      <div className="navlinkWrapper">
        <NavLink className="navlink" to={route} onClick={onClick}>
          {name}
        </NavLink>
      </div>
      {element && element}
    </li>
  );
};

export default NavItem;

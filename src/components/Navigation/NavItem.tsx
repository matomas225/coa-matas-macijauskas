import React from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  route: string;
  name: string;
  onClick?: () => void;
  element?: any;
};

const NavItem: React.FC<NavItemProps> = ({ route, name, onClick, element }) => {
  return (
    <li>
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

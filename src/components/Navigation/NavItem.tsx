import React from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  route: string;
  name: string;
  onClick?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({ route, name, onClick }) => {
  return (
    <li>
      <NavLink className="navlink" to={route} onClick={onClick}>
        {name}
      </NavLink>
    </li>
  );
};

export default NavItem;

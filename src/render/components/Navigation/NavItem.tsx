import React from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  route: string;
  name: string;
};

const NavItem: React.FC<NavItemProps> = ({ route, name }) => {
  return (
    <li>
      <NavLink className="navlink" to={route}>
        {name}
      </NavLink>
    </li>
  );
};

export default NavItem;

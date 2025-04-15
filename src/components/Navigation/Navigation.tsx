import React from "react";
import NavItem from "./NavItem";
import { routes } from "@utils/routes";
import Logo from "@/assets/logo-white.svg";
import "./Navigation.scss";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    route: routes.home,
    name: "Home",
  },
  {
    route: routes.auth,
    name: "Login",
  },
];

const Navigation: React.FC = () => {
  return (
    <header>
      <nav>
        <NavLink to={routes.home}>
          <img src={Logo} alt="logo" />
        </NavLink>
        <ul>
          {navigationItems.map((item, i) => (
            <NavItem key={i + 1} route={item.route} name={item.name} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

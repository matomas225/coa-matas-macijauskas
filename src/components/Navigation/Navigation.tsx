import React from "react";
import NavItem from "./NavItem";
import { routes } from "@utils/routes";
import "./Navigation.scss";

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

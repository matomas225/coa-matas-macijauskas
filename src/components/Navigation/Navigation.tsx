import React, { useRef } from "react";
import NavItem from "./NavItem";
import { routes } from "@utils/routes";
import Logo from "@/assets/logo-white.svg";
import "./Navigation.scss";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { ProfilePopup } from "../ProfilePopup/ProfilePopup";
import { setProfilePopup } from "../ProfilePopup/profilePopupSlice";
import { useLogin } from "@/hooks/useLogin";

const Navigation: React.FC = () => {
  const { user } = useLogin();

  const ref = useRef<HTMLLIElement>(null);

  const dispatch = useAppDispatch();

  const navigationItems = user
    ? [
        {
          route: routes.home,
          name: "Home",
        },
        {
          route: "#",
          name: user.username,
          containerRef: ref,
          onClick: () => dispatch(setProfilePopup()),
          element: <ProfilePopup ignoreRef={ref} />,
        },
      ]
    : [
        {
          route: routes.home,
          name: "Home",
        },
        {
          route: routes.auth,
          name: "Login",
        },
      ];

  return (
    <header>
      <nav>
        <NavLink to={routes.home}>
          <img src={Logo} alt="logo" />
        </NavLink>
        <ul>
          {navigationItems.map((item, i) => (
            <NavItem
              key={i + 1}
              route={item.route}
              name={item.name}
              onClick={item.onClick}
              element={item.element}
              containerRef={item.containerRef}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

type NavItemProps = {
  route: string;
  name: string;
};

const ListItem = styled.li`
  transition-duration: 0.1s;
  cursor: pointer;
  padding-left: 10px;

  &:hover {
    transform: scale(1.1);
  }
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: #b3b3b3;

  &:hover {
    color: white;
  }
`;

const NavItem: React.FC<NavItemProps> = ({ route, name }) => {
  return (
    <ListItem>
      <NavLinkStyled to={route}>{name}</NavLinkStyled>
    </ListItem>
  );
};

export default NavItem;

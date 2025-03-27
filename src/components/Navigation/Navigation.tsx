import React from "react";
import styled from "styled-components";
import NavItem from "./NavItem";
import { routes } from "@utils/routes";

const Wrapper = styled.header`
  background-color: black;
  padding: 20px 10px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: end;
`;

const UnsortedList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style-type: none;
`;

const Navigation: React.FC = () => {
  console.log(routes.home);
  return (
    <Wrapper>
      <Nav>
        <UnsortedList>
          <NavItem route={routes.home} name="Home" />
          <NavItem route="/" name="About" />
          <NavItem route="/" name="Contact" />
        </UnsortedList>
      </Nav>
    </Wrapper>
  );
};

export default Navigation;

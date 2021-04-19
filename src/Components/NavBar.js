import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  color: white;
  background-color: #45555c;
  padding: 20px;

  a {
    text-decoration: none;
    color: inherit;
  }

  h2 {
    margin: 0;
  }
`;

const NavBar = () => {
  return (
    <div>
      <Nav>
        <a href="/">
          <h2>Top Sites</h2>
        </a>
      </Nav>
    </div>
  );
};

export default NavBar;

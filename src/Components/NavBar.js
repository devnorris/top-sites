import React from 'react';
import styled from 'styled-components';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory } from 'react-router';

const Nav = styled.nav`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  color: white;
  background-color: #45555c;
  padding: 20px;

  button {
    position: absolute;
    left: 20px;
    background-color: inherit;
    padding: 0;
    border: none;
  }

  h2 {
    margin: 0;
  }

  svg {
    height: 30px;
    width: 30px;
  }
`;

const NavBar = ({ goBack = false, title = '' }) => {
  const history = useHistory();
  return (
    <div>
      <Nav>
        {goBack && (
          <button onClick={() => history.goBack()}>
            <ArrowBackIosIcon
              style={{ color: 'white', backgroundColor: '#45555c' }}
            />
          </button>
        )}
        <h2>{title}</h2>
      </Nav>
    </div>
  );
};

export default NavBar;

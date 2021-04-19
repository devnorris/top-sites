import React from 'react';
import styled from 'styled-components';

const HomepageContainer = styled.div`
  padding: 20px;
  text-align: center;

  h2 {
    margin-top: 0;
  }
`;

const StyledHref = styled.a`
  display: flex;
  justify-content: center;
  width: 200px;
  margin: 0 auto;
  border: 1px solid black;
  color: inherit;
  text-decoration: none;
  padding: 10px;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
`;

const Home = () => {
  return (
    <HomepageContainer>
      <h2>Welcome!</h2>
      <p>Please come in and browse our renown clients!</p>
      <StyledHref href="/sites">Browse Clients</StyledHref>
    </HomepageContainer>
  );
};

export default Home;

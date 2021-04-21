import React from 'react';
import styled from 'styled-components';

const HomepageContainer = styled.div`
  padding: 20px;
  text-align: center;

  h2 {
    margin-top: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a:nth-of-type(1) {
      margin-right: 0;
      margin-bottom: 10px;

      @media (min-width: 700px) {
        margin-right: 10px;
        margin-bottom: 0;
      }
    }

    @media (min-width: 700px) {
      flex-direction: row;
    }
  }
`;

const StyledHref = styled.a`
  display: flex;
  justify-content: center;
  width: 200px;
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
      <p>Please come in and take a look around!</p>
      <div>
        <StyledHref href="/sites">Browse Sites</StyledHref>
        <StyledHref href="/clients">Browse Clients</StyledHref>
      </div>
    </HomepageContainer>
  );
};

export default Home;

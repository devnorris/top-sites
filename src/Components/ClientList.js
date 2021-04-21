import React from 'react';
import styled from 'styled-components';

// This component will display the specific Client List //

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid black;

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }

  h4 {
    font-size: 14px;
    margin-top: 0;
  }
`;

const ClientList = ({ client }) => {
  return (
    <StyledListItem key={client.id}>
      <img src={client.logo} alt="logo" />
      <h4>{client.givenName}</h4>
    </StyledListItem>
  );
};

export default ClientList;

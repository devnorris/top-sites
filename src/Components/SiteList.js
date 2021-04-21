import React from 'react';
import styled from 'styled-components';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';

// This component will display the specific Site List //

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

  a {
    color: black;
  }

  div {
    width: 100%;
    margin-right: 10px;

    h4 {
      font-size: 14px;
      margin-top: 0;
    }

    p {
      font-size: 12px;
    }

    p:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const SiteList = ({ client, path }) => {
  return (
    <StyledListItem key={client.id}>
      <Link
        to={{
          pathname: `${path}/${client.id}`,
          state: { client }
        }}
      >
        <img src={client.images[0]} alt="logo" />
      </Link>
      <div>
        <Link
          to={{
            pathname: `${path}/${client.id}`,
            state: { client }
          }}
        >
          <h4>{client.title}</h4>
        </Link>
        <p>
          <b>Address</b>: {client.address.street}, {client.address.city},{' '}
          {client.address.state}, {client.address.zipCode}
        </p>
        <p>
          <b>Contact</b>: {client.contacts.main.firstName}{' '}
          {client.contacts.main.lastName}
        </p>
      </div>
      <Link
        to={{
          pathname: `sites/${client.id}`,
          state: { client }
        }}
      >
        <ArrowForwardIcon />
      </Link>
    </StyledListItem>
  );
};

export default SiteList;

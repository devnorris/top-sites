import React from 'react';
import styled from 'styled-components';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NavBar from './NavBar';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 500px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledImage = styled.img`
  height: 200px;
  width: auto;

  @media (min-width: '700px') {
    height: 100%;
  }
`;

const ClientInfo = styled.div`
  margin: 20px 10px;

  svg {
    height: 35px;
    width: 35px;
    margin-right: 20px;
  }

  p,
  a {
    font-size: 12px;
    margin: 0;
  }
`;

const Client = ({ location }) => {
  const {
    contacts: { main },
    images,
    title
  } = location.state.client;
  const image = images[1] ? images[1] : images[0];
  const fullAddress = `${main.address.street}, ${main.address.city}
  , ${main.address.state}, ${main.address.zipCode}`;
  return (
    <div>
      <NavBar title={title} goBack={true} />
      <StyledContainer>
        <StyledImage src={image} alt="client" />
        <ClientInfo>
          <Flex>
            <AccountCircleIcon />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ marginBottom: '10px' }}>
                {main.firstName} {main.lastName}
              </p>
              <p>Job Title: {main.jobTitle}</p>
            </div>
          </Flex>
          <Flex>
            <CallIcon />
            <a href={`tel:${main.phoneNumber}`}>{main.phoneNumber}</a>
          </Flex>
          <Flex>
            <EmailIcon />
            <a href={`mailto:${main.email}`}>{main.email}</a>
          </Flex>
          <Flex>
            <LocationOnIcon />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                fullAddress
              )}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {fullAddress}
            </a>
          </Flex>
        </ClientInfo>
      </StyledContainer>
    </div>
  );
};

export default Client;

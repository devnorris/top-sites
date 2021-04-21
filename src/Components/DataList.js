import React from 'react';
import styled from 'styled-components';

import { useDataListState } from '../Contexts/dataListContext';
import Alert from './Alert';
import Loader from './Loader';
import NavBar from './NavBar';
import Pagination from './Pagination';
import Filters from './Filters';
import SiteList from './SiteList';
import ClientList from './ClientList';

const StyledList = styled.ul`
  padding: 0;
  margin: 20px auto;
  max-width: 700px;
  width: 100%;
`;

const DataList = ({ path }) => {
  const { status, error, dataList } = useDataListState();
  const title = path === 'sites' ? 'Sites' : 'Clients';
  const filters =
    path === 'sites' ? ['renovated', 'new'] : ['Solutions', 'Functionality'];

  if (error) return <Alert alert={error} />;

  if (status === 'fetching')
    return (
      <div>
        <NavBar title={title} />
        <Loader />
      </div>
    );

  return (
    <div>
      <NavBar title={title} />
      <StyledList>
        <Filters options={filters} />
      </StyledList>
      {dataList.length && status === 'ready' ? (
        <StyledList>
          {dataList.map(client =>
            path === 'sites' ? (
              <SiteList
                key={`${client.id}${client.title}`}
                client={client}
                path={path}
              />
            ) : (
              <ClientList
                key={`${client.id}${client.givenName}`}
                client={client}
              />
            )
          )}
        </StyledList>
      ) : (
        <h2>No clients with this filter</h2>
      )}
      <div style={{ marginBottom: '100px' }}>
        <Pagination path={path} />
      </div>
    </div>
  );
};

export default DataList;

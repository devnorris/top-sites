import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Client from './Components/Client';
import Home from './Components/Home';
import DataList from './Components/DataList';
import { DataListProvider } from './Contexts/dataListContext';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/:list/:client" render={props => <Client {...props} />} />
        <Route
          path="/:list"
          render={({ match: { params } }) => (
            <DataListProvider listType={params.list}>
              <DataList path={params.list} />
            </DataListProvider>
          )}
        />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;

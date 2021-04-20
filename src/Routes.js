import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Client from './Components/Client';
import Home from './Components/Home';
import SiteList from './Components/SiteList';
import { SiteListProvider } from './Contexts/siteListContext';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/sites/:client" render={props => <Client {...props} />} />
        <Route path="/sites">
          <SiteListProvider>
            <SiteList />
          </SiteListProvider>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Client from './Components/Client';
import Home from './Components/Home';
import SiteList from './Components/SiteList';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/sites/:client">
          <Client />
        </Route>
        <Route path="/sites">
          <SiteList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;

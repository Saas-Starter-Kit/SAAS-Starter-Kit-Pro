import React, { useState, useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import AuthContext from '../utils/authContext';
import CaslContext from '../utils/caslContext';
import { getRole } from './helpers';

import Dashboard from '../screens/App/Dashboard';
import Create from '../screens/App/Create';
import ReadUpdate from '../screens/App/ReadUpdate';
import Permissions from '../screens/App/Permissions';
import Users from '../screens/App/Users';
import Layout from '../components/App/AppLayout';

const Routes = ({ location }) => {
  const ability = useContext(CaslContext);
  const { authState } = useContext(AuthContext);
  const splitPath = location.pathname.split('/');
  const app_id = splitPath[2];

  useEffect(() => {
    if (authState.user) getRole(app_id, ability, authState);
  }, [authState]);

  return (
    <Layout app_id={app_id}>
      <Router>
        {/*<PrivateRoute path="/app/:id/dashboard" component={Dashboard} app_id={app_id} />*/}
        <Dashboard app_id={app_id} path="/app/:id/dashboard" />
        <Create app_id={app_id} path="/app/:id/create" />
        <ReadUpdate app_id={app_id} path="/app/:id/readupdate" />
        <Permissions app_id={app_id} path="/app/:id/permissions" />
        <Users app_id={app_id} path="/app/:id/users" />
      </Router>
    </Layout>
  );
};

export default Routes;

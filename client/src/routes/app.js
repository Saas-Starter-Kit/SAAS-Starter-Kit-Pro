import React, { useState, useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import CaslContext from '../utils/caslContext';
import { getRole } from './helpers';

import Dashboard from '../screens/App/Dashboard';
import Create from '../screens/App/Create';
import ReadUpdate from '../screens/App/ReadUpdate';
import Permissions from '../screens/App/Permissions';
import Layout from '../components/App/AppLayout';

const Routes = ({ location }) => {
  const [apps, setApps] = useState();
  const ability = useContext(CaslContext);
  const splitPath = location.pathname.split('/');
  const app_id = splitPath[2];

  useEffect(() => {
    //if (app_id) getRole(app_id, ability);
  }, [app_id]);

  return (
    <Layout app_id={app_id}>
      <Router>
        {/*<PrivateRoute path="/app/:id/dashboard" component={Dashboard} app_id={app_id} />*/}
        <Dashboard app_id={app_id} path="/app/:id/dashboard" />
        <Create app_id={app_id} path="/app/:id/create" />
        <ReadUpdate app_id={app_id} path="/app/:id/readupdate" />
        <Permissions app_id={app_id} path="/app/:id/permissions" />
      </Router>
    </Layout>
  );
};

export default Routes;

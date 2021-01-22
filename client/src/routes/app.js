import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import AuthContext from '../utils/authContext';
import CaslContext from '../utils/caslContext';
import { getRole } from './helpers';
import useWindowSize from '../hooks/useWindowSize';

import Dashboard from '../screens/App/Dashboard';
import Create from '../screens/App/Create';
import ReadUpdate from '../screens/App/ReadUpdate';
import Permissions from '../screens/App/Permissions';
import Users from '../screens/App/Users';
import Layout from '../components/App/AppLayout';
import { breakpoints } from '../styles/theme';

const Routes = ({ location }) => {
  const ability = useContext(CaslContext);
  const { authState } = useContext(AuthContext);
  const splitPath = location.pathname.split('/');
  const app_id = splitPath[2];

  useEffect(() => {
    if (authState.user) getRole(app_id, ability, authState);
  }, [authState]);

  // ant d's Menu.Item within sidebarDesktop causes an extra re-render after mobileMenu has been set to true
  // meaning that it stops the mobile sidebar from ever showing. Not sure why this happens, so working around
  // this by not rendering the sidebar for mobile screens
  const windowSize = useWindowSize();
  const breakpoint = breakpoints.medium.substring(0, breakpoints.medium.length - 2);
  const showSidebarDesktop = windowSize.width > breakpoint;

  return (
    <Layout app_id={app_id} location={location} showSidebarDesktop={showSidebarDesktop}>
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

import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';

import Dashboard from '../screens/App/Dashboard';
import Settings from '../screens/App/Settings';
import Create from '../screens/App/Create';
import ReadUpdate from '../screens/App/ReadUpdate';
import Layout from '../components/App/AppLayout';

const Routes = () => {
  //check token expires time on private routes
  const isTokenValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expiresIn'));
    return new Date().getTime() < expiresAt;
  };

  const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isTokenValid()) {
      navigate('/auth/login');
      return null;
    } else {
      return <Component {...rest} />;
    }
  };

  return (
    <Layout>
      <Router>
        {/*<PrivateRoute path='/app' component={Dashboard} />*/}
        <Dashboard path="/app" />
        <Settings path="/app/settings" />
        <Create path="/app/create" />
        <ReadUpdate path="/app/readupdate" />
      </Router>
    </Layout>
  );
};

export default Routes;

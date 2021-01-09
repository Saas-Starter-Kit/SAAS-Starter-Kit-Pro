import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';

import Dashboard from '../screens/App/Dashboard';
import Create from '../screens/App/Create';
import ReadUpdate from '../screens/App/ReadUpdate';
import Layout from '../components/App/AppLayout';

const Routes = ({ location }) => {
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
    <Layout location={location}>
      <Router>
        <Dashboard path="/app/:id/dashboard" />
        <Create path="/app/:id/create" />
        <ReadUpdate path="/app/:id/readupdate" />
      </Router>
    </Layout>
  );
};

export default Routes;

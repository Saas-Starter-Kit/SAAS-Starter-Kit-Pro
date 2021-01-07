import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';
//import Login from '../screens/Admin/Auth/login';
//import SignUp from '../screens/Admin/Auth/signup';
//import Purchase from '.'

const Routes = () => {
  //check token expires time on private routes
  const isTokenValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expiresIn'));
    return new Date().getTime() < expiresAt;
  };

  const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isTokenValid()) {
      navigate('/login');
      return null;
    } else {
      return <Component {...rest} />;
    }
  };

  return (
    <Layout>
      <Router>
        {/*<PrivateRoute path='/app' component={Dashboard} />*/}
        {/*<SignUp path="/signup" />*/}
        {/*<Login path="/login" />*/}
      </Router>
    </Layout>
  );
};

export default Routes;

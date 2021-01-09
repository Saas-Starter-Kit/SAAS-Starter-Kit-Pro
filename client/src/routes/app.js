import React, { useState, useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';

import Dashboard from '../screens/App/Dashboard';
import Create from '../screens/App/Create';
import ReadUpdate from '../screens/App/ReadUpdate';
import Layout from '../components/App/AppLayout';

import axios from '../services/axios';

const Routes = ({ location }) => {
  const [apps, setApps] = useState();
  //check token expires time on private routes
  const isTokenValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expiresIn'));
    return new Date().getTime() < expiresAt;
  };

  //api request to backend to get role based on user id
  //set as state in useEffect, set app_id as dependency
  //define rules

  useEffect(() => {
    if (app_id) getRole();
  }, [app_id]);

  const getRole = async () => {
    let user_id = 1;

    let params = {
      user_id,
      app_id
    };

    const result = await axios.get(`/api/get/role`, { params }).catch((err) => {
      //  fetchFailure(err);
      console.log(err);
    });

    console.log(result);
    if (result.data.length == 0) {
      //navigate to forbiden page
    }

    setApps(result.data);
  };

  let splitPath = location.pathname.split('/');
  const app_id = splitPath[2];

  const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isTokenValid()) {
      navigate('/auth/login');
      return null;
    } else if (!app_id) {
      navigate('/user/dashboard');
      return null;
    } else {
      return <Component {...rest} />;
    }
  };

  return (
    <Layout app_id={app_id}>
      <Router>
        {/*<PrivateRoute path="/app/:id/dashboard" component={Dashboard} />*/}
        <Dashboard app_id={app_id} path="/app/:id/dashboard" />
        <Create app_id={app_id} path="/app/:id/create" />
        <ReadUpdate app_id={app_id} path="/app/:id/readupdate" />
      </Router>
    </Layout>
  );
};

export default Routes;

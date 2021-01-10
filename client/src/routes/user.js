import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import Settings from '../screens/User/Settings';
import Dashboard from '../screens/User/Dashboard';

const Routes = () => {
  return (
    <Router>
      <Settings path="/user/settings" />
      <Dashboard path="/user/dashboard" />
    </Router>
  );
};

export default Routes;

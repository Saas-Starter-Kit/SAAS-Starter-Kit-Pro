import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import Settings from '../screens/User/Settings';
import Account from '../screens/User/Settings/account';
import Dashboard from '../screens/User/Dashboard';

const Routes = () => {
  return (
    <Router>
      <Account path="/user/settings/account" />
      <Settings path="/user/settings/payment" />
      <Settings path="/user/settings/subscription" />
      <Settings path="/user/settings" />
      <Dashboard path="/user/dashboard" />
    </Router>
  );
};

export default Routes;

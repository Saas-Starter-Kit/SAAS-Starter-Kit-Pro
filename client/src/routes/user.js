import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { AccountSettings, PaymentSettings, SubscriptionSettings } from '../screens/User/Settings';
import Dashboard from '../screens/User/Dashboard';

const Routes = () => {
  return (
    <Router>
      <AccountSettings path="/user/settings/account" />
      <PaymentSettings path="/user/settings/payment" />
      <SubscriptionSettings path="/user/settings/subscription" />
      <Dashboard path="/user/profile" />
    </Router>
  );
};

export default Routes;

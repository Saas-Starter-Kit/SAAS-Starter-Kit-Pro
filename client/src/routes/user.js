import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { AccountSettings, PaymentSettings, SubscriptionSettings } from '../screens/User/Settings';
import Dashboard from '../screens/User/Dashboard';
import ConfirmedInvite from '../screens/User/ConfirmedInvite';

const Routes = () => {
  return (
    <Router>
      <Dashboard path="/user/dashboard" />
      <ConfirmedInvite path="/user/confirmedinvite/:id" />
      <AccountSettings path="/user/settings/account" />
      <PaymentSettings path="/user/settings/payment" />
      <SubscriptionSettings path="/user/settings/subscription" />
      <Dashboard path="/user" />
    </Router>
  );
};

export default Routes;

import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import Payment from '../screens/User/Purchase/Payment';
import CheckAuth from '../screens/User/Purchase/CheckAuth';
import PlanSelect from '../screens/User/Purchase/PlanSelect';
import ConfirmSub from '../screens/User/Purchase/ConfirmSubscription';
import SubscriptionExists from '../screens/User/Purchase/SubscriptionExists';

const Routes = ({ location }) => {
  console.log(location);
  return (
    <Router>
      <CheckAuth path="/purchase/checkauth" />
      <Payment location={location} path="/purchase/payment" />
      <PlanSelect path="/purchase/plan" />
      <ConfirmSub path="/purchase/confirm" />
      <SubscriptionExists path="/purchase/subcriptionexists" />
    </Router>
  );
};

export default Routes;

import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import Payment from '../screens/Purchase/Payment';
import CheckAuth from '../screens/Purchase/CheckAuth';
import PlanSelect from '../screens/Purchase/PlanSelect';
import ConfirmSub from '../screens/Purchase/ConfirmSubscription';
import SubscriptionExists from '../screens/Purchase/SubscriptionExists';

const Routes = () => {
  return (
    <Router>
      <CheckAuth path="/purchase/checkauth" />
      <Payment path="/purchase/payment" />
      <PlanSelect path="/purchase/plan" />
      <ConfirmSub path="/purchase/confirm" />
      <SubscriptionExists path="/purchase/subcriptionexists" />
      <CheckAuth path="/purchase" />
    </Router>
  );
};

export default Routes;

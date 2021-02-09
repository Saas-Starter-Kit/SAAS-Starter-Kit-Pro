import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';

import Layout from '../components/Purchase/Layout';

import {
  Payment,
  CheckAuth,
  PlanSelect,
  ConfirmSub,
  SubscriptionExists
} from '../screens/Purchase';

//useLocation to check pathname and then useEffect to update state
//each icon has own status state.

const Routes = () => {
  return (
    <Layout>
      <Router>
        <CheckAuth path="/purchase/checkauth" />
        <Payment path="/purchase/payment" />
        <PlanSelect path="/purchase/plan" />
        <ConfirmSub path="/purchase/confirm" />
        <CheckAuth path="/purchase" />
      </Router>
    </Layout>
  );
};

export default Routes;

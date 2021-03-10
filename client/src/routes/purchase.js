import React from 'react';
import { Router } from '@reach/router';

import Layout from '../components/Purchase/Layout';

import { Payment, CheckAuth, PlanSelect, ConfirmSub } from '../screens/Purchase';

const Routes = () => {
  return (
    <Layout
      title="Saas Starter Kit Pro Purchase page"
      description="Saas Starter Kit Pro Purchase page"
    >
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
